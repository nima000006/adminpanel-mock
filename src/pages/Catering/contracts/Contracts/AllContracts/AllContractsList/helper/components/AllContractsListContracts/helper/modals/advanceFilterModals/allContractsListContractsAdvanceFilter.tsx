import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useGetCateringSelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetAllVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { AllContractsListContractsAdvanceFilterFormType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import { GetCateringSelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetAllVendorListResponse } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import {
  GetBasicInfoCityBasedMultipleProvinceResponse,
  GetBasicInfoProvinceAndCityResponse,
} from "@pages/Organization/_shared/components/LocationInfoSection/@types/@locationInfoSectionType";

const useAllContractsListContractsAdvanceFilter = ({
  form,
  isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<AllContractsListContractsAdvanceFilterFormType>;
}) => {
  const [vendorCityData, setVendorCityData] = useState<IdTitle[]>([]);
  const [restaurantCityData, setRestaurantCityData] = useState<IdTitle[]>([]);
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [selfsData, setSelfsData] = useState<IdTitle[]>([]);
  const [vendorsData, setVendorsData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

  const selectedVendorProvince = useWatch("vendorProvince", form);
  const selectedRestaurantProvince = useWatch("restaurantProvince", form);

  //? ================================ Api Calls ================================
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  const [getCityData, { isLoading: isCityDataLoading, isSuccess: isCityDataSuccess }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  const [
    getAllBranches,
    { data: branchData, isLoading: isBranchesDataLoading, isSuccess: isBranchesSuccess },
  ] = useLazyGetBranchByBusinessQuery();

  const [
    getCateringSelfsList,
    { isLoading: isSelfDataLoading, isSuccess: isSelfsSuccess },
  ] = useGetCateringSelfsListMutation();

  const [getVendors, { isLoading: isVendorsDataLoading, isSuccess: isVendorsSuccess }] =
    useGetAllVendorListMutation();

  //* ================================ Util Functions ================================
  const onGetProvinceSuccess = (value: GetBasicInfoProvinceAndCityResponse) => {
    const provinceList = value?.map((item) => ({
      id: item?.id,
      title: item?.name,
    }));
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
    const cityList = value?.map((item) => ({
      id: item?.id,
      title: item?.name,
    }));
    setVendorCityData(cityList);
  };

  const onGetRestaurantCitySuccess = (
    value: GetBasicInfoCityBasedMultipleProvinceResponse
  ) => {
    const cityList = value?.map((item) => ({
      id: item?.id,
      title: item?.name,
    }));
    setRestaurantCityData(cityList);
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

  const getBranchesHandler = () => {
    if (!isBranchesSuccess) {
      getAllBranches({ businessIds: [4] }); // cto told
    }
  };

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

  const onRestaurantProvinceChangeHandler = (event: number[] | undefined) => {
    form.setFieldsValue({ restaurantCity: undefined });

    if (event?.length) {
      setRestaurantCityData([]);
      getCityData({ ids: event?.map((value) => value)?.join(",") })
        .unwrap()
        .then(onGetRestaurantCitySuccess);
    } else {
      setRestaurantCityData([]);
    }
  };

  //? ================================ Effects ================================
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

    if (params?.branchId) {
      getBranchesHandler();
    }
  }, [isAdvanceModalOpen]);

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
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchData ? branchData : [],
      loading: isBranchesDataLoading,
      onClick: getBranchesHandler,
      notFoundContent: !isBranchesSuccess ? selectNotFoundContent : undefined,
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
      label: "تأمین کننده",
      name: "supplier",
      type: "select",
      options: vendorsData,
      loading: isVendorsDataLoading,
      onClick: getVendorsHandler,
      notFoundContent: !isVendorsSuccess ? selectNotFoundContent : undefined,
      mode: "multiple",
    },
    {
      label: "شروع قرارداد",
      name: "startedDate",
      type: "date",
    },
    {
      label: "پایان قرارداد",
      name: "endDate",
      type: "date",
    },
    {
      label: "استان سلف",
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
      label: "شهر سلف",
      name: "restaurantCity",
      type: "select",
      options: restaurantCityData,
      loading: isCityDataLoading,
      mode: "multiple",
      disabled: !(selectedRestaurantProvince?.length > 0),
      notFoundContent: !isCityDataSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "استان تأمین کننده",
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
      label: "شهر تأمین کننده",
      name: "vendorCity",
      type: "select",
      options: vendorCityData,
      loading: isCityDataLoading,
      mode: "multiple",
      notFoundContent: !isCityDataSuccess ? selectNotFoundContent : undefined,
      disabled: !(selectedVendorProvince?.length > 0),
    },
  ];

  return { filterItemsList };
};

export default useAllContractsListContractsAdvanceFilter;
