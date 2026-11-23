import { SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { IdTitleName } from "@pages/Ticketing/_shared/@ticketingTypes";

export type FinanceBusinessOwnerFormType = {
  rangeDate: string[];
  province: SelectType<IdTitleName>;
  city: SelectType<IdTitleName>;
  business: SelectType<IdTitleName>;
  branch: SelectType<IdTitleName>;
  service: SelectType<IdTitleName>;
};

export enum REQUEST_FINANCE_BUSINESS_OWNERS_DEMAND_IDS {
  OVERALL = "1",
  PAYMENT = "2",
  SERVICE = "3",
  DETAILS = "4",
}
