import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AdmissionDetailTab } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionDetailCapacitiesContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailCapacitiesContent/AdmissionDetailCapacitiesContent";
import AdmissionDetailFinancialContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/AdmissionDetailFinancialContent";
import AdmissionDetailProgramInfoContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramInfoContent/AdmissionDetailProgramInfoContent";
import AdmissionDetailProgramTabs from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramTabs/AdmissionDetailProgramTabs";
import AdmissionDetailRequestInfo from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailRequestInfo/AdmissionDetailRequestInfo";
import AdmissionDetailRulesContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailRulesContent/AdmissionDetailRulesContent";
import AdmissionDetailSchedulingContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSchedulingContent/AdmissionDetailSchedulingContent";
import AdmissionDetailSettingsContent from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSettingsContent/AdmissionDetailSettingsContent";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import {
  getAdmissionDetailStatusFlags,
  MY_ADMISSION_DETAIL_TABS,
} from "@pages/Dormitory/Admission/_shared/util";

const data = ADMISSION_DETAIL_MOCK_DATA;

const MyAdmissionDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه های پذیرش",
      },
      {
        title: (
          <Link to={DORMITORY_MY_ADMISSION_LIST_PAGE_ROUTE}>برنامه های پذیرش من</Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  const activeTab =
    (url?.tab as AdmissionDetailTab | undefined) ?? MY_ADMISSION_DETAIL_TABS.programInfo;

  const statusFlags = getAdmissionDetailStatusFlags(data.status, data.returnDate);
  const { isWaiting, isReturned, isRejected, isCancelled } = statusFlags;

  const changeTabHandler = (tab: typeof activeTab) => {
    setSearchParams({ ...url, tab });
  };

  //* ================================ Util Functions ================================
  const viewResidenceHandler = () => {
    // TODO: navigate to residence detail when route is ready
  };

  const cancelRequestHandler = () => {
    // TODO: open cancel confirmation modal when API is ready
  };

  const editInfoHandler = () => {
    // TODO: open edit drawer when content is ready
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <AdmissionDetailRequestInfo variant="my" data={data} statusFlags={statusFlags} />

      <AdmissionDetailProgramTabs
        variant="my"
        activeTab={activeTab}
        onTabChange={changeTabHandler}
        onViewResidence={viewResidenceHandler}
      />

      {activeTab === MY_ADMISSION_DETAIL_TABS.programInfo && (
        <AdmissionDetailProgramInfoContent variant="my" />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.scheduling && (
        <AdmissionDetailSchedulingContent variant="my" data={data} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.rules && (
        <AdmissionDetailRulesContent variant="my" />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.capacities && (
        <AdmissionDetailCapacitiesContent variant="my" data={data} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.financial && (
        <AdmissionDetailFinancialContent variant="my" data={data} />
      )}

      {activeTab === MY_ADMISSION_DETAIL_TABS.settings && (
        <AdmissionDetailSettingsContent variant="my" data={data} />
      )}

      {!isRejected && !isCancelled && (
        <div className="flex justify-end">
          <div className="flex gap-3">
            {(isWaiting || isReturned) && (
              <CustomButton danger onClick={cancelRequestHandler}>
                لغو درخواست
              </CustomButton>
            )}
            {isReturned && (
              <CustomButton type="primary" onClick={editInfoHandler}>
                اصلاح اطلاعات
              </CustomButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdmissionDetail;
