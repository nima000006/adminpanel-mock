import { useEffect } from "react";

import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import {
  NUMBER_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_NO_SPACE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { workSpacesAdmissionBasicInfoStepInfoTypes } from "./types/@workSpacesAdmissionBasicInfoStepInfoTypes";

const WorkSpacesAdmissionBasicInfoStepInfo = ({
  form,
  schedule,
  setIsSchedule,
  canDebtState,
  setIsCanDebt,
  dataStates,
  handlers,
  setApplyingForAnother,
}: workSpacesAdmissionBasicInfoStepInfoTypes) => {
  const canDebtText = form.getFieldValue("canDebt");
  const timingType = form.getFieldValue("timingType");

  const applyingForAnotherText = form.getFieldValue("applyingForAnother");

  //? ================================ Effect ========================================
  useEffect(() => {
    if (canDebtText.label === "بله") {
      setIsCanDebt(1);
    }
    if (applyingForAnotherText.label === "بله") {
      setApplyingForAnother(1);
    }
    if (timingType.code === 2) {
      setIsSchedule("2");
    }
    if (timingType.code === 1) {
      setIsSchedule("1");
    }
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} md={6} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="عنوان"
          name="title"
          placeholder="عنوان"
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={6} md={6} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="عنوان نمایشی در اپلیکیشن"
          name="displayTitle"
          placeholder="عنوان نمایشی در اپلیکیشن"
          rules={[REQUIRED_NO_SPACE_RULE, PERSIAN_LETTERS_RULE]}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="uni"
          label="واحد دانشگاهی"
          placeholder="انتخاب کنید"
          form={form}
          options={dataStates.university.data ? dataStates.university.data : []}
          isLoading={dataStates.university.loading}
          onClick={handlers.getAllUniversity}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="managementType"
          label="نوع مدیریت"
          placeholder="انتخاب کنید"
          options={dataStates.managementType.data?.data}
          form={form}
          onClick={handlers.getManagementType}
          isLoading={dataStates.managementType.loading}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="timingType"
          label="نوع زمان‌بندی"
          options={dataStates.schedulingType.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.schedulingType.loading}
          onClick={handlers.getSchedulingType}
          onChange={handlers.scheduleTypeOnChange}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      {schedule === "2" && (
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomRangePicker
            label="ماه‌ها"
            name="month"
            picker="month"
            rules={schedule === "2" ? [REQUIRED_RULE] : []}
            form={form}
            onChange={handlers.handleRangePickerChange}
            disabled={schedule === "2" ? false : true}
          />
        </Col>
      )}

      {schedule === "1" && (
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="semester"
            label="نیم‌سال"
            options={
              dataStates?.semester?.data?.data ? dataStates?.semester?.data?.data : []
            }
            placeholder="انتخاب کنید"
            form={form}
            loading={dataStates?.semester?.loading}
            onClick={handlers?.getSemesterData}
            onChange={handlers?.handleTimePicker}
            rules={[REQUIRED_RULE]}
          />
        </Col>
      )}

      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="reservationType"
          label="نوع رزرو"
          options={dataStates.reservationType.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.reservationType.loading}
          onClick={handlers.getReservationType}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="paymentType"
          label="نوع پرداخت"
          options={dataStates.paymentType.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.paymentType.loading}
          onClick={handlers.getPaymentType}
          mode="multiple"
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="paymentMethod"
          label="شیوه پرداخت"
          options={dataStates.paymentMethod.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.paymentMethod.loading}
          onClick={handlers.getPaymentMethod}
          mode="multiple"
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="userGroup"
          label="گروه کاربری"
          options={dataStates.userGroup.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.userGroup.loading}
          onClick={handlers.getUserGroup}
          mode="multiple"
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="educationDegree"
          label="مقطع تحصیلی"
          options={dataStates.educationGrade?.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.educationGrade.loading}
          onClick={handlers.getEducationGrade}
          mode="multiple"
          rules={[REQUIRED_RULE]}
          skipFormOnChange={true}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="nationality"
          label="ملیت"
          options={dataStates.nationality?.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.nationality.loading}
          onClick={handlers.getNationality}
          mode="multiple"
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomSelect
          name="specialConditions"
          label="شرایط خاص"
          options={dataStates.specialStatus?.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.specialStatus.loading}
          onClick={handlers.getSpecialStatus}
          mode="multiple"
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="applyingForAnother"
          label="امکان درخواست برای دیگری"
          options={dataStates.feasibility?.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.feasibility.loading}
          onClick={handlers.getFeasibility}
          onChange={handlers.applyingForAnotherChange}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="canDebt"
          label="امکان بدهی"
          options={dataStates.feasibility?.data?.data}
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.feasibility.loading}
          onClick={handlers.getFeasibility}
          onChange={handlers.canDebtOnChange}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomInputNumber
          type="text"
          label="سقف بدهی (ریال)"
          name="maxDebt"
          placeholder="سقف بدهی (ریال)"
          disabled={canDebtState === 1 ? false : true}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="حداکثر تعداد اقساط جهت بدهی"
          name="installmentMaxNumber"
          placeholder="حداکثر تعداد اقساط جهت بدهی"
          rules={[NUMBER_RULE]}
          disabled={canDebtState === 1 ? false : true}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="applicationReviewDeadline"
          label="مهلت بررسی درخواست"
          options={
            dataStates.applicationReviewDeadline.data
              ? dataStates.applicationReviewDeadline?.data?.data.map((item) => ({
                  id: item.id,
                  title: `${item.title?.toString()} روز`,
                }))
              : []
          }
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.applicationReviewDeadline.loading}
          onClick={handlers.getApplicationReviewDeadline}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={6} md={12} sm={24} xs={24}>
        <CustomSelect
          name="paymentDeadline"
          label="مهلت پرداخت"
          options={
            dataStates.paymentDeadline.data
              ? dataStates.paymentDeadline.data.data?.map((item) => ({
                  id: item.id,
                  title: `${item.title?.toString()} روز`,
                }))
              : []
          }
          placeholder="انتخاب کنید"
          form={form}
          loading={dataStates.paymentDeadline.loading}
          onClick={handlers.getPaymentDeadline}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
      </Col>
    </Row>
  );
};
export default WorkSpacesAdmissionBasicInfoStepInfo;
