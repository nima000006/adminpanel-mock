import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AdmissionStepsFinancialFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import AdmissionStepsFinancialForm from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialForm/AdmissionStepsFinancialForm";
import {
  buildFinancialInitialValues,
  financialContentData,
  isDailySchedule,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";
import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";

const data = financialContentData;
const initialValues = buildFinancialInitialValues(
  data,
  isDailySchedule(data.scheduleType)
);

const AllAdmissionStepsEditDetailFinancialContent = () => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {
    navigate({
      pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id ?? data.id,
        tab: MY_ADMISSION_DETAIL_TABS.financial,
      }),
    });
  };

  const submitHandler = (_values: AdmissionStepsFinancialFormType) => {
    // TODO: wire submit API when contract is available
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AdmissionStepsFinancialForm
      scheduleType={data.scheduleType}
      stayDateRange={data.stayDateRange}
      initialValues={initialValues}
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

export default AllAdmissionStepsEditDetailFinancialContent;
