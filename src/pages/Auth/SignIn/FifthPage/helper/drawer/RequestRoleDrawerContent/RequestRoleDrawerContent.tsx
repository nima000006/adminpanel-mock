import { useEffect, useState } from "react";

import { Form, Modal, UploadFile } from "antd";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetSajedPositionRequestListQuery,
  useSubmitRequestRoleFirstStepMutation,
  useSubmitRequestRoleSecondStepMutation,
} from "@infra/states/redux/Apis/auth/signInApis";
import {
  GetSajedPositionRequestListResponse,
  RequestRoleDrawerContentProps,
  RequestRoleDrawerFormType,
  SajedPositionRequestRecordType,
  SubmitRequestRoleFirstStepResponse,
} from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/@types/@requestRoleDrawerContentTypes";
import SubmitRequestModalContent from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/SubmitRequestModalContent";
import ViewRequestModalContent from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/ViewRequestModalContent/ViewRequestModalContent";
import RequestRoleDrawerContentTableModel from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/model/RequestRoleDrawerContentTableModel/RequestRoleDrawerContentTableModel";

const RequestRoleDrawerContent = ({
  closeDrawerHandler,
}: RequestRoleDrawerContentProps) => {
  const [data, setData] = useState<SajedPositionRequestRecordType[]>([]);

  const [isViewRequestOpen, setIsViewRequestOpenOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [submitRequest, setIsSubmitRequest] = useState({
    isOpen: false,
    id: -1,
  });

  const [submitModalStep, setSubmitModalStep] = useState(0);

  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);

  const [resData, setResData] = useState<number | undefined>(undefined);

  const { params: url } = useQueryParams();

  const [submitForm] = Form.useForm<RequestRoleDrawerFormType>();
  const [submitSecondStepForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isGetListLoading }] =
    useLazyGetSajedPositionRequestListQuery();

  // submit first step
  const [registerFirstStep, { isLoading: isRegisterFirstStepLoading }] =
    useSubmitRequestRoleFirstStepMutation();

  // submit second step
  const [registerSecondStep, { isLoading: isRegisterSecondStepLoading }] =
    useSubmitRequestRoleSecondStepMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListHandler();
  }, []);

  //* ================================ Util Functions ================================
  const getListHandler = () => {
    getList()
      .unwrap()
      .then((value: GetSajedPositionRequestListResponse) => setData(value));
  };

  const viewHandler = (id: number) => {
    setIsViewRequestOpenOpen({ isOpen: true, id });
  };
  const completeInfoHandler = (id: number) => {
    setIsSubmitRequest({ isOpen: true, id });
  };

  const closeViewRequestHandler = () => {
    setIsViewRequestOpenOpen({ isOpen: false, id: -1 });
  };

  const onSubmitRequestRole = () => {
    setIsSubmitRequest({
      isOpen: true,
      id: -1,
    });
  };

  const closeSubmitModalHandler = () => {
    setIsSubmitRequest({
      isOpen: false,
      id: -1,
    });

    // reset uploader
    setFirstImageName("");
    setSecondImageName("");
    setFirstImageList([]);
    setSecondImageList([]);

    submitForm.resetFields();
    // زمانی که کاربر استپ تکمیل فرم را کامل کرده و رفته استپ بارگذاری مدارک و حالا مودال را می بندد
    if (submitModalStep === 1) {
      getListHandler();
      setSubmitModalStep(0);
    }

    setResData(undefined);
  };

  const confirmationSubmitClickHandler = () => {
    if (submitModalStep === 0) {
      submitForm?.validateFields().then(() => {
        const value = submitForm.getFieldsValue(true);
        registerFirstStep({
          ...(submitRequest?.id > 0 && { id: submitRequest?.id }), // اگر از تکمیل اطلاعات امده بودیم
          ...(resData && { id: resData }), // اگر از استپ 2 بازگشت زده بودیم به استپ 1
          employeeCode: value?.personalCode,
          branchId: value?.branch?.item?.id,
          organizationTitle: value?.location,
          positionTitle: value?.position,
          description: value?.description,
        })
          .unwrap()
          .then((res: SubmitRequestRoleFirstStepResponse) => {
            setSubmitModalStep(1);
            setResData(res?.id);
          });
      });
    }
    if (submitModalStep === 1) {
      submitSecondStepForm?.validateFields().then(() => {
        registerSecondStep(resData ?? -1)
          .unwrap()
          .then(() => {
            closeSubmitModalHandler();
            getListHandler();
            setSubmitModalStep(0);
            setFirstImageList([]);
            setSecondImageList([]);
          });
      });
    }
  };

  const onBackBtnHandler = () => {
    if (submitModalStep === 0) {
      closeSubmitModalHandler();
    } else {
      setSubmitModalStep(0);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* VIEW REQUEST */}
      {isViewRequestOpen?.isOpen && (
        <Modal
          title="مشاهده درخواست"
          open={isViewRequestOpen?.isOpen}
          onCancel={closeViewRequestHandler}
          footer={<CustomButton onClick={closeViewRequestHandler}>بستن</CustomButton>}
          width={800}
        >
          <ViewRequestModalContent id={isViewRequestOpen?.id} />
        </Modal>
      )}

      {/* SUBMIT REQUEST ROLE */}
      {submitRequest?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={submitRequest?.isOpen}
          closeModalHandler={closeSubmitModalHandler}
          onConfirmClickHandler={confirmationSubmitClickHandler}
          onBackBtnHandler={onBackBtnHandler}
          confirmBtnText="ثبت و ادامه"
          backBtnText={submitModalStep === 0 ? "انصراف" : "بازگشت"}
          title="ثبت درخواست سمت"
          width={800}
          isConfirmButtonLoading={
            submitModalStep === 0
              ? isRegisterFirstStepLoading
              : isRegisterSecondStepLoading
          }
          content={
            <SubmitRequestModalContent
              form={submitForm}
              submitSecondStepForm={submitSecondStepForm}
              step={submitModalStep}
              setFirstImageName={setFirstImageName}
              setSecondImageName={setSecondImageName}
              firstImageList={firstImageList}
              setFirstImageList={setFirstImageList}
              secondImageList={secondImageList}
              setSecondImageList={setSecondImageList}
              firstStepId={resData}
              id={submitRequest?.id}
              firstImageName={firstImageName}
              secondImageName={secondImageName}
            />
          }
        />
      )}

      <div>
        <CustomDrawerHeader
          hasLeftSide
          leftSideContent={
            <>
              <CustomButton onClick={closeDrawerHandler}>بستن</CustomButton>
              <CustomButton type="primary" loading={false} onClick={onSubmitRequestRole}>
                ثبت درخواست سمت
              </CustomButton>
            </>
          }
          title="درخواست‌های سمت"
          closeDrawerHandler={closeDrawerHandler}
        />

        <CustomTable
          dataSource={data}
          loading={isGetListLoading}
          columns={RequestRoleDrawerContentTableModel({
            viewHandler,
            completeInfoHandler,
          })}
          rowKey="ticketNumber"
          draggableColumns
          draggableId={ExcelCodes.MANAGEMENT_REQUEST_ROLE_DRAWER_CONTENT_TABLE}
          pagination={paginationConfig}
          key={`table-${url?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};
export default RequestRoleDrawerContent;
