import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { toast } from "react-toastify";

import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { PLEASE_SELECT_A_SELF_FIRST } from "@pages/Food/_shared/utils/sharedFoodUtils";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import {
  GetVendorAllResponse,
  VendorAllType,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

// const statusOption = [
//   { id: "1", title: "فعال" },
//   { id: "2", title: "غیر فعال" },
// ];

const useAllFoodAdvanceFilter = (_form: FormInstance<any>) => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [vendorData, setVendorData] = useState<VendorAllType[]>([]);
  const [selfData, setSelfData] = useState<RestaurantType[]>([]);

  const { params } = useQueryParams();

  const [
    getAllRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetAllRestaurantsQuery();

  const [
    getAllVendorList,
    { isFetching: isAllVendorListListLoading, isSuccess: isFetchingVendorSuccess },
  ] = useLazyGetAllVendorListQuery();

  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityLoaded,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getAllContractsBySelfId,
    { isFetching: isAllContractsBySelfIdLoading, isSuccess: isContractsFetched },
  ] = useLazyGetAllContractsBySelfIdQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.selfId) {
      setRestaurantId(params?.selfId);
    }
  }, []);

  //* ================================ Util Functions ================================
  const onOpenContractsSelectClickHandler = () => {
    if (!restaurantId) {
      return toast.warning(PLEASE_SELECT_A_SELF_FIRST, {
        toastId: PLEASE_SELECT_A_SELF_FIRST,
      });
    }
    return getAllContractsBySelfId({ restaurantId })
      .unwrap()
      .then((res: GetAllContractsBySelfIdResponse) => {
        if (res?.status === 200) {
          setContractData(res?.data?.contractDtoList);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
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

  const getAllRestaurantsSuccess = async (value: GetAllRestaurantsResponse) => {
    if (value?.status === 200) {
      setSelfData(value?.data);
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
    // {
    //   label: "وضعیت",
    //   name: "status",
    //   mode: "single",
    //   type: "select",
    //   options: statusOption,
    //   loading: false,
    //   notFoundContent: undefined,
    // },
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
      label: "سلف",
      name: "self",
      mode: "single",
      type: "select",
      options: selfData,
      loading: isMyRestaurantDataLoading,
      notFoundContent: !isMySelfsFetched ? selectNotFoundContent : undefined,
      //   onClick: () => getAllRestaurants({ isDeletedEnabled: false }),
      onChange: (value: string) => {
        setRestaurantId(value);
      },
    },
    {
      label: "قراداد",
      name: "contract",
      mode: "single",
      type: "select",
      options: contractData ? contractData : [],
      loading: isAllContractsBySelfIdLoading,
      notFoundContent: !isContractsFetched ? selectNotFoundContent : undefined,
      onClick: onOpenContractsSelectClickHandler,
    },
    {
      label: "تأمین کننده",
      name: "vendor",
      mode: "single",
      type: "select",
      options: vendorData,
      loading: isAllVendorListListLoading,
      notFoundContent: !isFetchingVendorSuccess ? selectNotFoundContent : undefined,
      // onClick: getAllVendorList,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useAllFoodAdvanceFilter;
