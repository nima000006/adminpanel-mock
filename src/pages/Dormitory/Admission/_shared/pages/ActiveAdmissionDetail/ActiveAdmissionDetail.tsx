import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE,
  DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import { AdmissionDetailTab } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionDetailFinancialContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/AdmissionDetailFinancialContent";
import AdmissionDetailProgramTabs from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramTabs/AdmissionDetailProgramTabs";
import AdmissionDetailRulesContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailRulesContent/AdmissionDetailRulesContent";
import AdmissionDetailSchedulingContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSchedulingContent/AdmissionDetailSchedulingContent";
import AdmissionDetailSettingsContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/AdmissionDetailSettingsContent";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import ActiveAdmissionDetailCapacitiesContent from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailCapacitiesContent/ActiveAdmissionDetailCapacitiesContent";
import ActiveAdmissionDetailStatisticsContent from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailStatisticsContent/ActiveAdmissionDetailStatisticsContent";
import ActiveAdmissionDetailSummary from "@pages/Dormitory/Admission/_shared/pages/ActiveAdmissionDetail/helper/components/ActiveAdmissionDetailSummary/ActiveAdmissionDetailSummary";
import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";

const data = ADMISSION_DETAIL_MOCK_DATA;

const ACTIVE_ADMISSION_TABS: AdmissionDetailTab[] = [
  MY_ADMISSION_DETAIL_TABS.statistics,
  MY_ADMISSION_DETAIL_TABS.capacities,
  MY_ADMISSION_DETAIL_TABS.rules,
  MY_ADMISSION_DETAIL_TABS.scheduling,
  MY_ADMISSION_DETAIL_TABS.financial,
  MY_ADMISSION_DETAIL_TABS.settings,
];

const ActiveAdmissionDetail = () => {
  const { params: url, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه‌های پذیرش",
      },
      {
        title: (
          <Link
            to={
              url?.from
                ? url.from === "all"
                  ? DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE
                  : DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE
                : ""
            }
          >
            {url?.from === "all" ? "همه برنامه‌های پذیرش" : "برنامه‌های پذیرش من"}
          </Link>
        ),
      },
      {
        title: "مشاهده",
      },
    ],
  });
  //* ================================ State Variables ================================
  const requestedTab = url?.tab as AdmissionDetailTab | undefined;
  const activeTab =
    requestedTab && ACTIVE_ADMISSION_TABS.includes(requestedTab)
      ? requestedTab
      : MY_ADMISSION_DETAIL_TABS.statistics;
  //* ================================ Util Functions ================================
  // Preserve id/from when changing tabs so breadcrumb and contract navigation keep list origin.
  const changeTabHandler = (tab: AdmissionDetailTab) => {
    setSearchParams({
      id: url?.id,
      from: url?.from,
      tab,
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <ActiveAdmissionDetailSummary data={data} />

      <AdmissionDetailProgramTabs
        variant="active"
        activeTab={activeTab}
        onTabChange={changeTabHandler}
      />

      {activeTab === MY_ADMISSION_DETAIL_TABS.statistics && (
        <ActiveAdmissionDetailStatisticsContent statistics={data.statistics} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.capacities && (
        <ActiveAdmissionDetailCapacitiesContent data={data} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.rules && (
        <AdmissionDetailRulesContent variant="active" status={data.status} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.scheduling && (
        <AdmissionDetailSchedulingContent
          variant="active"
          data={data}
          status={data.status}
        />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.financial && (
        <AdmissionDetailFinancialContent
          variant="active"
          data={data}
          status={data.status}
        />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.settings && (
        <AdmissionDetailSettingsContent
          variant="active"
          data={data}
          status={data.status}
        />
      )}
    </div>
  );
};

export default ActiveAdmissionDetail;
