import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailConfirmedAdmission from "./helper/components/Admission/UsersRequestsDetailConfirmedAdmission";
import UsersRequestsDetailConfirmedFactor from "./helper/components/Factor/UsersRequestsDetailConfirmedFactor";
import UsersRequestsDetailConfirmedHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailConfirmedHistoryOfChanges";
import UsersRequestsDetailConfirmedRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailConfirmedRequestsInfo";
import UsersRequestsDetailConfirmedRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailConfirmedRoomAllocation";
import UsersRequestsDetailConfirmedRoomResidents from "./helper/components/RoomResidents/UsersRequestsDetailConfirmedRoomResidents";
import UsersRequestsDetailConfirmedUserHistory from "./helper/components/UserHistory/UsersRequestsDetailConfirmedUserHistory";
import "./_usersRequestsDetailConfirmed.scss";

const UsersRequestsDetailConfirmed = () => {
  const [tabKey, setTabKey] = useState<string>("1");
  const { params, setSearchParams } = useQueryParams();
  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailConfirmedRequestsInfo />,
    },
    {
      key: "2",
      label: "دیگر درخواست‌های اتاق",
      children: <UsersRequestsDetailConfirmedRoomAllocation />,
    },
    {
      key: "3",
      label: "ساکنین اتاق",
      children: <UsersRequestsDetailConfirmedRoomResidents />,
    },
    {
      key: "4",
      label: "فاکتور",
      children: <UsersRequestsDetailConfirmedFactor />,
    },
    {
      key: "5",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailConfirmedAdmission />,
    },
    {
      key: "6",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailConfirmedUserHistory />,
    },
    {
      key: "7",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailConfirmedHistoryOfChanges />,
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
    <div className="users-requests-detail-confirmed-page-container">
      <Tabs
        defaultActiveKey="1"
        items={items}
        activeKey={tabKey}
        onChange={removePageSizes}
        type="card"
        className="dorm-users-requests-detail-tab-container"
      />
    </div>
  );
};

export default UsersRequestsDetailConfirmed;
