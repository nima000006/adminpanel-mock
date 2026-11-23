import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import { CustomInput, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { MAX_MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { CompleteFormStepProps } from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/helper/steps/CompleteFormStep/@types/@completeFormStepTypes";

const CompleteFormStep = ({ form }: CompleteFormStepProps) => {
  //? ================================  Api Calls ================================
  // branches
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getAllUniversity();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomAlert
        type="info"
        title="فرم درخواست سمت چیه؟"
        description="با تکمیل اطلاعات زیر، درخواست ایجاد سمت برای شما ثبت خواهد شد.
کارشناسان ما درخواست شما را در اسرع وقت بررسی می‌کنند و در صورت نیاز، تا زمان بروزرسانی اطلاعات شما در سامانه ساجد، دسترسی موقت برایتان ایجاد خواهند کرد."
        showIcon
      />

      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="personalCode"
              label="شماره پرسنلی"
              name="personalCode"
              placeholder="شماره پرسنلی خود را وارد نمایید."
              rules={[REQUIRED_RULE, MAX_MIN_LENGTH_RULE(6, 32)]}
              maxLength={100}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="branch"
              label="سازمان/ واحد محل فعالیت"
              options={universityData ? universityData : []}
              placeholder="انتخاب کنید"
              loading={isUniversityDataLoading}
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="محل خدمت"
              name="location"
              placeholder="محل خدمت خود را وارد نمایید."
              rules={[REQUIRED_RULE]}
              maxLength={100}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="سمت"
              name="position"
              placeholder="سمت خودرا در سازمان / واحد محل فعالیت وارد نمایید."
              rules={[REQUIRED_RULE]}
              maxLength={100}
            />
          </Col>

          <Col span={24}>
            <CustomTextArea label="توضیحات " name="description" />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CompleteFormStep;
