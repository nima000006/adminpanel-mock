import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { TransactionBeneficiariesItem } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";

const BeneficiarySharesDivisionListTableModel =
  (): CustomColumnType<TransactionBeneficiariesItem>[] => {
    return [
      {
        title: "کسب و کار",
        dataIndex: "businessName",
        key: "businessName",
        width: 250,
        searchable: true,
      },
      {
        title: " شعبه / واحد (ذینفع)",
        dataIndex: "branchName",
        key: "branchName",
        width: 170,
        searchable: true,
      },
      {
        title: "سهم از عودت (تومان)",
        dataIndex: "beneficiaryAmount",
        key: "beneficiaryAmount",
        width: 170,
        sortable: true,
        render: (value: number) =>
          dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
      },
      {
        title: "درصد سهم",
        dataIndex: "beneficiaryPercentage",
        key: "beneficiaryPercentage",
        width: 195,
        sortable: true,
        render: (value: string) => {
          return dataPlaceHolder({ data: `${value}%` });
        },
      },
    ];
  };
export default BeneficiarySharesDivisionListTableModel;
