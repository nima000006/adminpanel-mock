import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DocumentCreditSettlementRecordType } from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";
import { DocumentBranchCreditSettlementRecordType } from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/@types/@getMyBranchAccountingSettlementListTypes";
import { DocumentBusinessCreditSettlementRecordType } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";

const AccountingSettlementDocumentDetailsCreditorTableModel = (
  openDrawerHandler: (value: string) => void
): CustomColumnType<
  | DocumentCreditSettlementRecordType
  | DocumentBranchCreditSettlementRecordType
  | DocumentBusinessCreditSettlementRecordType
>[] => {
  return [
    {
      dataIndex: "uuid",
      key: "numberOfDoc",
      title: "شماره سند سیستمی",
      width: 730,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "مبلغ",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "money",
        label: "مبلغ",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isRial: true,
          isPrice: true,
          currency: { isAvailable: true, type: "تومان" },
        }),
    },
    {
      dataIndex: "createdTime",
      key: "createdTime",
      title: "تاریخ و زمان ایجاد سند",
      width: 180,
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
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      width: 50,
      render: (value: string) => (
        <CustomButton onClick={() => openDrawerHandler(value)} type="link">
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default AccountingSettlementDocumentDetailsCreditorTableModel;
