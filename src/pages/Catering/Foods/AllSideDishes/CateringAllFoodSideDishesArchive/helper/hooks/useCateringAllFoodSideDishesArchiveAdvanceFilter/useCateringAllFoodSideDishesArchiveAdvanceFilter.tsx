import { useEffect, useState } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import {
  useGetCateringSelfsListMutation,
  useGetDetailAllSelfsContractsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetAllVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_PRODUCT_CATEGORIES } from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import { GetCateringSelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetDetailAllSelfsContractsResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import { GetAllVendorListResponse } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";

const useCateringAllFoodSideDishesArchiveAdvanceFilter = ({
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
    getDetailAllSelfsContracts,
    {
      isLoading: isGetDetailAllSelfsContractsLoading,
      isSuccess: isGetDetailAllSelfsContractsSuccess,
    },
  ] = useGetDetailAllSelfsContractsMutation();

  const [
    getCateringSelfsList,
    {
      isLoading: isGetCateringSelfsListLoading,
      isSuccess: isGetCateringSelfsListSuccess,
    },
  ] = useGetCateringSelfsListMutation();

  const [
    getAllVendorList,
    { isLoading: isGetAllVendorListLoading, isSuccess: isGetAllVendorListSuccess },
  ] = useGetAllVendorListMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setBaseProductOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetDetailAllSelfsContractsSuccess = (
    res: GetDetailAllSelfsContractsResponse
  ) => {
    setContractOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetCateringSelfsListSuccess = (res: GetCateringSelfsListResponse) => {
    setRestaurantOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetAllVendorListSuccess = (res: GetAllVendorListResponse) => {
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
        productCategoryId: CATERING_PRODUCT_CATEGORIES.SIDE_DISH,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const getContractsHandler = () => {
    if (isGetDetailAllSelfsContractsSuccess) {
      return;
    }

    getDetailAllSelfsContracts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {},
    })
      .unwrap()
      .then(onGetDetailAllSelfsContractsSuccess);
  };

  const getRestaurantsHandler = () => {
    if (isGetCateringSelfsListSuccess) {
      return;
    }

    getCateringSelfsList({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {},
    })
      .unwrap()
      .then(onGetCateringSelfsListSuccess);
  };

  const getVendorsHandler = () => {
    if (isGetAllVendorListSuccess) {
      return;
    }

    getAllVendorList({
      params: {
        pageNumber: 0,
        pageSize: 100,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {},
    })
      .unwrap()
      .then(onGetAllVendorListSuccess);
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
      label: "مخلفات",
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
      loading: isGetDetailAllSelfsContractsLoading,
      onClick: getContractsHandler,
      notFoundContent: !isGetDetailAllSelfsContractsSuccess
        ? selectNotFoundContent
        : undefined,
    },
    {
      label: "سلف",
      name: "restaurant",
      type: "select",
      mode: "multiple",
      options: restaurantOptions,
      loading: isGetCateringSelfsListLoading,
      onClick: getRestaurantsHandler,
      notFoundContent: !isGetCateringSelfsListSuccess ? selectNotFoundContent : undefined,
    },
    {
      label: "تأمین کننده",
      name: "vendor",
      type: "select",
      mode: "multiple",
      options: vendorOptions,
      loading: isGetAllVendorListLoading,
      onClick: getVendorsHandler,
      notFoundContent: !isGetAllVendorListSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList };
};

export default useCateringAllFoodSideDishesArchiveAdvanceFilter;
