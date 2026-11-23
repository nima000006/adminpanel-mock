import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";
import {
  returnedMoneyBranch,
  returnedMoneyDate,
  returnedMoneyDeliverEndDate,
  returnedMoneyDeliverStartDate,
  returnedMoneyFamily,
  returnedMoneyFood,
  returnedMoneyMeal,
  returnedMoneyName,
  returnedMoneyNationalCode,
  returnedMoneyOrderCount,
  returnedMoneyOrderNumber,
  returnedMoneyPrice,
  returnedMoneyScheduleDate,
  returnedMoneySelf,
  returnedMoneyStudentNumber,
  returnedMoneyTrackingNumber,
  returnedMoneyType,
} from "@pages/Food/Reservation/ReturnedMoney/utils/returnedMoneyTableModels";

const FoodPersonReturnedMoneyListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number) => void;
}): CustomColumnType<CancelRequestsType>[] => {
  return [
    returnedMoneyTrackingNumber,
    returnedMoneyName,
    returnedMoneyFamily,
    returnedMoneyStudentNumber,
    returnedMoneyNationalCode,
    returnedMoneyDate,
    returnedMoneyScheduleDate,
    returnedMoneyBranch,
    returnedMoneySelf,
    returnedMoneyFood,
    returnedMoneyType,
    returnedMoneyMeal,
    returnedMoneyOrderCount,
    returnedMoneyPrice,
    returnedMoneyDeliverStartDate,
    returnedMoneyDeliverEndDate,
    returnedMoneyOrderNumber,
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <CustomButton type="link" onClick={() => viewClickHandler(value)}>
            مشاهده
          </CustomButton>
        );
      },
    },
  ];
};

export default FoodPersonReturnedMoneyListTableModel;
