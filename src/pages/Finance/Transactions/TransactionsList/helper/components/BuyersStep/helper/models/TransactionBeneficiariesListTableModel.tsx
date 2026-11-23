import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { TransactionBeneficiariesItem } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";

const TransactionBeneficiariesListTableModel =
  (): CustomColumnType<TransactionBeneficiariesItem>[] => {
    return [
      {
        title: "کسب و کار",
        dataIndex: "businessName",
        key: "businessName",
        width: 250,
      },
      {
        title: " شعبه / واحد (ذینفع)",
        dataIndex: "branchName",
        key: "branchName",
        width: 170,
      },
      {
        title: "سهم از تراکنش (تومان)",
        dataIndex: "beneficiaryAmount",
        key: "beneficiaryAmount",
        width: 200,
        sortable: true,
        render: (value: number) =>
          dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
      },
      {
        title: "درصد سهم",
        dataIndex: "beneficiaryPercentage",
        key: "beneficiaryPercentage",
        width: 150,
        sortable: true,
        render: (value: number) => dataPlaceHolder({ data: `${value}%` }),
      },
    ];
  };
export default TransactionBeneficiariesListTableModel;
