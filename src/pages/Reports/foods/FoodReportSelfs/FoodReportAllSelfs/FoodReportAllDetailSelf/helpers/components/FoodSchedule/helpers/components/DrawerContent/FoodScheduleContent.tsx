import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetAllFoodScheduleDetailQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import {
  FoodScheduleDetailData,
  GetAllFoodScheduleDetailResponse,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

import { FoodScheduleContentProps } from "./@types/foodScheduleContent";
import FoodAllSelfDetailsScheduleDrawerInfo from "./helpers/components/FoodAllSelfDetailsScheduleDrawerInfo/FoodAllSelfDetailsScheduleDrawerInfo";
import FoodAllSelfDetailsScheduleDrawerInfoGiveTime from "./helpers/components/FoodAllSelfDetailsScheduleDrawerInfoGiveTime/FoodAllSelfDetailsScheduleDrawerInfoGiveTime";
import FoodAllSelfDetailsScheduleDrawerInfoReserveTime from "./helpers/components/FoodAllSelfDetailsScheduleDrawerInfoReserveTime/FoodAllSelfDetailsScheduleDrawerInfoReserveTime";
import "./_foodScheduleContent.scss";

export const FoodScheduleContent = ({
  closeDrawerHandler,
  id,
}: FoodScheduleContentProps) => {
  const [data, setData] = useState<FoodScheduleDetailData | null>(null);

  //? ================================  Api Calls ================================
  const [getFoodDetail, { isFetching: isFoodDetailLoading }] =
    useLazyGetAllFoodScheduleDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getData();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getFoodDetailOnSuccess = (value: GetAllFoodScheduleDetailResponse) => {
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
      <div className="all-detail-self-food-schedule-drawer-content-container">
        <FoodAllSelfDetailsScheduleDrawerInfo data={data} />
        <div className="time-info-container">
          <CustomDivider text="اطلاعات زمان رزرو" />
          <FoodAllSelfDetailsScheduleDrawerInfoReserveTime data={data} />
        </div>
        <div className="time-info-container">
          <CustomDivider text="اطلاعات زمان تحویل" />
          <FoodAllSelfDetailsScheduleDrawerInfoGiveTime data={data} />
        </div>
      </div>
    </Div>
  );
};
