import { lazy, Suspense } from "react";

import { Tabs } from "antd";

import { InsuranceRequestsDetailTabsProps } from "./@types/@insuranceRequestsDetail";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_insuranceRequestsDetail.scss";

const LazyRequestsInsuredDetail = lazy(
  () =>
    import("../InsuranceRequestsDetail/helper/components/RequestsInsuranceDetail/RequestsInsuranceDetail")
);
const LazyRequestsFinancialStatus = lazy(
  () =>
    import("../InsuranceRequestsDetail/helper/components/RequestsFinancialStatus/RequestsFinancialStatus")
);

const InsuranceRequestsDetail = () => {
  useTitle({ text: "جزئیات درخواست بیمه" });
  const InsuranceRequestsDetailTabs: InsuranceRequestsDetailTabsProps = () => {
    return [
      {
        label: "جزئیات بیمه‌نامه",
        children: (
          <Suspense fallback={null}>
            <LazyRequestsInsuredDetail />
          </Suspense>
        ),
        key: "1",
      },
      {
        label: "جزئیات بیمه شده",
        children: (
          <Suspense fallback={null}>
            <LazyRequestsInsuredDetail />
          </Suspense>
        ),
        key: "2",
      },
      {
        label: "وضعیت مالی",
        children: (
          <Suspense fallback={null}>
            <LazyRequestsFinancialStatus />
          </Suspense>
        ),
        key: "3",
      },
      // { label: "سوابق تغییر", children: <RequestsFinancialHistory />, key: "4" },
    ];
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Tabs
        items={InsuranceRequestsDetailTabs()}
        className="insurance-requests-detail-tab-container"
        type="card"
      />
    </div>
  );
};

export default InsuranceRequestsDetail;
