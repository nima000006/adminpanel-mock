import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";

export type PaymentOnAccountConfirmAllRequestDrawerProps = {
  closeDrawerHandler: () => void;
  data: PaymentOnAccountListDataType[];
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
  // refreshList: () => void;
  // refreshCount: () => void;
};
