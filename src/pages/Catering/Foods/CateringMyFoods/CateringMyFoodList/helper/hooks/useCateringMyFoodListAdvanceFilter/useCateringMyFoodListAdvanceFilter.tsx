import { useEffect, useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import {
  useGetCateringMySelfsListMutation,
  useGetDetailMySelfsContractsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetMyVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_STATUS_TYPES_MAIN_LIST,
  CATERING_PRODUCT_CATEGORIES,
} from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetDetailMySelfsContractsResponse } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";
import { GetMyVendorListResponse } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

const useCateringMyFoodListAdvanceFilter = ({
  advanceModalOpen,
}: {
  advanceModalOpen: boolean;
}) => {
  const { params: url } = useQueryParams();
  const [baseProductOptions, setBaseProductOptions] = useState<IdTitle[]>([]);
  const [contractOptions, setContractOptions] = useState<IdTitle[]>([]);
  const [restaurantOptions, setRestaurantOptions] = useState<IdTitle[]>([]);
  const [vendorOptions, setVendorOptions] = useState<IdTitle[]>([]);

  //? ================================ Api Calls ================================
  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  const [
    getDetailMySelfsContracts,
    {
      isLoading: isGetDetailMySelfsContractsLoading,
      isSuccess: isGetDetailMySelfsContractsSuccess,
    },
  ] = useGetDetailMySelfsContractsMutation();

  const [
    getCateringMySelfsList,
    {
      isLoading: isGetCateringMySelfsListLoading,
      isSuccess: isGetCateringMySelfsListSuccess,
    },
  ] = useGetCateringMySelfsListMutation();

  const [
    getMyVendorList,
    { isLoading: isGetMyVendorListLoading, isSuccess: isGetMyVendorListSuccess },
  ] = useGetMyVendorListMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setBaseProductOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetDetailMySelfsContractsSuccess = (res: GetDetailMySelfsContractsResponse) => {
    setContractOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetCateringMySelfsListSuccess = (res: GetCateringMySelfsListResponse) => {
    setRestaurantOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetMyVendorListSuccess = (res: GetMyVendorListResponse) => {
    setVendorOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const getBaseProductsHandler = () => {
    if (isGetBasicInfoFoodsListSuccess) {
      return;
    }

    getBasicInfoFoodsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.MAIN_FOOD,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const getContractsHandler = () => {
    if (isGetDetailMySelfsContractsSuccess) {
      return;
    }

    getDetailMySelfsContracts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        contractStatus: [...REQUEST_CONTRACT_STATUS_FILTER.accepted],
      },
    })
      .unwrap()
      .then(onGetDetailMySelfsContractsSuccess);
  };

  const getRestaurantsHandler = () => {
    if (isGetCateringMySelfsListSuccess) {
      return;
    }

    getCateringMySelfsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      },
    })
      .unwrap()
      .then(onGetCateringMySelfsListSuccess);
  };

  const getVendorsHandler = () => {
    if (isGetMyVendorListSuccess) {
      return;
    }

    getMyVendorList({
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
      .then(onGetMyVendorListSuccess);
  };

  //? ================================ Effects ================================
  // Restore options after reload when filters are already applied
  useEffect(() => {
    if (!advanceModalOpen) return;

    if (url?.baseProductId) {
      getBaseProductsHandler();
    }

    if (url?.contractId) {
      getContractsHandler();
    }

    if (url?.restaurantId) {
      getRestaurantsHandler();
    }

    if (url?.vendorId) {
      getVendorsHandler();
    }
  }, [advanceModalOpen]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "غذا",
      name: "baseProduct",
      type: "select",
      mode: "multiple",
      options: baseProductOptions,
      loading: isGetBasicInfoFoodsListLoading,
      onClick: getBaseProductsHandler,
      notFoundContent: !isGetBasicInfoFoodsListSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "قرارداد",
      name: "contract",
      type: "select",
      mode: "multiple",
      options: contractOptions,
      loading: isGetDetailMySelfsContractsLoading,
      onClick: getContractsHandler,
      notFoundContent: !isGetDetailMySelfsContractsSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "سلف",
      name: "restaurant",
      type: "select",
      mode: "multiple",
      options: restaurantOptions,
      loading: isGetCateringMySelfsListLoading,
      onClick: getRestaurantsHandler,
      notFoundContent: !isGetCateringMySelfsListSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "تأمین کننده",
      name: "vendor",
      type: "select",
      mode: "multiple",
      options: vendorOptions,
      loading: isGetMyVendorListLoading,
      onClick: getVendorsHandler,
      notFoundContent: !isGetMyVendorListSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList };
};

export default useCateringMyFoodListAdvanceFilter;
