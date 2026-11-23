import { useState } from "react";

import { FormInstance } from "antd";
import { toast } from "react-toastify";

import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import {
  GetVendorAllResponse,
  VendorAllType,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

const statusOption = [
  { id: "1", title: "فعال" },
  { id: "2", title: "غیر فعال" },
];

const useAllContactAdvanceFilter = (_form: FormInstance<any>) => {
  const [selfData, setSelfData] = useState<RestaurantType[]>([]);
  const [vendorData, setVendorData] = useState<VendorAllType[]>([]);

  const [
    getAllRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();
  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityLoaded,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getAllVendorList,
    { isFetching: isAllVendorListListLoading, isSuccess: isFetchingVendorSuccess },
  ] = useLazyGetAllVendorListQuery();
  //? ================================ Effects ================================

  //* ================================ Util Functions ================================
  const getAllRestaurantsSuccess = async (value: GetAllRestaurantsResponse) => {
    if (value?.status === 200) {
      setSelfData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const getAllVendorListSuccess = async (value: GetVendorAllResponse) => {
    if (value?.status === 200) {
      setVendorData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const fetchInitialData = () => {
    getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsSuccess);
    getAllVendorList({ isDeleted: false }).unwrap().then(getAllVendorListSuccess);
    getAllUniversity();
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
    },
    {
      label: "واحد دانشگاهی",
      name: "branchCode",
      mode: "single",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      notFoundContent: !isUniversityLoaded ? selectNotFoundContent : undefined,
      // onClick: onOpenContractsSelectClickHandler,
    },
    {
      label: "سلفها",
      name: "self",
      mode: "single",
      type: "select",
      options: selfData,
      loading: isMyRestaurantDataLoading,
      notFoundContent: !isMySelfsFetched ? selectNotFoundContent : undefined,
      onClick: () =>
        getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsSuccess),
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

export default useAllContactAdvanceFilter;
