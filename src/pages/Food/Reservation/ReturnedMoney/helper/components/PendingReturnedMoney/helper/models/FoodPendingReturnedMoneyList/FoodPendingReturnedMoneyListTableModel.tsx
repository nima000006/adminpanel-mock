import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { requestDtos } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";
import {
  returnedMoneyAccountOwner,
  returnedMoneyBank,
  returnedMoneyBranch,
  returnedMoneyCartNumber,
  returnedMoneyScheduleDate,
  returnedMoneyFamily,
  returnedMoneyFood,
  returnedMoneyMeal,
  returnedMoneyName,
  returnedMoneyNationalCode,
  returnedMoneyOrderCount,
  returnedMoneyOrderNumber,
  returnedMoneyPrice,
  returnedMoneySelf,
  returnedMoneyShabaNumber,
  returnedMoneyStudentNumber,
  returnedMoneyType,
} from "@pages/Food/Reservation/ReturnedMoney/utils/returnedMoneyTableModels";

const FoodPendingReturnedMoneyListTableModel = (): CustomColumnType<
  requestDtos | CancelRequestsType
>[] => {
  return [
    returnedMoneyName,
    returnedMoneyFamily,
    returnedMoneyStudentNumber,
    returnedMoneyNationalCode,
    returnedMoneyShabaNumber,
    returnedMoneyCartNumber,
    returnedMoneyBank,
    returnedMoneyAccountOwner,
    returnedMoneyScheduleDate,
    returnedMoneyBranch,
    returnedMoneySelf,
    returnedMoneyFood,
    returnedMoneyType,
    returnedMoneyMeal,
    returnedMoneyOrderCount,
    returnedMoneyPrice,
    returnedMoneyOrderNumber,
  ];
};

export default FoodPendingReturnedMoneyListTableModel;
