import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { requestDtos } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";

import { TransactionReturnedMoneyTabProps } from "./@types/@transactionReturnedMoneyTabType";
import TransactionReturnedMoneyTabTableModel from "../../models/TransactionReturnedMoneyTabTableModel/TransactionReturnedMoneyTabTableModel";

const TransactionReturnedMoneyTab = ({
  data,
  loading,
}: TransactionReturnedMoneyTabProps) => {
  return (
    <div className="food-transform-selected-processing-tab-container">
      <CustomDivider text="لیست تراکنش‌های عودت وجه شده" />
      <Div loading={loading}>
        <CustomTable<requestDtos>
          dataSource={data}
          columns={TransactionReturnedMoneyTabTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(data?.length)}
          rowKey="id"
        />
      </Div>
    </div>
  );
};
export default TransactionReturnedMoneyTab;
