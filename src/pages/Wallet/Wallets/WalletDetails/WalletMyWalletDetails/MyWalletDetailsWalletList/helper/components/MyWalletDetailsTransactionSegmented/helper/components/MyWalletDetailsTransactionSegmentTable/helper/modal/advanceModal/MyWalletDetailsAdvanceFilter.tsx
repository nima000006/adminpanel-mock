import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useMyWalletDetailsAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "بازه زمانی  تراکنش",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useMyWalletDetailsAdvanceFilter;
