import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useForeignNationalsRegistrationAdvanceFilter = () => {
  //* ================================ Util Functions ================================

  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "تاریخ ثبت درخواست",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useForeignNationalsRegistrationAdvanceFilter;
