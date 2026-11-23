import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetMyContractFoodsQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  MAX_LENGTH_RULE,
  NUMBER_MAX_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { MAX_FOOD_PRICE } from "@pages/Food/_shared/utils/sharedFoodUtils";
import {
  ContractsFoodDataType,
  GetMyContractFoodsResponse,
} from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/@types/@foodsTab";
import {
  FOOD_MAX_PRICE_ERROR_MSG,
  FOOD_MIN_PRICE_ERROR_MSG,
  FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG,
  FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG,
  foodScheduleTypeData,
  hasLimit,
} from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

import { MyMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContentProps } from "./@types/@myMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent";

const MyMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent = ({
  form,
  contractId,
  foodInfo,
}: MyMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContentProps) => {
  const [productData, setProductData] = useState<ContractsFoodDataType[] | []>([]);
  // const [isAdditionalFoodSelect, setIsAdditionalFoodSelect] = useState(false);
  const [hasFoodCountLimit, setHasFoodCountLimit] = useState(false);

  //? ================================  Api Calls ================================
  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetMyContractFoodsQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (foodInfo) {
      form.setFieldsValue({
        foodScheduleType: selectDefaultValueGenerator(foodInfo?.requestType),
        food: selectDefaultValueGenerator(foodInfo?.product),
        meal: selectDefaultValueGenerator(foodInfo?.meal),
        price: foodInfo?.basePrice,
        maxReserveCount: foodInfo?.maxTotalPerPerson?.toString(),
        foodTotalCount: foodInfo?.maxCount?.toString(),
        hasLimit: selectDefaultValueGenerator(foodInfo?.hasLimit),
      });
      setHasFoodCountLimit(foodInfo?.hasLimit?.id === 1 ? true : false);
      // foodScheduleTypeHandler(foodInfo?.requestType?.id?.toString());
    }
  }, []);

  useEffect(() => {
    if (contractId) {
      getContractFoods({ contractId: contractId?.toString() })
        .unwrap()
        .then(getContractFoodsOnSuccess);
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getContractFoodsOnSuccess = useCallback(
    async (value: GetMyContractFoodsResponse) => {
      if (value?.status === 200) {
        setProductData(value?.data);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const foodTotalCountHandler = (value: string) => {
    if (value === "1") {
      setHasFoodCountLimit(true);
    } else {
      setHasFoodCountLimit(false);
    }
  };

  const foodScheduleTypeHandler = (value: string) => {
    if (value === foodScheduleTypeData[0].id.toString()) {
      form.setFieldsValue({ maxReserveCount: "1" });
    } else {
      form.setFieldsValue({ maxReserveCount: undefined });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="نوع برنامه غذایی"
            name="foodScheduleType"
            placeholder="انتخاب کنید"
            options={foodScheduleTypeData}
            dependencies={["price"]}
            onChange={(value) => foodScheduleTypeHandler(value as string)}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="غذا"
            name="food"
            placeholder="انتخاب کنید"
            options={productData}
            loading={isContractFoodsLoading}
            dependencies={["price"]}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
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

        {/* // todo[Atefeh]: uncomment if needed in future */}
        {/* <CustomInput
              type="text"
              label="تخفیف"
              name="discount"
              placeholder="تخفیف"
              prefix={<AiOutlinePercentage />}
              rules={[REQUIRED_RULE, NUMBER_RULE]}
              maxLength={2}
            /> */}
        <SingleVerticalWithCol xl={8} lg={8} md={12} sm={24} value="0" label="تخفیف" />

        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInputNumber
            isPrice={true}
            type="text"
            label="قیمت (ریال)"
            name="price"
            placeholder="قیمت (ریال)"
            dependencies={["food", "foodScheduleType"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_MAX_RULE(MAX_FOOD_PRICE),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("foodScheduleType")?.code === 0) {
                    //دانشجویی
                    if (getFieldValue("food")?.item?.minPrice > value) {
                      return Promise.reject(new Error(FOOD_MIN_PRICE_ERROR_MSG));
                    }
                    if (getFieldValue("food")?.item?.studentalPrice < value) {
                      return Promise.reject(new Error(FOOD_MAX_PRICE_ERROR_MSG));
                    }
                  } else {
                    //روزفروش و آزاد
                    if (getFieldValue("food")?.item?.studentalPrice > value) {
                      return Promise.reject(new Error(FOOD_MIN_PRICE_ERROR_MSG));
                    }
                    if (getFieldValue("food")?.item?.maxPrice < value) {
                      return Promise.reject(new Error(FOOD_MAX_PRICE_ERROR_MSG));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>

        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="حداکثر تعداد سفارشات هر نفر"
            name="maxReserveCount"
            placeholder="حداکثر تعداد سفارشات هر نفر"
            dependencies={["foodTotalCount", "foodScheduleType"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              MAX_LENGTH_RULE(4),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (+getFieldValue("foodTotalCount") < +value) {
                    return Promise.reject(
                      new Error(
                        FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (+getFieldValue("foodScheduleType")?.code === 0) {
                    if (+value > 3) {
                      return Promise.reject(new Error("حداکثرمقدار مجار 3 میباید."));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>

        {/* //Todo[Atefeh]: delete if not needed in the future */}
        {/* {isAdditionalFoodSelect ? (
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="حداکثر تعداد سفارشات هر نفر"
              name="maxReserveCount"
              placeholder="حداکثر تعداد سفارشات هر نفر"
              dependencies={["foodTotalCount"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                MAX_LENGTH_RULE(4),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (+getFieldValue("foodTotalCount") < +value) {
                      return Promise.reject(
                        new Error(
                          FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Col>
        ) : (
          <SingleVerticalWithCol
            lg={8}
            md={12}
            sm={24}
            value="1"
            label="حداکثر تعداد سفارشات هر نفر"
          />
        )} */}

        <Col lg={8} md={12} sm={24} xs={24}>
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
          <Col lg={8} md={12} sm={24} xs={24}>
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
                MAX_LENGTH_RULE(4),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (+getFieldValue("maxReserveCount") > +value) {
                      return Promise.reject(
                        new Error(
                          FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default MyMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContent;
