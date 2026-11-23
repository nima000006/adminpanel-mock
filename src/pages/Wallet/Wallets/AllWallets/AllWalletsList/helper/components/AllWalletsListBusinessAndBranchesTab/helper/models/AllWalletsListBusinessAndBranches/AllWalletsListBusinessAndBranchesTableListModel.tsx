import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { WALLET_TYPE } from "@pages/Wallet/Wallets/_shared/utils/walletUtils";
import {
  WALLET_STATUS_COLOR,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { BusinessAndBranchesWalletsRecordDataType } from "../../../@types/@allWalletsListBusinessAndBranchesTab";

const AllWalletsListBusinessAndBranchesTableListModel =
  (): CustomColumnType<BusinessAndBranchesWalletsRecordDataType>[] => {
    return [
      {
        title: "شناسه کیف پول",
        dataIndex: "uuid",
        key: "uuid",
        width: 250,
        // Todo[Atefeh]:uncomment when api got ready
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
        title: "نام کسب و کار ",
        dataIndex: "businessTitle",
        key: "businessTitle",
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      //  Todo[nima]: uncomment when api got ready
      // {
      //   title: "نوع کسب و کار",
      //   dataIndex: "businessTitle",
      //   key: "businessTitle",
      //   width: 150,
      // },
      {
        title: "شعبه / واحد",
        dataIndex: "branchTitle",
        key: "branchTitle",
        width: 150,
        // Todo[Atefeh]:uncomment when api got ready
        // ...GetServerColumnSearchProps({
        //   dataIndex: "branchTitle",
        //   label: "واحد / شعبه",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "کد شعبه",
        dataIndex: "branchCode",
        key: "branchCode",
        width: 150,
        // Todo[Atefeh]:it used in advance modal. delete if not needed in the future
        // ...GetServerColumnSearchProps({
        //   dataIndex: "branchCode",
        //   label: "کد شعبه",
        //   type: "text",
        // }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سرویس",
        dataIndex: "services",
        key: "services",
        width: 150,
        render: (value: { id: number; title: string; name: string }[] = []) => {
          if (!value?.length) {
            return <CustomTag className="w-fit">سیستمی</CustomTag>;
          }
          return (
            <>
              {value.map((s) => (
                <SamimServiceTag key={s.id} service={s.name} />
              ))}
            </>
          );
        },
      },
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
        render: (_: string, records: BusinessAndBranchesWalletsRecordDataType) => {
          return (
            <>
              {" "}
              {dataPlaceHolder({
                data: records?.balance?.totalAmount.toString(),
                isPrice: true,
                isRial: true,
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
          return (
            <>
              {dataPlaceHolder({
                data: value,
                isDate: true,
                customDateFormat: "HH:mm, YYYY/MM/DD",
              })}
            </>
          );
        },
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right" as FixedType,
        width: 150,
        className: "tables-sticky-column-left",
        render: (_: number, records: BusinessAndBranchesWalletsRecordDataType) => {
          return (
            <Link
              to={{
                pathname: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
                search: makeSearchParams({
                  id: records?.uuid,
                  from: WALLET_TYPE.business,
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

export default AllWalletsListBusinessAndBranchesTableListModel;
