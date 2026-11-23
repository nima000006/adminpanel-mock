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

const FoodPendingReturnedMoneyListTableModel = () => {
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
