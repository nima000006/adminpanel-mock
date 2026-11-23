import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyFoodScheduleDetailQuery } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";

import {
  GetMyFoodScheduleDetailResponse,
  MyFoodScheduleDetailData,
} from "./@types/@foodScheduleTab";
import MyFoodScheduleDeliverTime from "./helper/components/MyFoodScheduleDeliverTime/MyFoodScheduleDeliverTime";
import MyFoodScheduleInfo from "./helper/components/MyFoodScheduleInfo/MyFoodScheduleInfo";
import MyFoodScheduleReservationTime from "./helper/components/MyFoodScheduleReservationTime/MyFoodScheduleReservationTime";
import "./_foodScheduleTab.scss";

const MyFoodScheduleTab = () => {
  const [data, setData] = useState<MyFoodScheduleDetailData | null>(null);
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getFoodDetail, { isFetching: isFoodDetailLoading }] =
    useLazyGetMyFoodScheduleDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [url?.id]);

  //* ================================ Util Functions ================================
  // Success
  const getFoodDetailOnSuccess = (value: GetMyFoodScheduleDetailResponse) => {
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

  // Requests
  const getData = () => {
    if (url?.id) {
      getFoodDetail({ planId: url?.id }).unwrap().then(getFoodDetailOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isFoodDetailLoading} className="my-food-schedule-tab-container">
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
      <MyFoodScheduleInfo data={data} />

      <CustomDivider text="اطلاعات زمان رزرو" />
      <MyFoodScheduleReservationTime data={data} />

      <CustomDivider text="اطلاعات زمان تحویل" />
      <MyFoodScheduleDeliverTime data={data} />
    </Div>
  );
};

export default MyFoodScheduleTab;
