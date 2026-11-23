import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { fetchDataIfNeeded } from "@pages/_shared/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { UseAllWalletsListBusinessAndBranchesAdvanceFilterFormType } from "../../../@types/@allWalletsListBusinessAndBranchesTab";

const useAllWalletsListBusinessAndBranchesAdvanceFilter = (
  form: FormInstance<UseAllWalletsListBusinessAndBranchesAdvanceFilterFormType>
) => {
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    triggerBusinessQuery,
    { data: businessApiData, isLoading: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  const [getBranchesData, { data: branchesData, isLoading: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  //* ================================ Util Functions ================================
  const getBusinessHandler = () =>
    fetchDataIfNeeded(!isBusinessSuccess, triggerBusinessQuery);

  const onBusinessChangeHandler = (businessId: number) => {
    if (businessId) {
      getBranchesData({
        businessIds: [businessId],
      });
    }

    form.setFieldsValue({
      branch: undefined,
    });
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "کسب و کار",
      name: "businessId",
      type: "select",
      options: businessApiData || [],
      loading: businessLoading,
      onChange: (id) => onBusinessChangeHandler(id as number),
      onClick: getBusinessHandler,
    },
    {
      label: "شعبه",
      name: "branch",
      type: "select",
      options: branchesData || [],
      loading: isBranchesDataLoading,
      disabled: form.getFieldsValue()?.businessId || params?.businessIdId ? false : true,
    },
    {
      label: "سرویس",
      name: "serviceName",
      type: "select",
      mode: "multiple",
      options: serviceOptions,
    },
  ];

  return { filterItemsList };
};

export default useAllWalletsListBusinessAndBranchesAdvanceFilter;
