import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { toast } from "react-toastify";

import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetMyContractsBySelfIdQuery } from "@infra/states/redux/Apis/food/self/selfApis";
import { useLazyGetMyVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { PLEASE_SELECT_A_SELF_FIRST } from "@pages/Food/_shared/utils/sharedFoodUtils";
import { AllContractsListItem } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { GetMyContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import {
  GetVendorMyResponse,
  VendorMyType,
} from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

const useMyFoodAdvanceFilter = (_form: FormInstance<any>) => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [contractData, setContractData] = useState<AllContractsListItem[] | []>([]);
  const [vendorData, setVendorData] = useState<VendorMyType[]>([]);
  const [selfData, setSelfData] = useState<MyRestaurantType[]>([]);

  const { params } = useQueryParams();

  const [
    getMyRestaurants,
    { isFetching: isMyRestaurantDataLoading, isSuccess: isMySelfsFetched },
  ] = useLazyGetMyRestaurantsQuery();

  const [
    getMyVendorList,
    { isFetching: isAllVendorListListLoading, isSuccess: isFetchingVendorSuccess },
  ] = useLazyGetMyVendorListQuery();

  const [
    getMyContractsBySelfId,
    { isFetching: isAllContractsBySelfIdLoading, isSuccess: isContractsFetched },
  ] = useLazyGetMyContractsBySelfIdQuery();
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
    return getMyContractsBySelfId({ restaurantId })
      .unwrap()
      .then((res: GetMyContractsBySelfIdResponse) => {
        if (res?.status === 200) {
          setContractData(res?.data?.contractDtoList);
        } else {
          return toast.error((res?.data || res?.msg) as any, {
            toastId: (res?.data || res?.msg) as any,
          });
        }
      });
  };

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
    getMyVendorList().unwrap().then(getMyVendorListSuccess);
  };

  const filterItemsList: any[] = [
    // {
    //   label: "واحد دانشگاهی",
    //   name: "branchCode",
    //   mode: "single",
    //   type: "select",
    //   options: universityData?.data
    //     ? universityData?.data?.map((item) => {
    //         return { title: item?.branchName, id: item?.branchCode };
    //       })
    //     : [],
    //   loading: isUniversityDataLoading,
    //   notFoundContent: !isUniversityLoaded ? selectNotFoundContent : undefined,
    //   // onClick: onOpenContractsSelectClickHandler,
    // },
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

export default useMyFoodAdvanceFilter;
