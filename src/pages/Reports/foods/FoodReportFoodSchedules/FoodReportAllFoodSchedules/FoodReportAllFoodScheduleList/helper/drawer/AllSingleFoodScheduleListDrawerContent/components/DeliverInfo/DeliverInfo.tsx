import { Col, FormInstance, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";

import { SingleFoodScheduleFormData } from "../../@types/@allSingleFoodScheduleListDrawerContent";

const DeliverInfo = ({ form }: { form: FormInstance<SingleFoodScheduleFormData> }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CustomDivider text="اطلاعات زمان تحویل" />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="شروع تحویل (ساعت)"
          name="deliverStartTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="شروع تحویل (تاریخ)"
          placeholder="انتخاب کنید"
          name="deliverStartDate"
          form={form}
          value={form.getFieldsValue()?.reserveDate}
          disabled
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="پایان تحویل (ساعت)"
          name="deliverEndTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="پایان تحویل (تاریخ)"
          placeholder="انتخاب کنید"
          name="deliverEndDate"
          form={form}
          value={form.getFieldsValue()?.reserveDate}
          disabled
        />
      </Col>
    </Row>
  );
};

export default DeliverInfo;
