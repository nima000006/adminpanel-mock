import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  PaymentSupplierStatusColorConfig,
  PaymentSupplierStatusToEnum,
} from "@pages/Finance/_shared/utils";
import { GetMyBusinessAccountingSettlementItem } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";

const MyBusinessInvoicesAndDocsSettlementDocumentsTableModel =
  (): CustomColumnType<GetMyBusinessAccountingSettlementItem>[] => {
    return [
      {
        title: "شماره سند تسویه ",
        dataIndex: "uuid",
        key: "uuid",
        width: 230,
        ...GetServerColumnSearchProps({
          dataIndex: "id",
          label: "شماره سند تسویه",
          type: "text",
        }),
      },
      {
        title: "وضعیت پرداخت",
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
        title: "مطالبات (بستانکاری)",
        dataIndex: "creditAmount",
        key: "creditAmount",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "creditAmount",
          label: "مطالبات (بستانکاری)",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({
            data: value.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },
      {
        title: "تعهدات (بدهکاری)",
        dataIndex: "debitAmount",
        key: "debitAmount",
        width: 180,
        ...GetServerColumnSearchProps({
          dataIndex: "debitAmount",
          label: "تعهدات (بدهکاری)",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({
            data: value.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },
      {
        title: "تسویه شده",
        dataIndex: "payableAmount",
        key: "payableAmount",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "payableAmount",
          label: "تسویه شده",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({
            data: value.toString(),
            isPrice: true,
            isRial: true,
            currency: { isAvailable: true, type: "تومان" },
          }),
      },
      {
        title: "تعداد اسناد",
        dataIndex: "documentCount",
        key: "documentCount",
        width: 120,
        ...GetServerColumnSearchProps({
          dataIndex: "documentCounts",
          label: "تعداد اسناد",
          type: "sort",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "واحد / شعبه (ذینفع)",
        dataIndex: "branchName",
        key: "branchName",
        width: 140,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سرویس",
        dataIndex: "samimService",
        key: "samimService",
        width: 120,
        render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
      },
      {
        title: "استان",
        dataIndex: "provinceName",
        key: "provinceName",
        width: 90,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شهر",
        dataIndex: "cityName",
        key: "cityName",
        width: 90,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تاریخ و ساعت ایجاد سند",
        dataIndex: "createDate",
        key: "createDate",
        width: 190,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ و ساعت ایجاد سند",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/M/D",
          }),
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        className: "tables-sticky-column-left",
        width: 75,
        render: (_: unknown, records: GetMyBusinessAccountingSettlementItem) => {
          return (
            <CustomButton type="link">
              <Link
                to={{
                  pathname: FINANCE_ACCOUNTING_SETTLEMENT_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    uuid: records?.uuid,
                    from: "myFactorsBusiness",
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

export default MyBusinessInvoicesAndDocsSettlementDocumentsTableModel;
