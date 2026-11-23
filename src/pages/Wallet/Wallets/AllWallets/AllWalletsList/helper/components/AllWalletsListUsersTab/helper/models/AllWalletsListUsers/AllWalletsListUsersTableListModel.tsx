import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { WALLET_TYPE } from "@pages/Wallet/Wallets/_shared/utils/walletUtils";
import {
  WALLET_STATUS_COLOR,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { PersonalWalletsRecordDataType } from "../../../@types/@allWalletsListUsersTab";

const AllWalletsListUsersTableListModel =
  (): CustomColumnType<PersonalWalletsRecordDataType>[] => {
    return [
      {
        title: "شناسه کیف پول",
        dataIndex: "uuid",
        key: "uuid",
        width: 250,
        // Todo[nima]:uncomment when api got ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "uuid",
        //   label: "شناسه کیف پول",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "وضعیت کیف پول",
        dataIndex: "walletStatus",
        key: "walletStatus",
        width: 150,
        render: (value: { walletStatusId: number; walletStatusTitle: string }) => {
          return (
            <CustomTag
              className="w-fit"
              color={WALLET_STATUS_COLOR[value?.walletStatusId]}
            >
              {WALLET_STATUS_TEXT[value?.walletStatusId]}
            </CustomTag>
          );
        },
      },
      {
        title: "نام ",
        dataIndex: "firstName",
        key: "firstName",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "firstName",
          label: "نام ",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "نام خانوادگی",
        dataIndex: "lastName",
        key: "lastName",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "lastName",
          label: "نام خانوادگی",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "کد ملی / کد فراگیر",
        dataIndex: "username",
        key: "username",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "username",
          label: "کد ملی / کد فراگیر",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      // Todo[Atefeh]:uncomment when api got ready
      // {
      //   title: "شماره دانشجویی / پرسنلی",
      //   dataIndex: "studentNo",
      //   key: "studentNo",
      //   width: 200,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "studentNo",
      //     label: "شماره دانشجویی / پرسنلی",
      //     type: "text",
      //   }),
      // },
      // {
      //   title: "شماره همراه",
      //   dataIndex: "mobileNo",
      //   key: "mobileNo",
      //   width: 150,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "mobileNo",
      //     label: "شماره همراه",
      //     type: "text",
      //   }),
      // },
      // {
      //   title: "ملیت",
      //   dataIndex: "nationality",
      //   key: "nationality",
      //   width: 150,
      //   render: (value: string) => {
      //     return <CustomTag>{value}</CustomTag>;
      //   },
      // },
      // Todo[Atefeh]: based on https://gitlab.example.com/superuni/development/tasks/kouleh/-/issues/1173 issue, this column was deleted
      // {
      //   title: "واحد / شعبه",
      //   dataIndex: "branchName",
      //   key: "branchName",
      //   width: 150,
      //   render: (value: string) => {
      //     return <CustomTag>{value}</CustomTag>;
      //   },
      // },
      // Todo[Atefeh]:uncomment when api got ready

      // {
      //   title: "استان",
      //   dataIndex: "province",
      //   key: "province",
      //   width: 150,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "province",
      //     label: "استان",
      //     type: "text",
      //   }),
      // },
      // {
      //   title: "شهر",
      //   dataIndex: "city",
      //   key: "city",
      //   width: 150,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "city",
      //     label: "شهر",
      //     type: "text",
      //   }),
      // },
      // {
      //   title: "گردش مالی",
      //   dataIndex: "financialTransactions",
      //   key: "financialTransactions",
      //   width: 150,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "financialTransactions",
      //     label: "گردش مالی",
      //     type: "sort",
      //   }),
      // },
      {
        title: "موجودی",
        dataIndex: "balance",
        key: "balance",
        width: 150,
        // Todo[Atefeh]:uncomment when api got ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "balance",
        //   label: "موجودی",
        //   type: "sort",
        // }),
        render: (_: string, records: PersonalWalletsRecordDataType) => {
          return (
            <>
              {dataPlaceHolder({
                data: records?.balance?.totalAmount?.toString(),
                isRial: true,
                isPrice: true,
              })}{" "}
              تومان
            </>
          );
        },
      },
      {
        title: "آخرین تراکنش",
        dataIndex: "modifiedDate",
        key: "modifiedDate",
        width: 150,
        // Todo[Atefeh]:uncomment when api got ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "modifiedDate",
        //   label: "آخرین تراکنش",
        //   type: "sort",
        // }),
        render: (value: string) => {
          return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
        },
      },

      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: number, records: PersonalWalletsRecordDataType) => {
          return (
            <Link
              to={{
                pathname: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: records?.uuid,
                  from: WALLET_TYPE.staffUser,
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
          );
        },
      },
    ];
  };

export default AllWalletsListUsersTableListModel;
