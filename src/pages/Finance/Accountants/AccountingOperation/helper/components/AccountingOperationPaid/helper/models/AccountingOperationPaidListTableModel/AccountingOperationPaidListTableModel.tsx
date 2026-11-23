import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { AccountingSettledContent } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";
import { IdTitleName } from "@pages/Ticketing/_shared/@ticketingTypes";

const AccountingOperationPaidListTableModel =
  (): CustomColumnType<AccountingSettledContent>[] => {
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
        render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
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
          dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + "تومان",
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
        title: "پرداخت شده",
        dataIndex: "payableAmount",
        key: "payableAmount",
        width: 130,
        ...GetServerColumnSearchProps({
          dataIndex: "payableAmount",
          label: "پرداخت شده",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({ data: value, isPrice: true, isRial: true }) + " تومان",
      },
      {
        title: "اسناد تسویه شده",
        dataIndex: "documentCount",
        key: "documentCount",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "documentCount",
          label: "اسناد تسویه شده",
          type: "sort",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تاریخ و و زمان پرداخت",
        dataIndex: "paymentDate",
        key: "paymentDate",
        width: 190,
        ...GetServerColumnSearchProps({
          dataIndex: "modifiedDate",
          label: "تاریخ و و زمان پرداخت",
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
        fixed: "right" as FixedType,
        render: (value: string) => (
          <Link
            to={{
              pathname: FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                uuid: value,
                from: "operation",
                sourceTab: "3",
              }),
            }}
          >
            <CustomButton type="link">مشاهده</CustomButton>
          </Link>
        ),
      },
    ];
  };

export default AccountingOperationPaidListTableModel;
