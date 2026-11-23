import { useEffect, useState } from "react";

import { Tabs } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { WALLET_ALL_WALLETS_PAGE_ROUTE } from "@infra/router/routes/wallet";
import {
  useLazyGetLegalWalletTransactionListAdvanceFilterQuery,
  useLazyGetPersonalWalletTransactionListAdvanceFilterQuery,
  useLazyGetWalletsTransactionsListByWalletIdQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { GetLegalWalletTransactionListAdvanceFilterResponse } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListBranchTab/@types/@allTransactionListBranchTab";
import { GetPersonalWalletTransactionListAdvanceFilterResponse } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";

import { GetWalletsTransactionsListByWalletIdResponse } from "./@types/@allWalletsDetail";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "../_shared/utils/walletUtils";
import UserWalletInfo from "./helper/components/UserWalletInfo/UserWalletInfo";
import { WALLET_TYPE } from "../../_shared/utils/walletUtils";
import BusinessWalletInfo from "./helper/components/BusinessWalletInfo/BusinessWalletInfo";
import SegmentTable from "./helper/components/SegmentTable/SegmentTable";
import SegmentTimeLine from "./helper/components/SegmentTimeLine/SegmentTimeLine";
import { AllWalletDetailsWalletTransactionByAdvanceFilterRequest } from "../../WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsTransactionSegmented/helper/components/AllWalletDetailsTransactionSegmentTable/@types/@allWalletDetailsTransactionSegmentTable";

import "./_allWalletsDetail.scss";

const advanceFilterItems = [
  "uuid",
  "referenceNo",
  "trackNo",
  "dateDateStart",
  "dateDateEnd",
  "transactionTypeId",
];

const AllWalletsDetail = () => {
  // Todo[Nima]:uncomment when api got ready
  // const [view, setView] = useState("0");
  const view = 0; //first tab
  const [transactionData, setTransactionData] = useState<
    | GetWalletsTransactionsListByWalletIdResponse
    | GetPersonalWalletTransactionListAdvanceFilterResponse
    | GetLegalWalletTransactionListAdvanceFilterResponse
  >();

  const { params } = useQueryParams();
  const [selectedWalletUuid, setSelectedWalletUuid] = useState<string | undefined>(
    params.id
  );
  const [walletSelectVersion, setWalletSelectVersion] = useState(0);

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={WALLET_ALL_WALLETS_PAGE_ROUTE}>کیف پول</Link>,
      },
      {
        title: "کیف پول‌ها",
      },
      ...(params?.title
        ? [
            {
              title: params?.title,
            },
          ]
        : []),
    ],
  });

  //? ================================  Api Calls ================================
  const [getTransactionList, { isFetching: isTransactionListLoading }] =
    useLazyGetWalletsTransactionsListByWalletIdQuery();

  const [
    getTransactionAdvanceFilterList,
    { isFetching: isTransactionAdvanceFilterListLoading },
  ] = useLazyGetPersonalWalletTransactionListAdvanceFilterQuery();

  const [
    getBusinessTransactionAdvanceFilterList,
    { isFetching: isBusinessTransactionAdvanceFilterListLoading },
  ] = useLazyGetLegalWalletTransactionListAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!selectedWalletUuid) return;

    if (hasActiveKey(params, advanceFilterItems)) {
      let transactionType: string | undefined = "";

      if (params?.transactionTypeId) {
        transactionType = TRANSACTION_TYPE_STATUS_OPTIONS.find(
          (item) => item.id === +params?.transactionTypeId
        )?.text;
      }

      // Format dates: from should be start of day (00:00:00), to should be end of day (23:59:59) or current time if today
      let formattedFrom: string | undefined;
      let formattedTo: string | undefined;

      if (params?.dateDateStart) {
        formattedFrom = dayjs(params.dateDateStart).startOf("day").utc().toISOString();
      }

      if (params?.dateDateEnd) {
        const now = dayjs();
        const endDate = dayjs(params.dateDateEnd);

        const isToday =
          endDate.year() === now.year() &&
          endDate.month() === now.month() &&
          endDate.date() === now.date();

        if (isToday) {
          formattedTo = now.utc().toISOString();
        } else {
          formattedTo = endDate.endOf("day").utc().toISOString();
        }
      }

      const filters: AllWalletDetailsWalletTransactionByAdvanceFilterRequest = {
        ...(params?.uuid && { uuid: params?.uuid }),
        ...(params?.referenceNo && { referenceNo: params?.referenceNo }),
        ...(params?.trackNo && { trackNo: params?.trackNo }),
        ...(formattedFrom && { from: formattedFrom }),
        ...(formattedTo && { to: formattedTo }),
        ...(transactionType && { transactionType: transactionType }),
      };

      if (+params?.from === WALLET_TYPE.staffUser) {
        getTransactionAdvanceFilterList({
          pageNumber: params?.page ? Number(params?.page) - 1 : 0,
          pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          walletUuid: selectedWalletUuid,
          ...filters,
        })
          .unwrap()
          .then(getTransActionAdvanceFilterListSuccess);
      }

      if (+params?.from === WALLET_TYPE.business) {
        getBusinessTransactionAdvanceFilterList({
          pageNumber: params?.page ? Number(params?.page) - 1 : 0,
          pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          walletUuid: selectedWalletUuid,
          ...filters,
        })
          .unwrap()
          .then(getBusinessTransActionAdvanceFilterListSuccess);
      }
    } else {
      getTransactionList({
        params: {
          pageNumber: params?.page ? Number(params?.page) - 1 : 0,
          pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
        },
        walletId: selectedWalletUuid,
      })
        .unwrap()
        .then((value) => {
          setTransactionData(value);
        });
    }
  }, [
    selectedWalletUuid,
    walletSelectVersion,
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((item) => params?.[item]),
  ]);

  //* ================================ Util Functions ================================
  const handleWalletSelect = (uuid: string) => {
    if (uuid === selectedWalletUuid) {
      // Force table refetch when uuid did not change (branch change edge case)
      setWalletSelectVersion((version) => version + 1);
      return;
    }

    setSelectedWalletUuid(uuid);
  };
  const segmentItems = [
    {
      id: "0",
      children: (
        <SegmentTable
          data={transactionData}
          loading={
            isTransactionListLoading ||
            isBusinessTransactionAdvanceFilterListLoading ||
            isTransactionAdvanceFilterListLoading
          }
        />
      ),
    },
    {
      id: "1",
      children: <SegmentTimeLine />,
    },
  ];

  const getTransActionAdvanceFilterListSuccess = (
    value: GetPersonalWalletTransactionListAdvanceFilterResponse
  ) => {
    setTransactionData(value);
  };

  const getBusinessTransActionAdvanceFilterListSuccess = (
    value: GetLegalWalletTransactionListAdvanceFilterResponse
  ) => {
    setTransactionData(value);
  };

  const handleWalletsEmpty = () => {
    setTransactionData(undefined);
  };

  const tabsItems = [
    {
      label: "جزییات کیف پول",
      children: (
        <div className="all-wallets-detail-page-container">
          {/* Information */}
          <div className="information-container">
            {+params?.from === WALLET_TYPE.business ? (
              <BusinessWalletInfo
                onWalletSelect={handleWalletSelect}
                onWalletsEmpty={handleWalletsEmpty}
              />
            ) : (
              <UserWalletInfo />
            )}
          </div>
          {/* Table */}
          <div>
            <CustomDivider
              text="تاریخچه تراکنش‌ها"
              // Todo[Nima]: uncomment when api got ready
              // extraContent={
              //   <CustomSegmented
              //     options={[
              //       { value: "0", label: "جدول" },
              //       { value: "1", label: "خط زمانی" },
              //     ]}
              //     disabled={true}
              //     onChange={(value) => setView(value as "0" | "1")}
              //     value={view}
              //   />
              // }
            />
            {segmentItems[+view]?.children}
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label: "تاریخچه تغییرات",
      children: <></>,
      key: "2",
      disabled: true,
    },
  ];
  return <Tabs items={tabsItems} type="card" className="wallet-detail-tabs-container" />;
};

export default AllWalletsDetail;
