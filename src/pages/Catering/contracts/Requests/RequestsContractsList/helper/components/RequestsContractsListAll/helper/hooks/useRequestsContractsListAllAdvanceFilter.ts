import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchListByProvinceCityBusinessQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useGetCateringSelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetAllVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  getRequestContractTypeOptionsByStatuses,
  REQUEST_CONTRACT_STATUS_OPTIONS,
} from "@pages/Catering/contracts/_shared/utils";
import { GetCateringSelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetAllVendorListResponse } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import {
  GetBasicInfoCityBasedMultipleProvinceResponse,
  GetBasicInfoProvinceAndCityResponse,
} from "@pages/Organization/_shared/components/LocationInfoSection/@types/@locationInfoSectionType";

import { RequestsContractsListAllAdvanceFilterFormType } from "../../@types/@requestsContractsListAll";

const REQUEST_TYPE_OPTIONS = getRequestContractTypeOptionsByStatuses(
  REQUEST_CONTRACT_STATUS_FILTER.all
);

const useRequestsContractsListAllAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<RequestsContractsListAllAdvanceFilterFormType>;
}) => {
  const [vendorCityData, setVendorCityData] = useState<IdTitle[]>([]);
  const [restaurantCityData, setRestaurantCityData] = useState<IdTitle[]>([]);
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [selfsData, setSelfsData] = useState<IdTitle[]>([]);
  const [vendorsData, setVendorsData] = useState<IdTitle[]>([]);
  const [branchData, setBranchData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

  const selectedVendorProvince = useWatch("vendorProvince", form);
  const selectedRestaurantProvince = useWatch("restaurantProvince", form);
  const selectedRestaurantCity = useWatch("restaurantCity", form);

  //? ================================ Api Calls ================================
  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading, isSuccess: isCityDataSuccess }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  // branches
  const [
    getBranches,
    { isLoading: isBranchesDataLoading, isSuccess: isBranchesDataSuccess },
  ] = useLazyGetBranchListByProvinceCityBusinessQuery();

  // selfs
  const [
    getCateringSelfsList,
    { isLoading: isSelfDataLoading, isSuccess: isSelfsSuccess },
  ] = useGetCateringSelfsListMutation();

  // vendors
  const [getVendors, { isLoading: isVendorsDataLoading, isSuccess: isVendorsSuccess }] =
    useGetAllVendorListMutation();

  //* ================================ Util Functions ================================

  const onGetBranchesSuccess = (value: IdTitle[]) => {
    setBranchData(value ?? []);
  };

  const onGetProvinceSuccess = (value: GetBasicInfoProvinceAndCityResponse) => {
    const provinceList = value?.map((item) => {
      return {
        id: item?.id,
        title: item?.name,
      };
    });
    setProvinceData(provinceList);
  };

  const onGetSelfsSuccess = (value: GetCateringSelfsListResponse) => {
    setSelfsData(value?.content?.map((item) => ({ id: item?.id, title: item?.title })));
  };

  const onGetVendorsSuccess = (value: GetAllVendorListResponse) => {
    setVendorsData(value?.content?.map((item) => ({ id: item?.id, title: item?.title })));
  };

  const onGetVendorCitySuccess = (
    value: GetBasicInfoCityBasedMultipleProvinceResponse
  ) => {
    const cityList = value?.map((item) => {
      return {
        id: item?.id,
        title: item?.name,
      };
    });

    setVendorCityData(cityList);
  };

  const onGetRestaurantCitySuccess = (
    value: GetBasicInfoCityBasedMultipleProvinceResponse
  ) => {
    const cityList = value?.map((item) => {
      return {
        id: item?.id,
        title: item?.name,
      };
    });

    setRestaurantCityData(cityList);
  };
  const getBranchesHandler = (override?: { provinceIds?: string; cityIds?: string }) => {
    const provinceIds =
      override && "provinceIds" in override
        ? override.provinceIds
        : selectedRestaurantProvince?.length
          ? selectedRestaurantProvince.map((value) => value?.code)?.join(",")
          : undefined;
    const cityIds =
      override && "cityIds" in override
        ? override.cityIds
        : selectedRestaurantCity?.length
          ? selectedRestaurantCity.map((value) => value?.code)?.join(",")
          : undefined;

    getBranches({
      ...(provinceIds && { provinceIds }),
      ...(cityIds && { cityIds }),
    })
      .unwrap()
      .then(onGetBranchesSuccess);
  };

  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
        .unwrap()
        .then(onGetProvinceSuccess);
    }
  };

  const getSelfsHandler = () => {
    if (!isSelfsSuccess) {
      getCateringSelfsList({
        params: {
          pageNumber: 0,
          pageSize: 100,
          sortBy: "createdDate",
          sortDirection: "DESC",
        },
        body: {
          statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        },
      })
        .unwrap()
        .then(onGetSelfsSuccess);
    }
  };

  const getVendorsHandler = () => {
    if (!isVendorsSuccess) {
      getVendors({
        params: {
          pageNumber: 0,
          pageSize: 100,
          sortBy: "createdDate",
          sortDirection: "DESC",
        },
        body: {
          statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        },
      })
        .unwrap()
        .then(onGetVendorsSuccess);
    }
  };

  // when vendor province selected
  const onVendorProvinceChangeHandler = (event: number[] | undefined) => {
    if (event?.length) {
      setVendorCityData([]);
      getCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then(onGetVendorCitySuccess);
    } else {
      setVendorCityData([]);
    }
    form.setFieldsValue({ vendorCity: undefined });
  };

  // when restaurant province selected
  const onRestaurantProvinceChangeHandler = (event: number[] | undefined) => {
    form.setFieldsValue({ restaurantCity: undefined, branch: undefined });
    setBranchData([]);

    if (event?.length) {
      setRestaurantCityData([]);
      getCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then(onGetRestaurantCitySuccess);

      getBranchesHandler({
        provinceIds: event.map((value) => value)?.join(","),
        cityIds: undefined,
      });
    } else {
      setRestaurantCityData([]);
    }
  };

  // when restaurant city selected
  const onRestaurantCityChangeHandler = (event: number[] | undefined) => {
    form.setFieldsValue({ branch: undefined });
    setBranchData([]);

    if (!event?.length && !selectedRestaurantProvince?.length) return;

    getBranchesHandler({
      provinceIds: selectedRestaurantProvince?.length
        ? selectedRestaurantProvince.map((value) => value?.code)?.join(",")
        : undefined,
      cityIds: event?.length ? event.map((value) => value)?.join(",") : undefined,
    });
  };

  //? ================================ Effects ================================
  // Restore options from URL after reload (does not wait for form hydrate)
  useEffect(() => {
    if (!isAdvanceModalOpen) return;

    if (params?.vendorProvinceId || params?.restaurantProvinceId) {
      getProvinceHandler();
    }

    if (params?.selfId) {
      getSelfsHandler();
    }

    if (params?.supplierId) {
      getVendorsHandler();
    }

    if (params?.restaurantProvinceId || params?.restaurantCityId) {
      getBranchesHandler({
        provinceIds: params?.restaurantProvinceId,
        cityIds: params?.restaurantCityId,
      });
    }
  }, [isAdvanceModalOpen]);

  // Restore vendor city options after reload
  useEffect(() => {
    if (!isAdvanceModalOpen) return;

    if (selectedVendorProvince?.length > 0) {
      getCityData({
        ids: selectedVendorProvince.map((value) => value?.code)?.join(","),
      })
        .unwrap()
        .then(onGetVendorCitySuccess);
    } else if (params?.vendorProvinceId) {
      getCityData({ ids: params.vendorProvinceId }).unwrap().then(onGetVendorCitySuccess);
    } else {
      setVendorCityData([]);
    }
  }, [isAdvanceModalOpen, selectedVendorProvince]);

  // Restore restaurant city options after reload
  useEffect(() => {
    if (!isAdvanceModalOpen) return;

    if (selectedRestaurantProvince?.length > 0) {
      getCityData({
        ids: selectedRestaurantProvince.map((value) => value?.code)?.join(","),
      })
        .unwrap()
        .then(onGetRestaurantCitySuccess);
    } else if (params?.restaurantProvinceId) {
      getCityData({ ids: params.restaurantProvinceId })
        .unwrap()
        .then(onGetRestaurantCitySuccess);
    } else {
      setRestaurantCityData([]);
    }
  }, [isAdvanceModalOpen, selectedRestaurantProvince]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان تامین کننده",
      name: "vendorProvince",
      type: "select",
      options: provinceData,
      loading: isProvinceDataLoading,
      mode: "multiple",
      onClick: getProvinceHandler,
      notFoundContent: !isProvinceSuccess ? selectNotFoundContent : undefined,
      onChange: (value) => onVendorProvinceChangeHandler(value as number[]),
    },
    {
      label: "شهر تامین کننده",
      name: "vendorCity",
      type: "select",
      options: vendorCityData,
      loading: isCityDataLoading,
      mode: "multiple",
      notFoundContent: !isCityDataSuccess ? selectNotFoundContent : undefined,
      disabled: !(selectedVendorProvince?.length > 0),
    },
    {
      label: "استان رستوران",
      name: "restaurantProvince",
      type: "select",
      options: provinceData,
      loading: isProvinceDataLoading,
      notFoundContent: !isProvinceSuccess ? selectNotFoundContent : undefined,
      mode: "multiple",
      onClick: getProvinceHandler,
      onChange: (value) => onRestaurantProvinceChangeHandler(value as number[]),
    },
    {
      label: "شهر رستوران",
      name: "restaurantCity",
      type: "select",
      options: restaurantCityData,
      loading: isCityDataLoading,
      mode: "multiple",
      disabled: !(selectedRestaurantProvince?.length > 0),
      notFoundContent: !isCityDataSuccess ? selectNotFoundContent : undefined,
      onChange: (value) => onRestaurantCityChangeHandler(value as number[]),
    },
    {
      label: "شعبه / واحد رستوران",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchData,
      loading: isBranchesDataLoading,
      onClick: () => getBranchesHandler(),
      notFoundContent: !isBranchesDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "سلف",
      name: "self",
      type: "select",
      options: selfsData,
      loading: isSelfDataLoading,
      mode: "multiple",
      onClick: getSelfsHandler,
      notFoundContent: !isSelfsSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "تامین کننده",
      name: "supplier",
      type: "select",
      options: vendorsData,
      loading: isVendorsDataLoading,
      onClick: getVendorsHandler,
      notFoundContent: !isVendorsSuccess ? selectNotFoundContent : undefined,
      mode: "multiple",
    },
    //TODO[nima]: remove when figma will be updated
    // {
    //   label: "روز شمار",
    //   name: "waitingDay",
    //   type: "select",
    //   options: REQUEST_CONTRACT_WAITING_DAY_OPTIONS,
    //   mode: "multiple",
    // },
    {
      label: "نوع درخواست",
      name: "requestType",
      type: "select",
      options: REQUEST_TYPE_OPTIONS,
      mode: "multiple",
    },
    {
      label: "وضعیت درخواست",
      name: "requestStatus",
      type: "select",
      options: REQUEST_CONTRACT_STATUS_OPTIONS,
      mode: "multiple",
    },
    {
      label: "تاریخ ارسال درخواست",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useRequestsContractsListAllAdvanceFilter;
