import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useCreateNewAllFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { useGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { CREATE_NEW_FOOD_SUCCESS_MSG } from "@pages/Food/Foods/_Shared/utils/FoodsUtils";
import { dateCreator } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";
import { CreateNewAllFoodScheduleResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";

import {
  AllFoodsAddScheduleDrawerContentProps,
  FormData,
} from "./@types/@allFoodsAddSchedulesDrawerContent";
import AllFoodsAddSchedulesDrawerContentBody from "./helpers/components/AllFoodsAddSchedulesDrawerContentBody/AllFoodsAddSchedulesDrawerContentBody";

import "./_allFoodsAddSchedulesDrawerContent.scss";

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

const AllFoodsAddSchedulesDrawerContent = ({
  closeDrawerHandler,
  foodData,
}: AllFoodsAddScheduleDrawerContentProps) => {
  const [hasFoodCountLimit, setHasFoodCountLimit] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFoodScheduleType, setIsFoodScheduleType] = useState(false);
  const [foodScheduleDate, setFoodScheduleDate] = useState<null | string>(null);
  const [form] = Form.useForm<FormData>();
  const id = foodData?.id;

  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [addFoodSchedule, { isLoading: isCreateNewFoodScheduleLoading }] =
    useCreateNewAllFoodScheduleMutation();

  const { data: mealData, isLoading: isMealDataLoading } = useGetMealAllQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
  }, []);

  //* ================================ Util Functions ================================
  const addFoodScheduleHandler = () => {
    form.submit();

    form.validateFields().then((value: FormData) => {
      addFoodSchedule({
        active: isActive,
        reserveDate: foodScheduleDate ? foodScheduleDate : "",
        requestType: value?.foodScheduleType?.code,
        branches: value?.universityUnit?.map((item) => item?.code),
        // todo[shirin]: uncomment when necessary this feature.
        // discount: +value?.discount,
        discount: 0,
        basePrice: +value?.price,
        maxTotalPerPerson: isFoodScheduleType ? +value?.maxReserveCount : 1,
        limitedCount: hasFoodCountLimit,
        maxCount: +value?.foodTotalCount,
        productId: +id!,
        mealId: value?.meal?.code,
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

  const onCreateNewFoodScheduleSuccess = useCallback(
    async (value: CreateNewAllFoodScheduleResponse) => {
      if (value?.status === 200) {
        toast.success(CREATE_NEW_FOOD_SUCCESS_MSG, {
          toastId: CREATE_NEW_FOOD_SUCCESS_MSG,
        });
        closeDrawerHandler();
      } else {
        toast.error(value?.msg);
      }
    },
    []
  );

  const foodTotalCountHandler = (value: string) => {
    if (value === foodScheduleTypeData[1].id.toString()) {
      setHasFoodCountLimit(true);
    } else {
      setHasFoodCountLimit(false);
    }
  };

  // change food type
  const changeFoodScheduleTypeHandler = (value: string) => {
    if (value === "1") {
      setIsFoodScheduleType(true);
    } else {
      setIsFoodScheduleType(false);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="all-foods-add-schedules-drawer-container">
      <CustomDrawerHeader
        title="افزودن به برنامه غذایی"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-header-btn">
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
              onClick={addFoodScheduleHandler}
              className="drawer-action-btn"
              htmlType="submit"
              loading={isCreateNewFoodScheduleLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <AllFoodsAddSchedulesDrawerContentBody
        setFoodScheduleDate={setFoodScheduleDate}
        form={form}
        mealData={mealData}
        isMealDataLoading={isMealDataLoading}
        universityData={universityData}
        isUniversityDataLoading={isUniversityDataLoading}
        hasFoodCountLimit={hasFoodCountLimit}
        foodTotalCountHandler={foodTotalCountHandler}
        changeFoodScheduleTypeHandler={changeFoodScheduleTypeHandler}
        isFoodScheduleType={isFoodScheduleType}
        foodScheduleTypeData={foodScheduleTypeData}
        foodData={foodData}
      />
    </Form>
  );
};

export default AllFoodsAddSchedulesDrawerContent;
