import { useEffect, useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { emptyString } from "@infra/config/global.vars";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  useCreateRoleMutation,
  useLazyViewUserRoleListQuery,
} from "@infra/states/redux/Apis/auth/signInApis";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ROLE_STATUS } from "@pages/Auth/SignIn/FifthPage/SignInFifthPage";

import {
  ViewRoleDrawerContentProps,
  ViewUserRoleResponseItem,
} from "./@types/@viewRoleDrawerContentProps";
import ActiveRoleTableModel from "./helper/model/ActiveRoleTableModel";
import InfoBox from "../../components/InfoBox/InfoBox";
import RequestRoleModalContent from "../../modal/RequestRoleModalContent/RequestRoleModalContent";

const SEND_REQUEST_SUCCESS_MSG = "درخواست شما با موفقیت ثبت شد.";

const ViewRoleDrawerContent = ({
  closeDrawer,
  title,
  personalNumber,
  branchName,
  id,
  segmentStatus,
}: ViewRoleDrawerContentProps) => {
  const [dataSource, setDataSource] = useState<ViewUserRoleResponseItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm<{ description: string; staff: SelectType<IdTitle> }>();

  //? ================================  Api Calls ================================
  // view user role
  const [getViewUserRoleList, { isFetching: isViewUserRoleListLoading }] =
    useLazyViewUserRoleListQuery();

  // create role
  const [createRole, { isLoading: isCreateRoleLoading }] = useCreateRoleMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getViewUserRoleList({ id }).unwrap().then(getViewUserRoleListIsSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================

  const closeModalHandler = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const modalConfirmationHandler = () => {
    form.submit();

    form.validateFields().then((value) => {
      createRole({
        message: value?.description ? value?.description : "",
        staffId: segmentStatus === ROLE_STATUS.noRole ? id : value?.staff?.code,
      })
        .unwrap()
        .then(createRoleIsSuccess);
    });
  };

  const createRoleIsSuccess = () => {
    closeModalHandler();
    toast.success(SEND_REQUEST_SUCCESS_MSG, {
      toastId: SEND_REQUEST_SUCCESS_MSG,
    });
  };

  // is success
  const getViewUserRoleListIsSuccess = (response: ViewUserRoleResponseItem[]) => {
    if (response) {
      setDataSource(response);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen && (
        <ConfirmationModalWithContent
          title="درخواست مجدد نقش"
          isModalOpen={isModalOpen}
          confirmBtnText="ثبت درخواست"
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={modalConfirmationHandler}
          width={800}
          content={
            <RequestRoleModalContent
              title={title}
              personalNumber={personalNumber}
              branchName={branchName}
              form={form}
              id={id}
            />
          }
          isConfirmButtonLoading={isCreateRoleLoading}
          showIcon={false}
        />
      )}

      <div className="flex flex-col gap-10">
        <CustomDrawerHeader
          title="مشاهده نقش‌ها"
          closeDrawerHandler={closeDrawer}
          leftSideContent={
            <div className="flex gap-4">
              <CustomButton onClick={closeDrawer} className="drawer-action-btn">
                بستن
              </CustomButton>
              <CustomButton
                type="primary"
                className="drawer-action-btn"
                htmlType="submit"
                onClick={openModalHandler}
              >
                درخواست نقش مجدد
              </CustomButton>
            </div>
          }
        />

        <div className="body-regular flex flex-col gap-2">
          <div className="text-neutral-10 text-center text-xl font-bold">{title}</div>
          <div className="flex justify-around">
            <InfoBox title={"شعبه / واحد"} value={branchName} />
            <InfoBox title={"دانشکده / دپارتمان"} value={emptyString} />
            <InfoBox title={"شماره پرسنلی"} value={personalNumber} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <CustomDivider text={"نقش‌های فعال"} />
          <CustomTable
            dataSource={dataSource}
            loading={isViewUserRoleListLoading}
            columns={ActiveRoleTableModel()}
            pagination={paginationConfig}
            rowKey="id"
            {...TABLE_PROPS(dataSource?.length ?? 0)}
            className="general-punishment-container-table-container"
          />
        </div>
      </div>
    </>
  );
};
export default ViewRoleDrawerContent;
