import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useDormitoryMyStaffsAdvanceFilter = () => {
  //* ================================ Util Functions ================================
  const getAllSamimServiceHandler = () => {};

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "اقامتگاه",
      name: "residence",
      type: "select",
      mode: "multiple",
      isNeedsName: true,
      options: [],
      loading: false,
      onClick: getAllSamimServiceHandler,
    },
  ];

  return { filterItemsList };
};

export default useDormitoryMyStaffsAdvanceFilter;
