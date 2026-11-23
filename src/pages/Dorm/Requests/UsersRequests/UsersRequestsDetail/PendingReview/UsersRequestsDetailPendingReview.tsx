import { useEffect, useState } from "react";

import { Tabs, TabsProps } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import {
  UserRequestsRequestType,
  UserRequestsReservationType,
} from "../_shared/utils/UsersRequestsDetail";
import UsersRequestsDetailPendingReviewAdmission from "./helper/components/Admission/UsersRequestsDetailPendingReviewAdmission";
import UsersRequestsDetailPendingReviewFactor from "./helper/components/Factor/UsersRequestsDetailPendingReviewFactor";
import UsersRequestsDetailPendingReviewHistoryOfChanges from "./helper/components/HistoryOfChanges/UsersRequestsDetailPendingReviewHistoryOfChanges";
import UsersRequestsDetailPendingReviewRequestsInfo from "./helper/components/RequestsInfo/UsersRequestsDetailPendingReviewRequestsInfo";
import UsersRequestsDetailPendingReviewRoomAllocation from "./helper/components/RoomAllocation/UsersRequestsDetailPendingReviewRoomAllocation";
import UsersRequestsDetailPendingReviewRoomResidents from "./helper/components/RoomResidents/UsersRequestsDetailPendingReviewRoomResidents";
import UsersRequestsDetailPendingReviewUserHistory from "./helper/components/UserHistory/UsersRequestsDetailPendingReviewUserHistory";
import "./_usersRequestsDetailPendingReview.scss";

const UsersRequestsDetailPendingReview = () => {
  const { params, setSearchParams } = useQueryParams();
  const { id, requestType, reservationTypeId, resetTab, pageSize, page, tab } = params;
  const [tabKey, setTabKey] = useState<string>("1");

  //? ================================ Effects ================================
  useEffect(() => {
    const shouldReset = resetTab === "true";

    if (shouldReset) {
      setTabKey(tab);
      setSearchParams({ ...params, resetTab: "false" });
    }
  }, [resetTab, tab]);

  //? ================================ components ================================

  const RoomResidents =
    +requestType !== UserRequestsRequestType?.displacement // درخواست تمدید و رزرو
      ? +reservationTypeId === UserRequestsReservationType?.inDefiniteRoomReservation // رزرو غیرقطعی اتاق
        ? {
            key: "3",
            label: "ساکنین اتاق",
            children: <UsersRequestsDetailPendingReviewRoomResidents />,
          }
        : null // رزرو خوابگاه
      : {
          key: "3",
          label: "ساکنین اتاق",
          children: <UsersRequestsDetailPendingReviewRoomResidents />,
        }; // درخواست جا به جایی
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "اطلاعات درخواست",
      children: <UsersRequestsDetailPendingReviewRequestsInfo />,
    },
    {
      key: "2",
      label:
        +requestType !== 3
          ? // درخواست تمدید و رزرو
            +reservationTypeId === 3
            ? "تخصیص اتاق" // رزرو خوابگاه / رزرو غیرقطعی
            : "دیگر درخواست‌های اتاق" // رزرو غیرقطعی اتاق
          : "دیگر درخواست‌های اتاق", // درخواست جا به جایی

      children: <UsersRequestsDetailPendingReviewRoomAllocation />,
    },
    RoomResidents, // ساکنین اتاق
    {
      key: "4",
      label: "فاکتور",
      children: <UsersRequestsDetailPendingReviewFactor />,
    },
    {
      key: "5",
      label: "برنامه پذیرش",
      children: <UsersRequestsDetailPendingReviewAdmission />,
    },
    {
      key: "6",
      label: "سوابق کاربر",
      children: <UsersRequestsDetailPendingReviewUserHistory />,
    },
    {
      key: "7",
      label: "تاریخچه تغییرات",
      children: <UsersRequestsDetailPendingReviewHistoryOfChanges />,
      disabled: true,
    },
  ].filter(notNull); // Filter out null values here

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

  //* ================================ Util Functions ================================
  const removePageSizes = (e: string) => {
    setTabKey(e);
    if (pageSize || page) {
      delete params?.pageSize;
      delete params?.page;
      setSearchParams({ ...params });
    }
  };
  function notNull<T>(value: T | null): value is T {
    return value !== null;
  }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="users-requests-detail-pending-review-page-container">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabKey}
        onChange={(e) => removePageSizes(e)}
        items={items}
        type="card"
        className="dorm-users-requests-detail-tab-container"
      />
    </div>
  );
};

export default UsersRequestsDetailPendingReview;
