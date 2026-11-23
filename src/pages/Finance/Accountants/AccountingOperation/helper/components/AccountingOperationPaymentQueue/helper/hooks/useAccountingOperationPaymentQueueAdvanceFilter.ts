import { useEffect, useState } from "react";

import { FormInstance, useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetActiveBusinessListQuery,
  useLazyGetBranchListByProvinceCityBusinessQuery,
} from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AccountingOperationPaymentQueueAdvanceFilterFormType } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

const useAccountingOperationPaymentQueueAdvanceFilter = ({
  isAdvanceModalOpen,
  form,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<AccountingOperationPaymentQueueAdvanceFilterFormType>;
}) => {
  const [services, setServices] = useState<GetAllSamimServiceResponse>();
  const [branches, setBranches] = useState<IdTitle[]>();
  const { params } = useQueryParams();

  const selectedBusiness = useWatch("business", form);

  //? ================================  Api Calls ================================
  // business
  const [
    getActiveBusinessData,
    {
      data: businessData,
      isLoading: isActiveBusinessDataLoading,
      isSuccess: isActiveBusinessSuccess,
    },
  ] = useLazyGetActiveBusinessListQuery();

  // branches
  const [
    getBranchesData,
    { isFetching: isBranchesDataLoading, isSuccess: isGetAllBranchSuccess },
  ] = useLazyGetBranchListByProvinceCityBusinessQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    // business
    if (params?.businessId) {
      getActiveBusinessData();
    }

    // services
    if (params?.servicesId) {
      getAllSamimServiceHandler();
    }

    // BRANCH
    if (params?.servicesId) {
      getAllSamimServiceHandler();
    }
  }, [isAdvanceModalOpen]);

  // branches
  useEffect(() => {
    if (isAdvanceModalOpen && selectedBusiness) {
      getBranchesData({
        ...(selectedBusiness && {
          businessIds: selectedBusiness?.map((value) => value?.code)?.join(","),
        }),
      })
        .unwrap()
        .then((res) => setBranches(res));
    }
  }, [selectedBusiness, isAdvanceModalOpen, getBranchesData]);

  //* ================================ Util Functions ================================

  //  business
  const getBusinessHandler = () => {
    if (!isActiveBusinessSuccess) {
      getActiveBusinessData();
    }
  };
  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // BRANCH
  const getAllSamimBranchHandler = () => {
    if (!isGetAllBranchSuccess) {
      getBranchesData()
        .unwrap()
        .then((res) => setBranches(res));
    }
  };
  // when business selected
  const onBusinessChangeHandler = () => {
    form.setFieldsValue({ branch: undefined });
  };
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "کسب و کار",
      name: "business",
      type: "select",
      mode: "multiple",
      loading: isActiveBusinessDataLoading,
      options: businessData ? businessData : [],
      onClick: getBusinessHandler,
      onChange: onBusinessChangeHandler,
    },
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branches,
      loading: isBranchesDataLoading,
      onClick: getAllSamimBranchHandler,
    },
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      isNeedsName: true,
      options: services,
      loading: isGetAllSamimServiceLoading,
      onClick: getAllSamimServiceHandler,
    },
  ];

  return { filterItemsList };
};

export default useAccountingOperationPaymentQueueAdvanceFilter;
