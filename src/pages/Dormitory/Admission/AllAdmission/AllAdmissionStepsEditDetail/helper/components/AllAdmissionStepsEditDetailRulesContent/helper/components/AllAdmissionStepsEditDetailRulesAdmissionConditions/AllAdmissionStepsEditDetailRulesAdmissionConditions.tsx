import { Col, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";
import { AllAdmissionStepsEditDetailRulesAdmissionConditionsProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/helper/components/AllAdmissionStepsEditDetailRulesAdmissionConditions/@types/@allAdmissionStepsEditDetailRulesAdmissionConditions";
import {
  BRANCH_OPTIONS,
  BUSINESS_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  hasInitialAdditionalRestrictions,
  MAJOR_OPTIONS,
  NATIONALITY_OPTIONS,
  USER_GROUP_OPTIONS,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/helper/util";

const AllAdmissionStepsEditDetailRulesAdmissionConditions = ({
  form,
}: AllAdmissionStepsEditDetailRulesAdmissionConditionsProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CustomDivider text="شرایط پذیرش" />

      <Row gutter={[16, 16]}>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="agreementBusiness"
            label="کسب و کار (تفاهمی)"
            form={form}
            mode="multiple"
            options={BUSINESS_OPTIONS}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="agreementBranches"
            label="شعبه / واحد کاربر  (تفاهمی)"
            form={form}
            mode="multiple"
            options={BRANCH_OPTIONS}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="admissionGender"
            label="جنسیت پذیرش"
            form={form}
            options={GENDER_OPTIONS}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>

      <AdmissionSwitchAlert
        question="آیا میخواهید محدودیت های بیشتری برای شرایط پذیرش اعمال نمایید؟"
        description="با فعال کردن این گزینه، فقط کاربران انتخاب‌شده و واجد شرایط می‌توانند ظرفیت‌های این برنامه پذیرش را رزرو کنند."
        valuePropName="hasAdditionalRestrictions"
        defaultChecked={hasInitialAdditionalRestrictions}
      />

      <Row gutter={[16, 16]}>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="userGroup"
            label="گروه کاربری"
            form={form}
            mode="multiple"
            options={USER_GROUP_OPTIONS}
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </Col>

        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name="nationality"
            label="ملیت"
            form={form}
            options={NATIONALITY_OPTIONS}
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>

      <CustomDivider />

      <CustomSelect
        name="educationLevels"
        label="مقطع تحصیلی"
        form={form}
        mode="multiple"
        options={EDUCATION_LEVEL_OPTIONS}
        placeholder="انتخاب کنید"
      />

      <CustomSelect
        name="majors"
        label="رشته تحصیلی"
        form={form}
        mode="multiple"
        options={MAJOR_OPTIONS}
        placeholder="انتخاب کنید"
      />
    </>
  );
};

export default AllAdmissionStepsEditDetailRulesAdmissionConditions;
