import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useEstelamMyAmozeshyarAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "بازه زمانی  درخواست",
      name: "date",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useEstelamMyAmozeshyarAdvanceFilter;
