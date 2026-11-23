import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

const useMyEstelamSajedListAdvanceFilter = () => {
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
      label: "واحد دانشگاهی",
      name: "branch",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      disabled: true,
    },
    {
      label: "بازه زمانی  درخواست",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList, fetchInitialData };
};

export default useMyEstelamSajedListAdvanceFilter;
