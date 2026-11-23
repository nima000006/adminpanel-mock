import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  returnedMoneyCreateDate,
  returnedMoneyCreator,
  returnedMoneyPendingPaymentName,
  returnedMoneyReturnedTotalPrice,
  returnedMoneySettlementStatus,
  returnedMoneyTransactionCount,
} from "@pages/Food/Reservation/ReturnedMoney/utils/returnedMoneyTableModels";

const FoodDocumentsReturnedMoneyListTableModel = ({
  viewClickHandler,
}: {
  viewClickHandler: (id: number) => void;
}) => {
  return [
    returnedMoneyPendingPaymentName,
    returnedMoneySettlementStatus,
    returnedMoneyCreateDate,
    returnedMoneyCreator,
    returnedMoneyTransactionCount,
    returnedMoneyReturnedTotalPrice,
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return (
          <div className="action-buttons-container">
            <CustomButton type="link" onClick={() => viewClickHandler(value)}>
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default FoodDocumentsReturnedMoneyListTableModel;
