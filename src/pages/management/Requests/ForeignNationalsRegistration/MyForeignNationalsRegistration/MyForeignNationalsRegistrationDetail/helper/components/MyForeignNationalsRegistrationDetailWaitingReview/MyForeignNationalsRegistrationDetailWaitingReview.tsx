import { useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ESTELAM_TYPE } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { MyEstelamRejectDrawerContentFormType } from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/@types/@myForeignNationalsRegistrationDetailWaitingReviewTypes";
import MyEstelamInfo from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/helper/components/MyEstelamInfo/MyEstelamInfo";
import MyEstelamRejectDrawerContent from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/helper/drawer/MyEstelamRejectDrawerContent/MyEstelamRejectDrawerContent";

const MyForeignNationalsRegistrationDetailWaitingReview = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isClickEstelam, setIsClickEstelam] = useState(false);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState(false);
  const [isRejectDrawerOpen, setIsRejectDrawerOpen] = useState(false);

  const [rejectForm] = Form.useForm<MyEstelamRejectDrawerContentFormType>();

  const activeKey = url?.tab || "1";

  //* ================================ Util Functions ================================
  const estelamAmoozeshyarHandler = () => {
    setIsClickEstelam(true);
  };

  // Accept
  const openConfirmedModalHandler = () => setIsConfirmedModalOpen(true);
  const closeConfirmedModalHandler = () => setIsConfirmedModalOpen(false);
  const acceptRequestHandler = () => setIsConfirmedModalOpen(false);

  //Reject
  const openRejectDrawerHandler = () => setIsRejectDrawerOpen(true);

  const closeRejectDrawerHandler = () => {
    setIsRejectDrawerOpen(false);
    // rejectForm.resetFields();
  };

  // ItemTabs
  const tabItems = [
    {
      label: "اطلاعات هویتی",
      children: <MyEstelamInfo tab={ESTELAM_TYPE.IDENTITY_INFO} />,
      key: ESTELAM_TYPE.IDENTITY_INFO,
    },
    {
      label: "اطلاعات تحصیلی",
      children: <MyEstelamInfo tab={ESTELAM_TYPE.EDUCATIONAL_INFO} />,
      key: ESTELAM_TYPE.EDUCATIONAL_INFO,
    },
    {
      label: "اطلاعات تماسی",
      children: <MyEstelamInfo tab={ESTELAM_TYPE.CONTACT_INFO} />,
      key: ESTELAM_TYPE.CONTACT_INFO,
    },
    {
      label: "عملکرد تحصیلی",
      children: <MyEstelamInfo tab={ESTELAM_TYPE.ACADEMIC_PERFORMANCE} />,
      key: ESTELAM_TYPE.ACADEMIC_PERFORMANCE,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ACCEPT MODAL */}
      {isConfirmedModalOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmedModalOpen}
          closeModalHandler={closeConfirmedModalHandler}
          onConfirmClickHandler={acceptRequestHandler}
          confirmBtnText="تایید درخواست"
          backBtnText="انصراف"
          title="آیا از تأیید درخواست اطمینان کافی دارید؟"
          isConfirmButtonLoading={false}
          content={
            <p className="">
              در صورت تأیید این درخواست، ثبت نام کاربر در سامانه انجام می‌شود
            </p>
          }
        />
      )}

      {/* REJECT DRAWER */}
      {isRejectDrawerOpen && (
        <CustomDrawer
          onClose={closeRejectDrawerHandler}
          open={isRejectDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyEstelamRejectDrawerContent
              closeDrawerHandler={closeRejectDrawerHandler}
              form={rejectForm}
            />
          }
        />
      )}
      <div className="mt-10">
        <CustomDivider
          text="استعلام آموزشیار"
          extraContent={
            <CustomTag
              color={"default"}
              onClick={estelamAmoozeshyarHandler}
              className="cursor-pointer"
            >
              استعلام آموزشیار
            </CustomTag>
          }
        />
        {!isClickEstelam ? (
          <CustomEmpty description="برای رد یا تأیید درخواست، روی «استعلام آموزشیار» کلیک کنید." />
        ) : (
          <CustomTabs
            items={tabItems}
            onChange={(e) => {
              setSearchParams({ ...url, tab: e });
            }}
            activeKey={activeKey}
            type="line"
          />
        )}
        <div className="mt-10 flex justify-end gap-2">
          <CustomButton
            type="primary"
            danger
            onClick={openRejectDrawerHandler}
            disabled={!isClickEstelam}
          >
            رد درخواست
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={openConfirmedModalHandler}
            disabled={!isClickEstelam}
          >
            تایید درخواست
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default MyForeignNationalsRegistrationDetailWaitingReview;
