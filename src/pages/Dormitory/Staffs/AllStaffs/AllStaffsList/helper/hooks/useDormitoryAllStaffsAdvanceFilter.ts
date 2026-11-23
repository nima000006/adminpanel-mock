import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useDormitoryAllStaffsAdvanceFilter = () => {
  //* ================================ Util Functions ================================
  const getBusinessHandler = () => {};
  const getAllSamimBranchHandler = () => {};
  const getAllSamimServiceHandler = () => {};

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "کسب و کار",
      name: "business",
      type: "select",
      mode: "multiple",
      loading: false,
      options: [],
      onClick: getBusinessHandler,
    },
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: [],
      loading: false,
      onClick: getAllSamimBranchHandler,
    },
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

export default useDormitoryAllStaffsAdvanceFilter;
