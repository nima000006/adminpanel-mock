import { useState } from "react";

import { Form } from "antd";
import { Dayjs } from "dayjs";
import moment from "jalali-moment";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetEducationGradeQuery,
  useLazyGetFeasibilityQuery,
  useLazyGetManagementTypeQuery,
  useLazyGetNationalityQuery,
  useLazyGetPaymentMethodQuery,
  useLazyGetPaymentTypeQuery,
  useLazyGetReservationTypeQuery,
  useLazyGetSchedulingTypeQuery,
  useLazyGetSemesterQuery,
  useLazyGetSpecialStatusQuery,
  useLazyGetUserGroupQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetApplicationReviewDeadlineQuery,
  useLazyGetPaymentDeadlineQuery,
} from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";
import { fetchDataIfNeeded } from "@pages/_shared/utils";
import { dataSource } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/utils/WorkSpaceDetailUtils";

import WorkSpacesAdmissionBasicInfoStepInfo from "./components/WorkSpacesAdmissionBasicInfoStepInfo";
import { WorkSpacesAdmissionStepProps } from "../../../@types/@requestReceivedAdmissionProgram";
import WorkSpacesAdmissionBasicInfoStepTableModel from "../../models/WorkSpacesAdmissionBasicInfoStepTableModel/WorkSpacesAdmissionBasicInfoStepTableModel";

import "./_workSpacesAdmissionBasicInfoStep.scss";

