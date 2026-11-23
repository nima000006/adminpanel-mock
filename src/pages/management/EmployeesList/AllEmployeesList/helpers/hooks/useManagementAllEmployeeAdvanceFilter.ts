import { useEffect } from "react";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const useManagementAllEmployeeAdvanceFilter = ({
  isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
}) => {
  //? ================================ API ================================
  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (isAdvanceModalOpen) {
      getAllUniversity();
    }
  }, [isAdvanceModalOpen]);

  //* ================================ Util Functions ================================

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "شعبه / واحد",
      name: "branch",
      mode: "multiple",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
    },
  ];

  return { filterItemsList };
};

export default useManagementAllEmployeeAdvanceFilter;
