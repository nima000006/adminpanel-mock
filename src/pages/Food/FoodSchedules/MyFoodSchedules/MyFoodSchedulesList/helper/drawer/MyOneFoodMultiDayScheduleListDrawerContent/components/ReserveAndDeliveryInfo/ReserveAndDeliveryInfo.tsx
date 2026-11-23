import { Col, FormInstance, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { reservationDaysList } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

import { FormData } from "../../@types/@myMultipleFoodScheduleListDrawerContent";
import "./_reserveAndDeliveryInfo.scss";

const ReserveAndDeliveryInfo = ({ form }: { form: FormInstance<FormData> }) => {
  return (
    <>
      <Row gutter={[16, 16]} className="food-schedule-drawer-info-container">
        <Col span={24}>
          <CustomDivider text="اطلاعات زمان رزرو" />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="شروع رزرو"
            name="reservationStart"
            placeholder="انتخاب کنید"
            options={reservationDaysList}
            form={form}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="پایان رزرو"
            name="reservationEnd"
            placeholder="انتخاب کنید"
            options={reservationDaysList}
            form={form}
          />
        </Col>
        <Row gutter={[16, 16]} className="food-schedule-reserve-time-container">
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomTimePicker
              label="شروع رزرو(ساعت)"
              name="startReservation"
              placeholder="انتخاب کنید"
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomTimePicker
              label="پایان رزرو(ساعت)"
              name="endReservation"
              placeholder="انتخاب کنید"
            />
          </Col>
        </Row>
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
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomTimePicker
            label="پایان تحویل (ساعت)"
            name="deliverEndTime"
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>
    </>
  );
};
export default ReserveAndDeliveryInfo;
