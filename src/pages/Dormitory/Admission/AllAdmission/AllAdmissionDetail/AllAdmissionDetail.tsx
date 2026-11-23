import { useState } from "react";

import { Form } from "antd";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE,
  DORMITORY_ALL_ADMISSION_STEPS_EDIT_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import {
  useAllAdmissionDetailRejectRequestMutation,
  useAllAdmissionDetailReturnRequestMutation,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
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
  AllAdmissionStepsEditTab,
  getAdmissionDetailStatusFlags,
  MY_ADMISSION_DETAIL_TABS,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionDetailModalContentFormType } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/@types/@allAdmissionDetail";
import AllAdmissionDetailApplicantInfo from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailApplicantInfo/AllAdmissionDetailApplicantInfo";
import AllAdmissionDetailStatisticsContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailStatisticsContent/AllAdmissionDetailStatisticsContent";
import AllAdmissionDetailModalContent from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/modal/AllAdmissionDetailModalContent/AllAdmissionDetailModalContent";

const data = ADMISSION_DETAIL_MOCK_DATA;

const AllAdmissionDetail = () => {
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
        title: "مشاهده درخواست",
      },
    ],
  });

  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();

  const [isOpenRejectRequestModal, setIsOpenRejectRequestModal] = useState(false);
  const [isOpenReturnRequestModal, setIsOpenReturnRequestModal] = useState(false);

  const [rejectReturnForm] = Form.useForm<AllAdmissionDetailModalContentFormType>();

  //? ================================ Api Calls ================================
  // reject request
  const [
    allAdmissionDetailRejectRequest,
    { isLoading: isAllAdmissionDetailRejectRequestLoading },
  ] = useAllAdmissionDetailRejectRequestMutation();

  // return request
  const [
    allAdmissionDetailReturnRequest,
    { isLoading: isAllAdmissionDetailReturnRequestLoading },
  ] = useAllAdmissionDetailReturnRequestMutation();

  //* ================================ Util Functions ================================
  const statusFlags = getAdmissionDetailStatusFlags(data.status, data.returnDate);
  const { isWaiting } = statusFlags;
  const showStatisticsTab = isWaiting;

  const defaultTab = showStatisticsTab
    ? MY_ADMISSION_DETAIL_TABS.statistics
    : MY_ADMISSION_DETAIL_TABS.programInfo;

  const requestedTab = url?.tab as AdmissionDetailTab | undefined;
  const activeTab =
    requestedTab === MY_ADMISSION_DETAIL_TABS.statistics && !showStatisticsTab
      ? defaultTab
      : (requestedTab ?? defaultTab);

  const changeTabHandler = (tab: typeof activeTab) => {
    setSearchParams({ ...url, tab });
  };

  const viewResidenceHandler = () => {
    // TODO: navigate to residence detail when route is ready
  };

  const getEditTo = (tab: AllAdmissionStepsEditTab) => ({
    pathname: DORMITORY_ALL_ADMISSION_STEPS_EDIT_DETAIL_PAGE_ROUTE,
    search: makeSearchParams({
      id: data.id,
      tab,
    }),
  });

  const confirmRequestHandler = () => {
    // TODO: open confirm confirmation modal when API is ready
  };

  const rejectRequestHandler = () => {
    setIsOpenRejectRequestModal(true);
  };

  const returnRequestHandler = () => {
    setIsOpenReturnRequestModal(true);
  };

  const closeRejectRequestModalHandler = () => {
    setIsOpenRejectRequestModal(false);
    rejectReturnForm.resetFields();
  };

  const closeReturnRequestModalHandler = () => {
    setIsOpenReturnRequestModal(false);
    rejectReturnForm.resetFields();
  };

  const onRejectRequestClickHandler = async () => {
    if (!url?.id) return;

    const values = await rejectReturnForm.validateFields();

    await allAdmissionDetailRejectRequest({
      uuid: url.id,
      body: {
        reasonUuid: values?.reason?.value ?? "",
        faDescription: values?.description ?? "",
      },
    })
      .unwrap()
      .then(() => {
        closeRejectRequestModalHandler();
        toast.success("درخواست با موفقیت رد شد.", {
          toastId: "درخواست با موفقیت رد شد.",
        });
        navigate({ pathname: DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE });
      });
  };

  const onReturnRequestClickHandler = async () => {
    if (!url?.id) return;

    const values = await rejectReturnForm.validateFields();

    await allAdmissionDetailReturnRequest({
      uuid: url.id,
      body: {
        reasonUuid: values?.reason?.value ?? "",
        faDescription: values?.description ?? "",
      },
    })
      .unwrap()
      .then(() => {
        closeReturnRequestModalHandler();
        toast.success("درخواست با موفقیت عودت داده شد.", {
          toastId: "درخواست با موفقیت عودت داده شد.",
        });
        navigate({ pathname: DORMITORY_ALL_ADMISSION_LIST_PAGE_ROUTE });
      });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* reject request modal */}
      {isOpenRejectRequestModal && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          isModalOpen={isOpenRejectRequestModal}
          isDangerous
          confirmBtnText="رد درخواست"
          backBtnText="انصراف"
          closeModalHandler={closeRejectRequestModalHandler}
          content={<AllAdmissionDetailModalContent form={rejectReturnForm} />}
          onConfirmClickHandler={onRejectRequestClickHandler}
          isConfirmButtonLoading={isAllAdmissionDetailRejectRequestLoading}
          showIcon={false}
        />
      )}
      {/* return request modal */}
      {isOpenReturnRequestModal && (
        <ConfirmationModalWithContent
          title="عودت درخواست"
          isModalOpen={isOpenReturnRequestModal}
          confirmBtnText="عودت درخواست"
          backBtnText="انصراف"
          closeModalHandler={closeReturnRequestModalHandler}
          content={
            <AllAdmissionDetailModalContent form={rejectReturnForm} type="return" />
          }
          onConfirmClickHandler={onReturnRequestClickHandler}
          isConfirmButtonLoading={isAllAdmissionDetailReturnRequestLoading}
          showIcon={false}
        />
      )}
      <div className="flex flex-col gap-10">
        <AdmissionDetailRequestInfo variant="all" data={data} statusFlags={statusFlags} />

        <AllAdmissionDetailApplicantInfo data={data} />

        <AdmissionDetailProgramTabs
          variant="all"
          activeTab={activeTab}
          onTabChange={changeTabHandler}
          onViewResidence={viewResidenceHandler}
          showStatisticsTab={showStatisticsTab}
        />

        {showStatisticsTab && activeTab === MY_ADMISSION_DETAIL_TABS.statistics && (
          <AllAdmissionDetailStatisticsContent />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.programInfo && (
          <AdmissionDetailProgramInfoContent
            variant="all"
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.programInfo)}
            status={data.status}
          />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.scheduling && (
          <AdmissionDetailSchedulingContent
            variant="all"
            data={data}
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.scheduling)}
            status={data.status}
          />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.rules && (
          <AdmissionDetailRulesContent
            variant="all"
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.rules)}
            status={data.status}
          />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.capacities && (
          <AdmissionDetailCapacitiesContent
            variant="all"
            status={data.status}
            data={data}
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.capacities)}
          />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.financial && (
          <AdmissionDetailFinancialContent
            variant="all"
            data={data}
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.financial)}
            status={data.status}
          />
        )}

        {activeTab === MY_ADMISSION_DETAIL_TABS.settings && (
          <AdmissionDetailSettingsContent
            variant="all"
            data={data}
            editTo={getEditTo(MY_ADMISSION_DETAIL_TABS.settings)}
            status={data.status}
          />
        )}

        {isWaiting && (
          <div className="flex justify-end">
            <div className="flex gap-3">
              <CustomButton
                onClick={returnRequestHandler}
                className="border-orange-6! [&>span]:text-orange-6!"
              >
                عودت درخواست
              </CustomButton>
              <CustomButton danger onClick={rejectRequestHandler}>
                رد درخواست
              </CustomButton>
              <CustomButton type="primary" onClick={confirmRequestHandler}>
                تایید درخواست
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllAdmissionDetail;
