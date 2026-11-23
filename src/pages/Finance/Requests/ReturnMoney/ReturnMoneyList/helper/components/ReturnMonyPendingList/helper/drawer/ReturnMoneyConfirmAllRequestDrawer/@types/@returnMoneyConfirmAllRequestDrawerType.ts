import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

export type ReturnMoneyConfirmAllRequestDrawerProps = {
  closeDrawerHandler: () => void;
  data: RefundRequestListAndAdvanceFilterContent[] | undefined;
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
};
