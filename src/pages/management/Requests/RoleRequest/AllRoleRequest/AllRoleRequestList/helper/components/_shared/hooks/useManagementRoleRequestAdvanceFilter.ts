import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const useManagementRoleRequestAdvanceFilter = () => {
  //? ================================  Api Calls ================================
  //  واحد دانشگاهی
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //* ================================ Util Functions ================================
  const fetchInitialData = () => {
    getAllUniversity();
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "کد واحد درخواستی کاربر",
      name: "branchCode",
      type: "select",
      mode: "multiple",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useManagementRoleRequestAdvanceFilter;
