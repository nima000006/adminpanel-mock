import { Col, Row } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  MAX_LENGTH_RULE,
  NUMBER_MAX_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
  ZERO_RULE,
} from "@infra/validation/validationSchema";
import { MAX_FOOD_PRICE } from "@pages/Food/_shared/utils/sharedFoodUtils";
import { COUNT_ORDER_FOOD_MSG } from "@pages/Food/Foods/_Shared/utils/FoodsUtils";

import { AllFoodsAddSchedulesDrawerContentBodyProps } from "./@types/AllFoodsAddSchedulesDrawerContentBodyProps";
const hasLimit = [
  {
    id: 1,
    title: "دارای محدودیت",
  },
  {
    id: 2,
    title: "بدون محدودیت",
  },
];
const AllFoodsAddSchedulesDrawerContentBody = ({
  form,
  setFoodScheduleDate,
  mealData,
  isMealDataLoading,
  universityData,
  isUniversityDataLoading,
  hasFoodCountLimit,
  foodTotalCountHandler,
  changeFoodScheduleTypeHandler,
  isFoodScheduleType,
  foodScheduleTypeData,
  foodData,
}: AllFoodsAddSchedulesDrawerContentBodyProps) => {
  return (
    <div className="drawer-body">
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomDatePicker
            label="تاریخ برنامه غذایی"
            placeholder="انتخاب کنید"
            name="reserveDate"
            rules={[REQUIRED_RULE]}
            form={form}
            disabledDate={(current) => {
              return current && current < dayjs().startOf("day");
            }}
            onChange={(date, dateString) => {
              if (dateString && typeof dateString === "string") {
                const gregorianDate = moment(dateString, "jYYYY-jMM-jDD").format(
                  "YYYY-MM-DD"
                );
                setFoodScheduleDate(gregorianDate);
                form.setFieldsValue({
                  reserveDate: date,
                });
              }
            }}
          />
        </Col>

        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          label="سلف"
          value={foodData?.contractRestaurantTitle}
        />

        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          label="قرارداد"
          value={foodData?.contractTitle}
        />

        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            label="وعده"
            name="meal"
            placeholder="انتخاب کنید"
            options={mealData?.data?.map((item) => {
              return {
                id: item.id,
                title: item.name,
              };
            })}
            loading={isMealDataLoading}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            label="نوع برنامه غذایی"
            name="foodScheduleType"
            placeholder="انتخاب کنید"
            options={foodScheduleTypeData}
            form={form}
            rules={[REQUIRED_RULE]}
            onChange={(value) => changeFoodScheduleTypeHandler(value as string)}
          />
        </Col>

        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          label="غذا"
          value={foodData?.title}
        />

        <Col span={24}>
          <CustomSelect
            label="واحدهای دانشگاهی"
            name="universityUnit"
            placeholder="انتخاب کنید"
            options={universityData ? universityData : []}
            loading={isUniversityDataLoading}
            form={form}
            rules={[REQUIRED_RULE]}
            mode="multiple"
          />
        </Col>

        {/* todo[shirin]:This feature is currently unavailable */}
        {/* <CustomInput
              type="text"
              label="تخفیف"
              name="discount"
              placeholder="تخفیف"
              prefix={<AiOutlinePercentage className="percentage" />}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                ZERO_RULE,
                MIN_LENGTH_RULE(1),
                MAX_LENGTH_RULE(2),
              ]}
            /> */}
        <SingleVerticalWithCol xl={8} lg={8} md={12} label="تخفیف" value="0" />

        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomInputNumber
            isPrice={true}
            type="text"
            label="قیمت (ریال)"
            name="price"
            placeholder="قیمت (ریال)"
            rules={[REQUIRED_RULE, NUMBER_MAX_RULE(MAX_FOOD_PRICE)]}
          />
        </Col>

        {isFoodScheduleType ? (
          <Col lg={8} md={12} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="حداکثر تعداد سفارشات هر نفر"
              name="maxReserveCount"
              placeholder="حداکثر تعداد سفارشات هر نفر"
              dependencies={["foodTotalCount"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                ZERO_RULE,
                MAX_LENGTH_RULE(4),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (+getFieldValue("foodTotalCount") < +value) {
                      return Promise.reject(new Error(COUNT_ORDER_FOOD_MSG));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Col>
        ) : (
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="حداکثر تعداد سفارشات هر نفر"
            value="1"
          />
        )}

        <Col lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            label="محدودیت در تعداد"
            name="hasLimit"
            placeholder="انتخاب کنید"
            options={hasLimit}
            form={form}
            onChange={(value) => foodTotalCountHandler(value as string)}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        {hasFoodCountLimit && (
          <Col lg={8} md={12} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="حداکثر سفارشات"
              name="foodTotalCount"
              placeholder="حداکثر سفارشات"
              disabled={!hasFoodCountLimit}
              dependencies={["maxReserveCount"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                ZERO_RULE,
                MAX_LENGTH_RULE(4),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (+getFieldValue("maxReserveCount") > +value) {
                      return Promise.reject(new Error(COUNT_ORDER_FOOD_MSG));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomDivider text="اطلاعات زمان رزرو" />
        </Col>
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
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomDivider text="اطلاعات زمان تحویل" />
        </Col>
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
      </Row>
    </div>
  );
};

export default AllFoodsAddSchedulesDrawerContentBody;
