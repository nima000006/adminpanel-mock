import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

export type reasonRejectFormType = {
  reasonReject: SelectType<IdTitle>;
  description: string;
};

export type PaymentOnAccountRejectAllRequestDrawerProps = {
  closeDrawerHandler: () => void;
  data: PaymentOnAccountListDataType[] | RefundRequestListAndAdvanceFilterContent[];
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
  // refreshList: () => void;
  // refreshCount: () => void;
};
