import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import {
  PiAtDuotone,
  PiDeviceMobileSpeakerDuotone,
  PiPasswordDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { toast } from "react-toastify";

import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  useChangeMobileNumberMutation,
  useChangePasswordMutation,
  useRegisterEmailMutation,
  useSendEmailMutation,
  useUpdateMobileNumberMutation,
} from "@infra/states/redux/Apis/auth/profileApis";
import {
  SUCCESS_EMAIL_MESSAGE,
  SUCCESS_PASSWORD_MESSAGE,
  USER_MOBILE_SUCCESSFULLY,
} from "@infra/VARS/globalToasts/globalToasts";

import { FormTypeModal } from "./@types/@profile";
import ProfileCards from "./helper/components/ProfileCards/ProfileCards";
import UserAccountInfoDrawerContent from "./helper/drawer/UserAccountInfoDrawerContent/UserAccountInfoDrawerContent";
import { formChangePassword } from "./helper/modal/ChangePassword/SubmitChangePasswordModalContent/@types/@submitChangePasswordModalContent";
import SubmitChangePasswordModalContent from "./helper/modal/ChangePassword/SubmitChangePasswordModalContent/SubmitChangePasswordModalContent";
import ChangeEmailModalContent from "./helper/modal/Email/ChangeEmailModalContent/ChangeEmailModalContent";
import SubmitEmailModalContent from "./helper/modal/Email/SubmitEmailModalContent/SubmitEmailModalContent";
import EditMobileNumberModalContent from "./helper/modal/MobileNumber/EditMobileNumberModalContent/EditMobileNumberModalContent";
import SubmitMobileModalContent from "./helper/modal/MobileNumber/SubmitMobileModalContent/SubmitMobileModalContent";
import UserInfoProvider from "./State/UserInfoContext";
import "./_profile.scss";

const ALL_RULES_DID_NOT_PASS = "رمز عبور با شروط مورد نظر هم خوانی ندارد.";

