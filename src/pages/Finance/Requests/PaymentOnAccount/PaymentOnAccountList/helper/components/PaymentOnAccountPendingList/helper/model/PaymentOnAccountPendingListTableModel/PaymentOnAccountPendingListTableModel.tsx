import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_REQUESTS_PAYMENT_PAYMENT_ON_ACCOUNT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { REQUEST_DEMAND_IDS } from "@pages/Finance/Requests/_shared/utils";
import { PaymentOnAccountListDataType } from "@pages/Finance/Requests/PaymentOnAccount/PaymentOnAccountList/@types/@paymentOnAccountList";

const PaymentOnAccountPendingListTableModel =
  (): CustomColumnType<PaymentOnAccountListDataType>[] => {
    return [
      {
        title: "روز شمار",
        dataIndex: "requestDate",
        key: "requestDate",
        width: 100,
        render: (value: string) => (
          <div className="custom-Custom-diff-days">
            <CustomTagWithDiffDays value={value} />
          </div>
        ),
      },
      {
        title: "شماره درخواست",
        dataIndex: "requestId",
        key: "requestId",
        width: 140,
        ...GetServerColumnSearchProps({
          dataIndex: "requestId",
          label: "شماره درخواست",
          type: "text",
        }),
      },
      {
        title: "مبلغ درخواستی",
        dataIndex: "amount",
        key: "amount",
        width: 130,
        render: (value: number) => {
          return (
            dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }) +
            " تومان"
          );
        },
      },
      {
        title: "سرویس",
        dataIndex: "service",
        key: "service",
        width: 150,
        render: (value: string) => {
          return <SamimServiceTag service={value} />;
        },
      },
      {
        title: "کسب و کار",
        dataIndex: "business",
        key: "business",
        width: 130,
      },
      {
        title: "واحد / شعبه",
        dataIndex: "university",
        key: "university",
        width: 130,
        render: (value: string) => <CustomTag className="w-fit">{value}</CustomTag>,
      },
      {
        title: "استان",
        dataIndex: "province",
        key: "province",
        width: 200,
        ...GetServerColumnSearchProps({
          dataIndex: "province",
          label: "استان",
          type: "text",
        }),
      },
      {
        title: "شهر",
        dataIndex: "province",
        key: "province",
        width: 200,
        ...GetServerColumnSearchProps({
          dataIndex: "province",
          label: "شهر",
          type: "text",
        }),
      },
      {
        title: "تاریخ و زمان ثبت درخواست",
        dataIndex: "requestDate",
        key: "requestDate",
        width: 180,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY-MM-DD",
          });
        },
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 78,
        className: "tables-sticky-column-left",
        render: (value: number) => (
          <Link
            className="text-link"
            to={{
              pathname: FINANCE_REQUESTS_PAYMENT_PAYMENT_ON_ACCOUNT_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                status: REQUEST_DEMAND_IDS?.pending,
              }),
            }}
          >
            مشاهده
          </Link>
        ),
      },
    ];
  };
export default PaymentOnAccountPendingListTableModel;
