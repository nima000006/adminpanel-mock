import { Col, FormInstance, Row } from "antd";
import dayjs from "dayjs";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { RESERVATION_END_DATE_BEFORE_RESERVE_DATE } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

import { SingleFoodScheduleFormData } from "../../@types/@allSingleFoodScheduleListDrawerContent";

const ReserveInfo = ({ form }: { form: FormInstance<SingleFoodScheduleFormData> }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CustomDivider text="اطلاعات زمان رزرو" />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="شروع رزرو (ساعت)"
          name="reservationStartTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="شروع رزرو (تاریخ)"
          placeholder="انتخاب کنید"
          name="reservationStartDate"
          rules={[REQUIRED_RULE]}
          form={form}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomTimePicker
          label="پایان رزرو (ساعت)"
          name="reservationEndTime"
          placeholder="انتخاب کنید"
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <CustomDatePicker
          label="پایان رزرو (تاریخ)"
          placeholder="انتخاب کنید"
          name="reservationEndDate"
          rules={[
            REQUIRED_RULE,

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  new Date(getFieldValue("reserveDate"))?.getTime() <
                  new Date(value)?.getTime()
                ) {
                  return Promise.reject(
                    new Error(RESERVATION_END_DATE_BEFORE_RESERVE_DATE)
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
          form={form}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
        />
      </Col>
    </Row>
  );
};
export default ReserveInfo;
