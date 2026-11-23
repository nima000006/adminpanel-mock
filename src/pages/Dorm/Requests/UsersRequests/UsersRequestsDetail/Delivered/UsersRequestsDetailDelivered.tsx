import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailDeliveredAdmission from "./helper/components/Admission/UsersRequestsDetailDeliveredAdmission";
import UsersRequestsDetailDeliveredFactor from "./helper/components/Factor/UsersRequestsDetailDeliveredFactor";
import UsersRequestsDetailDeliveredHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailDeliveredHistoryOfChanges";
import UsersRequestsDetailDeliveredRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailDeliveredRequestsInfo";
import UsersRequestsDetailDeliveredRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailDeliveredRoomAllocation";
import UsersRequestsDetailDeliveredRoomResidents from "./helper/components/RoomResidents/UsersRequestsDetailDeliveredRoomResidents";
import UsersRequestsDetailDeliveredUserHistory from "./helper/components/UserHistory/UsersRequestsDetailDeliveredUserHistory";
import "./_usersRequestsDetailDelivered.scss";

const UsersRequestsDetailDelivered = () => {
  const [tabKey, setTabKey] = useState<string>("1");
  const { params, setSearchParams } = useQueryParams();
  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailDeliveredRequestsInfo />,
    },
    {
      key: "2",
      label: "دیگر درخواست‌های اتاق",
      children: <UsersRequestsDetailDeliveredRoomAllocation />,
    },
    {
      key: "3",
      label: "ساکنین اتاق",
      children: <UsersRequestsDetailDeliveredRoomResidents />,
    },
    {
      key: "4",
      label: "فاکتور",
      children: <UsersRequestsDetailDeliveredFactor />,
    },
    {
      key: "5",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailDeliveredAdmission />,
    },
    {
      key: "6",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailDeliveredUserHistory />,
    },
    {
      key: "7",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailDeliveredHistoryOfChanges />,
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
    <div className="users-requests-detail-delivered-page-container">
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

export default UsersRequestsDetailDelivered;
