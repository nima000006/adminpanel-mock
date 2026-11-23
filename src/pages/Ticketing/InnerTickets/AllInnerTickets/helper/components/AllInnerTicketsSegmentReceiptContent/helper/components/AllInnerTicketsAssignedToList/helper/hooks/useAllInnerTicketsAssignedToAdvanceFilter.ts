import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

const useAllInnerTicketsAssignedToAdvanceFilter = () => {
  //* ================================ Util Functions ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "استان",
      name: "province",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "شهر",
      name: "city",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "شعبه / واحد",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "سرویس",
      name: "service",
      type: "select",
      mode: "multiple",
      options: serviceOptions,
    },
    {
      label: "نوع تیکت",
      name: "ticketType",
      type: "select",
      options: [],
    },
    {
      label: "موضوع",
      name: "subjectIssue",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "تخصیص به",
      name: "asignTo",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "وضعیت تیکت",
      name: "ticketStatus",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "تاریخ ثبت تیکت",
      name: "ticketDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useAllInnerTicketsAssignedToAdvanceFilter;
