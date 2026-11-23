import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_BANK_ACCOUNT_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DEMAND_IDS } from "@pages/Wallet/Requests/_shared/utils";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import { businessTypeConfig } from "@pages/Wallet/Requests/BankAccount/BankAccountList/_shared/utils";

const BankAccountPendingListTableModel =
  (): CustomColumnType<RequestBankAccountDataType>[] => {
    return [
      {
        title: "روز شمار",
        dataIndex: "dataAndTimeRequest",
        key: "dataAndTimeRequest",
        width: 100,
        render: (_: unknown, records: RequestBankAccountDataType) => (
          <div className="custom-Custom-diff-days">
            <CustomTagWithDiffDays value={records?.createdDate} />
          </div>
        ),
      },
      {
        title: "شماره درخواست",
        dataIndex: "requestNumber",
        key: "requestNumber",
        width: 140,
        render: (_: unknown, records) => {
          return <> {dataPlaceHolder({ data: records?.id })}</>;
        },
      },
      {
        title: "شماره کارت",
        dataIndex: "cardNumber",
        key: "cardNumber",
        width: 130,
        ...GetServerColumnSearchProps({
          dataIndex: "cardNumber",
          label: "شماره کارت",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شماره شبا",
        dataIndex: "iban",
        key: "iban",
        width: 130,
        ...GetServerColumnSearchProps({
          dataIndex: "iban",
          label: "شماره شبا",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "نام کسب و کار ",
        dataIndex: "businessName",
        key: "businessName",
        width: 130,
        //todo[nima] uncomment when api will be ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "businessName",
        //   label: "نام کسب و کار ",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شعبه / واحد",
        dataIndex: "branchName",
        key: "branchName",
        width: 130,
        //todo[nima] uncomment when api will be ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "branchName",
        //   label: "شعبه / واحد",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "نوع کسب و کار",
        dataIndex: "personalityGroupType",
        key: "personalityGroupType",
        width: 150,
        render: (value: IdTitleName) => {
          const config =
            businessTypeConfig[value?.id?.toString() as keyof typeof businessTypeConfig];

          return (
            <CustomTag color={config?.color ?? "default"} icon={config?.icon}>
              {config ? dataPlaceHolder({ data: value?.title }) : "نامشخص"}
            </CustomTag>
          );
        },
      },
      {
        title: "کد شعبه",
        dataIndex: "branchCode",
        key: "branchCode",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "نام بانک",
        dataIndex: "bankName",
        key: "bankName",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "bankName",
          label: "نام بانک",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: " سرویس",
        dataIndex: "services",
        key: "services",
        width: 150,
        render: (value: IdTitleName[]) => (
          <div className="flex flex-wrap gap-1">
            {value?.map((service) => (
              <SamimServiceTag
                key={service?.id ?? service?.name}
                service={service?.name}
              />
            ))}
          </div>
        ),
      },
      {
        title: "استان",
        dataIndex: "province",
        key: "province",
        width: 200,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شهر",
        dataIndex: "city",
        key: "city",
        width: 200,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مسئول کسب وکار",
        dataIndex: "businessManager",
        key: "businessManager",
        width: 150,
        render: (_: unknown, records) => (
          <>
            {dataPlaceHolder({ data: records?.createdBy?.firstName })}{" "}
            {dataPlaceHolder({ data: records?.createdBy?.lastName })}{" "}
          </>
        ),
      },
      {
        title: "شماره همراه مسئول",
        dataIndex: "mobileManager",
        key: "mobileManager",
        width: 150,
        render: (_: unknown, records) => (
          <>{dataPlaceHolder({ data: records?.createdBy?.mobileNumber })}</>
        ),
      },
      {
        title: "تاریخ و زمان ثبت درخواست",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 180,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "YYYY-MM-DD , HH:mm",
          });
        },
      },

      {
        title: "",
        key: "actions",
        fixed: "right" as FixedType,
        width: 78,
        className: "tables-sticky-column-left",
        render: (_: unknown, records: RequestBankAccountDataType) => (
          <Link
            className="text-link"
            to={{
              pathname: WALLET_ALL_BANK_ACCOUNT_REQUESTS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: records?.id,
                status: DEMAND_IDS.pending,
              }),
            }}
          >
            مشاهده
          </Link>
        ),
      },
    ];
  };
export default BankAccountPendingListTableModel;
