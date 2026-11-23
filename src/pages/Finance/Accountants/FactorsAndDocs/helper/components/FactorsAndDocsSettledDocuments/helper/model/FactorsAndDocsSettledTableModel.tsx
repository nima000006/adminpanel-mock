import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  PaymentSupplierStatusColorConfig,
  PaymentSupplierStatusToEnum,
} from "@pages/Finance/_shared/utils";
import { AccountingSettledContent } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

const FactorsAndDocsSettledTableModel = () => {
  return [
    {
      title: "شماره سند تسویه",
      dataIndex: "uuid",
      key: "uuid",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "uuid",
        label: "شماره سند تسویه",
        type: "text",
      }),
    },
    {
      title: "وضعیت پرداخت به ذینفع",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (value: IdTitleName) => {
        const status = PaymentSupplierStatusToEnum[value?.name];
        if (status === undefined) return "-";

        const config = PaymentSupplierStatusColorConfig[status];

        if (!config) return "-";

        return (
          <CustomTag className="w-fit gap-1" color={config.color}>
            {config.text}
          </CustomTag>
        );
      },
    },
    {
      title: "تسویه شده",
      dataIndex: "payableAmount",
      key: "payableAmount",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "payableAmount",
        label: "تسویه شده",
        type: "sort",
      }),
    },
    {
      title: "تعداد اسناد",
      dataIndex: "documentCount",
      key: "documentCount",
      width: 250,
      ...GetServerColumnSearchProps({
        dataIndex: "documentCount",
        label: "تسویه شده",
        type: "sort",
      }),
    },
    {
      title: "کسب و کار",
      dataIndex: "businessId",
      key: "businessId",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "واحد / شعبه (ذینفع)",
      dataIndex: "branchName",
      key: "branchName",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      key: "samimService",
      width: 115,
      render: (_: unknown, record: AccountingSettledContent) => {
        return <SamimServiceTag service={record?.samimService?.name} />;
      },
    },
    {
      title: "استان",
      dataIndex: "provinceName",
      key: "provinceName",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityName",
      key: "cityName",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ و زمان ایجاد سند",
      dataIndex: "createDate",
      key: "createDate",
      width: 185,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ و زمان ایجاد سند",
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
      title: "ایجاد کننده",
      dataIndex: "createByName",
      key: "createByName",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 80,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: AccountingSettledContent) => {
        return (
          <CustomButton type="link">
            <Link
              to={{
                search: makeSearchParams({ uuid: record?.uuid, from: "factor" }),
                pathname: FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
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
export default FactorsAndDocsSettledTableModel;
