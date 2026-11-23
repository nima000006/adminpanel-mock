import { useCallback, useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
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
import MyFoodScheduleTabDrawerContent from "./helper/drawer/MyFoodScheduleTabDrawerContent/MyFoodScheduleTabDrawerContent";
import "./_foodScheduleTab.scss";

const MyFoodScheduleTab = () => {
  const [data, setData] = useState<MyFoodScheduleDetailData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getFoodDetail, { isFetching: isFoodDetailLoading }] =
    useLazyGetMyFoodScheduleDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
    setIsDrawerOpen(false);
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

  // drawer handler
  const openDrawerHandler = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          className="my-food-schedule-tab-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <MyFoodScheduleTabDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              getListData={getData}
              foodScheduleInfo={data}
              isDrawerOpen={isDrawerOpen}
            />
          }
        />
      )}
      <Div loading={isFoodDetailLoading} className="my-food-schedule-tab-container">
        <CustomDivider
          text="اطلاعات برنامه غذایی"
          extraContent={
            <div className="divider-btn-container">
              <CustomTag color={data?.active ? "green" : "red"}>
                {data?.active ? "فعال" : "غیرفعال"}
              </CustomTag>
              <CustomButton
                type="primary"
                ghost
                icon={<AiOutlineEdit />}
                onClick={openDrawerHandler}
              >
                ویرایش
              </CustomButton>
            </div>
          }
        />
        <MyFoodScheduleInfo data={data} />

        <CustomDivider text="اطلاعات زمان رزرو" />
        <MyFoodScheduleReservationTime data={data} />

        <CustomDivider text="اطلاعات زمان تحویل" />
        <MyFoodScheduleDeliverTime data={data} />
      </Div>
    </>
  );
};

export default MyFoodScheduleTab;
