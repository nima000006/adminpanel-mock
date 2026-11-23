import { Col, Row } from "antd";
import dayjs from "dayjs";
import momentj from "jalali-moment";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
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

import { MyFoodsAddScheduleDrawerInfoProps } from "./@types/MyFoodsAddScheduleDrawerInfoProps";

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
const foodScheduleTypeData = [
  {
    id: 0,
    title: "دانشجویی",
  },
  {
    id: 1,
    title: "آزاد",
  },
  {
    id: 2,
    title: "روزفروش",
  },
];
const MyFoodsAddScheduleDrawerInfo = ({
  form,
  setFoodScheduleDate,
  mealData,
  isMealDataLoading,
  universityData,
  isUniversityDataLoading,
  setHasFoodCountLimit,
  hasFoodCountLimit,
  setIsFoodScheduleType,
  isFoodScheduleType,
  foodData,
}: MyFoodsAddScheduleDrawerInfoProps) => {
  //* ================================ Util Functions ================================

  // functions of selecting limited foods
  const foodTotalCountHandler = (value: string) => {
    if (value === "1") {
      setHasFoodCountLimit(true);
    } else {
      setHasFoodCountLimit(false);
    }
  };

  // change schedule of food type
  const changeFoodScheduleTypeHandler = (value: string) => {
    if (value === foodScheduleTypeData[1].id.toString()) {
      setIsFoodScheduleType(true);
    } else {
      setIsFoodScheduleType(false);
    }
  };
  return (
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
            // حالت clear
            if (!date || !dateString) {
              setFoodScheduleDate(null);
              form.setFieldsValue({ reserveDate: undefined });
              return;
            }

            const gregorianDate = momentj(dateString as string, "jYYYY-jMM-jDD").format(
              "YYYY-MM-DD"
            );

            setFoodScheduleDate(gregorianDate);

            form.setFieldsValue({
              reserveDate: date,
            });
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
          form={form}
          rules={[REQUIRED_RULE]}
          loading={isMealDataLoading}
        />
      </Col>
      <Col lg={8} md={12} sm={12} xs={24}>
        <CustomSelect
          label="نوع برنامه غذایی"
          name="foodScheduleType"
          placeholder="انتخاب کنید"
          options={foodScheduleTypeData}
          onChange={(value) => changeFoodScheduleTypeHandler(value as string)}
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>

      <SingleVerticalWithCol xl={8} lg={8} md={12} label="غذا" value={foodData?.title} />

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
  );
};
export default MyFoodsAddScheduleDrawerInfo;
