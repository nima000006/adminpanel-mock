import { Form } from "antd";
import {
  PiArrowRight,
  PiArrowsClockwiseBold,
  PiDeviceMobileCameraLight,
  PiUserPlus,
} from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  CHANGE_NUMBER_FIRST_PAGE_ROUTE,
  CHANGE_NUMBER_THIRD_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useChangeNumberSecondPageMutation } from "@infra/states/redux/Apis/auth/changeNumberApis";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import {
  AuthChangeNumberSecondStepResponse,
  ChangeNumberSecondPageFormType,
} from "./@types/@changeNumberSecondPage";
import "./_changeNumberSecondPage.scss";

const ChangeNumberSecondPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ChangeNumberSecondPageFormType>();
  useRedirectIfStepInvalid(2, CHANGE_NUMBER_FIRST_PAGE_ROUTE);

  //? ================================  Api Calls ================================
  const [sendMobileNumber, { isLoading: isSendMobileNumberLoading }] =
    useChangeNumberSecondPageMutation();

  //* ================================ Util Functions ================================
  const registerHandler = (value: ChangeNumberSecondPageFormType) => {
    sendMobileNumber({
      mobileNumber: value?.newPhone,
    })
      .unwrap()
      .then((res) => sendMobileNumberIsSuccess(res, value));
  };

  const sendMobileNumberIsSuccess = (
    res: AuthChangeNumberSecondStepResponse,
    value: ChangeNumberSecondPageFormType
  ) => {
    if (res?.token) {
      setLocalStorage("tempInfo", res?.token);
      navigate({
        pathname: CHANGE_NUMBER_THIRD_PAGE_ROUTE,
        search: makeSearchParams({
          mobile: value?.newPhone,
        }),
      });
      setLocalStorage("currentPage", "3");
    }
  };

  const backHandler = () => {
    navigate(CHANGE_NUMBER_FIRST_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AuthLayout
      bannerLeftSide={
        <LeftSideBannerItem
          icon={PiUserPlus}
          linkLabel="ایجاد حساب"
          to={REGISTER_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="auth-change-number-second-page-container">
        <div className="auth-change-number-title-wrapper">
          <AuthTitle icon={PiArrowsClockwiseBold} label="تغییر شماره همراه" />
          <AuthStepper itemCount={3} currentStep={2} />
        </div>
        <Form
          form={form}
          onFinish={registerHandler}
          className="change-number-form-content-container"
        >
          <CustomInput
            prefix={<PiDeviceMobileCameraLight />}
            type="text"
            label="شماره همراه جدید"
            name="newPhone"
            placeholder="شماره همراه جدید خود را وارد نمایید"
            rules={[REQUIRED_RULE, NUMBER_RULE]}
            disabled={isSendMobileNumberLoading}
          />

          <div className="btn-wrapper">
            <CustomButton
              type="primary"
              iconPlacement="end"
              htmlType="submit"
              loading={isSendMobileNumberLoading}
            >
              ثبت و ادامه
            </CustomButton>
            <CustomButton
              type="primary"
              ghost
              onClick={backHandler}
              icon={<PiArrowRight size={16} />}
              iconPlacement="start"
            >
              بازگشت
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ChangeNumberSecondPage;
