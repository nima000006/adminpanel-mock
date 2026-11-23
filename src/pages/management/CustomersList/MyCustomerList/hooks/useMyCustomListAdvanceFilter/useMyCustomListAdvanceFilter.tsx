import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useMyCustomListAdvanceFilter = () => {
  //? ================================  Api Calls ================================

  //? ================================ Effects ================================

  //* ================================ Util Functions ================================

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "ایجاد از تا",
      name: "fromCreatedDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useMyCustomListAdvanceFilter;
