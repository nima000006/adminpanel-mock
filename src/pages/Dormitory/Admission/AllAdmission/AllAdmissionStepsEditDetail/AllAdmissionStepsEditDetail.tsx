import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import {
  isAllAdmissionStepsEditTab,
  MY_ADMISSION_DETAIL_TABS,
} from "@pages/Dormitory/Admission/_shared/util";
import AllAdmissionStepsEditDetailCapacitiesContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/AllAdmissionStepsEditDetailCapacitiesContent";
import AllAdmissionStepsEditDetailFinancialContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailFinancialContent/AllAdmissionStepsEditDetailFinancialContent";
import AllAdmissionStepsEditDetailProgramInfoContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailProgramInfoContent/AllAdmissionStepsEditDetailProgramInfoContent";
import AllAdmissionStepsEditDetailRulesContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/AllAdmissionStepsEditDetailRulesContent";
import AllAdmissionStepsEditDetailSchedulingContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailSchedulingContent/AllAdmissionStepsEditDetailSchedulingContent";
import AllAdmissionStepsEditDetailSettingsContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailSettingsContent/AllAdmissionStepsEditDetailSettingsContent";
import AllAdmissionStepsEditDetailTabs from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailTabs/AllAdmissionStepsEditDetailTabs";

const AllAdmissionStepsEditDetail = () => {
  const { params: url } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه‌های پذیرش",
      },
      {
        title: (
          <Link to={DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE}>همه برنامه‌های پذیرش</Link>
        ),
      },
      {
        title: (
          <Link
            to={{
              pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: url?.id,
              }),
            }}
          >
            مشاهده درخواست
          </Link>
        ),
      },
      {
        title: "ویرایش برنامه پذیرش",
      },
    ],
  });

  const activeTab = isAllAdmissionStepsEditTab(url?.tab)
    ? url.tab
    : MY_ADMISSION_DETAIL_TABS.programInfo;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex h-full flex-col gap-10">
      <AllAdmissionStepsEditDetailTabs activeTab={activeTab} enabledTab={activeTab} />

      {activeTab === MY_ADMISSION_DETAIL_TABS.programInfo && (
        <AllAdmissionStepsEditDetailProgramInfoContent />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.scheduling && (
        <AllAdmissionStepsEditDetailSchedulingContent />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.rules && (
        <AllAdmissionStepsEditDetailRulesContent />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.capacities && (
        <AllAdmissionStepsEditDetailCapacitiesContent />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.financial && (
        <AllAdmissionStepsEditDetailFinancialContent />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.settings && (
        <AllAdmissionStepsEditDetailSettingsContent />
      )}
    </div>
  );
};

export default AllAdmissionStepsEditDetail;
