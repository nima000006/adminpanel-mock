import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { getSettlementBeneficiariesDetailDocumentsContent } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";

const AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel =
  (): CustomColumnType<getSettlementBeneficiariesDetailDocumentsContent>[] => {
    return [
      {
        title: "شماره سند سیستمی",
        dataIndex: "uuid",
        key: "uuid",
        width: 300,
        //todo[nima] uncomment when api get ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "uuid",
        //   label: "شماره سند سیستمی",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مبلغ",
        dataIndex: "amount",
        key: "amount",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "money",
          label: "شماره سند سیستمی",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },
      {
        title: "تاریخ و زمان ایجاد سند",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 170,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ و زمان ایجاد سند",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD",
          }),
      },
    ];
  };
export default AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentCreditTableModel;
