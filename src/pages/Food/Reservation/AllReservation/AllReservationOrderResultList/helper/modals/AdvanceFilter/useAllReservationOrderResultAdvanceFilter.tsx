import { useState } from "react";

import { toast } from "react-toastify";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetMealAllQuery } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { RestaurantType } from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { foodDeliveryOptionsList } from "@pages/Food/Reservation/utils/ReservationUtils";

const requestTypeOptions = [
  { id: 0, title: "یارانه‌ای" },
  { id: 1, title: "اضافی" },
  { id: 2, title: "روز فروش" },
];

const useAllReservationOrderResultAdvanceFilter = () => {
  const [selfs, setSelfs] = useState<RestaurantType[]>([]);

  //? ================================  Api Calls ================================
  const [
    getBranches,
    {
      data: branchesData,
      isLoading: isBranchesDataLoading,
      isSuccess: isBranchesDataFetched,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getAllSelfs,
    { isFetching: isGetAllSelfsDataLoading, isSuccess: isGetAllSelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [
    getMealData,
    { data: mealData, isLoading: isMealDataLoading, isSuccess: isGetMealSuccess },
  ] = useLazyGetMealAllQuery();

  // ================================ Filter Items ================================
  const onBranchHandler = () => {
    if (!isBranchesDataFetched) {
      getBranches();
    }
  };
  const onSelfSelectHandler = () => {
    if (!isGetAllSelfsFetched) {
      return getAllSelfs({
        isDeleted: false,
      })
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            setSelfs(res?.data);
          } else {
            return toast.error((res?.data || res?.msg) as any, {
              toastId: (res?.data || res?.msg) as any,
            });
          }
        });
    }
  };

  const onMealHandler = () => {
    if (!isGetMealSuccess) {
      getMealData();
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "تاریخ",
      name: "date",
      type: "range",
    },
    {
      label: "نام",
      name: "firstName",
      type: "input",
    },
    {
      label: "نام خانوادگی",
      name: "lastName",
      type: "input",
    },
    {
      label: "کد ملی / اتباع",
      name: "username",
      type: "input",
    },
    {
      label: "شماره دانشجویی",
      name: "studentNumber",
      type: "input",
    },
    {
      label: "واحد دانشگاهی",
      name: "branchCode",
      type: "select",
      options: branchesData ? branchesData : [],
      loading: isBranchesDataLoading,
      onClick: onBranchHandler,
    },
    {
      label: "سلف",
      name: "restaurantId",
      type: "select",
      options: selfs,
      loading: isGetAllSelfsDataLoading,
      onClick: onSelfSelectHandler,
    },
    {
      label: "نوع",
      name: "requestType",
      type: "select",
      options: requestTypeOptions,
    },
    {
      label: "وعده",
      name: "mealId",
      type: "select",
      options: mealData?.data?.map((item) => {
        return {
          id: item.id,
          title: item.name,
        };
      }),
      onClick: onMealHandler,
      loading: isMealDataLoading,
    },
    {
      label: "وضعیت تحویل",
      name: "delivery",
      type: "select",
      options: foodDeliveryOptionsList,
    },
  ];

  return { filterItemsList };
};

export default useAllReservationOrderResultAdvanceFilter;
