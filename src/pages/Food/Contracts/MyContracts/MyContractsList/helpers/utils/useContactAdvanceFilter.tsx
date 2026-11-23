import { useState } from "react";

import { FormInstance } from "antd";
import { toast } from "react-toastify";

import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetMyVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import {
  GetVendorMyResponse,
  VendorMyType,
} from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

const statusOption = [
  { id: "1", title: "فعال" },
  { id: "2", title: "غیر فعال" },
];

const useContactAdvanceFilter = (_form: FormInstance<any>) => {
  const [vendorData, setVendorData] = useState<VendorMyType[]>([]);
  const [selfData, setSelfData] = useState<MyRestaurantType[]>([]);

  const [
    getMyRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetMyRestaurantsQuery();

  const [
    getAllVendorList,
    { isFetching: isAllVendorListListLoading, isSuccess: isFetchingVendorSuccess },
  ] = useLazyGetMyVendorListQuery();
  //? ================================ Effects ================================

  //* ================================ Util Functions ================================
  const getMyVendorListSuccess = async (value: GetVendorMyResponse) => {
    if (value?.status === 200) {
      setVendorData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getMyRestaurantsSuccess = async (value: GetMyRestaurantsResponse) => {
    if (value?.status === 200) {
      setSelfData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const fetchInitialData = () => {
    getMyRestaurants().unwrap().then(getMyRestaurantsSuccess);
    getAllVendorList().unwrap().then(getMyVendorListSuccess);
  };

  const filterItemsList: any[] = [
    {
      label: "وضعیت",
      name: "status",
      mode: "single",
      type: "select",
      options: statusOption,
      loading: false,
      notFoundContent: undefined,
      // onClick: getMyRestaurants,
    },
    {
      label: "سلفها",
      name: "self",
      mode: "single",
      type: "select",
      options: selfData,
      loading: isMyRestaurantDataLoading,
      notFoundContent: !isMySelfsFetched ? selectNotFoundContent : undefined,
    },
    {
      label: "تأمین کننده",
      name: "vendor",
      mode: "single",
      type: "select",
      options: vendorData,
      loading: isAllVendorListListLoading,
      notFoundContent: !isFetchingVendorSuccess ? selectNotFoundContent : undefined,
      onClick: getAllVendorList,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useContactAdvanceFilter;
