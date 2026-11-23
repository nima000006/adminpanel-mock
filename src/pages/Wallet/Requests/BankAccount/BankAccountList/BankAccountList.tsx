import { useEffect, useState } from "react";

import { Form } from "antd";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBankAccountListCountQuery } from "@infra/states/redux/Apis/wallet/requests/requestsApi";
import { useLazyGetLegalWalletBankAccountsListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { AllWalletDetailsGetLegalWalletBankAccountsListResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/drawer/AllWalletDetailsYourAccountDrawerContent/@types/@allWalletDetailsyourAccountDrawerContent";

import {
  BankAccountAdvanceFilterFormType,
  RequestBankAccountListAdvanceFilterItemsType,
  GetRequestBankAccountListResponse,
} from "./@types/@bankAccountList";
import { DEMAND_IDS } from "../../_shared/utils";
import BankAccountAllList from "./helper/components/BankAccountAllList/BankAccountAllList";
import BankAccountConfirmList from "./helper/components/BankAccountConfirmList/BankAccountConfirmList";
import BankAccountRejectList from "./helper/components/BankAccountRejectList/BankAccountRejectList";
import BankAccountPendingList from "./helper/components/BankAccuntPendingList/BankAccountPendingList";
import useWalletBankAccountAdvanceFilter from "./helper/modals/AdnanceFilter/useWalletBankAccountAdvanceFilter";
import "./_bankAccountList.scss";

const advanceFilterItems = [
  "iban",
  "cardNumber",
  "branchIdId",
  "serviceNameId",
  "businessIdId",
  "bankName",
];
const BankAccountList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<BankAccountAdvanceFilterFormType>();

  const { filterItemsList } = useWalletBankAccountAdvanceFilter(form);

  const [dataSource, setDataSource] = useState<
    | GetRequestBankAccountListResponse
    | AllWalletDetailsGetLegalWalletBankAccountsListResponse
    | null
  >(null);
  const [allDataSource, setAllDataSource] =
    useState<GetRequestBankAccountListResponse | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: "درخواست‌ها",
      },
      {
        title: "درخواست‌های ایجاد حساب بانکی",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getListCount, { data: listCountData, isFetching: isListCountLoading }] =
    useLazyGetBankAccountListCountQuery();

  // Todo[Atefeh]: old version
  // const [getList, { isFetching: isGetListDataLoading }] =
  //   useLazyGetRequestBankAccountListQuery();

  // get all list
  // const [getAllList, { isFetching: isGetAllListDataLoading }] =
  //   useLazyGetRequestBankAccountAllListQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterLoading }] =
    useLazyGetLegalWalletBankAccountsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.tab) {
      setSearchParams({ tab: DEMAND_IDS.pending });
    }
  }, [url?.tab]);

  useEffect(() => {
    getListCount();
  }, []);

  useEffect(() => {
    getAdvanceFilterData();
    // Todo[Atefeh]: old version
    // if (hasActiveKey(url, advanceFilterItems)) {
    //   const filters: RequestBankAccountListAdvanceFilterItemsType = {
    //     ...(url?.businessIdId && { businessId: +url?.businessIdId }),
    //     ...(url?.branchIdId && { branchId: +url?.branchIdId }),
    //     ...(url?.bankName && { bankName: url?.bankName }),
    //     ...(url?.serviceNameId && {
    //       samimService: serviceOptions.filter(
    //         (item) => item?.id === +url?.serviceNameId
    //       )?.[0]?.value,
    //     }),
    //     ...(url?.cardNumber && { cardNumber: url?.cardNumber }),
    //     ...(url?.iban && { iban: url?.iban }),
    //   };
    //   advanceFilter({
    //     pageNumber: url?.page ? Number(url?.page) - 1 : 0,
    //     pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    //     status:
    //       url?.tab == DEMAND_IDS.pending
    //         ? "REQUESTED"
    //         : url?.tab == DEMAND_IDS.confirm
    //           ? "ACCEPTED"
    //           : url?.tab == DEMAND_IDS.rejected
    //             ? "REJECTED"
    //             : "",
    //     ...filters,
    //   })
    //     .unwrap()
    //     .then((value) => {
    //       setDataSource(value);
    //       setAllDataSource(value);
    //     });
    // } else {
    //   if (
    //     url?.tab === DEMAND_IDS.pending ||
    //     url?.tab === DEMAND_IDS.confirm ||
    //     url?.tab === DEMAND_IDS.rejected
    //   ) {
    //     getListData();
    //   }
    //   if (url?.tab === DEMAND_IDS.all) {
    //     getAllListData();
    //   }
    // }
  }, [
    url?.tab,
    url?.page,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);
  //* ================================ Util Functions ================================

  const getAdvanceFilterData = async () => {
    if (!url?.tab) return;

    const filters: RequestBankAccountListAdvanceFilterItemsType = {
      ...(url?.businessIdId && { businessId: +url?.businessIdId }),
      ...(url?.branchIdId && { branchId: +url?.branchIdId }),
      ...(url?.bankName && { bankName: url?.bankName }),
      ...(url?.serviceNameId && {
        samimService: serviceOptions.filter(
          (item) => item?.id === +url?.serviceNameId
        )?.[0]?.value,
      }),
      ...(url?.cardNumber && { cardNumber: url?.cardNumber }),
      ...(url?.iban && { iban: url?.iban }),
    };

    advanceFilter({
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      status:
        url?.tab == DEMAND_IDS.pending
          ? "REQUESTED"
          : url?.tab == DEMAND_IDS.confirm
            ? "ACCEPTED"
            : url?.tab == DEMAND_IDS.rejected
              ? "REJECTED"
              : "",
      ...filters,
    })
      .unwrap()
      .then((value) => {
        setDataSource(value);
        setAllDataSource(value);
      });
  };

  // Todo[Atefeh]: old version
  // const getListData = () => {
  //   getList({
  //     params: {
  //       pageNumber: url?.page ? Number(url?.page) - 1 : 0,
  //       pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
  //     },

  //     status:
  //       url?.tab == DEMAND_IDS.pending
  //         ? "REQUESTED"
  //         : url?.tab == DEMAND_IDS.confirm
  //           ? "ACCEPTED"
  //           : url?.tab == DEMAND_IDS.rejected
  //             ? "REJECTED"
  //             : "",
  //   })
  //     .unwrap()
  //     .then((value: GetRequestBankAccountListResponse) => {
  //       setDataSource(value);
  //     });
  // };

  // const getAllListData = () => {
  //   getAllList({
  //     pageNumber: url?.page ? Number(url?.page) - 1 : 0,
  //     pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
  //   })
  //     .unwrap()
  //     .then((value) => {
  //       setAllDataSource(value);
  //     });
  // };

  const changeCardHandler = (status: string) => {
    setSearchParams({ tab: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="bank-account-list-container">
      <div className="demand-wrapper">
        <DemandCard
          title="در انتظار بررسی"
          active={url?.tab == DEMAND_IDS.pending}
          clickHandler={() => changeCardHandler(DEMAND_IDS.pending)}
          badgeColor="transparent"
          badge={true}
          badgeTitle={isListCountLoading ? "..." : `(${listCountData?.requested})`}
        />
        <DemandCard
          title="تایید شده"
          active={url?.tab === DEMAND_IDS.confirm}
          clickHandler={() => changeCardHandler(DEMAND_IDS.confirm)}
          badge={true}
          badgeColor="transparent"
          badgeTitle={isListCountLoading ? "..." : `(${listCountData?.accepted})`}
        />
        <DemandCard
          title="رد شده"
          active={url?.tab === DEMAND_IDS.rejected}
          clickHandler={() => changeCardHandler(DEMAND_IDS.rejected)}
          badge={true}
          badgeColor="transparent"
          badgeTitle={isListCountLoading ? "..." : `(${listCountData?.rejected})`}
        />
        <DemandCard
          title="همه"
          active={url?.tab === DEMAND_IDS.all}
          clickHandler={() => changeCardHandler(DEMAND_IDS.all)}
          badge={true}
          badgeColor="transparent"
          badgeTitle={isListCountLoading ? "..." : `(${listCountData?.total})`}
        />
      </div>
      {url?.tab === DEMAND_IDS.pending ? (
        <BankAccountPendingList
          data={dataSource}
          // loading={isGetListDataLoading}
          getListData={getAdvanceFilterData}
          filterItemsList={filterItemsList}
          form={form}
          loadingAdvance={isAdvanceFilterLoading}
          refreshCount={getListCount}
        />
      ) : url?.tab === DEMAND_IDS.confirm ? (
        <BankAccountConfirmList
          data={dataSource}
          // loading={isGetListDataLoading}
          filterItemsList={filterItemsList}
          form={form}
          loadingAdvance={isAdvanceFilterLoading}
        />
      ) : url?.tab === DEMAND_IDS.rejected ? (
        <BankAccountRejectList
          data={dataSource}
          // loading={isGetListDataLoading}
          filterItemsList={filterItemsList}
          form={form}
          loadingAdvance={isAdvanceFilterLoading}
        />
      ) : url?.tab === DEMAND_IDS.all ? (
        <BankAccountAllList
          data={allDataSource}
          // loading={isGetAllListDataLoading}
          filterItemsList={filterItemsList}
          form={form}
          loadingAdvance={isAdvanceFilterLoading}
        />
      ) : null}
    </div>
  );
};

export default BankAccountList;
