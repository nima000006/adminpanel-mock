import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
const useFinanceReturnMoneyAdvanceFilter = () => {
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
    {
      label: "بازه زمانی",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList, advanceFilterGetInitialDataHandler };
};

export default useFinanceReturnMoneyAdvanceFilter;
