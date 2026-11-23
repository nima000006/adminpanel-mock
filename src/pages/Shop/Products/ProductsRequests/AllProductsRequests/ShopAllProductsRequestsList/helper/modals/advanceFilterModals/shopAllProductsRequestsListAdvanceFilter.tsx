import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useShopAllProductsRequestsListAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "تاریخ ثبت",
      name: "created",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useShopAllProductsRequestsListAdvanceFilter;
