import { Col, FormInstance } from "antd";
import dayjs from "dayjs";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const MyFoodsAddScheduleDrawerInfoReserveTime = ({ form }: { form: FormInstance }) => {
  return (
    <>
      <Col lg={8} md={12} sm={12} xs={24}>
        <CustomTimePicker
          label="شروع رزرو (ساعت)"
          name="reservationStartTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col md={12} sm={12} xs={24}>
        <CustomDatePicker
          label="شروع رزرو (تاریخ)"
          placeholder="انتخاب کنید"
          name="reservationStartDate"
          rules={[REQUIRED_RULE]}
          form={form}
        />
      </Col>
      <Col lg={8} md={12} sm={12} xs={24}>
        <CustomTimePicker
          label="پایان رزرو (ساعت)"
          name="reservationEndTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={12} xs={24}>
        <CustomDatePicker
          label="پایان رزرو (تاریخ)"
          placeholder="انتخاب کنید"
          name="reservationEndDate"
          rules={[REQUIRED_RULE]}
          form={form}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
        />
      </Col>
    </>
  );
};

export default MyFoodsAddScheduleDrawerInfoReserveTime;
