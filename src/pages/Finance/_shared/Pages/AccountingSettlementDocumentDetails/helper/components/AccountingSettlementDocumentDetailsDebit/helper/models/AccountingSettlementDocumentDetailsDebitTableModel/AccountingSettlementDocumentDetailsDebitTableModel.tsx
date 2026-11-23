import { PiArrowLineUpRight, PiReceipt } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DocumentTypeEnum } from "@pages/Finance/Accountants/_shared/enums/@enumDocumentReason";
import { DocumentDebitSettlementRecordType } from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";
import { DocumentBranchDebitSettlementRecordType } from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/@types/@getMyBranchAccountingSettlementListTypes";
import { DocumentBusinessDebitSettlementRecordType } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";

const AccountingSettlementDocumentDetailsDebitTableModel = (
  openDrawerHandler: (value: string) => void
): CustomColumnType<
  | DocumentDebitSettlementRecordType
  | DocumentBranchDebitSettlementRecordType
  | DocumentBusinessDebitSettlementRecordType
>[] => {
  return [
    {
      dataIndex: "uuid",
      key: "numberOfDoc",
      title: "شماره سند سیستمی",
      width: 600,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      dataIndex: "documentReason",
      key: "documentReason",
      title: "علت بدهکاری",
      width: 130,
      render: (value: IdTitleName) => {
        if (value?.name === DocumentTypeEnum.REFUND) {
          return (
            <CustomTag
              className="w-fit gap-1"
              icon={<PiArrowLineUpRight />}
              color="volcano"
            >
              عودت وجه
            </CustomTag>
          );
        } else if (value?.name === DocumentTypeEnum.PARTNERSHIP_COMMISSION) {
          return (
            <CustomTag className="w-fit gap-1" icon={<PiReceipt />} color="blue">
              کارمزد شراکت
            </CustomTag>
          );
        } else {
          return (
            <CustomTag className="w-fit" color="default">
              نامشخص
            </CustomTag>
          );
        }
      },
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
        `${dataPlaceHolder({ data: value, isPrice: true, isRial: true, currency: { isAvailable: true, type: "تومان" } })}`,
    },
    {
      dataIndex: "createdDateTime",
      key: "createdDateTime",
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
      width: 50,
      fixed: "right" as FixedType,
      render: (value: string) => (
        <CustomButton onClick={() => openDrawerHandler(value)} type="link">
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default AccountingSettlementDocumentDetailsDebitTableModel;
