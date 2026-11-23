import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_HABITANTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetHabitantsEvacuationCountQuery,
  useLazyGetHabitantsEvacuationListQuery,
  useSendAllEvacuationMutation,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";

import {
  GetHabitantsEvacuationListResponse,
  HabitantsEvacuationListData,
} from "./@types/@evacuationType";
import CreditorsTab from "./helper/components/CreditorsTab/CreditorsTab";
import DebtorsTab from "./helper/components/DebtorsTab/DebtorsTab";
import SettlementsTab from "./helper/components/SettlementsTab/SettlementsTab";
import { DORM_HABITANTS_PAYMENT_STATUS } from "../HabitantsList/helpers/utils/HabitantListUtils";

const Evacuation = () => {
  const [dataSource, setDataSource] = useState<HabitantsEvacuationListData[]>([]);
  const [refreshList, setRefreshList] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeTab, setActiveTab] = useState(DORM_HABITANTS_PAYMENT_STATUS.settled);

  const { params: url, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_HABITANTS_LIST_PAGE_ROUTE}>ساکنین</Link>,
      },

      {
        title: "تخلیه ساکنین",
      },
    ],
  });

  //? ================================  Api Calls ================================
  // get list
  const [getHabitantsList, { isFetching: isGetHabitantsListLoading }] =
    useLazyGetHabitantsEvacuationListQuery();

  // get count
  const [
    getHabitantsListCount,
    { data: habitantsListCount, isFetching: isGetHabitantsListCountLoading },
  ] = useLazyGetHabitantsEvacuationCountQuery();

  // all evacuation
  const [allEvacuation, { isLoading: isAllEvacuationLoading }] =
    useSendAllEvacuationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getHabitantsList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      paymentStatus_EQ: activeTab,
    })
      .unwrap()
      .then(getHabitantsListIsSuccess);
  }, [refreshList, activeTab, url?.pageSize, url?.page]);

  useEffect(() => {
    getHabitantsListCount({ paymentStatus_EQ: activeTab });
  }, [activeTab]);

  //* ================================ Util Functions ================================
  // success get list
  const getHabitantsListIsSuccess = (value: GetHabitantsEvacuationListResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  // evacuation
  const allEvacuationHandler = () => {
    if (selectedRowKeys.length === 0) return;

    allEvacuation({
      form: "GroupEvacuation",
      data: {},
      query: {
        filters: [
          {
            key: "id",
            operator: "IN",
            value: selectedRowKeys.join(","),
          },
        ],
      },
    })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setSelectedRowKeys([]);
          setRefreshList((prev) => !prev); // trigger list refresh
        }
      })
      .catch((err) => {
        console.error("خطا در تخلیه گروهی:", err);
      });
  };

  const onSelectedRowKeysChange = (newSelectedKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedKeys);
  };

  const tabsItems = [
    {
      label: "تسویه شده‌ها",
      children: (
        <div>
          <SettlementsTab
            dataSource={dataSource}
            ListLoading={isGetHabitantsListLoading}
            CountLoading={isGetHabitantsListCountLoading}
            habitantsListCount={habitantsListCount}
            isAllEvacuationLoading={isAllEvacuationLoading}
            allEvacuationHandler={allEvacuationHandler}
            selectedRowKeys={selectedRowKeys}
            onSelectedRowKeysChange={onSelectedRowKeysChange}
            url={url}
            setSearchParams={setSearchParams}
            tabType={DORM_HABITANTS_PAYMENT_STATUS?.settled}
            setRefreshList={setRefreshList}
          />
        </div>
      ),
      key: String(DORM_HABITANTS_PAYMENT_STATUS.settled),
    },
    {
      label: "بستانکاران",
      children: (
        <div>
          <CreditorsTab
            dataSource={dataSource}
            ListLoading={isGetHabitantsListLoading}
            CountLoading={isGetHabitantsListCountLoading}
            habitantsListCount={habitantsListCount}
            isAllEvacuationLoading={isAllEvacuationLoading}
            allEvacuationHandler={allEvacuationHandler}
            selectedRowKeys={selectedRowKeys}
            onSelectedRowKeysChange={onSelectedRowKeysChange}
            url={url}
            setSearchParams={setSearchParams}
            tabType={DORM_HABITANTS_PAYMENT_STATUS?.credit}
            setRefreshList={setRefreshList}
          />
        </div>
      ),
      key: String(DORM_HABITANTS_PAYMENT_STATUS.credit),
    },
    {
      label: "بدهکاران",
      children: (
        <div>
          <DebtorsTab
            dataSource={dataSource}
            ListLoading={isGetHabitantsListLoading}
            CountLoading={isGetHabitantsListCountLoading}
            habitantsListCount={habitantsListCount}
            selectedRowKeys={selectedRowKeys}
            onSelectedRowKeysChange={onSelectedRowKeysChange}
            url={url}
            setSearchParams={setSearchParams}
            tabType={DORM_HABITANTS_PAYMENT_STATUS?.debit}
            setRefreshList={setRefreshList}
          />
        </div>
      ),
      key: String(DORM_HABITANTS_PAYMENT_STATUS.debit),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="body-regular">
      <Tabs
        type="card"
        items={tabsItems}
        className="body-regular"
        activeKey={String(activeTab)}
        onChange={(key) => setActiveTab(Number(key))}
      />
    </CustomCard>
  );
};
export default Evacuation;
