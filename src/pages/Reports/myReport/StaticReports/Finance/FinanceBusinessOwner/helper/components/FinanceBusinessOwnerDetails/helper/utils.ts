import { FinanceBusinessOwnerDetailsTabKey } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerDetails/@types/@financeBusinessOwnerDetails";

export const getFirstColumnTitle = (tab: FinanceBusinessOwnerDetailsTabKey) => {
  switch (tab) {
    case "province":
      return "استان";
    case "city":
      return "شهر";
    case "business":
      return "کسب و کار";
    case "branch":
      return "شعبه / واحد (ذینفع)";
  }
};
