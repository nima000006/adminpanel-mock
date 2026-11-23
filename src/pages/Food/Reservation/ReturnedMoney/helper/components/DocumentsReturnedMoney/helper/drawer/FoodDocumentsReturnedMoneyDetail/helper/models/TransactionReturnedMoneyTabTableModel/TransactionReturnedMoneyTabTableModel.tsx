import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { requestDtos } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import {
  returnedMoneyFamily,
  returnedMoneyName,
  returnedMoneyNationalCode,
  returnedMoneyShabaNumber,
  returnedMoneyStudentNumber,
} from "@pages/Food/Reservation/ReturnedMoney/utils/returnedMoneyTableModels";

const TransactionReturnedMoneyTabTableModel = (): CustomColumnType<requestDtos>[] => {
  return [
    returnedMoneyName,
    returnedMoneyFamily,
    returnedMoneyStudentNumber,
    returnedMoneyNationalCode,
    returnedMoneyShabaNumber,
  ];
};
export default TransactionReturnedMoneyTabTableModel;
