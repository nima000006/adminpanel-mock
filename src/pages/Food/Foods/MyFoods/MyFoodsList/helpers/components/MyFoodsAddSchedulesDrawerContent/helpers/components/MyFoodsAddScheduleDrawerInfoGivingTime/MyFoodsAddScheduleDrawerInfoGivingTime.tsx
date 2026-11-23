import { Col, FormInstance } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";

const MyFoodsAddScheduleDrawerInfoGivingTime = ({ form }: { form: FormInstance }) => {
  return (
    <>
      <Col lg={8} md={12} sm={12} xs={24}>
        <CustomTimePicker
          label="شروع تحویل (ساعت)"
          name="deliverStartTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={12} xs={24}>
        <CustomDatePicker
          label="شروع تحویل (تاریخ)"
          placeholder="انتخاب کنید"
          name="deliverStartDate"
          form={form}
          value={form.getFieldsValue()?.reserveDate}
          disabled
        />
      </Col>
      <Col lg={8} md={12} sm={12} xs={24}>
        <CustomTimePicker
          label="پایان تحویل (ساعت)"
          name="deliverEndTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={12} xs={24}>
        <CustomDatePicker
          label="پایان تحویل (تاریخ)"
          placeholder="انتخاب کنید"
          name="deliverEndDate"
          form={form}
          value={form.getFieldsValue()?.reserveDate}
          disabled
        />
      </Col>
    </>
  );
};
export default MyFoodsAddScheduleDrawerInfoGivingTime;
