import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { PriceSeparator, selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetMyContractFoodsQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useCreateNewMyBulkFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetMyContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
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
import { MyContractsListItem } from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import {
  CREATE_NEW_FOOD_SUCCESS_MSG,
  FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG,
  FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG,
  FOOD_SCHEDULE_BULK_PLANS_DRAWER_ALERT_MSG,
  foodScheduleTypeData,
  hasLimit,
} from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";

import {
  CreateNewMyBulkFoodScheduleResponse,
  FormData,
  MyOneFoodMultiDayScheduleListDrawerContentProps,
} from "./@types/@myMultipleFoodScheduleListDrawerContent";
import ReserveAndDeliveryInfo from "./components/ReserveAndDeliveryInfo/ReserveAndDeliveryInfo";
import { GetMyContractsBySelfIdResponse } from "../MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";

import "./_myOnefoodMultiDay.scss";

const MyOneFoodMultiDayScheduleListDrawerContent = ({
  closeDrawerHandler,
  getListData,
}: MyOneFoodMultiDayScheduleListDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<MyRestaurantType[] | []>([]);
  const [contractData, setContractData] = useState<MyContractsListItem[] | []>([]);
  const [productData, setProductData] = useState<ContractsFoodDataType[] | []>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [hasFoodCountLimit, setHasFoodCountLimit] = useState(false);
  const [isActive, setIsActive] = useState(true);
  // const [isAdditionalFoodSelect, setIsAdditionalFoodSelect] = useState(false);
  const [foodScheduleDate, setFoodScheduleDate] = useState<string[] | []>([]);
  const [foodPrice, setFoodPrice] = useState<{
    studentPrice?: number;
    minPrice?: number;
    maxPrice?: number;
  }>({ maxPrice: undefined, minPrice: undefined, studentPrice: undefined });
  const [isStudentFood, setIsStudentFood] = useState(true);

  const [form] = Form.useForm<FormData>();

  //? ================================  Api Calls ================================
  const [getMyRestaurants, { isFetching: isMyRestaurantDataLoading }] =
    useLazyGetMyRestaurantsQuery();

  const [getMyContractsBySelfId, { isFetching: isMyContractsBySelfIdLoading }] =
    useLazyGetMyContractsBySelfIdQuery();

  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetMyContractFoodsQuery();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [createNewFoodSchedule, { isLoading: isCreateNewFoodScheduleLoading }] =
    useCreateNewMyBulkFoodScheduleMutation();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyRestaurants().unwrap().then(getMyRestaurantsOnSuccess);
    getAllUniversity();

    form.setFieldsValue({
      activeMode: true,
      foodScheduleType: selectDefaultValueGenerator(foodScheduleTypeData?.[0]),
      maxReserveCount: "1",
    });
  }, []);

  useEffect(() => {
    if (restaurantId) {
      // When change the self, the related contract and food should change
      form.setFieldsValue({
        contract: { title: "" },
        food: { title: "" },
      });
      getMyContractsBySelfId({ restaurantId })
        .unwrap()
        .then(getMyContractsBySelfIdOnSuccess);
    }
  }, [restaurantId]);

  useEffect(() => {
    // When change the contract, the related food should changes
    if (contractId) {
      form.setFieldsValue({
        food: { title: "" },
      });
      getContractFoods({ contractId }).unwrap().then(getContractFoodsOnSuccess);
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getMyRestaurantsOnSuccess = useCallback(
    async (value: GetMyRestaurantsResponse) => {
      if (value?.status === 200) {
        setRestaurantData(value?.data);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const getMyContractsBySelfIdOnSuccess = useCallback(
    async (value: GetMyContractsBySelfIdResponse) => {
      if (value?.status === 200) {
        setContractData(value?.data?.contractDtoList);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

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

  const onCreateNewFoodScheduleSuccess = useCallback(
    async (value: CreateNewMyBulkFoodScheduleResponse) => {
      if (value?.status === 200) {
        toast.success(CREATE_NEW_FOOD_SUCCESS_MSG, {
          toastId: CREATE_NEW_FOOD_SUCCESS_MSG,
        });
        closeDrawerHandler();
        getListData();
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const createNewFoodScheduleHandler = () => {
    form.submit();

    form.validateFields().then((value: FormData) => {
      createNewFoodSchedule({
        active: isActive,
        mealId: value?.meal?.code,
        basePrice: +value?.price,
        branches: value?.universityUnit?.map((item) => item?.code),
        // todo[Atefeh]: uncomment if needed in future
        // discount: +value?.discount,
        discount: 0,
        endReservationDate: value?.reservationEnd?.code,
        limitedCount: hasFoodCountLimit,
        maxTotalPerPerson: +value?.maxReserveCount,
        //Todo[Atefeh]: delete if not needed in the future
        // maxTotalPerPerson: isAdditionalFoodSelect ? +value?.maxReserveCount : 1,
        maxCount: +value?.foodTotalCount,
        productId: value?.food?.code,
        requestType: value?.foodScheduleType?.code,
        startReservationDate: value?.reservationStart?.code,
        reserveDates: foodScheduleDate,
        fromDeliveryTimeHour: dayjs(value?.deliverStartTime).get("hours"),
        fromDeliveryTimeMinute: dayjs(value?.deliverStartTime).get("minutes"),
        toDeliveryTimeHour: dayjs(value?.deliverEndTime).get("hours"),
        toDeliveryTimeMinute: dayjs(value?.deliverEndTime).get("minutes"),
        endReservationHour: dayjs(value?.endReservation).get("hours"),
        endReservationMinute: dayjs(value?.endReservation).get("minutes"),
        startReservationHour: dayjs(value?.startReservation).get("hours"),
        startReservationMinute: dayjs(value?.startReservation).get("minutes"),
      })
        .unwrap()
        .then(onCreateNewFoodScheduleSuccess);
    });
  };

  // Other functions
  const foodTotalCountHandler = (value: string) => {
    if (value === "1") {
      setHasFoodCountLimit(true);
    } else {
      setHasFoodCountLimit(false);
    }
  };

  const foodScheduleTypeHandler = (value: string) => {
    setIsStudentFood(value === "0" ? true : false);

    if (value === foodScheduleTypeData[0].id.toString()) {
      form.setFieldsValue({ maxReserveCount: "1" });
    } else {
      form.setFieldsValue({ maxReserveCount: undefined });
    }
  };
  //priceExtraTextHelper
  const priceExtraTextHelper = useMemo<ReactNode>(() => {
    if (foodPrice?.maxPrice || foodPrice?.minPrice || foodPrice?.studentPrice) {
      if (isStudentFood) {
        return (
          <div className="student-food-price">
            <span>قیمت غذای دانشجویی</span>
            <span>
              {foodPrice?.studentPrice
                ? PriceSeparator(foodPrice?.studentPrice?.toString())
                : "نامشخص"}
            </span>
          </div>
        );
      }
      return (
        <>
          <div className="student-food-price">
            <span>حداقل قیمت</span>
            <span>
              {foodPrice?.minPrice
                ? PriceSeparator(foodPrice?.minPrice?.toString())
                : "نامشخص"}
            </span>
          </div>
          <div className="student-food-price">
            <span>حداکثر قیمت</span>
            <span>
              {foodPrice?.maxPrice
                ? PriceSeparator(foodPrice?.maxPrice?.toString())
                : "نامشخص"}
            </span>
          </div>
        </>
      );
    }
    return <></>;
  }, [foodPrice?.maxPrice, foodPrice?.minPrice, foodPrice?.studentPrice, isStudentFood]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="my-one-food-multi-day-schedule-container">
      <CustomDrawerHeader
        title="تعریف گروهی چند برنامه غذایی جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="my-food-schedule-list-page-drawer-action-btns-container">
            <CustomSwitch
              defaultChecked={isActive}
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              valuePropName="activeMode"
              onChange={() => setIsActive((prev) => !prev)}
            />
            <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={createNewFoodScheduleHandler}
              className="drawer-action-btn"
              htmlType="submit"
              loading={isCreateNewFoodScheduleLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <div className="drawer-body">
        <CustomAlert
          message={FOOD_SCHEDULE_BULK_PLANS_DRAWER_ALERT_MSG}
          type="info"
          showIcon
        />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomDatePicker
              label="تاریخ برنامه غذایی"
              placeholder="انتخاب کنید"
              name="reserveDate"
              rules={[REQUIRED_RULE]}
              form={form}
              disabledDate={(current) => {
                return current && current < dayjs().endOf("day");
              }}
              onChange={(date, dateString) => {
                // حالت clear
                if (
                  !date ||
                  !dateString ||
                  (Array.isArray(dateString) && dateString.length === 0)
                ) {
                  setFoodScheduleDate([]);
                  form.setFieldsValue({ reserveDate: undefined });
                  return;
                }

                // multiple dates → یک‌بار setState
                const dates = (Array.isArray(dateString) ? dateString : [dateString]).map(
                  (item) => moment(item, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
                );

                setFoodScheduleDate(dates);
                form.setFieldsValue({
                  reserveDate: date as string[],
                });
              }}
              multiple
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="سلف"
              name="self"
              placeholder="انتخاب کنید"
              options={restaurantData}
              loading={isMyRestaurantDataLoading}
              form={form}
              onChange={(value) => setRestaurantId(value as string)}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="قرارداد"
              name="contract"
              placeholder="انتخاب کنید"
              options={contractData}
              loading={isMyContractsBySelfIdLoading}
              onChange={(value) => setContractId(value as string)}
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
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="نوع برنامه غذایی"
              name="foodScheduleType"
              placeholder="انتخاب کنید"
              options={foodScheduleTypeData}
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
              form={form}
              rules={[REQUIRED_RULE]}
              onChange={(_, opt) => {
                setFoodPrice({
                  studentPrice: (opt as any)?.item?.studentalPrice,
                  minPrice: (opt as any)?.item?.minPrice,
                  maxPrice: (opt as any)?.item?.maxPrice,
                });
              }}
            />
          </Col>
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
              rules={[REQUIRED_RULE, NUMBER_MAX_RULE(MAX_FOOD_PRICE)]}
              extra={priceExtraTextHelper}
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
        {/* اطلاعات زمان رزرو و تحویل */}
        <ReserveAndDeliveryInfo form={form} />
      </div>
    </Form>
  );
};

export default MyOneFoodMultiDayScheduleListDrawerContent;
