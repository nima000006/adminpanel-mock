import { useEffect, useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { useLazyGetTransactionDetailFactorsQuery } from "@infra/states/redux/Apis/finance/transactionsApi";
import {
  GetTransactionDetailFactors,
  GetTransactionDetailFactorsResponse,
} from "@pages/Finance/Transactions/TransactionsList/helper/components/_shared/@types/@getTransactionDetailFactors";
import TransactionsFactorModalTableModel from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/helper/drawer/BuyersTransactionDetailDrawerContent/helper/modal/model/TransactionsFactorModalTableModel";

const TransactionsFactorModalContent = ({ uuid }: { uuid: string }) => {
  const [dataSource, setDataSource] = useState<GetTransactionDetailFactorsResponse>();

  //? ================================  Api Calls ================================
  const [getTransactionsFactor, { isLoading: isGetTransactionsFactorLoading }] =
    useLazyGetTransactionDetailFactorsQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getTransactionsFactor(uuid)
      .unwrap()
      .then((res) => setDataSource(res));
  }, [uuid]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomTable<GetTransactionDetailFactors>
        dataSource={dataSource}
        columns={TransactionsFactorModalTableModel()}
        pagination={paginationConfig}
        loading={isGetTransactionsFactorLoading}
        rowKey="uuid"
      />
    </div>
  );
};
export default TransactionsFactorModalContent;