const WorkSpacesAdmissionBasicInfoStep = ({
  setCurrent,
  form,
  loading,
  setEditMode,
}: WorkSpacesAdmissionStepProps) => {
  const [schedule, setIsSchedule] = useState<string | undefined>(undefined);
  const [canDebtState, setIsCanDebt] = useState<number | null>(null);
  const [applyingForAnother, setApplyingForAnother] = useState<number | null>(null);
  const [isRangePickerUpdated, setIsRangePickerUpdated] = useState<number>(1);
  //? ================================  Api Calls ================================
  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversityDataSuccess,
    },
  ] = useLazyGetAllBranchesQuery();

  const [
    getManagementType,
    {
      data: managementTypeData,
      isFetching: isManagementTypeLoading,
      isSuccess: isManagementTypeSuccess,
    },
  ] = useLazyGetManagementTypeQuery();

  const [
    getSchedulingType,
    {
      data: schedulingTypeData,
      isFetching: isSchedulingTypeLoading,
      isSuccess: isSchedulingTypeSuccess,
    },
  ] = useLazyGetSchedulingTypeQuery();

  const [
    getReservationType,
    {
      data: reservationTypeData,
      isFetching: isReservationTypeLoading,
      isSuccess: isReservationTypeSuccess,
    },
  ] = useLazyGetReservationTypeQuery();

  const [
    getPaymentType,
    {
      data: paymentTypeData,
      isFetching: isPaymentTypeLoading,
      isSuccess: isPaymentTypeSuccess,
    },
  ] = useLazyGetPaymentTypeQuery();

  const [
    getPaymentMethod,
    {
      data: paymentMethodData,
      isFetching: isPaymentMethodLoading,
      isSuccess: isPaymentMethodSuccess,
    },
  ] = useLazyGetPaymentMethodQuery();

  const [
    getUserGroup,
    {
      data: userGroupData,
      isFetching: isUserGroupLoading,
      isSuccess: isUserGroupSuccess,
    },
  ] = useLazyGetUserGroupQuery();

  const [
    getEducationGrade,
    {
      data: educationGradeData,
      isFetching: isEducationGradeLoading,
      isSuccess: isEducationGradeSuccess,
    },
  ] = useLazyGetEducationGradeQuery();

  const [
    getNationality,
    {
      data: nationalityData,
      isFetching: isNationalityLoading,
      isSuccess: isNationalitySuccess,
    },
  ] = useLazyGetNationalityQuery();

  const [
    getSpecialStatus,
    {
      data: specialStatusData,
      isFetching: isSpecialStatusLoading,
      isSuccess: isSpecialStatusSuccess,
    },
  ] = useLazyGetSpecialStatusQuery();

  const [
    getFeasibility,
    {
      data: feasibilityData,
      isFetching: isFeasibilityLoading,
      isSuccess: isFeasibilitySuccess,
    },
  ] = useLazyGetFeasibilityQuery();

  const [
    getPaymentDeadline,
    {
      data: paymentDeadlineData,
      isFetching: isPaymentDeadlineLoading,
      isSuccess: isPaymentDeadlineSuccess,
    },
  ] = useLazyGetPaymentDeadlineQuery();
  const [
    getApplicationReviewDeadline,
    {
      data: applicationReviewDeadlineData,
      isFetching: isApplicationReviewDeadlineLoading,
      isSuccess: isApplicationReviewDeadlineSuccess,
    },
  ] = useLazyGetApplicationReviewDeadlineQuery();

  const [
    getSemesterTypes,
    { data: semesterData, isFetching: isSemesterLoading, isSuccess: isSemesterSuccess },
  ] = useLazyGetSemesterQuery();

  //* ================================ Util Functions ================================
  const nextBtnHandler = () => {
    form.submit();
    form.validateFields().then(() => {
      setCurrent(1);
    });
  };

  const exitEditModeBtnHandler = () => {
    setEditMode(false);
  };

  const scheduleTypeOnChange = (value: unknown) => {
    setIsSchedule(value as string | undefined);
  };

  const canDebtOnChange = (value: unknown) => {
    setIsCanDebt(Number(value));
  };
  const applyingForAnotherChange = (value: unknown) => {
    setApplyingForAnother(Number(value));
  };

  const handleRangePickerChange = (
    _dates: NoUndefinedRangeValueType<Dayjs> | null,
    dateStrings: [string, string]
  ) => {
    setIsRangePickerUpdated((prev) => prev + 1);
    form.setFieldsValue({
      startDateApplied: dateStrings[0],
      endDateApplied: dateStrings[1],
    });
  };

  const handleTimePicker = (_: any, value: any) => {
    form.setFieldsValue({
      startDateApplied: value?.item?.fromDate
        ? moment(value?.item?.fromDate).format("YYYY-MM-DD")
        : "",

      endDateApplied: value?.item?.toDate
        ? moment(value?.item?.toDate).format("YYYY-MM-DD")
        : "",
    });
  };

  //lazy load
  const getAllUniversityHandler = () => {
    if (!isUniversityDataSuccess) {
      getAllUniversity();
    }
  };

  const getManagementTypeHandler = () => {
    if (!isManagementTypeSuccess) {
      getManagementType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };

  const getSchedulingTypeHandler = () => {
    if (!isSchedulingTypeSuccess) {
      getSchedulingType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getReservationTypeHandler = () => {
    if (!isReservationTypeSuccess) {
      getReservationType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getPaymentTypeHandler = () => {
    if (!isPaymentTypeSuccess) {
      getPaymentType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getPaymentMethodHandler = () => {
    if (!isPaymentMethodSuccess) {
      getPaymentMethod({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getUserGroupHandler = () => {
    if (!isUserGroupSuccess) {
      getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getEducationGradeHandler = () => {
    if (!isEducationGradeSuccess) {
      getEducationGrade({ maxResults: 2000, firstResult: 0 });
    }
  };
  const getNationalityHandler = () => {
    if (!isNationalitySuccess) {
      getNationality({ maxResults: 2000, firstResult: 0 });
    }
  };
  const getSpecialStatusHandler = () => {
    if (!isSpecialStatusSuccess) {
      getSpecialStatus({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    }
  };
  const getFeasibilityHandler = () => {
    if (!isFeasibilitySuccess) {
      getFeasibility({ maxResults: 2000, firstResult: 0 });
    }
  };

  const gePaymentDeadlineHandler = () => {
    if (!isPaymentDeadlineSuccess) {
      getPaymentDeadline();
    }
  };

  const geApplicationReviewDeadlineHandler = () => {
    if (!isApplicationReviewDeadlineSuccess) {
      getApplicationReviewDeadline();
    }
  };

  const getSemesterHandler = () =>
    fetchDataIfNeeded(!isSemesterSuccess, () =>
      getSemesterTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      })
    );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading}>
      <Form form={form} className="work-spaces-admission-basic-info-step">
        <WorkSpacesAdmissionBasicInfoStepInfo
          form={form}
          schedule={schedule ?? ""}
          setIsSchedule={setIsSchedule}
          canDebtState={canDebtState}
          setIsCanDebt={setIsCanDebt}
          applyingForAnother={applyingForAnother}
          setApplyingForAnother={setApplyingForAnother}
          dataStates={{
            university: { data: universityData, loading: isUniversityDataLoading },
            managementType: {
              data: managementTypeData,
              loading: isManagementTypeLoading,
            },
            schedulingType: {
              data: schedulingTypeData,
              loading: isSchedulingTypeLoading,
            },
            reservationType: {
              data: reservationTypeData,
              loading: isReservationTypeLoading,
            },
            paymentType: { data: paymentTypeData, loading: isPaymentTypeLoading },
            paymentMethod: { data: paymentMethodData, loading: isPaymentMethodLoading },
            userGroup: { data: userGroupData, loading: isUserGroupLoading },
            educationGrade: {
              data: educationGradeData,
              loading: isEducationGradeLoading,
            },
            nationality: { data: nationalityData, loading: isNationalityLoading },
            specialStatus: { data: specialStatusData, loading: isSpecialStatusLoading },
            feasibility: { data: feasibilityData, loading: isFeasibilityLoading },
            applicationReviewDeadline: {
              data: applicationReviewDeadlineData,
              loading: isApplicationReviewDeadlineLoading,
            },
            paymentDeadline: {
              data: paymentDeadlineData,
              loading: isPaymentDeadlineLoading,
            },
            semester: {
              data: semesterData,
              loading: isSemesterLoading,
            },
          }}
          handlers={{
            getAllUniversity: getAllUniversityHandler,
            getManagementType: getManagementTypeHandler,
            getSchedulingType: getSchedulingTypeHandler,
            getReservationType: getReservationTypeHandler,
            getPaymentType: getPaymentTypeHandler,
            getPaymentMethod: getPaymentMethodHandler,
            getUserGroup: getUserGroupHandler,
            getEducationGrade: getEducationGradeHandler,
            getNationality: getNationalityHandler,
            getSpecialStatus: getSpecialStatusHandler,
            getFeasibility: getFeasibilityHandler,
            getApplicationReviewDeadline: geApplicationReviewDeadlineHandler,
            getPaymentDeadline: gePaymentDeadlineHandler,
            scheduleTypeOnChange,
            handleRangePickerChange,
            canDebtOnChange,
            applyingForAnotherChange,
            getSemesterData: getSemesterHandler,
            handleTimePicker: handleTimePicker,
          }}
        />
        <CustomTable
          dataSource={dataSource}
          columns={WorkSpacesAdmissionBasicInfoStepTableModel(form, schedule)}
          pagination={false}
          className="table"
          rowKey="id"
          key={isRangePickerUpdated}
          {...TABLE_PROPS(dataSource.length)}
        />

        <div className="btn-wrapper">
          <CustomButton type="primary" ghost onClick={exitEditModeBtnHandler}>
            خروج از حالت ویرایش
          </CustomButton>
          <CustomButton type="primary" onClick={nextBtnHandler}>
            مرحله بعد
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};
export default WorkSpacesAdmissionBasicInfoStep;
