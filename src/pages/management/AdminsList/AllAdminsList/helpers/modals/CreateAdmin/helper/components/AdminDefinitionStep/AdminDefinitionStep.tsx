import { useEffect, useMemo, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Col, Form, FormInstance, Row } from "antd";
import { PiPassword } from "react-icons/pi";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  EMAIL_RULE,
  MOBILE_RULE,
  NATIONAL_CODE_RULE,
  NO_PERSIAN_ARABIC_ALL_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import PasswordValidationRules from "@pages/Auth/_shared/components/PasswordValidation/PasswordValidation";
import { validatePasswordRules } from "@pages/Auth/_shared/utils";
import { forgetPasswordTexts as texts } from "@pages/Auth/_shared/utils";
import { CreateAdminFormType } from "@pages/management/AdminsList/AllAdminsList/@types/@managementsUserAllAdminListTypes";

const AdminDefinitionStep = ({
  form,
  onPasswordRulesPassed,
}: {
  form: FormInstance<CreateAdminFormType>;
  onPasswordRulesPassed: (passValue: boolean) => void;
}) => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const password = Form.useWatch("password", form);
  const confirmPassword = Form.useWatch("confirmPassword", form);

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //* ================================ Util Functions ================================
  // Extracted validation logic
  const passwordRulesStatus = useMemo(() => {
    const shouldValidate = passwordTouched || confirmPasswordTouched;
    return shouldValidate
      ? validatePasswordRules(password, confirmPassword)
      : {
          length: false,
          englishOnly: false,
          hasUpper: false,
          hasLower: false,
          hasNumber: false,
          hasSpecial: false,
          match: false,
        };
  }, [password, confirmPassword, passwordTouched, confirmPasswordTouched]);

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    return () => {
      setPasswordTouched(false);
      setConfirmPasswordTouched(false);
    };
  }, []);

  useEffect(() => {
    if (onPasswordRulesPassed) {
      const allPassed = Object.values(passwordRulesStatus).every(Boolean);
      onPasswordRulesPassed(allPassed);
    }
  }, [passwordRulesStatus, onPasswordRulesPassed]);

  //* ================================ Util Functions ================================
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowPassword(e.target.checked);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="شماره موبایل"
          name="phone"
          placeholder="شماره موبایل را وارد نمایید."
          rules={[REQUIRED_RULE, MOBILE_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="کد ملی"
          name="username"
          placeholder="کد ملی را وارد نمایید."
          rules={[REQUIRED_RULE, NATIONAL_CODE_RULE]}
          autoComplete="new-username"
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="کد پرسنلی"
          name="personnelCode"
          placeholder="کد پرسنلی را وارد نمایید."
          rules={[REQUIRED_RULE, NUMBER_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="ایمیل"
          name="email"
          placeholder="ایمیل را وارد نمایید."
          rules={[REQUIRED_RULE, EMAIL_RULE, NO_PERSIAN_ARABIC_ALL_RULE]}
        />
      </Col>

      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomDatePicker
          label="تاریخ تولد"
          placeholder="انتخاب کنید"
          name="birthdate"
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomSelect
          name="branch"
          label="واحد دانشگاهی"
          options={universityData ? universityData : []}
          isLoading={isUniversityDataLoading}
          placeholder="انتخاب کنید"
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="سمت"
          name="adminRole"
          placeholder="سمت را وارد نمایید."
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomDatePicker
          label="تاریخ شروع استخدام"
          placeholder="انتخاب کنید"
          name="hireDate"
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomDatePicker
          label="تاریخ پایان استخدام"
          placeholder="انتخاب کنید"
          name="terminationDate"
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="رمز عبور"
          name="password"
          prefix={<PiPassword />}
          rules={[REQUIRED_RULE]}
          type={showPassword ? "text" : "password"}
          onInput={() => setPasswordTouched(true)}
          autoComplete="new-password"
        />
      </Col>
      <Col lg={8} md={8} sm={12} xs={24}>
        <CustomInput
          label="تکرار رمز عبور"
          name="confirmPassword"
          prefix={<PiPassword />}
          rules={[REQUIRED_RULE]}
          type={showPassword ? "text" : "password"}
          onInput={() => setConfirmPasswordTouched(true)}
        />
      </Col>
      <Col span={24}>
        <Checkbox onChange={handleCheckboxChange} checked={showPassword}>
          نمایش رمزعبور
        </Checkbox>
      </Col>
      <Col span={24}>
        <PasswordValidationRules
          rulesStatus={passwordRulesStatus}
          messages={texts.validationMessages}
          isTouched={passwordTouched || confirmPasswordTouched}
        />
      </Col>
    </Row>
  );
};

export default AdminDefinitionStep;
