import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_REQUESTS_PRE_REGISTRATION_ROUTE } from "@infra/router/routes/international";

import PreRegistrationDetailRequestInfoTab from "./helper/components/PreRegistrationDetailRequestInfoTab/PreRegistrationDetailRequestInfoTab";
import { preRegistrationPageMode } from "./helper/utils/preRegistrationUtils";
import { PRE_REGISTRATION_IDS } from "../../List/helper/utils/preRegistrationListUtils";
import PendingArchiveConfirmRequestHistory from "./helper/components/PreRegistrationDetailRequestHistoryTab/PendingArchiveConfirmRequestHistory/PendingArchiveConfirmRequestHistory";
import PendingArchiveExpireRequestHistory from "./helper/components/PreRegistrationDetailRequestHistoryTab/PendingArchiveExpireRequestHistory/PendingArchiveExpireRequestHistory";
import PendingArchiveRejectRequestHistory from "./helper/components/PreRegistrationDetailRequestHistoryTab/PendingArchiveRejectRequestHistory/PendingArchiveRejectRequestHistory";
import PendingNeedEditRequestHistory from "./helper/components/PreRegistrationDetailRequestHistoryTab/PendingNeedEditRequestHistory/PendingNeedEditRequestHistory";
import PendingReCheckingRequestHistory from "./helper/components/PreRegistrationDetailRequestHistoryTab/PendingReCheckingRequestHistory/PendingReCheckingRequestHistory";
import "./_preRegistrationDetail.scss";

const PreRegistrationDetail = () => {
  const { params } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={INTERNATIONAL_REQUESTS_PRE_REGISTRATION_ROUTE}>
            درخواست‌ها / پیش ثبت نام
          </Link>
        ),
      },
      {
        title: preRegistrationPageMode[params?.status]?.pageTitle,
      },
    ],
  });

  const tabItems = [
    {
      label: "مشخصات درخواست",
      children: <PreRegistrationDetailRequestInfoTab />,
      key: "1",
    },
    {
      label: "تاریخچه درخواست",
      children:
        params.status === PRE_REGISTRATION_IDS?.waitingReChecking ||
        params.status === PRE_REGISTRATION_IDS?.pending ? (
          <PendingReCheckingRequestHistory />
        ) : params.status === PRE_REGISTRATION_IDS?.needEdit ? (
          <PendingNeedEditRequestHistory />
        ) : params.status === PRE_REGISTRATION_IDS?.confirmArchive ? (
          <PendingArchiveConfirmRequestHistory />
        ) : params.status === PRE_REGISTRATION_IDS?.rejectArchive ? (
          <PendingArchiveRejectRequestHistory />
        ) : params.status === PRE_REGISTRATION_IDS?.expiredArchive ? (
          <PendingArchiveExpireRequestHistory />
        ) : null,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Tabs
      type="card"
      items={tabItems}
      className="international-pre-registration-requests-detail-tab-container"
    />
  );
};

export default PreRegistrationDetail;
