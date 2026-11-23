import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import {
  InvoiceStatusColorConfig,
  InvoiceStatusStringToEnum,
} from "@pages/Finance/_shared/utils";
import { IdTitleName } from "@pages/Ticketing/_shared/@ticketingTypes";

import { GetBusinessAccountingFactorListItems } from "../../../@types/@getBusinessAccountingFactorList";
const MyBusinessInvoicesAndDocsFactorsTableModel =
  (): CustomColumnType<GetBusinessAccountingFactorListItems>[] => {
    return [
      {
        title: "شماره فاکتور",
        dataIndex: "uuid",
        key: "uuid",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "uuid",
          label: "شماره فاکتور",
          type: "text",
        }),
      },
      {
        title: "نوع فاکتور",
        dataIndex: "invoiceStatus",
        key: "invoiceStatus",
        width: 120,
        render: (value: IdTitleName) => {
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
        title: "شعبه / واحد (ذینفع)",
        dataIndex: "supplierBranchName",
        key: "supplierBranchName",
        width: 140,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 175,
        render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
      },
      {
        title: "استان",
        dataIndex: "supplierProvinceName",
        key: "supplierProvinceName",
        width: 85,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شهر",
        dataIndex: "supplierCityName",
        key: "supplierCityName",
        width: 85,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مبلغ فاکتور",
        dataIndex: "invoiceAmount",
        key: "invoiceAmount",
        width: 190,
        ...GetServerColumnSearchProps({
          dataIndex: "money",
          label: "مبلغ فاکتور",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({
            data: value?.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },
      {
        title: "تاریخ و زمان صدو فاکتور",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 190,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ و زمان صدو فاکتور",
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
        dataIndex: "id",
        key: "action",
        fixed: "right" as FixedType,
        className: "tables-sticky-column-left",
        width: 75,
        render: (_: unknown, records: GetBusinessAccountingFactorListItems) => {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  pathname:
                    FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: records?.uuid,
                  }),
                }}
              >
                مشاهده
              </Link>
            </CustomButton>
          );
        },
      },
    ];
  };

export default MyBusinessInvoicesAndDocsFactorsTableModel;
