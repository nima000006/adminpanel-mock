import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import UsersRequestsDetailPendingPaymentAdmission from "./helper/components/Admission/UsersRequestsDetailPendingPaymentAdmission";
import UsersRequestsDetailPendingPaymentFactor from "./helper/components/Factor/UsersRequestsDetailPendingPaymentFactor";
import UsersRequestsDetailPendingPaymentHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailPendingPaymentHistoryOfChanges";
import UsersRequestsDetailPendingPaymentRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailPendingPaymentRequestsInfo";
import UsersRequestsDetailPendingPaymentRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailPendingPaymentRoomAllocation";
import UsersRequestsDetailPendingPaymentRoomResidents from "./helper/components/RoomResidents/UsersRequestsDetailPendingPaymentRoomResidents";
import UsersRequestsDetailPendingPaymentUserHistory from "./helper/components/UserHistory/UsersRequestsDetailPendingPaymentUserHistory";
import "./_usersRequestsDetailPendingPayment.scss";

const UsersRequestsDetailPendingPayment = () => {
  const [tabKey, setTabKey] = useState<string>("1");
  const { params, setSearchParams } = useQueryParams();

  const { id, pageSize, page, tab, resetTab } = params;

  const items = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailPendingPaymentRequestsInfo />,
    },
    {
      key: "2",
      label: "دیگر درخواست‌های اتاق",
      children: <UsersRequestsDetailPendingPaymentRoomAllocation />,
    },
    {
      key: "3",
      label: "ساکنین اتاق",
      children: <UsersRequestsDetailPendingPaymentRoomResidents />,
    },
    {
      key: "4",
      label: "فاکتور",
      children: <UsersRequestsDetailPendingPaymentFactor />,
    },
    {
      key: "5",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailPendingPaymentAdmission />,
    },
    {
      key: "6",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailPendingPaymentUserHistory />,
    },
    {
      key: "7",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailPendingPaymentHistoryOfChanges />,
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
    <div className="users-requests-detail-pending-payment-page-container">
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

export default UsersRequestsDetailPendingPayment;
