import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailCancellationAdmission from "./helper/components/Admission/UsersRequestsDetailCancellationAdmission";
import UsersRequestsDetailCancellationFactor from "./helper/components/Factor/UsersRequestsDetailCancellationFactor";
import UsersRequestsDetailCancellationHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailCancellationHistoryOfChanges";
import UsersRequestsDetailCancellationRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailCancellationRequestsInfo";
import UsersRequestsDetailCancellationRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailCancellationRoomAllocation";
import UsersRequestsDetailCancellationRoomResidents from "./helper/components/RoomResidents/UsersRequestsDetailCancellationRoomResidents";
import UsersRequestsDetailCancellationUserHistory from "./helper/components/UserHistory/UsersRequestsDetailCancellationUserHistory";
import "./_usersRequestsDetailCancellation.scss";

const UsersRequestsDetailCancellation = () => {
  const [tabKey, setTabKey] = useState<string>("1");
  const { params, setSearchParams } = useQueryParams();
  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailCancellationRequestsInfo />,
    },
    {
      key: "2",
      label: "تخصیص اتاق",
      children: <UsersRequestsDetailCancellationRoomAllocation />,
    },
    {
      key: "3",
      label: "ساکنین اتاق",
      children: <UsersRequestsDetailCancellationRoomResidents />,
    },
    {
      key: "4",
      label: "فاکتور",
      children: <UsersRequestsDetailCancellationFactor />,
    },
    {
      key: "5",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailCancellationAdmission />,
    },
    {
      key: "6",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailCancellationUserHistory />,
    },
    {
      key: "7",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailCancellationHistoryOfChanges />,
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
    <div className="users-requests-detail-cancellation-page-container">
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

export default UsersRequestsDetailCancellation;
