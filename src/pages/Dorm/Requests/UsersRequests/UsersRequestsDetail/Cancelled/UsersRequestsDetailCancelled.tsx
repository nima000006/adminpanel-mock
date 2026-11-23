import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailCancelledAdmission from "./helper/components/Admission/UsersRequestsDetailCancelledAdmission";
import UsersRequestsDetailCancelledHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailCancelledHistoryOfChanges";
import UsersRequestsDetailCancelledRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailCancelledRequestsInfo";
import UsersRequestsDetailCancelledUserHistory from "./helper/components/UserHistory/UsersRequestsDetailCancelledUserHistory";
import "./_usersRequestsDetailCancelled.scss";

const UsersRequestsDetailCancelled = () => {
  const [tabKey, setTabKey] = useState<string>("1");
  const { params, setSearchParams } = useQueryParams();
  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailCancelledRequestsInfo />,
    },
    {
      key: "2",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailCancelledAdmission />,
    },
    {
      key: "3",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailCancelledUserHistory />,
    },
    {
      key: "4",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailCancelledHistoryOfChanges />,
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
    <div className="users-requests-detail-cancelled-page-container">
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

export default UsersRequestsDetailCancelled;
