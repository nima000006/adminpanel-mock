import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useAcceptAllRequestContractMutation,
  useRejectAllRequestContractMutation,
} from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import {
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { RequestsContractsListWaitedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/_shared/components/RequestsContractsListWaitedModalContent/@types/@requestsContractsListWaitedModalContent";
import RequestsContractsListWaitedModalContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/_shared/components/RequestsContractsListWaitedModalContent/RequestsContractsListWaitedModalContent";
import {
  AcceptAllRequestContractRequest,
  RejectAllRequestContractRequest,
  RequestsContractsListWaitedCreatedDrawerContentFormTypes,
  RequestsContractsListWaitedCreatedDrawerContentProps,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/@types/@requestsContractsListWaitedCreatedDrawerContent";
import RequestsContractsListWaitedCreatedDrawerContentDetails from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentDetails/RequestsContractsListWaitedCreatedDrawerContentDetails";
import RequestsContractsListWaitedCreatedDrawerContentFoods from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/RequestsContractsListWaitedCreatedDrawerContentFoods";

const ACCEPT_ALL_REQUEST_CONTRACT_SUCCESS_MSG = "درخواست با موفقیت تایید شد.";
const REJECT_ALL_REQUEST_CONTRACT_SUCCESS_MSG = "درخواست با موفقیت رد شد.";

function RequestsContractsListWaitedCreatedDrawerContent({
  onClose,
  form,
  data,
  isLoading,
  onAcceptSuccess,
  onRejectSuccess,
  onEditPriceClick,
}: RequestsContractsListWaitedCreatedDrawerContentProps) {
  const [view, setView] = useState<"0" | "1">("0"); //* 0: contract details, 1: contract foods
  const [isOpenRefuseRequestModal, setIsOpenRefuseRequestModal] = useState(false);

  const [formRefuseRequest] =
    Form.useForm<RequestsContractsListWaitedDrawerContentFormTypes>();

  //? ================================ Api Calls ================================
  const [acceptAllRequestContract, { isLoading: isAcceptAllRequestContractLoading }] =
    useAcceptAllRequestContractMutation();
  const [rejectAllRequestContract, { isLoading: isRejectAllRequestContractLoading }] =
    useRejectAllRequestContractMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) return;

    form.setFieldsValue({
      contractTitle: data.title,
      supplierName: selectDefaultValueGenerator({
        id: data.vendorId,
        title: data.vendorTitle,
      }),
      selfName: selectDefaultValueGenerator({
        id: data.restaurantId,
        title: data.restaurantTitle,
      }),
      contractNumber: data.contractUUID,
      contractDateRange: [data.startedDate, data.endDate],
      supplierSharePercentage: data.vendorPercentage?.toString(),
      studentSharePercentage: data.providerPercentage?.toString(),
      universitySharePercentage: data.restaurantPercentage?.toString(),
      contractDescription: data.description,
    });
  }, [data, form]);

  //* ================================ Util Functions ================================
  const openRefuseRequestModalHandler = () => {
    setIsOpenRefuseRequestModal(true);
  };
  const onCloseRefuseRequestModalHandler = () => {
    setIsOpenRefuseRequestModal(false);
  };

  const onRejectAllRequestContractSuccess = () => {
    toast.success(REJECT_ALL_REQUEST_CONTRACT_SUCCESS_MSG, {
      toastId: REJECT_ALL_REQUEST_CONTRACT_SUCCESS_MSG,
    });
    onCloseRefuseRequestModalHandler();
    onRejectSuccess?.();
    onClose();
  };

  const refuseRequestSubmitHandler = () => {
    if (!data?.id) return;

    formRefuseRequest.validateFields().then((values) => {
      const request: RejectAllRequestContractRequest = {
        id: data.id,
        rejectReasonId: values.reason.code,
        description: values.description ?? "",
      };

      rejectAllRequestContract(request).unwrap().then(onRejectAllRequestContractSuccess);
    });
  };

  const onAcceptAllRequestContractSuccess = () => {
    toast.success(ACCEPT_ALL_REQUEST_CONTRACT_SUCCESS_MSG, {
      toastId: ACCEPT_ALL_REQUEST_CONTRACT_SUCCESS_MSG,
    });
    onAcceptSuccess?.();
    onClose();
  };

  const acceptRequestSubmitHandler = (
    values: RequestsContractsListWaitedCreatedDrawerContentFormTypes
  ) => {
    if (!data?.id) return;

    const request: AcceptAllRequestContractRequest = {
      id: data.id,
      title: values.contractTitle,
      description: values.contractDescription,
      restaurantId: values.selfName.code,
      vendorId: values.supplierName.code,
      startedDate: values.contractDateRange[0],
      endDate: values.contractDateRange[1],
      contractUUID: values.contractNumber,
      file1Title: data.file1Title ?? "",
      file2Title: data.file2Title ?? "",
      file3Title: data.file3Title ?? "",
      file4Title: data.file4Title ?? "",
      providerPercentage: Number(values.studentSharePercentage),
      restaurantPercentage: Number(values.universitySharePercentage),
      vendorPercentage: Number(values.supplierSharePercentage),
    };

    acceptAllRequestContract(request).unwrap().then(onAcceptAllRequestContractSuccess);
  };

  const isActionLoading =
    isAcceptAllRequestContractLoading || isRejectAllRequestContractLoading;

  const requestType =
    data?.status != null ? getRequestContractTypeByStatus(data.status) : null;
  const drawerTitle = requestType
    ? `مشاهده درخواست ${REQUEST_CONTRACT_TYPE_TEXT[requestType]}`
    : "مشاهده درخواست";

  const items = [
    { value: "0", label: "جزئیات قرارداد" },
    { value: "1", label: `غذاهای قرارداد` },
  ];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenRefuseRequestModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenRefuseRequestModal}
          title="رد درخواست"
          closeModalHandler={onCloseRefuseRequestModalHandler}
          content={<RequestsContractsListWaitedModalContent form={formRefuseRequest} />}
          onConfirmClickHandler={refuseRequestSubmitHandler}
          isDangerous={true}
          showIcon={false}
          confirmBtnText="رد درخواست"
          backBtnText="انصراف"
          isConfirmButtonLoading={isRejectAllRequestContractLoading}
        />
      )}
      <Form
        form={form}
        onFinish={acceptRequestSubmitHandler}
        onFinishFailed={() => setView("0")}
      >
        <CustomDrawerHeader
          title={drawerTitle}
          closeDrawerHandler={onClose}
          leftSideContent={
            <>
              <CustomButton
                htmlType="button"
                onClick={openRefuseRequestModalHandler}
                danger
                disabled={isLoading || isActionLoading || !data}
              >
                رد درخواست
              </CustomButton>
              <CustomButton
                htmlType="submit"
                type="primary"
                loading={isAcceptAllRequestContractLoading}
                disabled={isLoading || isActionLoading || !data}
              >
                تایید درخواست
              </CustomButton>
            </>
          }
        />
        <Div loading={isLoading || isActionLoading}>
          <div className="mb-5!">
            <CustomAlert
              title="در انتظار بررسی!"
              type="warning"
              description="درخواست در انتظار بررسی می‌باشد."
              showIcon={true}
            />
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="شماره درخواست"
              value={data?.id?.toString()}
              span={12}
            />
            <SingleVerticalWithCol
              label="نوع درخواست"
              value={requestType ? REQUEST_CONTRACT_TYPE_TEXT[requestType] : emptyString}
              span={12}
            />
            <SingleVerticalWithCol
              label="درخواست دهنده"
              value={data?.createdBy}
              span={12}
            />
            <SingleVerticalWithCol
              label="شماره تماس درخواست دهنده"
              value={emptyString}
              span={12}
            />
          </Row>

          <div className="mt-5!">
            <CustomSegmented
              block
              size="large"
              options={items}
              onChange={(value) => setView(value as "0" | "1")}
              value={view}
            />
            {/* Keep details mounted so accept submit still has registered form fields */}
            <div className={view === "0" ? "block" : "hidden"}>
              <RequestsContractsListWaitedCreatedDrawerContentDetails
                form={form}
                data={data}
              />
            </div>
            {view === "1" && (
              <RequestsContractsListWaitedCreatedDrawerContentFoods
                contractId={data?.id}
                onEditPriceClick={onEditPriceClick}
              />
            )}
          </div>
        </Div>
      </Form>
    </>
  );
}

export default RequestsContractsListWaitedCreatedDrawerContent;
