import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useAllCustomListAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "ایجاد از تا",
      name: "fromCreatedDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useAllCustomListAdvanceFilter;
