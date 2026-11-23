import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AdmissionStepsSettingsFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import AdmissionStepsSettingsForm from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/components/AdmissionStepsSettingsForm/AdmissionStepsSettingsForm";
import { settingsContentData } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";
import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";

const data = settingsContentData;

const AllAdmissionStepsEditDetailSettingsContent = () => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {
    navigate({
      pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id ?? data.id,
        tab: MY_ADMISSION_DETAIL_TABS.settings,
      }),
    });
  };

  const submitHandler = (_values: AdmissionStepsSettingsFormType) => {
    // TODO: wire submit API when contract is available
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AdmissionStepsSettingsForm
      scheduleType={data.scheduleType}
      reservableCapacity={data.reservableCapacity}
      programTitle={data.programTitle}
      renewalAllowedFrom={data.renewalAllowedFrom}
      renewalAllowedTo={data.renewalAllowedTo}
      hasRenewal={data.hasRenewal}
      renewalSources={data.renewalSources}
      onFinish={submitHandler}
      footer={
        <div className="mt-auto flex items-center justify-end gap-4 self-end">
          <CustomButton onClick={cancelEditHandler}>انصراف از ویرایش</CustomButton>
          <CustomButton type="primary" htmlType="submit">
            ثبت و اعمال تغییرات
          </CustomButton>
        </div>
      }
    />
  );
};

export default AllAdmissionStepsEditDetailSettingsContent;
