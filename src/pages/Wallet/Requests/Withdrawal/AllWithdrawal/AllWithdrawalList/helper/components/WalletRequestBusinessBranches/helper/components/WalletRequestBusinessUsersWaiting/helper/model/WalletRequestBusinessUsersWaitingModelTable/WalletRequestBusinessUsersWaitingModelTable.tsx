import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { getBusinessTypeConfig } from "@pages/Wallet/Requests/BankAccount/BankAccountList/_shared/utils";

import {
  UserStaffDetail,
  Withdrawal,
  WithdrawalAmount,
} from "../../../../../../../../../_shared/@types/@walletRequestUsersList";

import "./_walletRequestBusinessUsersWaitingModelTable.scss";

const WalletRequestBusinessUsersWaitingModelTable =
  (): CustomColumnType<Withdrawal>[] => {
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
        dataIndex: "id",
        key: "id",
        width: 140,
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "مبلغ درخواستی",
        dataIndex: "amount",
        key: "amount",
        width: 130,
        render: (value: WithdrawalAmount) => {
          return (
            <>
              {dataPlaceHolder({
                data: value?.totalAmount?.toString(),
                isRial: true,
                isPrice: true,
              })}{" "}
              تومان
            </>
          );
        },
      },
      {
        title: "نام کسب و کار ",
        dataIndex: "userStaffDetail",
        key: "businessName",
        width: 140,
        render: (value: UserStaffDetail) => {
          return dataPlaceHolder({ data: value?.businessName });
        },
      },
      {
        title: "واحد / شعبه",
        dataIndex: "branchName",
        key: "branchName",
        width: 130,
        render: (_: unknown, records: Withdrawal) => {
          return (
            <CustomTag className="custom-tag">
              {dataPlaceHolder({ data: records?.userStaffDetail?.branchName })}
            </CustomTag>
          );
        },
      },
      {
        title: "نوع کسب و کار",
        dataIndex: "userStaffDetail",
        key: "businessType",
        width: 150,
        render: (value: UserStaffDetail) => {
          const config = getBusinessTypeConfig(value?.businessType);

          return (
            <CustomTag
              className="w-fit gap-1"
              color={config?.color ?? "default"}
              icon={config?.icon}
            >
              {config ? dataPlaceHolder({ data: config.label }) : "نامشخص"}
            </CustomTag>
          );
        },
      },
      {
        title: "کد شعبه",
        dataIndex: "userStaffDetail",
        key: "branchCode",
        width: 100,
        render: (value: UserStaffDetail) => {
          return dataPlaceHolder({ data: value?.branchCode });
        },
      },
      {
        title: "سرویس",
        dataIndex: "userStaffDetail",
        key: "serviceName",
        width: 150,
        render: (value: UserStaffDetail) => {
          return <SamimServiceTag service={value?.serviceName} />;
        },
      },
      {
        title: "استان",
        dataIndex: "userStaffDetail",
        key: "province",
        width: 115,
        render: (value: UserStaffDetail) => {
          return dataPlaceHolder({ data: value?.province });
        },
      },
      {
        title: "شهر",
        dataIndex: "userStaffDetail",
        key: "city",
        width: 80,
        render: (value: UserStaffDetail) => {
          return dataPlaceHolder({ data: value?.city });
        },
      },
      // Todo[nima]: uncomment when api got ready
      // {
      //   title: "مسئول کسب و کار",
      //   dataIndex: "managerBusinessName",
      //   key: "managerBusinessName",
      //   width: 150,
      // },
      // {
      //   title: "شماره همراه مسئول",
      //   dataIndex: "managerBusinessMobileNumber",
      //   key: "managerBusinessMobileNumber",
      //   width: 160,
      // },
      {
        title: "تاریخ و زمان ثبت درخواست",
        dataIndex: "requestDate",
        key: "requestDate",
        width: 200,
        render: (value: string) => {
          return dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          });
        },
      },
      {
        title: "",
        dataIndex: "info",
        key: "info",
        fixed: "right" as FixedType,
        width: 78,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: Withdrawal) => (
          <CustomButton type="link">
            <Link
              to={{
                pathname: WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: record?.id,
                  walletType: "LEGAL",
                }),
              }}
            >
              مشاهده
            </Link>
          </CustomButton>
        ),
      },
    ];
  };
export default WalletRequestBusinessUsersWaitingModelTable;
