import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetContractFoodsQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useUpdateFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import {
  MAX_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  ContractsFoodDataType,
  GetContractFoodsResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import {
  dateCreator,
  FOOD_ORDER_MAX_COUNT_MORE_THAN_MAX_TOTAL_COUNT_PER_PERSON_ERR0R_MSG,
  FOOD_ORDER_MAX_TOTAL_COUNT_PER_PERSON_LESS_THAN_MAX_COUNT_ERR0R_MSG,
  foodScheduleTypeData,
  hasLimit,
  hasSpecialTimeDateCreator,
  resetUtc,
  UPDATE_FOOD_SUCCESS_MSG,
} from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import ReserveAndDeliverTimeDrawer from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/helper/drawer/helper/components/ReserveAndDeliverTimeDrawer/ReserveAndDeliverTimeDrawer";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";

import {
  AllFoodScheduleTabDrawerContentProps,
  AllFoodScheduleEditDrawerFormData,
  UpdateAllFoodScheduleResponse,
} from "../@types/@allFoodScheduleTabDrawerContent";

const AllFoodScheduleTabEditDrawerContent = ({
  closeDrawerHandler,
  getData,
  foodScheduleInfo,
  isDrawerOpen,
}: AllFoodScheduleTabDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [productData, setProductData] = useState<ContractsFoodDataType[] | []>([]);
  const [hasFoodCountLimit, setHasFoodCountLimit] = useState(false);
  const [isActive, setIsActive] = useState(foodScheduleInfo?.active);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // Todo[Atefeh]: delete if not needed in the future
  // const [isAdditionalFoodSelect, setIsAdditionalFoodSelect] = useState(
  //   foodScheduleInfo?.requestType === foodScheduleTypeData[1].id ? true : false
  // );
  const [foodScheduleDate, setFoodScheduleDate] = useState<undefined | string>(
    foodScheduleInfo?.reserveDate
  );
  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  const [form] = Form.useForm<AllFoodScheduleEditDrawerFormData>();

  //? ================================  Api Calls ================================
  const [getAllRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetAllRestaurantsQuery();

  const [getAllContractsBySelfId, { isFetching: isAllContractsBySelfIdLoading }] =
    useLazyGetAllContractsBySelfIdQuery();

  const [getContractFoods, { isFetching: isContractFoodsLoading }] =
    useLazyGetContractFoodsQuery();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [updateFoodSchedule, { isLoading: isUpdateFoodScheduleLoading }] =
    useUpdateFoodScheduleMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (foodScheduleInfo) {
      // set init value for contract, food
      selfChanger({
        shouldClear: false,
        selfId: foodScheduleInfo?.productContractRestaurantId,
      });

      contractChanger({
        shouldClear: false,
        contractId: foodScheduleInfo?.productContractId,
      });

      form.setFieldsValue({
        activeMode: foodScheduleInfo?.active,
        reserveDate: foodScheduleInfo?.reserveDate,
        self: selectDefaultValueGenerator({
          title: foodScheduleInfo?.productContractRestaurantTitle,
          id: +foodScheduleInfo?.productContractRestaurantId,
        }),
        contract: selectDefaultValueGenerator({
          title: foodScheduleInfo?.productContractTitle,
          id: +foodScheduleInfo?.productContractId,
        }),
        meal: selectDefaultValueGenerator({
          title: foodScheduleInfo?.mealName,
          id: foodScheduleInfo?.mealId,
        }),
        foodScheduleType: selectDefaultValueGenerator({
          title: foodScheduleInfo?.requestTitle,
          id: foodScheduleInfo?.requestType,
        }),
        food: selectDefaultValueGenerator({
          title: foodScheduleInfo?.productTitle,
          id: foodScheduleInfo?.productId,
        }),
        universityUnit: selectDefaultValueGenerator(
          foodScheduleInfo?.branches?.map((item) => ({
            title: item?.branchName,
            id: item?.branchCode,
          }))
        ),
        discount: foodScheduleInfo?.discount?.toString(),
        price: foodScheduleInfo?.basePrice.toString(),
        maxReserveCount: foodScheduleInfo?.maxTotalPerPerson?.toString(),
        hasLimit: selectDefaultValueGenerator({
          title: foodScheduleInfo?.limitedCount ? "دارای محدودیت" : "بدون محدودیت",
          id: foodScheduleInfo?.limitedCount ? 1 : 2,
        }),
        foodTotalCount: foodScheduleInfo?.maxCount?.toString(),
        reservationStartTime: resetUtc(foodScheduleInfo?.startReservationDate),
        reservationStartDate: hasSpecialTimeDateCreator(
          foodScheduleInfo?.startReservationDate
        ),
        reservationEndTime: resetUtc(foodScheduleInfo?.endReservationDate),
        reservationEndDate: hasSpecialTimeDateCreator(
          foodScheduleInfo?.endReservationDate
        ),
        deliverStartTime: resetUtc(foodScheduleInfo?.fromDeliveryTime),
        deliverStartDate: foodScheduleInfo?.reserveDate,
        deliverEndTime: resetUtc(foodScheduleInfo?.toDeliveryTime),
        deliverEndDate: foodScheduleInfo?.reserveDate,
      });
      setHasFoodCountLimit(foodScheduleInfo?.limitedCount);
    }

    if (isDrawerOpen) {
      getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsOnSuccess);
    }

    getAllUniversity();

    form.setFieldsValue({
      activeMode: true,
    });
  }, []);

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

  const onUpdateFoodScheduleSuccess = useCallback(
    async (value: UpdateAllFoodScheduleResponse) => {
      if (value?.status === 200) {
        toast.success(UPDATE_FOOD_SUCCESS_MSG, {
          toastId: UPDATE_FOOD_SUCCESS_MSG,
        });
        closeDrawerHandler();
        getData();
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const onUpdateFoodScheduleError = useCallback(async () => {
    closeUpdateModalHandler();
  }, []);

  const updateFoodScheduleHandler = () => {
    form.submit();

    form.validateFields().then((value: AllFoodScheduleEditDrawerFormData) => {
      if (foodScheduleInfo?.id) {
        updateFoodSchedule({
          active: isActive ? true : false,
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
          id: foodScheduleInfo?.id,
        })
          .unwrap()
          .then(onUpdateFoodScheduleSuccess)
          .catch(onUpdateFoodScheduleError);
      }
    });
  };

  // selfChanger
  const selfChanger = ({
    shouldClear,
    selfId,
  }: {
    shouldClear: boolean;
    selfId: string;
  }) => {
    if (shouldClear) {
      form.setFieldsValue({
        contract: { title: "" },
        food: { title: "" },
      });
    }
    getAllContractsBySelfId({ restaurantId: selfId })
      .unwrap()
      .then(getAllContractsBySelfIdOnSuccess);

    // setRestaurantId(value as string);
    // form.setFieldsValue({
    //   contract: "",
    //   food: "",
    // });
  };

  // contract id
  const contractChanger = ({
    shouldClear,
    contractId,
  }: {
    shouldClear: boolean;
    contractId: string;
  }) => {
    if (shouldClear) {
      form.setFieldsValue({
        food: { title: "" },
      });
    }
    getContractFoods({ contractId }).unwrap().then(getContractFoodsOnSuccess);
  };

  // Other functions
  const foodTotalCountHandler = (value: string) => {
    if (value === "1") {
      setHasFoodCountLimit(true);
    } else {
      setHasFoodCountLimit(false);
    }
  };

  const closeUpdateModalHandler = () => {
    setIsUpdateModalOpen(false);
  };

  const openUpdateModalHandler = () => {
    form.validateFields().then(() => setIsUpdateModalOpen(true));
  };

  const foodScheduleTypeHandler = (value: string) => {
    if (value === foodScheduleTypeData[0].id.toString()) {
      form.setFieldsValue({ maxReserveCount: "1" });
    } else {
      form.setFieldsValue({ maxReserveCount: undefined });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  if (!isDrawerOpen) return;

  return (
    <>
      {isUpdateModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت تغییرات"
          isModalOpen={isUpdateModalOpen}
          isConfirmButtonLoading={isUpdateFoodScheduleLoading}
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          closeModalHandler={closeUpdateModalHandler}
          onConfirmClickHandler={updateFoodScheduleHandler}
          content={
            <div className="all-food-schedule-tab-modal-container">
              <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
            </div>
          }
        />
      )}
      <Form form={form}>
        <CustomDrawerHeader
          title="ویرایش برنامه غذایی"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="all-food-schedule-tab-drawer-action-btns-container">
              <CustomSwitch
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="activeMode"
                defaultChecked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
              />
              <CustomButton className="drawer-action-btn" type="primary" danger disabled>
                حذف
              </CustomButton>
              <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={openUpdateModalHandler}
                className="drawer-action-btn"
                htmlType="submit"
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
                rules={[REQUIRED_RULE]}
                form={form}
                defaultValue={foodScheduleInfo?.reserveDate}
                key={foodScheduleInfo?.reserveDate}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
                onChange={(date, dateString) => {
                  // حالت clear
                  if (!date || !dateString) {
                    setFoodScheduleDate(undefined);
                    form.setFieldsValue({
                      reserveDate: undefined,
                      deliverStartDate: undefined,
                      deliverEndDate: undefined,
                    });
                    return;
                  }

                  const gregorianDate = moment(
                    dateString as string,
                    "jYYYY-jMM-jDD"
                  ).format("YYYY-MM-DD");

                  setFoodScheduleDate(gregorianDate);

                  form.setFieldsValue({
                    reserveDate: date as string,
                    deliverStartDate: date as string | Dayjs,
                    deliverEndDate: date as string | Dayjs,
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
                onChange={(value) => {
                  selfChanger({ shouldClear: true, selfId: value as string });
                }}
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
                onChange={(value) => {
                  contractChanger({ shouldClear: true, contractId: value as string });
                }}
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
                rules={[NUMBER_RULE, MAX_LENGTH_RULE(2)]}
              /> */}
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              md={12}
              sm={24}
              value="0"
              label="تخفیف"
            />

            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomInputNumber
                isPrice={true}
                type="text"
                label="قیمت (ریال)"
                name="price"
                placeholder="قیمت (ریال)"
                rules={[REQUIRED_RULE]}
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
                      if (
                        +getFieldValue("foodTotalCount") < +value &&
                        hasFoodCountLimit
                      ) {
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
                        if (
                          +getFieldValue("foodTotalCount") < +value &&
                          hasFoodCountLimit
                        ) {
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
          <ReserveAndDeliverTimeDrawer form={form} foodScheduleInfo={foodScheduleInfo} />
        </div>
      </Form>
    </>
  );
};

export default AllFoodScheduleTabEditDrawerContent;
