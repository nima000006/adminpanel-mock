import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

// LAYOUT
export type FoodPendingPaymentSettlementDrawerContentProps = {
  closeDrawerHandler: () => void;
  total: number | undefined;
  id: number;
};

type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

export type FoodPendingPaymentSettlementFormType = {
  transactionNumber: string;
  date: string;
  banckName: SelectType;
  iban: string;
};

//API
export type IdTitleType = {
  title: string;
  id: number;
};
export type GetAllBankResponse = GENERAL_RESPONSE<IdTitleType[]>;

export type SendFoodSettleResponse = GENERAL_RESPONSE<number>;
export type SendFoodSettleRequest = {
  bankId: number;
  docId: number;
  fileUrl: string;
  fromIBAN: string;
  paymentDate: string;
  referenceNo: string;
};
