import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_BANK_ACCOUNT_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DEMAND_IDS } from "@pages/Wallet/Requests/_shared/utils";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import { businessTypeConfig } from "@pages/Wallet/Requests/BankAccount/BankAccountList/_shared/utils";

const BankAccountRejectedListTableModel =
  (): CustomColumnType<RequestBankAccountDataType>[] => {
    return [
      {
        title: "تاریخ و زمان رد درخواست",
        dataIndex: "modifiedDate",
        key: "modifiedDate",
        width: 190,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm , YYYY-MM-DD  ",
          });
        },
      },
      {
        title: "شماره درخواست",
        dataIndex: "requestNumber",
        key: "requestNumber",
        width: 140,
        render: (_: unknown, records: RequestBankAccountDataType) =>
          dataPlaceHolder({ data: records?.id?.toString() }),
      },
      {
        title: "نام کسب و کار ",
        dataIndex: "businessName",
        key: "businessName",
        width: 130,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "شعبه / واحد",
        dataIndex: "branchName",
        key: "branchName",
        width: 130,
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
        width: 180,
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
        title: "مسئول پیگیری درخواست",
        dataIndex: "responsibleFollowingRequest",
        key: "responsibleFollowingRequest",
        width: 150,
        render: () => emptyString,
      },
      {
        title: "تاریخ و زمان ثبت درخواست",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 170,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm , YYYY-MM-DD  ",
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
                status: DEMAND_IDS.rejected,
              }),
            }}
          >
            مشاهده
          </Link>
        ),
      },
    ];
  };
export default BankAccountRejectedListTableModel;
