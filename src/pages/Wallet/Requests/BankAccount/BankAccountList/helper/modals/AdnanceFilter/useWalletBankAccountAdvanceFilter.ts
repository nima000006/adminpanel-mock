import { useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { BankAccountAdvanceFilterFormType } from "../../../@types/@bankAccountList";

const useWalletBankAccountAdvanceFilter = (
  form: FormInstance<BankAccountAdvanceFilterFormType>
) => {
  const [branchData, setBranchData] = useState<IdTitle[]>([]);

  const { params } = useQueryParams();

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
  const [getBranchData, { isFetching: branchLoading, isSuccess: isBranchSuccess }] =
    useLazyGetBranchByBusinessQuery();

  //* ================================ Util Functions ================================
  const getBusinessHandler = () =>
    fetchDataIfNeeded(!isActiveBusinessSuccess, getActiveBusinessData);

  const onBusinessChangeHandler = (businessId: number) => {
    if (businessId) {
      getBranchData({ businessIds: [businessId] })
        .unwrap()
        .then((value: IdTitle[]) => setBranchData(value));
    }

    form.setFieldsValue({
      branchId: undefined,
    });
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "کسب و کار",
      name: "businessId",
      type: "select",
      options: businessData || [],
      loading: isActiveBusinessDataLoading,
      onChange: (id) => onBusinessChangeHandler(id as number),
      onClick: getBusinessHandler,
    },
    {
      label: "شعبه",
      name: "branchId",
      type: "select",
      options: branchData,
      loading: branchLoading,
      notFoundContent: !isBranchSuccess ? selectNotFoundContent : undefined,
      disabled: form.getFieldsValue()?.businessId || params?.businessIdId ? false : true,
    },
    {
      label: "سرویس",
      name: "serviceName",
      type: "select",
      options: serviceOptions,
    },
  ];

  return { filterItemsList };
};

export default useWalletBankAccountAdvanceFilter;
