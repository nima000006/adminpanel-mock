import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  returnedMoneyCreateDate,
  returnedMoneyCreator,
  returnedMoneyPendingPaymentName,
  returnedMoneyReturnedTotalPrice,
  returnedMoneySettlementStatus,
  returnedMoneyTransactionCount,
} from "@pages/Food/Reservation/ReturnedMoney/utils/returnedMoneyTableModels";

import { PendingPaymentAndReturnedMoneyType } from "../../../@types/@pendingPayment";

const FoodPendingPaymentListTableModel = ({
  viewClickHandler,
  settlementHandler,
}: {
  viewClickHandler: (id: number) => void;
  settlementHandler: (id: number, totalAmount: number) => void;
}): CustomColumnType<PendingPaymentAndReturnedMoneyType>[] => {
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
      width: 275,
      className: "tables-sticky-column-left",
      render: (value: number, records: PendingPaymentAndReturnedMoneyType) => {
        return (
          <div className="action-buttons-container">
            <CustomButton type="link" disabled={true}>
              خروجی اکسل
            </CustomButton>
            <CustomButton type="link" onClick={() => viewClickHandler(value)}>
              مشاهده
            </CustomButton>
            <CustomButton
              type="link"
              onClick={() => settlementHandler(value, records?.totalAmount)}
            >
              تسویه
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default FoodPendingPaymentListTableModel;
