import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetMyFoodScheduleDetailQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import {
  GetMyFoodScheduleDetailResponse,
  MyFoodScheduleDetailData,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

import { FoodScheduleContentProps } from "./@types/@foodScheduleContent";
import FoodScheduleDrawerInfo from "./helpers/components/FoodScheduleDrawerInfo/FoodScheduleDrawerInfo";
import FoodScheduleGiveTime from "./helpers/components/FoodScheduleGiveTime/FoodScheduleGiveTime";
import FoodScheduleReserveTime from "./helpers/components/FoodScheduleReserveTime/FoodScheduleReserveTime";
import "./_foodScheduleContent.scss";

export const FoodScheduleContent = ({
  closeDrawerHandler,
  id,
}: FoodScheduleContentProps) => {
  const [data, setData] = useState<MyFoodScheduleDetailData | null>(null);

  //? ================================  Api Calls ================================
  const [getFoodDetail, { isFetching: isFoodDetailLoading }] =
    useLazyGetMyFoodScheduleDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getData();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getFoodDetailOnSuccess = (value: GetMyFoodScheduleDetailResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getData = () => {
    if (id) {
      getFoodDetail({ planId: id.toString() }).unwrap().then(getFoodDetailOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isFoodDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات برنامه غذایی"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <CustomTag color={data?.active ? "green" : "red"}>
            {data?.active ? "فعال" : "غیرفعال"}
          </CustomTag>
        }
      />
      <div className="my-detail-self-food-schedule-drawer-content-container">
        <FoodScheduleDrawerInfo data={data} />
        <div className="time-info-container">
          <CustomDivider text="اطلاعات زمان رزرو" />
          <FoodScheduleReserveTime data={data} />
        </div>
        <div className="time-info-container">
          <CustomDivider text="اطلاعات زمان تحویل" />
          <FoodScheduleGiveTime data={data} />
        </div>
      </div>
    </Div>
  );
};
