import { Col, Row } from "antd";
import dayjs from "dayjs";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { hasSpecialTimeDateCreator } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

import { ReserveAndDeliverTimeDrawerProps } from "../../../@types/@allFoodScheduleTabDrawerContent";

const ReserveAndDeliverTimeDrawer = ({
  form,
  foodScheduleInfo,
}: ReserveAndDeliverTimeDrawerProps) => {
  return (
    <>
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
            defaultValue={hasSpecialTimeDateCreator(
              foodScheduleInfo?.startReservationDate
            )}
            key={foodScheduleInfo?.startReservationDate}
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
            rules={[REQUIRED_RULE]}
            form={form}
            defaultValue={hasSpecialTimeDateCreator(foodScheduleInfo?.endReservationDate)}
            key={foodScheduleInfo?.endReservationDate}
            disabledDate={(current) => {
              return current && current < dayjs().startOf("day");
            }}
          />
        </Col>
      </Row>
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
            defaultValue={form.getFieldsValue()?.reserveDate}
            key={form.getFieldsValue()?.reserveDate}
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
            defaultValue={form.getFieldsValue()?.reserveDate}
            key={form.getFieldsValue()?.reserveDate}
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default ReserveAndDeliverTimeDrawer;
