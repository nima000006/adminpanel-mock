import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { BeneficiaryResponseDto } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsInvoicedTransactions/@types/@accountingInvoicedTransactionsTypes";

const TransactionsDetailTableModel = (): CustomColumnType<BeneficiaryResponseDto>[] => {
  return [
    {
      title: "تعداد کل شعبات",
      dataIndex: "amount",
      key: "amount",
      width: 100,
    },
    {
      title: "نام کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 100,
    },
    {
      title: "شعبه",
      dataIndex: "branchName",
      key: "branchName",
      width: 100,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        if (status === "TO_BE_INVOICED") {
          return <CustomTag color="success">برای صدور فاکتور</CustomTag>;
        }
        return <CustomTag color="error">فاقد فاکتور</CustomTag>;
      },
    },
  ];
};
export default TransactionsDetailTableModel;
