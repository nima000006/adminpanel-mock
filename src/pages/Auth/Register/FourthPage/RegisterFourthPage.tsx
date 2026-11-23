import { Form } from "antd";
import moment from "jalali-moment";
import { PiArrowRight, PiCalendarBlank, PiFingerprint, PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import {
  REGISTER_FIFTH_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useRegisterStepFourthMutation } from "@infra/states/redux/Apis/auth/registerApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { FourthFormType } from "../@types/@authRegisterTypes";
import "./_registerFourthPage.scss";

const RegisterFourthPage = () => {
  const [form] = Form.useForm<FourthFormType>();
  const navigate = useNavigate();
  useRedirectIfStepInvalid(4, REGISTER_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [registerFourthStep, { isLoading: isRegisterFourthStepLoading }] =
    useRegisterStepFourthMutation();
  //* ================================ Util Functions ================================
  const handleSubmit = (values: FourthFormType) => {
    registerFourthStep({ birthDate: values.birthDate })
      .unwrap()
      .then((res) => {
        if (res.token) {
          setLocalStorage("tempInfo", res.token);
          navigate(REGISTER_FIFTH_PAGE_ROUTE);
          setLocalStorage("currentPage", "5");
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <AuthLayout
      bannerLeftSide={
        <LeftSideBannerItem
          icon={PiFingerprint}
          linkLabel="ورود به حساب کاربری"
          to={SIGN_IN_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="register-auth-fourth-page-container">
        <AuthTitle icon={PiUserPlus} label="ثبت نام" />
        <AuthStepper currentStep={4} itemCount={6} />
        <Form
          form={form}
          className="register-auth-fourth-page-form-container"
          onFinish={handleSubmit}
        >
          <CustomDatePicker
            suffixIcon={null}
            prefix={<PiCalendarBlank />}
            name="birthDate"
            label="تاریخ تولد"
            rules={[REQUIRED_RULE]}
            placeholder="تاریخ تولد خود را تعیین نمایید."
            onChange={(_, dateString) => {
              const singleDateString = Array.isArray(dateString)
                ? dateString[0]
                : dateString;

              if (singleDateString) {
                const gregorianDate = moment
                  .from(singleDateString, "fa", "YYYY-MM-DD")
                  .format("YYYY-MM-DD");
                form.setFieldsValue({ birthDate: gregorianDate });
              } else {
                form.setFieldsValue({ birthDate: undefined });
              }
            }}
            disabled={isRegisterFourthStepLoading}
          />
          <div className="auth-btn-container">
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isRegisterFourthStepLoading}
            >
              ثبت و ادامه
            </CustomButton>
            <CustomButton htmlType="submit" type="link">
              <Link className="auth-btn-container-a" to={REGISTER_FIRST_PAGE_ROUTE}>
                <PiArrowRight size={16} /> بازگشت
              </Link>
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default RegisterFourthPage;
