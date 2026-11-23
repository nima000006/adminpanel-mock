import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { AccountingSettledContent } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

const AccountingOperationQueueListTableModel = (
  parentName?: string
): CustomColumnType<AccountingSettledContent>[] => {
  return [
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 100,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شعبه / واحد (ذینفع)",
      dataIndex: "branchName",
      key: "branchName",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 140,
      render: (_: unknown, records: AccountingSettledContent) => (
        <SamimServiceTag service={records?.samimService?.name} />
      ),
    },
    {
      title: "مطالبات ذینفع (بستانکاری)",
      dataIndex: "creditAmount",
      key: "creditAmount",
      width: 190,
      ...GetServerColumnSearchProps({
        dataIndex: "creditAmount",
        label: "مطالبات ذینفع (بستانکاری)",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + " تومان",
    },
    {
      title: "تعهدات ذینفع (بدهکاری)",
      dataIndex: "debitAmount",
      key: "debitAmount",
      width: 190,
      ...GetServerColumnSearchProps({
        dataIndex: "debitAmount",
        label: "تعهدات ذینفع (بدهکاری)",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + " تومان",
    },
    {
      title: "مبلغ در صف پرداخت",
      dataIndex: "payableAmount",
      key: "payableAmount",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "payableAmount",
        label: "مبلغ در صف پرداخت",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + " تومان",
    },
    {
      title: "اسناد در صف پرداخت",
      dataIndex: "documentCount",
      key: "documentCount",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "documentCount",
        label: "اسناد در صف پرداخت",
        type: "sort",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ و و زمان ایجاد سند تسویه",
      dataIndex: "createDate",
      key: "createDate",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "اسناد در صف پرداخت",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      hidden: parentName === "isDrawer" ? true : false,
      fixed: "right" as FixedType,

      render: (value: string) => (
        <Link
          to={{
            pathname: FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              uuid: value,
              from: "operation",
              sourceTab: "2",
            }),
          }}
        >
          <CustomButton type="link">مشاهده</CustomButton>
        </Link>
      ),
    },
  ];
};

export default AccountingOperationQueueListTableModel;
