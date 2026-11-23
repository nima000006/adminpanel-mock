import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  documentTypeOptions,
  isPaidOptions,
} from "@pages/Finance/Accountants/_shared/utils";

const useMyBranchTurnOverListAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "وضعیت پرداخت",
      name: "isPaid",
      type: "select",
      options: isPaidOptions,
    },
    {
      label: "نوع سند",
      name: "documentType",
      type: "select",
      options: documentTypeOptions,
    },
  ];

  return { filterItemsList };
};

export default useMyBranchTurnOverListAdvanceFilter;
