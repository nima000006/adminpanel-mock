import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE } from "@infra/router/routes/finance";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  InvoiceStatusColorConfig,
  InvoiceStatusStringToEnum,
} from "@pages/Finance/_shared/utils";
import { AccountingFactorsContent } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/@types/@accountingFactors";

const FactorsAndDocsFactorsTableModel =
  (): CustomColumnType<AccountingFactorsContent>[] => {
    return [
      {
        title: "شماره فاکتور",
        dataIndex: "uuid",
        key: "uuid",
        width: 250,
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
        title: "کسب و کار",
        dataIndex: "supplierBusinessName",
        key: "supplierBusinessName",
        width: 200,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "واحد / شعبه (ذینفع)",
        dataIndex: "supplierBranchName",
        key: "supplierBranchName",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 115,
        render: (_: unknown, record: AccountingFactorsContent) => {
          return <SamimServiceTag service={record?.service?.name} />;
        },
      },
      {
        title: "استان",
        dataIndex: "supplierProvinceName",
        key: "supplierProvinceName",
        width: 120,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شهر",
        dataIndex: "supplierCityName",
        key: "supplierCityName",
        width: 120,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مبلغ فاکتور",
        dataIndex: "invoiceAmount",
        key: "invoiceAmount",
        width: 180,
        ...GetServerColumnSearchProps({
          dataIndex: "money",
          label: "مبلغ فاکتور",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({ data: value, isPrice: true, isRial: true }),
      },
      {
        title: "تاریخ و ساعت ثبت فاکتور",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 185,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ و ساعت ثبت فاکتور",
          type: "sort",
        }),
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm، YYYY/M/D",
          });
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 80,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: AccountingFactorsContent) => {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  search: makeSearchParams({
                    id: record?.uuid,
                    from: "factor",
                  }),
                  pathname: FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
                }}
              >
                مشاهده جزئیات
              </Link>
            </CustomButton>
          );
        },
      },
    ];
  };
export default FactorsAndDocsFactorsTableModel;
