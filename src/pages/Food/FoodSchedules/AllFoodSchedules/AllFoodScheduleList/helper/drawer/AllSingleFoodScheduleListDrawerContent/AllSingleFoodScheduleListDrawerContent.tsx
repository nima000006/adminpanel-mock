import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { PriceSeparator, selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useCreateNewAllFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { MAX_FOOD_PRICE } from "@pages/Food/_shared/utils/sharedFoodUtils";
import {
  ContractsFoodDataType,
  GetContractFoodsResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import {
  CREATE_NEW_FOOD_SUCCESS_MSG,
  dateCreator,
  FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG,
  FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG,
  foodScheduleTypeData,
  hasLimit,
  RESERVE_DATE_AFTER_RESERVATION_END_DATE,
} from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

import {
  AllSingleFoodScheduleListDrawerContentProps,
  CreateNewAllFoodScheduleResponse,
  SingleFoodScheduleFormData,
  GetAllContractsBySelfIdResponse,
} from "./@types/@allSingleFoodScheduleListDrawerContent";
import DeliverInfo from "./components/DeliverInfo/DeliverInfo";
import ReserveInfo from "./components/ReserveInfo/ReserveInfo";
import CustomButton from "../../../../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "../../../../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../../../../../components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomDrawerHeader from "../../../../../../../../components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useLazyGetContractFoodsQuery } from "../../../../../../../../infrastructure/states/redux/Apis/food/contract/contractApi";
import { useLazyGetAllRestaurantsQuery } from "../../../../../../../../infrastructure/states/redux/Apis/food/reservation/foodReservationApi";
import {
  MAX_LENGTH_RULE,
  NUMBER_MAX_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "../../../../../../../../infrastructure/validation/validationSchema";
import "./_allsingleFood.scss";

const AllSingleFoodScheduleListDrawerContent = ({
  closeDrawerHandler,
  getListData,
}: AllSingleFoodScheduleListDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [productData, setProductData] = useState<ContractsFoodDataType[] | []>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractId, setContractId] = useState<string | null>(null);
  const [hasFoodCountLimit, setHasFoodCountLimit] = useState(false);
  const [isActive, setIsActive] = useState(true);
  // const [isAdditionalFoodSelect, setIsAdditionalFoodSelect] = useState(false);
  const [foodScheduleDate, setFoodScheduleDate] = useState<null | string>(null);
  const [foodPrice, setFoodPrice] = useState<{
    studentPrice?: number;
    minPrice?: number;
    maxPrice?: number;
  }>({ maxPrice: undefined, minPrice: undefined, studentPrice: undefined });
  const [isStudentFood, setIsStudentFood] = useState(true);

  const [form] = Form.useForm<SingleFoodScheduleFormData>();

  //? ================================  Api Calls ================================
  const [getAllRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetAllRestaurantsQuery();

  const [getAllContractsBySelfId, { isFetching: isAllContractsBySelfIdLoading }] =
    useLazyGetAllContractsBySelfIdQuery();

  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetContractFoodsQuery();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [createNewFoodSchedule, { isLoading: isCreateNewFoodScheduleLoading }] =
    useCreateNewAllFoodScheduleMutation();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsOnSuccess);
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
        contract: {
          title: "",
        },
        food: {
          title: "",
        },
      });
      getAllContractsBySelfId({ restaurantId })
        .unwrap()
        .then(getAllContractsBySelfIdOnSuccess);
    }
  }, [restaurantId]);

  useEffect(() => {
    // When change the contract, the related food should changes
    if (contractId) {
      form.setFieldsValue({
        food: {
          title: "",
        },
      });
      getContractFoods({ contractId }).unwrap().then(getContractFoodsOnSuccess);
    }
  }, [contractId]);

  //* ================================ Util Functions ================================
  const getAllRestaurantsOnSuccess = useCallback(
    async (value: GetAllRestaurantsResponse) => {
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

  const getAllContractsBySelfIdOnSuccess = useCallback(
    async (value: GetAllContractsBySelfIdResponse) => {
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
    async (value: GetContractFoodsResponse) => {
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
    async (value: CreateNewAllFoodScheduleResponse) => {
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

    form.validateFields().then((value: SingleFoodScheduleFormData) => {
      createNewFoodSchedule({
        active: isActive,
        reserveDate: foodScheduleDate ? foodScheduleDate : "",
        mealId: value?.meal?.code,
        requestType: value?.foodScheduleType?.code,
        productId: value?.food?.code,
        branches: value?.universityUnit?.map((item) => item?.code),
        // todo[Atefeh]: uncomment if needed in future
        // discount: +value?.discount,
        discount: 0,
        basePrice: +value?.price,
        maxTotalPerPerson: +value?.maxReserveCount,
        // Todo[Atefeh]: delete if not needed in the future
        // maxTotalPerPerson: isAdditionalFoodSelect ? +value?.maxReserveCount : 1,
        limitedCount: hasFoodCountLimit,
        maxCount: +value?.foodTotalCount,
        startReservationDate: dateCreator(
          value?.reservationStartDate,
          value?.reservationStartTime
        ),
        endReservationDate: dateCreator(
          value?.reservationEndDate,
          value?.reservationEndTime
        ),
        fromDeliveryTime: dateCreator(
          new Date(foodScheduleDate ? foodScheduleDate : ""),
          value?.deliverStartTime
        ),
        toDeliveryTime: dateCreator(
          new Date(foodScheduleDate ? foodScheduleDate : ""),
          value?.deliverEndTime
        ),
      })
        .unwrap()
        .then(onCreateNewFoodScheduleSuccess);
    });
  };

  // Other functions

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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="all-single-food-schedule-container">
      <CustomDrawerHeader
        title="تعریف برنامه غذایی جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="all-food-schedule-list-page-drawer-action-btns-container">
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
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomDatePicker
              label="تاریخ برنامه غذایی"
              placeholder="انتخاب کنید"
              name="reserveDate"
              rules={[
                REQUIRED_RULE,

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      new Date(getFieldValue("reservationEndDate"))?.getTime() >
                      new Date(value)?.getTime()
                    ) {
                      return Promise.reject(
                        new Error(RESERVE_DATE_AFTER_RESERVATION_END_DATE)
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
              onChange={(date, dateString) => {
                // حالت clear
                if (!date || !dateString) {
                  setFoodScheduleDate(null);
                  form.setFieldsValue({
                    reserveDate: undefined,
                    deliverStartDate: undefined,
                    deliverEndDate: undefined,
                  });
                  return;
                }
                const gregorianDate = moment(dateString, "jYYYY-jMM-jDD").format(
                  "YYYY-MM-DD"
                );
                setFoodScheduleDate(gregorianDate);
                form.setFieldsValue({
                  reserveDate: date as string,
                  deliverStartDate: date as string,
                  deliverEndDate: date as string,
                });
              }}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              label="سلف"
              name="self"
              placeholder="انتخاب کنید"
              options={restaurantData}
              loading={isAllRestaurantDataLoading}
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
              loading={isAllContractsBySelfIdLoading}
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
          {/* 
          {isAdditionalFoodSelect ? (
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
        {/* اطلاعات زمان رزرو */}
        <ReserveInfo form={form} />

        {/* اطلاعات زمان تحویل */}
        <DeliverInfo form={form} />
      </div>
    </Form>
  );
};

export default AllSingleFoodScheduleListDrawerContent;
