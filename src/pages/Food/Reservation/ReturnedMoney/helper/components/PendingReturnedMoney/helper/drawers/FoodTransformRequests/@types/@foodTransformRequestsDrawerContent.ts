import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type FoodTransformRequestsDrawerContentProps = {
  closeDrawerHandler: () => void;
  selectedRequests: any;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRequests: React.Dispatch<React.SetStateAction<any[]>>;
  updateTable: () => void;
};

export type GetFoodReturnedMoneyTotalAmountResponse = GENERAL_RESPONSE<{
  simpleRequestDtos: [];
  totalBasePrice: number;
}>;

export type SendTransferToPendingPaymentListResponse = GENERAL_RESPONSE<number>;
export type SendTransferToPendingPaymentListRequest = {
  requestIds: number[];
  title: string;
};
