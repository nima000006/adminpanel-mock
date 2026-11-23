import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

const useAgentAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "سرویس",
      name: "service",
      type: "select",
      mode: "multiple",
      options: serviceOptions,
    },
    {
      label: "موضوع مشکل",
      name: "subjectIssue",
      type: "select",
      mode: "multiple",
      options: [],
    },
    {
      label: "کسب و کار",
      name: "business",
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
  ];

  return { filterItemsList };
};

export default useAgentAdvanceFilter;
