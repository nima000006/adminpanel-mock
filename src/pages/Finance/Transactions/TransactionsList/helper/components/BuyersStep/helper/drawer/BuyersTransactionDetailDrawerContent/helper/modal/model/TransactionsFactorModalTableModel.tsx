import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE } from "@infra/router/routes/finance";
import {
  InvoiceStatusColorConfig,
  InvoiceStatusStringToEnum,
} from "@pages/Finance/_shared/utils";
import { GetTransactionDetailFactors } from "@pages/Finance/Transactions/TransactionsList/helper/components/_shared/@types/@getTransactionDetailFactors";
import { IdTitleName } from "@pages/Ticketing/_shared/@ticketingTypes";

const TransactionsFactorModalTableModel =
  (): CustomColumnType<GetTransactionDetailFactors>[] => {
    return [
      {
        title: "شماره فاکتور",
        dataIndex: "invoiceUuid",
        key: "invoiceUuid",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "نوع فاکتور",
        dataIndex: "accountingInvoiceType",
        key: "accountingInvoiceType",
        width: 120,
        render: (value: IdTitleName<keyof typeof InvoiceStatusStringToEnum>) => {
          const status = InvoiceStatusStringToEnum[value?.name];

          if (status === undefined) return "-";

          const config = InvoiceStatusColorConfig[status];

          if (!config) return "-";

          return (
            <CustomTag className="w-fit gap-1" icon={<PiReceipt />} color={config.color}>
              {config.text}
            </CustomTag>
          );
        },
      },
      {
        title: "کسب و کار",
        dataIndex: "businessName",
        key: "businessName",
        width: 250,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: " شعبه / واحد (ذینفع)",
        dataIndex: "branchName",
        key: "branchName",
        width: 250,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مبلغ فاکتور",
        dataIndex: "amount",
        key: "amount",
        width: 200,
        sortable: true,
        render: (value: number) =>
          dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
      },
      {
        title: "",
        dataIndex: "uuid",
        key: "uuid",
        fixed: "right" as FixedType,
        className: "tables-sticky-column-left",
        width: 110,
        render: (value: string) => (
          <Link
            to={{
              pathname: FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
              search: makeSearchParams({
                from: "transactions",
                id: value,
              }),
            }}
            className="text-primary-6! flex items-center gap-1"
          >
            مشاهده جزئیات
          </Link>
        ),
      },
    ];
  };
export default TransactionsFactorModalTableModel;
