import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetCancelReasonsAllQuery,
  useGetMealAllQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  useCreateHolidaysMutation,
  useLazyGetFoodsByRestaurantIdMealIdAndDateQuery,
  useLazyGetRestaurantByBranchIdQuery,
} from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { FormType } from "./types/AllFoodFormTypes";
import {
  CreateHolidaysResponse,
  FoodsByRestaurantIdMealIdAndDateType,
  GetFoodsByRestaurantIdMealIdAndDateResponse,
  GetRestaurantByBranchIdResponse,
  RestaurantByBranchIdDataType,
} from "../../../@types/@allReservationOrderResultList";

const AllFoodClosingRegistrationDrawerContent = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  const [selectedItems, setSelectedItems] = useState({
    selfId: "",
    date: "",
    mealId: "",
  });

  const [selfData, setSelfData] = useState<RestaurantByBranchIdDataType[]>([]);
  const [foodData, setFoodData] = useState<FoodsByRestaurantIdMealIdAndDateType[] | []>(
    []
  );

  const [form] = Form.useForm<FormType>();
  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();
  const [
    getCancelReasons,
    { data: cancelReasonsData, isFetching: isCancelReasonsDataLoading },
  ] = useLazyGetCancelReasonsAllQuery();

  const [getRestaurantByBranchId, { isFetching: isRestaurantByBranchIdDataLoading }] =
    useLazyGetRestaurantByBranchIdQuery();

  const [getFoodsData, { isFetching: isFoodDataLoading }] =
    useLazyGetFoodsByRestaurantIdMealIdAndDateQuery();

  const [createHolidays, { isLoading: isCreateHolidaysLoading }] =
    useCreateHolidaysMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  useEffect(() => {
    if (selectedItems?.selfId && selectedItems?.mealId && selectedItems?.date) {
      getFoodsData({
        restaurantId: selectedItems?.selfId,
        mealId: selectedItems?.mealId,
        fromDate: selectedItems?.date,
        toDate: selectedItems?.date,
      })
        .unwrap()
        .then(getFoodsDataSuccess);
    }
  }, [selectedItems?.selfId, selectedItems?.date, selectedItems?.mealId]);

  //* ================================ Util Functions ================================
  const handleReasonChange = () => {
    getCancelReasons();
  };
  const changeBranchHandler = (e: number) => {
    getRestaurantByBranchId({ branchId: e })
      .unwrap()
      .then(getRestaurantByBranchIdSuccess);
    form.setFieldsValue({
      self: null,
      foods: null,
    });
    setFoodData([]);
  };

  const getRestaurantByBranchIdSuccess = async (
    value: GetRestaurantByBranchIdResponse
  ) => {
    if (value?.status === 200) {
      setSelfData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getFoodsDataSuccess = async (
    value: GetFoodsByRestaurantIdMealIdAndDateResponse
  ) => {
    if (value?.status === 200) {
      setFoodData(value?.data?.[0]?.simplePlanDtos);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const changeSelfHandler = (e: number) => {
    setSelectedItems((prev) => ({ ...prev, selfId: e?.toString() }));
    form.setFieldsValue({
      foods: null,
    });
    setFoodData([]);
  };

  const changeMealHandler = (e: number) => {
    setSelectedItems((prev) => ({ ...prev, mealId: e?.toString() }));
    form.setFieldsValue({
      foods: null,
    });
    setFoodData([]);
  };

  const registerHolidayHandler = (values: FormType) => {
    const reqBody =
      Array.isArray(values?.foods) && values?.foods.length > 0
        ? values?.foods.map((item) => ({
            branchCode: values?.unit?.value,
            cancelReasonId: values?.reason?.value,
            planId: item?.code,
            reserveDate: selectedItems?.date,
            ...(values?.self?.value && { restaurantId: values?.self?.value }),
          }))
        : [
            {
              branchCode: values?.unit?.value,
              cancelReasonId: values?.reason?.value,
              reserveDate: selectedItems?.date,
              ...(values?.self?.value && { restaurantId: values?.self?.value }),
            },
          ];
    createHolidays(reqBody)
      .unwrap()
      .then((value: CreateHolidaysResponse) => {
        if (value?.status === 200) {
          onCloseDrawer();
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={form} onFinish={registerHolidayHandler}>
      <CustomDrawerHeader
        closeDrawerHandler={onCloseDrawer}
        title="ثبت تعطیلی"
        hasLeftSide
        leftSideContent={
          <div className="closing-registration-drawer-header-btn">
            <CustomButton className="drawer-action-btn" onClick={onCloseDrawer}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              className="drawer-action-btn"
              loading={isCreateHolidaysLoading}
              htmlType="submit"
            >
              ثبت تعطیلی
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <CustomAlert
            message="راهنما!"
            showIcon
            description="در صورت تعطیل بودن سلف یا دانشگاه شما می‌توانید از طریق فرم زیر روزهای تعطیل را ثبت نمایید تا دانشجو بتواند درخواست عودت وجه خود را در اپلیکیشن ثبت نماید."
          />
        </Col>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomSelect
              name="unit"
              label="واحد دانشگاهی"
              allowClear
              options={universityData ? universityData : []}
              placeholder="انتخاب کنید"
              isLoading={isUniversityDataLoading}
              form={form}
              onChange={(e) => changeBranchHandler(e as number)}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomDatePicker
              label="تاریخ تعطیلی"
              placeholder="انتخاب کنید"
              name="closingDate"
              onChange={(date, dateString) => {
                // حالت clear
                if (!date || !dateString) {
                  setSelectedItems((prev) => ({ ...prev, date: "" }));
                  form.setFieldsValue({
                    closingDate: undefined,
                    foods: null,
                  });
                  setFoodData([]);
                  return;
                }
                const gregorianDate = moment(dateString, "jYYYY-jMM-jDD").format(
                  "YYYY-MM-DD"
                );
                setSelectedItems((prev) => ({ ...prev, date: gregorianDate }));
                form.setFieldsValue({
                  closingDate: date as string | undefined,
                  foods: null,
                });
                setFoodData([]);
              }}
              form={form}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              name="reason"
              label="علت لغو"
              allowClear
              options={cancelReasonsData?.data?.map((item) => {
                return {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                };
              })}
              placeholder="انتخاب کنید"
              isLoading={isCancelReasonsDataLoading}
              form={form}
              rules={[REQUIRED_RULE]}
              onFocus={handleReasonChange}
              notFoundContent={
                isCancelReasonsDataLoading
                  ? "در حال بارگذاری..."
                  : cancelReasonsData?.data?.length === 0
                    ? "هیچ موردی یافت نشد"
                    : null
              }
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              name="self"
              label="سلف"
              allowClear
              options={selfData}
              placeholder="انتخاب کنید"
              isLoading={isRestaurantByBranchIdDataLoading}
              onChange={(e) => changeSelfHandler(e as number)}
              form={form}
            />
          </Col>

          <Col span={24}>
            <CustomSelect
              name="meal"
              label="وعده"
              allowClear
              options={mealData?.data?.map((item) => {
                return {
                  id: item.id,
                  title: item.name,
                };
              })}
              placeholder="انتخاب کنید"
              isLoading={isMealDataLoading}
              form={form}
              onChange={(e) => changeMealHandler(e as number)}
            />
          </Col>
          <Col span={24}>
            <CustomSelect
              name="foods"
              label="غذا"
              allowClear
              options={foodData?.map((item) => ({
                id: item?.id,
                title: item?.productTitle,
              }))}
              placeholder="انتخاب کنید"
              isLoading={isFoodDataLoading}
              form={form}
              mode="multiple"
              disabled={
                !selectedItems.selfId || !selectedItems.mealId || !selectedItems.date
              }
            />
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default AllFoodClosingRegistrationDrawerContent;
