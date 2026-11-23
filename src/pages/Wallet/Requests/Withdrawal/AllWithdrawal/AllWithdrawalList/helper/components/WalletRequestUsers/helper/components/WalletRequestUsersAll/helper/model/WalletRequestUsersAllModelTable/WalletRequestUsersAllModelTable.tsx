import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { UserStaffDetail } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";
import {
  degreeColorMap,
  statusMap,
} from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/util";
import { staffTypeMap } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/UserWalletInfo/helpers/utils";

import {
  UserStaffAllDetail,
  WithdrawalAll,
} from "../../../@types/@walletRequestUsersAll";

import "./_walletRequestUsersAllModelTable.scss";

const WalletRequestUsersAllModelTable = (): CustomColumnType<WithdrawalAll>[] => {
  return [
    {
      title: "وضعیت درخواست",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (value: string) => {
        const { color, label } = statusMap[value] ?? {
          color: "default",
          label: value,
        };

        return (
          <CustomTag className="custom-tag" color={color}>
            {dataPlaceHolder({ data: label })}
          </CustomTag>
        );
      },
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
      render: (_: unknown, record: WithdrawalAll) => {
        return (
          <>
            {dataPlaceHolder({
              data: record?.amount?.totalAmount?.toString(),
              isRial: true,
              isPrice: true,
            })}{" "}
            تومان
          </>
        );
      },
    },
    {
      title: "گروه کاربری",
      dataIndex: "staffType",
      key: "staffType",
      width: 85,
      render: (_: unknown, records: WithdrawalAll) => {
        const { color, label } = staffTypeMap[records?.userStaffDetail?.staffType] ?? {
          color: "default",
          label: "-",
        };

        return <CustomTag color={color}>{dataPlaceHolder({ data: label })}</CustomTag>;
      },
    },
    {
      title: "نام",
      dataIndex: "firstname",
      key: "firstname",
      width: 125,
      ...GetServerColumnSearchProps({
        dataIndex: "firstname",
        label: "نام",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "LastName",
      key: "LastName",
      width: 125,
      ...GetServerColumnSearchProps({
        dataIndex: "LastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد ملی / کد فراگیر",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalCode",
        label: "کد ملی / کد فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره دانشجویی / پرسنلی",
      dataIndex: "userStaffDetail",
      key: "code",
      width: 200,
      render: (value: UserStaffAllDetail) => {
        return dataPlaceHolder({ data: value?.code });
      },
    },
    {
      title: "شماره همراه",
      dataIndex: "userStaffDetail",
      key: "mobile",
      width: 130,
      render: (value: UserStaffDetail) => {
        return dataPlaceHolder({ data: value?.mobile });
      },
    },
    {
      title: "شناسه کیف پول",
      dataIndex: "walletId",
      key: "walletId",
      width: 150,
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "degreeTitle",
      key: "degreeTitle",
      width: 190,
      render: (value: string) => (
        <CustomTag className="custom-tag" color={degreeColorMap[value] ?? "default"}>
          {dataPlaceHolder({ data: value })}
        </CustomTag>
      ),
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "studyFieldTitle",
      key: "studyFieldTitle",
      render: (value: string) => {
        return (
          <CustomTag className="custom-tag">{dataPlaceHolder({ data: value })}</CustomTag>
        );
      },
    },
    {
      title: "واحد / شعبه",
      dataIndex: "branchName",
      key: "branchName",
      width: 130,
      render: (_: unknown, records: WithdrawalAll) => {
        return (
          <CustomTag className="custom-tag">
            {dataPlaceHolder({ data: records?.userStaffDetail?.branchName })}
          </CustomTag>
        );
      },
    },
    {
      title: "نام دانشگاه",
      dataIndex: "userStaffDetail",
      key: "unitBranch",
      width: 190,
      render: (value: UserStaffAllDetail) => {
        return (
          <CustomTag className="custom-tag">
            {dataPlaceHolder({ data: value?.branchName })}
          </CustomTag>
        );
      },
    },
    {
      title: "عنوان سمت",
      dataIndex: "postname",
      key: "postname",
      width: 220,
      render: () => {
        return <CustomTag className="custom-tag">{emptyString}</CustomTag>;
      },
    },
    {
      title: "استان",
      dataIndex: "userStaffDetail",
      key: "province",
      width: 115,
      render: (value: UserStaffAllDetail) => {
        return dataPlaceHolder({ data: value?.province });
      },
    },
    {
      title: "شهر",
      dataIndex: "userStaffDetail",
      key: "city",
      width: 80,
      render: (value: UserStaffAllDetail) => {
        return dataPlaceHolder({ data: value?.city });
      },
    },
    {
      title: "مسئول پیگیری درخواست",
      dataIndex: "adminFirstname",
      key: "adminFirstname",
      width: 190,
      render: (_: unknown, record: WithdrawalAll) => {
        return (
          <>
            {dataPlaceHolder({ data: record?.adminFirstname })}{" "}
            {dataPlaceHolder({ data: record?.adminLastname })}
          </>
        );
      },
    },
    {
      title: "تاریخ و زمان بررسی درخواست",
      dataIndex: "requestProgressDate",
      key: "requestProgressDate",
      width: 200,
      render: () => emptyString,
    },
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
      render: (_: unknown, record: WithdrawalAll) => (
        <CustomButton type="link">
          <Link
            to={{
              pathname: WALLET_ALL_WITHDRAWAL_REQUESTS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: record?.id,
                walletType: "PERSONAL",
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
export default WalletRequestUsersAllModelTable;