const Profile = () => {
  // userInfo state
  const [openUserInfoDrawer, setIsOpenUserInfoDrawer] = useState(false);

  // email state
  const [openEmailModal, setIsOpenEmailModal] = useState(false);
  const [openRegisterEmailModal, setIsOpenRegisterEmailModal] = useState(false);
  const [changeEmailCurrentStep, setChangeEmailCurrentStep] = useState(0);

  // mobile state
  const [openMobileModal, setIsOpenMobileModal] = useState(false);
  const [openRegisterMobileModal, setIsOpenRegisterMobileModal] = useState(false);
  const [changeMobileCurrentStep, setChangeMobileCurrentStep] = useState(0);
  const [pendingMobile, setPendingMobile] = useState<string>("");

  // change password state
  const [openChangePasswordModal, setIsOpenChangePasswordModal] = useState(false);
  const [changePasswordCurrentStep, setChangePasswordCurrentStep] = useState(0);
  const [pendingOldPassword, setPendingOldPassword] = useState<string>("");
  const [isAllRulesPassed, setIsAllRulesPassed] = useState(false);

  const [activeCard, setActiveCard] = useState<string>("");

  const [emailForm] = Form.useForm<FormTypeModal>();
  const [mobileForm] = Form.useForm<FormTypeModal>();
  const [passwordForm] = Form.useForm<formChangePassword>();

  useTitle({ text: "پروفایل" });

  //? ================================  Api Calls ================================
  //send email step 1
  const [sendEmail, { isLoading: isSendEmailLoading }] = useSendEmailMutation();

  // register email step 2
  const [sendOtpEmail, { isLoading: isSendOtpEmailLoading }] = useRegisterEmailMutation();

  // send chang mobile step 1
  const [changeMobileNumber, { isLoading: isChangeMobileLoading }] =
    useChangeMobileNumberMutation();

  // update mobile step 2
  const [registerNewMobile, { isLoading: isRegisterNewMobileLoading }] =
    useUpdateMobileNumberMutation();

  // change password
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    const isAnyOverlayOpen =
      openUserInfoDrawer ||
      openEmailModal ||
      openRegisterEmailModal ||
      openMobileModal ||
      openRegisterMobileModal ||
      openChangePasswordModal;

    if (!isAnyOverlayOpen) {
      setActiveCard("");
    }
  }, [
    openUserInfoDrawer,
    openEmailModal,
    openRegisterEmailModal,
    openMobileModal,
    openRegisterMobileModal,
    openChangePasswordModal,
  ]);
  //* ================================ Util Functions ================================

  // تایید ایمیل
  const confirmSubmitEmailHandler = async () => {
    const values = await emailForm.validateFields();

    await sendEmail({ email: values?.email ?? "" })
      .unwrap()
      .then(sendEmailIsSuccess);
  };

  const sendEmailIsSuccess = () => {
    if (changeEmailCurrentStep === 0) {
      setChangeEmailCurrentStep(changeEmailCurrentStep + 1);
    }
  };

  //  تایید ایمیل otp
  const confirmSubmitOtpHandler = async () => {
    emailForm.validateFields().then(() => {
      const data = emailForm.getFieldsValue(true);

      sendOtpEmail({ email: data?.email, otpCode: data?.otp })
        .unwrap()
        .then(sendOtpEmailIsSuccess);
    });
  };

  const sendOtpEmailIsSuccess = () => {
    toast.success(SUCCESS_EMAIL_MESSAGE, { toastId: SUCCESS_EMAIL_MESSAGE });
    setIsOpenRegisterEmailModal(false);
    setChangeEmailCurrentStep(0);
  };

  // تایید موبایل
  const confirmSubmitMobileHandler = async () => {
    const values = await mobileForm.validateFields();
    setPendingMobile(values?.mobile ? values?.mobile : "");

    await changeMobileNumber({ mobileNumber: values?.mobile ?? "" })
      .unwrap()
      .then(sendMobileIsSuccess);
  };

  const sendMobileIsSuccess = () => {
    if (changeMobileCurrentStep === 0) {
      setChangeMobileCurrentStep(changeMobileCurrentStep + 1);
    }
  };

  // تایید otp موبایل
  const confirmSubmitMobileOtpHandler = async () => {
    const values = await mobileForm.validateFields();

    await registerNewMobile({
      mobileNumber: pendingMobile,
      otpCode: values?.otp,
    })
      .unwrap()
      .then(registerNewMobileIsSuccess);
  };

  const registerNewMobileIsSuccess = () => {
    toast.success(USER_MOBILE_SUCCESSFULLY, { toastId: USER_MOBILE_SUCCESSFULLY });
    setIsOpenRegisterMobileModal(false);
    setChangeMobileCurrentStep(0);

    setPendingMobile("");
  };

  //action handler
  const userAccountInfoHandler = () => {
    setIsOpenUserInfoDrawer(true);
  };
  const emailInfoHandler = () => {
    setIsOpenEmailModal(true);
  };
  const mobileNumberHandler = () => {
    setIsOpenMobileModal(true);
  };
  const passwordHandler = () => {
    setIsOpenChangePasswordModal(true);
  };

  //drawer handler
  const closeUserInfoDrawerHandler = () => {
    setIsOpenUserInfoDrawer(false);
  };

  //edit email modal handler
  const closeEditEmailModalHandler = () => {
    setIsOpenEmailModal(false);
  };

  const closeRegisterModelHandler = () => {
    if (changeEmailCurrentStep === 0) {
      setIsOpenRegisterEmailModal(false);
      emailForm.resetFields();
    } else {
      setChangeEmailCurrentStep(0);
    }
  };

  const confirmEditEmailModalHandler = () => {
    setIsOpenEmailModal(false);
    setIsOpenRegisterEmailModal(true);
  };

  // edit mobile number handler
  const closeEditMobileModalHandler = () => {
    setIsOpenMobileModal(false);
  };

  const confirmEditMobileModalHandler = () => {
    setIsOpenRegisterMobileModal(true);
    setIsOpenMobileModal(false);
  };

  const closeRegisterMobileModelHandler = () => {
    if (changeMobileCurrentStep === 0) {
      setIsOpenRegisterMobileModal(false);
    } else {
      setChangeMobileCurrentStep(0);
    }

    mobileForm?.setFieldsValue({ mobile: "" });
  };

  // change password handler
  const confirmChangePasswordFirstStepHandler = () => {
    if (changePasswordCurrentStep === 0) {
      passwordForm.submit();
      passwordForm.validateFields().then((values) => {
        setPendingOldPassword(values?.password);
        setChangePasswordCurrentStep(changePasswordCurrentStep + 1);
      });
    }
  };

  const onPasswordRulesPassed = (passValue: boolean) => {
    if (passValue) {
      setIsAllRulesPassed(passValue);
    }
  };

  const confirmChangePasswordSecondStepHandler = async () => {
    if (isAllRulesPassed) {
      const values = await passwordForm.validateFields();
      await changePassword({
        password: values?.newPassword,
        confirmPassword: values?.confirmPassword,
        oldPassword: pendingOldPassword,
      })
        .unwrap()
        .then(changePasswordIsSuccess);
    } else {
      toast.warning(ALL_RULES_DID_NOT_PASS, { toastId: ALL_RULES_DID_NOT_PASS });
    }
  };

  const changePasswordIsSuccess = () => {
    toast.success(SUCCESS_PASSWORD_MESSAGE, { toastId: SUCCESS_PASSWORD_MESSAGE });
    setIsOpenChangePasswordModal(false);
    setPendingOldPassword("");
  };

  const closeChangePasswordModelHandler = () => {
    if (changePasswordCurrentStep === 0) {
      setIsOpenChangePasswordModal(false);
    } else {
      setChangePasswordCurrentStep(0);
    }
    passwordForm?.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <UserInfoProvider>
      {/* USER ACCOUNT INFO DRAWER */}
      {openUserInfoDrawer && (
        <CustomDrawer
          onClose={closeUserInfoDrawerHandler}
          open={openUserInfoDrawer}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <UserAccountInfoDrawerContent
              setIsOpenUserInfoDrawer={setIsOpenUserInfoDrawer}
            />
          }
        />
      )}
      {/* EMAIL READY ONLY MODE */}
      {openEmailModal && (
        <ConfirmationModalWithContent
          title="ایمیل"
          isModalOpen={openEmailModal}
          confirmBtnText="تغییر ایمیل"
          backBtnText="انصراف"
          closeModalHandler={closeEditEmailModalHandler}
          onConfirmClickHandler={confirmEditEmailModalHandler}
          content={<ChangeEmailModalContent />}
          showIcon={false}
        />
      )}
      {/* EMAIL CHANGE MODE */}
      {openRegisterEmailModal && (
        <ConfirmationModalWithContent
          title="ایمیل"
          isModalOpen={openRegisterEmailModal}
          confirmBtnText={changeEmailCurrentStep === 0 ? "ثبت و ادامه" : "تایید و ثبت"}
          backBtnText={changeEmailCurrentStep === 0 ? "انصراف" : "بازگشت"}
          isConfirmButtonLoading={
            changeEmailCurrentStep === 0 ? isSendEmailLoading : isSendOtpEmailLoading
          }
          closeModalHandler={closeRegisterModelHandler}
          onConfirmClickHandler={
            changeEmailCurrentStep === 0
              ? confirmSubmitEmailHandler
              : confirmSubmitOtpHandler
          }
          content={
            <Form form={emailForm}>
              <SubmitEmailModalContent
                current={changeEmailCurrentStep}
                form={emailForm}
              />
            </Form>
          }
          showIcon={false}
        />
      )}
      {/* MOBILE READY ONLY MODE */}
      {openMobileModal && (
        <ConfirmationModalWithContent
          title="شماره همراه"
          isModalOpen={openMobileModal}
          confirmBtnText="ویرایش شماره همراه"
          backBtnText="انصراف"
          closeModalHandler={closeEditMobileModalHandler}
          onConfirmClickHandler={confirmEditMobileModalHandler}
          content={<EditMobileNumberModalContent />}
          showIcon={false}
        />
      )}
      {/* MOBILE CHANGE MODE */}
      {openRegisterMobileModal && (
        <ConfirmationModalWithContent
          title="شماره همراه"
          isModalOpen={openRegisterMobileModal}
          confirmBtnText={changeMobileCurrentStep === 0 ? "ثبت و ادامه" : "تایید و ثبت"}
          backBtnText={changeMobileCurrentStep === 0 ? "انصراف" : "بازگشت"}
          isConfirmButtonLoading={
            changeMobileCurrentStep === 0
              ? isChangeMobileLoading
              : isRegisterNewMobileLoading
          }
          closeModalHandler={closeRegisterMobileModelHandler}
          onConfirmClickHandler={
            changeMobileCurrentStep === 0
              ? confirmSubmitMobileHandler
              : confirmSubmitMobileOtpHandler
          }
          content={
            <Form form={mobileForm}>
              <SubmitMobileModalContent
                current={changeMobileCurrentStep}
                form={mobileForm}
              />
            </Form>
          }
          showIcon={false}
        />
      )}
      {/* CHANGE PASSWORD */}
      {openChangePasswordModal && (
        <ConfirmationModalWithContent
          title="رمز عبور"
          isModalOpen={openChangePasswordModal}
          confirmBtnText={
            changePasswordCurrentStep === 0 ? "تایید رمز عبور" : "تغییر رمز عبور"
          }
          backBtnText={changePasswordCurrentStep === 0 ? "انصراف" : "بازگشت"}
          isConfirmButtonLoading={
            changePasswordCurrentStep === 1 ? isChangePasswordLoading : undefined
          }
          closeModalHandler={closeChangePasswordModelHandler}
          onConfirmClickHandler={
            changePasswordCurrentStep === 0
              ? confirmChangePasswordFirstStepHandler
              : confirmChangePasswordSecondStepHandler
          }
          content={
            <Form form={passwordForm}>
              <SubmitChangePasswordModalContent
                current={changePasswordCurrentStep}
                form={passwordForm}
                onPasswordRulesPassed={onPasswordRulesPassed}
              />
            </Form>
          }
          showIcon={false}
        />
      )}

      <div className="top-bar-profile-wrapper">
        <ProfileCards
          title="اطلاعات حساب کاربری"
          icon={PiUserDuotone}
          onClick={() => {
            setActiveCard("user");
            userAccountInfoHandler();
          }}
          active={activeCard === "user"}
        />
        <ProfileCards
          title="ایمیل"
          icon={PiAtDuotone}
          onClick={() => {
            setActiveCard("email");
            emailInfoHandler();
          }}
          active={activeCard === "email"}
        />
        <ProfileCards
          title="شماره همراه"
          icon={PiDeviceMobileSpeakerDuotone}
          onClick={() => {
            setActiveCard("mobile");
            mobileNumberHandler();
          }}
          active={activeCard === "mobile"}
        />
        <ProfileCards
          title="رمز عبور"
          icon={PiPasswordDuotone}
          onClick={() => {
            setActiveCard("password");
            passwordHandler();
          }}
          active={activeCard === "password"}
        />
      </div>
    </UserInfoProvider>
  );
};
export default Profile;
