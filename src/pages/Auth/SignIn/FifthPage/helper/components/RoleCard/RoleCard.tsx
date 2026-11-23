import { useState } from "react";

import { Form, Popover, Radio } from "antd";
import { AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useCreateRoleMutation } from "@infra/states/redux/Apis/auth/signInApis";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { RoleCardProps } from "./@types/@roleCard";
import { ROLE_STATUS } from "../../../SignInFifthPage";
import RequestRoleDrawerContent from "./helper/drawer/RequestRoleDrawerContent/RequestRoleDrawerContent";
import ViewRoleDrawerContent from "./helper/drawer/ViewRoleDrawerContent/ViewRoleDrawerContent";
import RequestRoleModalContent from "./helper/modal/RequestRoleModalContent/RequestRoleModalContent";

import "./_roleCard.scss";

const RoleCard = ({
  title,
  personalNumber,
  popoverContent,
  isActive,
  value,
  branchName,
  id,
  segmentStatus,
  recordStatusId,
  requestId,
  getAdminStaff,
}: RoleCardProps) => {
  const [openViewRoleDrawer, setIsViewRoleOpenDrawer] = useState<boolean>(false);

  const [requestRoleDrawer, setIsRequestRoleOpenDrawer] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: -1 });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm<{ description: string; staff: SelectType<IdTitle> }>();

  //? ================================  Api Calls ================================
  // create role
  const [createRole, { isLoading: isCreateRoleLoading }] = useCreateRoleMutation();

  //* ================================ Util Functions ================================
  // display rules
  const viewRoleBtnHandler = () => {
    setIsViewRoleOpenDrawer(true);
  };

  const closeViewRoleDrawerHandler = () => {
    setIsViewRoleOpenDrawer(false);
  };

  // requests
  const requestBtnHandler = () => {
    setIsRequestRoleOpenDrawer({ id: -1, isOpen: true });
  };

  const closeRequestRoleDrawerHandler = () => {
    setIsRequestRoleOpenDrawer({ id: -1, isOpen: false });
  };

  // rule request
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const modalConfirmationHandler = () => {
    form.submit();

    form.validateFields().then((value) => {
      createRole({
        staffId: id,
        message: value?.description ? value?.description : "",
      })
        .unwrap()
        .then(createRoleIsSuccess);
    });
  };

  const createRoleIsSuccess = () => {
    closeModalHandler();
    getAdminStaff?.({ status: segmentStatus });
  };

  return (
    <>
      {/* VIEW ROLE DRAWER */}
      {openViewRoleDrawer && (
        <CustomDrawer
          open={openViewRoleDrawer}
          onClose={closeViewRoleDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewRoleDrawerContent
              closeDrawer={closeViewRoleDrawerHandler}
              title={title}
              personalNumber={personalNumber}
              branchName={branchName}
              id={id}
              segmentStatus={segmentStatus}
            />
          }
        />
      )}

      {/* REQUEST DRAWER */}
      {requestRoleDrawer?.isOpen && (
        <CustomDrawer
          open={requestRoleDrawer?.isOpen}
          onClose={closeRequestRoleDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <RequestRoleDrawerContent
              closeDrawer={closeRequestRoleDrawerHandler}
              title={title}
              personalNumber={personalNumber}
              branchName={branchName}
              id={id}
            />
          }
        />
      )}

      {/* REQUEST ROLE MODAL */}
      {isModalOpen && (
        <ConfirmationModalWithContent
          title="درخواست نقش"
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
              segmentStatus={segmentStatus}
            />
          }
          isConfirmButtonLoading={isCreateRoleLoading}
          showIcon={false}
        />
      )}

      <div
        className={`login-role-card-container ${isActive ? "active-login-role-card-container" : ""}`}
      >
        <div className="card-title">
          <h3 className="title">{dataPlaceHolder({ data: title })}</h3>

          {/* {segmentStatus !== ROLE_STATUS.noRole ? (
            <CustomTag
              color={segmentStatus === ROLE_STATUS.inactiveRole ? "red" : "green"}
            >
              {id === ROLE_STATUS.inactiveRole ? "غیر فعال" : "فعال"}
            </CustomTag>
          ) : (
            // 1 number means that active statement and else inactive statement
            <CustomTag color={recordStatusId === 1 ? "green" : "red"}>
              {recordStatusId === 1 ? " فعال" : "غیر فعال"}
            </CustomTag>
          )} */}

          <CustomTag color={recordStatusId === 1 ? "green" : "red"}>
            {recordStatusId === 1 ? "فعال" : "غیرفعال"}
          </CustomTag>
        </div>
        <Radio
          value={value}
          checked={segmentStatus === ROLE_STATUS.hasRole ? isActive : false}
          disabled={segmentStatus === ROLE_STATUS.hasRole ? false : true}
          className="role-radio"
        />
        <div>
          <div className="card-info">
            <span className="personal-no-title">شماره پرسنلی</span>
            <span className="personal-no">
              {dataPlaceHolder({ data: personalNumber })}
            </span>

            <Popover placement="top" content={popoverContent}>
              <AiOutlineExclamationCircle className="icon-class" />
            </Popover>
          </div>
          <div className="card-info">
            <span className="personal-no-title">واحد</span>
            <span className="personal-no">
              {dataPlaceHolder({
                data: branchName?.includes("واحد")
                  ? branchName?.replaceAll("واحد", "").trim()
                  : branchName,
              })}
            </span>
          </div>
        </div>

        {segmentStatus === ROLE_STATUS.hasRole ? (
          <div className="flex justify-between">
            <div className="card-action" onClick={viewRoleBtnHandler}>
              مشاهده نقش‌ها
            </div>
            <div className="card-action" onClick={requestBtnHandler}>
              درخواست‌ها
            </div>
          </div>
        ) : segmentStatus === ROLE_STATUS.noRole ? (
          <div className="flex justify-between">
            <CustomButton
              type="link"
              // if the role will not be equal to 1 (active), customer can not request new role
              disabled={recordStatusId != 1}
              onClick={openModalHandler}
            >
              درخواست نقش
            </CustomButton>

            {requestId && (
              <CustomButton type="link" onClick={requestBtnHandler}>
                درخواست‌ها
              </CustomButton>
            )}
          </div>
        ) : (
          <div className="card-action" onClick={requestBtnHandler}>
            درخواست‌ها
          </div>
        )}
      </div>
    </>
  );
};

export default RoleCard;
