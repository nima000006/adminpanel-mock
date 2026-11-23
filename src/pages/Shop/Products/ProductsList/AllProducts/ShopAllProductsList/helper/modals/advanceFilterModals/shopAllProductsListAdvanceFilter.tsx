import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useShopAllProductsListAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "وضعیت نمایش",
      name: "displayStatus",
      type: "select",
      options: [
        { id: 1, title: "قابل نمایش" },
        { id: 2, title: "غیر قابل نمایش" },
      ],
    },
  ];

  return { filterItemsList };
};

export default useShopAllProductsListAdvanceFilter;
