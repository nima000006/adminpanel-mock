import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { RefundRequestListAndAdvanceFilterContent } from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

export type reasonRejectFormType = {
  reasonReject: SelectType<IdTitle>;
  description: string;
};

export type ReturnMoneyRejectAllRequestDrawerProps = {
  closeDrawerHandler: () => void;
  data: RefundRequestListAndAdvanceFilterContent[] | undefined;
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
};
