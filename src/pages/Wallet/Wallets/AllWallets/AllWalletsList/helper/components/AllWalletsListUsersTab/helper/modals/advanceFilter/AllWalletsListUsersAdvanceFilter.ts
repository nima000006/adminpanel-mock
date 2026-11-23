import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

const useAllUsersAdvanceFilter = () => {
  const [
    getAllUniversity,
    {
      data: universityData,
      isSuccess: isBranchSuccess,
      isLoading: isUniversityDataLoading,
    },
  ] = useLazyGetAllBranchesQuery();

  const advanceFilterGetInitialDataHandler = () => {
    if (!isBranchSuccess) {
      getAllUniversity();
    }
  };

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "سرویس",
      name: "serviceName",
      type: "select",
      mode: "multiple",
      options: serviceOptions,
    },
    {
      label: "شعبه",
      name: "branch",
      type: "select",
      options: universityData ? universityData : [],
      loading: isUniversityDataLoading,
      notFoundContent: !isBranchSuccess ? selectNotFoundContent : undefined,
    },
  ];

  return { filterItemsList, advanceFilterGetInitialDataHandler };
};

export default useAllUsersAdvanceFilter;
