import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllFoodScheduleDetailQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";

import {
  FoodScheduleDetailData,
  GetAllFoodScheduleDetailResponse,
} from "./@types/@foodScheduleTab";
import AllFoodScheduleDeliverTime from "./helper/components/AllFoodScheduleDeliverTime/AllFoodScheduleDeliverTime";
import AllFoodScheduleReservationTime from "./helper/components/AllFoodScheduleReservationTime/AllFoodScheduleReservationTime";
import AllFoodScheduleInfo from "./helper/components/FoodScheduleInfoSection/AllFoodScheduleInfo";
import "./_foodScheduleTab.scss";

const FoodScheduleTab = () => {
  const [data, setData] = useState<FoodScheduleDetailData | null>(null);

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getFoodDetail, { isFetching: isFoodDetailLoading }] =
    useLazyGetAllFoodScheduleDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getFoodDetailOnSuccess = (value: GetAllFoodScheduleDetailResponse) => {
    if (value?.status === 200) {
      setData(value?.data);
      setSearchParams({
        ...url,
        date: value?.data?.reserveDate,
        productId: value?.data?.productId?.toString(),
        contractId: value?.data?.productContractId,
      });
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getData = () => {
    if (url?.id) {
      getFoodDetail({ planId: url?.id }).unwrap().then(getFoodDetailOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isFoodDetailLoading} className="all-food-schedule-tab-container">
      {/* اطلاعات برنامه غذایی */}
      <CustomDivider
        text="اطلاعات برنامه غذایی"
        extraContent={
          <div className="divider-btn-container">
            <CustomTag color={data?.active ? "green" : "red"}>
              {data?.active ? "فعال" : "غیرفعال"}
            </CustomTag>
          </div>
        }
      />
      <AllFoodScheduleInfo data={data} />

      {/* اطلاعات زمان رزرو */}
      <CustomDivider text="اطلاعات زمان رزرو" />
      <AllFoodScheduleReservationTime data={data} />

      {/* اطلاعات زمان تحویل */}
      <CustomDivider text="اطلاعات زمان تحویل" />
      <AllFoodScheduleDeliverTime data={data} />
    </Div>
  );
};

export default FoodScheduleTab;
