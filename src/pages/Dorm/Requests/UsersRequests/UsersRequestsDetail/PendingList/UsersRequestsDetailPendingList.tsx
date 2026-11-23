import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailPendingListAdmission from "./helper/components/Admission/UsersRequestsDetailPendingListAdmission";
import UsersRequestsDetailPendingListFactor from "./helper/components/Factor/UsersRequestsDetailPendingListFactor";
import UsersRequestsDetailPendingListHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailPendingListHistoryOfChanges";
import UsersRequestsDetailPendingListRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailPendingListRequestsInfo";
import UsersRequestsDetailPendingListRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailPendingListRoomAllocation";
import UsersRequestsDetailPendingListUserHistory from "./helper/components/UserHistory/UsersRequestsDetailPendingListUserHistory";
import "./_usersRequestsDetailPendingList.scss";

const UsersRequestsDetailPendingList = () => {
  const { params, setSearchParams } = useQueryParams();
  const [tabKey, setTabKey] = useState<string>("1");
  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailPendingListRequestsInfo />,
    },
    {
      key: "2",
      label: "تخصیص اتاق",
      children: <UsersRequestsDetailPendingListRoomAllocation />,
    },
    {
      key: "3",
      label: "فاکتور",
      children: <UsersRequestsDetailPendingListFactor />,
    },
    {
      key: "4",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailPendingListAdmission />,
    },
    {
      key: "5",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailPendingListUserHistory />,
    },
    {
      key: "6",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailPendingListHistoryOfChanges />,
      disabled: true,
    },
  ];

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_USERS_REQUESTS_LIST_PAGE_ROUTE}>درخواست‌های کاربران</Link>,
      },
      ...(id
        ? [
            {
              title: `درخواست شماره ${id}`,
            },
          ]
        : []),
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    const shouldReset = resetTab === "true";

    if (shouldReset) {
      setTabKey(tab);
      setSearchParams({ ...params, resetTab: "false" });
    }
  }, [resetTab, tab]);

  //* ================================ Util Functions ================================
  const removePageSizes = (e: string) => {
    setTabKey(e);
    if (pageSize || page) {
      delete params?.pageSize;
      delete params?.page;
      setSearchParams({ ...params });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="users-requests-detail-pending-list-page-container">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        items={items}
        onChange={removePageSizes}
        type="card"
        className="dorm-users-requests-detail-tab-container"
      />
    </div>
  );
};

export default UsersRequestsDetailPendingList;
