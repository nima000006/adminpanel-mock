import { useEffect } from "react";

import { Form } from "antd";
import {
  PiArrowsClockwiseBold,
  PiFingerprint,
  PiUserPlus,
  PiUserThin,
} from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  CHANGE_NUMBER_SECOND_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useChangeNumberFirstPageMutation } from "@infra/states/redux/Apis/auth/changeNumberApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LabelCard from "@pages/Auth/_shared/components/LabelCard/LabelCard";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";

import {
  AuthChangeNumberFirstStepResponse,
  ChangeNumberFirstPageFormType,
} from "./@types/@changeNumberFirstPage";
import "./_changeNumberFirstPage.scss";

const ChangeNumberFirstPage = () => {
  const [form] = Form.useForm<ChangeNumberFirstPageFormType>();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [sendUserName, { isLoading: isSendUserNameLoading }] =
    useChangeNumberFirstPageMutation();
  //? ================================  Effects ================================
  useEffect(() => {
    removeFromStorage("tempInfo");
    setLocalStorage("currentPage", "1");
  }, []);
  //* ================================ Util Functions ================================

  const registerHandler = (value: ChangeNumberFirstPageFormType) => {
    sendUserName({
      username: value?.userName,
    })
      .unwrap()
      .then(sendUserNameIsSuccess);
  };

  const sendUserNameIsSuccess = (res: AuthChangeNumberFirstStepResponse) => {
    if (res?.token) {
      setLocalStorage("tempInfo", res?.token);
      navigate(CHANGE_NUMBER_SECOND_PAGE_ROUTE);
      setLocalStorage("currentPage", "2");
    }
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
      <div className="auth-change-number-first-page-container">
        <div className="auth-change-number-title-wrapper">
          <AuthTitle icon={PiArrowsClockwiseBold} label="تغییر شماره همراه" />
          <AuthStepper itemCount={3} currentStep={1} />
        </div>
        <Form
          form={form}
          onFinish={registerHandler}
          className="change-number-form-content-container"
        >
          <section className="content-wrapper">
            <CustomInput
              prefix={<PiUserThin />}
              type="text"
              label="نام کاربری"
              name="userName"
              placeholder="کد ملی خود را وارد نمایید."
              rules={[REQUIRED_RULE]}
              disabled={isSendUserNameLoading}
            />

            <LabelCard
              title="به شماره همراه خود دسترسی دارید؟"
              linkLabel="ورود به حساب کاربری"
              to={SIGN_IN_FIRST_PAGE_ROUTE}
              prefix={<PiFingerprint />}
              className="label-card"
            />
          </section>

          <CustomButton
            type="primary"
            iconPlacement="end"
            htmlType="submit"
            loading={isSendUserNameLoading}
          >
            ثبت و ادامه
          </CustomButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ChangeNumberFirstPage;
