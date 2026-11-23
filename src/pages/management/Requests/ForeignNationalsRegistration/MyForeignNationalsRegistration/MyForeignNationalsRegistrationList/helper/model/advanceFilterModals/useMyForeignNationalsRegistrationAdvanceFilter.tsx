import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useMyForeignNationalsRegistrationAdvanceFilter = () => {
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

export default useMyForeignNationalsRegistrationAdvanceFilter;
