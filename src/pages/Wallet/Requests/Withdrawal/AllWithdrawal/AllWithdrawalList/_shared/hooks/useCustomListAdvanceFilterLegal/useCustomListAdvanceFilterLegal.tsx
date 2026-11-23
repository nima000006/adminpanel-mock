import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAllManagementSamimServicesQuery } from "@infra/states/redux/Apis/management/requests/requestApi";

import { UseCustomListAdvanceFilterFormType } from "./@types/UseCustomListAdvanceFilterFormType";

const useCustomListAdvanceFilterPersonal = (
  form: FormInstance<UseCustomListAdvanceFilterFormType>
) => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);

  //? ================================ Api ================================
  const [getBusinessData, { data: businessData, isLoading: businessLoading }] =
    useLazyGetActiveBusinessListQuery();

  const [getBranchesData, { data: branchesData, isLoading: branchLoading }] =
    useLazyGetBranchByBusinessQuery();

  const [triggerServiceQuery, { data: serviceApiData, isLoading: serviceLoading }] =
    useLazyGetAllManagementSamimServicesQuery();

  //? ================================ Effects ================================

  const fetchInitialData = () => {
    getBusinessData();
    triggerServiceQuery();
  };

  // Load branches when businessId changes
  useEffect(() => {
    if (selectedBusinessId) {
      getBranchesData({ businessIds: [selectedBusinessId] });
    }

    // Reset branchId in form whenever business changes
    form.setFieldsValue({ branchId: undefined });
  }, [selectedBusinessId]);

  // ================================ Util functions ================================

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "سرویس",
      name: "samimService",
      type: "select",
      options: serviceApiData,
      loading: serviceLoading,
    },
    {
      label: "کسب و کار",
      name: "businessId",
      type: "select",
      options: businessData ?? [],
      onChange: (value: unknown) => {
        setSelectedBusinessId(value as number);
      },
      loading: businessLoading,
    },
    {
      label: "شعبه",
      name: "branchId",
      type: "select",
      options: selectedBusinessId ? (branchesData ?? []) : [],
      disabled: !selectedBusinessId || !form.getFieldsValue()?.businessId,
      loading: branchLoading,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useCustomListAdvanceFilterPersonal;
