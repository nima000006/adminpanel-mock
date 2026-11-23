import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";

const useTicketingSmartAnswerListAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      options: [{ id: 1, title: "تغذیه" }],
      //   loading: ServiceLoading,
      //   onClick: () => {
      //     if (!ServiceData) {
      //       triggerService();
      //     }
      //   },
      isNeedsName: true,
    },

    {
      label: "بازه زمانی",
      name: "date",
      type: "range",
    },

    {
      label: "وضعیت پاسخ",
      name: "status",
      type: "select",
      mode: "multiple",
      options: [{ id: 1, title: "حل شده" }],
      //   loading: ServiceLoading,
      //   onClick: () => {
      //     if (!ServiceData) {
      //       triggerService();
      //     }
      //   },
      isNeedsName: true,
    },
  ];
  return { filterItemsList };
};
export default useTicketingSmartAnswerListAdvanceFilter;
