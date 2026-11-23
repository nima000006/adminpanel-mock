import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetCateringMySelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetMyVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  getRequestContractTypeOptionsByStatuses,
  REQUEST_CONTRACT_STATUS_OPTIONS,
} from "@pages/Catering/contracts/_shared/utils";
import { MyContractsListRequestsAdvanceFilterFormType } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/@types/@myContractsListRequests";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetMyVendorListResponse } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

const REQUEST_TYPE_OPTIONS = getRequestContractTypeOptionsByStatuses(
  REQUEST_CONTRACT_STATUS_FILTER.all
);

const useMyContractsListRequestsAdvanceFilter = ({
  isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<MyContractsListRequestsAdvanceFilterFormType>;
}) => {
  const [selfsData, setSelfsData] = useState<IdTitle[]>([]);
  const [vendorsData, setVendorsData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getCateringMySelfsList,
    { isLoading: isSelfDataLoading, isSuccess: isSelfsSuccess },
  ] = useGetCateringMySelfsListMutation();

  const [getVendors, { isLoading: isVendorsDataLoading, isSuccess: isVendorsSuccess }] =
    useGetMyVendorListMutation();

  //* ================================ Util Functions ================================
  const onGetSelfsSuccess = (value: GetCateringMySelfsListResponse) => {
    setSelfsData(value?.content?.map((item) => ({ id: item?.id, title: item?.title })));
  };

  const onGetVendorsSuccess = (value: GetMyVendorListResponse) => {
    setVendorsData(value?.content?.map((item) => ({ id: item?.id, title: item?.title })));
  };

  const getSelfsHandler = () => {
    if (!isSelfsSuccess) {
      getCateringMySelfsList({
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

  //? ================================ Effects ================================
  useEffect(() => {
    if (!isAdvanceModalOpen) return;

    if (params?.selfId) {
      getSelfsHandler();
    }

    if (params?.supplierId) {
      getVendorsHandler();
    }
  }, [isAdvanceModalOpen]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
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
  ];

  return { filterItemsList };
};

export default useMyContractsListRequestsAdvanceFilter;
