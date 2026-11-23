import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import Div from "@components/Renderers/Div/Div";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
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
import {
  NUMBER_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_NO_SPACE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { fetchDataIfNeeded } from "@pages/_shared/utils/networkHelpers";

import { AdmissionModifyBasicInfoStepProps } from "./@types/@admissionModifyBasicInfoStep";
import AdmissionDetailEditableTimingInfo from "../../../AdmissionDetail/helpers/EditableTimingInfo/AdmissionDetailEditableTimingInfo";
import { ADMISSION_RESERVATION_TYPES, dataSource } from "../../../utils/AdmissionUtils";
import "./_admissionModifyBasicInfoStep.scss";

export const ADMISSION_PROGRAM_MONTHLY_SCHEDULE_ID = 2;

const AdmissionModifyBasicInfoStep = ({
  setCurrent,
  form,
  loading,
  canDebt,
  id,
  isMonthly,
  setIsMonthly,
  setIsSemester,
  isSemester,
  isApplicationReviewDeadlineShow,
  setIsApplicationReviewDeadlineShow,
}: AdmissionModifyBasicInfoStepProps) => {
  const [canDebtState, setIsCanDebt] = useState<number | null>(null);

  // on every rerender increment the value by 1
  const [isRangePickerUpdated, setIsRangePickerUpdated] = useState<number>(1);
  const navigate = useNavigate();

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

  const [getPaymentType, { data: paymentTypeData, isFetching: isPaymentTypeLoading }] =
    useLazyGetPaymentTypeQuery();

  const [
    getPaymentMethod,
    { data: paymentMethodData, isFetching: isPaymentMethodLoading },
  ] = useLazyGetPaymentMethodQuery();

  const [getUserGroup, { data: userGroupData, isFetching: isUserGroupLoading }] =
    useLazyGetUserGroupQuery();

  const [
    getEducationGrade,
    { data: educationGradeData, isFetching: isEducationGradeLoading },
  ] = useLazyGetEducationGradeQuery();

  const [getNationality, { data: nationalityData, isFetching: isNationalityLoading }] =
    useLazyGetNationalityQuery();

  const [
    getSpecialStatus,
    { data: specialStatusData, isFetching: isSpecialStatusLoading },
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

  // Todo[saman]: Below is an alternative way to isSuccess for requesting(if data not exists)
  // console.log({
  //   dormApi: Boolean(dormApi?.["getManagementType(undefined)"]?.data?.status),
  // });

  //? ================================ Effects ================================
  useEffect(() => {
    getPaymentType({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    getPaymentMethod({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    getUserGroup({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
    getEducationGrade({ maxResults: 2000, firstResult: 0 });
    getNationality({ maxResults: 2000, firstResult: 0 });
    getSpecialStatus({ maxResults: 2000, firstResult: 0, recordStatus_EQ: "1" });
  }, []);

  useEffect(() => {
    if (id) {
      if (canDebt === "بله") {
        setIsCanDebt(1);
        form.setFieldsValue({ canDebt: { value: "بله", code: 1 } });
      } else if (canDebt === "خیر") {
        setIsCanDebt(2);
        form.setFieldsValue({ canDebt: { value: "خیر", code: 2 } });
      } else {
        setIsCanDebt(null);
        form.setFieldsValue({ canDebt: undefined });
      }
    } else {
      setIsCanDebt(2);
      form.setFieldsValue({ canDebt: { value: "خیر", code: 2 } });
    }
  }, [canDebt, id]);

  useEffect(() => {
    getFeasibility({ maxResults: 2000, firstResult: 0 });
  }, []);

  //* ================================ Util Functions ================================
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

  const reservationTypeChangeHandler = (e: string) => {
    if (+e === ADMISSION_RESERVATION_TYPES.certain) {
      setIsApplicationReviewDeadlineShow(false);
    } else {
      setIsApplicationReviewDeadlineShow(true);
    }
  };

  const getFeasibilityHandler = () => {
    if (!isFeasibilitySuccess) {
      getFeasibility({ maxResults: 2000, firstResult: 0 });
    }
  };

  const gePaymentDeadlineHandler = () =>
    fetchDataIfNeeded(!isPaymentDeadlineSuccess, getPaymentDeadline);

  const getSemesterHandler = () =>
    fetchDataIfNeeded(!isSemesterSuccess, () =>
      getSemesterTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      })
    );

  const geApplicationReviewDeadlineHandler = () =>
    fetchDataIfNeeded(!isApplicationReviewDeadlineSuccess, getApplicationReviewDeadline);

  // next step btn
  const nextBtnHandler = () => {
    form?.submit();
    form.validateFields().then(() => {
      setCurrent(1);
    });
  };

  const scheduleTypeOnChange = (type: unknown) => {
    setIsMonthly?.(type === "2");
    setIsSemester?.(type === "1");
  };

  const canDebtOnChange = (e: any) => {
    const value = +e;
    setIsCanDebt(value);
  };

  const handleRangePickerChange = (_: any, d: [string, string]) => {
    setIsRangePickerUpdated((prev) => prev + 1);

    const newDateString = [d[0] + "-1", d[1] + "-1"];

    const startDataJalali = dayjs(newDateString[0], { jalali: true });
    const endDataJalali = dayjs(newDateString[1], { jalali: true });

    const firstDayOfFirstSelectedMonth = startDataJalali.startOf("month");
    const firstDayOfSecondSelectedMonth = endDataJalali.endOf("month");

    form.setFieldsValue({
      startDateApplied: dayjs(
        firstDayOfFirstSelectedMonth.utcOffset(0, true).toISOString()
      ),
      endDateApplied: dayjs(
        firstDayOfSecondSelectedMonth.utcOffset(0, true).toISOString()
      ),
    });

    //Todo[Atefeh]: previous code
    // form.setFieldsValue({
    //   startDateApplied: e[0],
    //   endDateApplied: e[1],
    // });
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

  const cancelBtnHandler = () => {
    navigate({
      pathname: DORM_ADMISSIONS_LIST_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading}>
      <Form form={form} className="admission-modify-basic-info-step">
        <Row gutter={[16, 16]}>
          <Col lg={6} md={6} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عنوان"
              name="title"
              placeholder="عنوان"
              rules={[REQUIRED_NO_SPACE_RULE, PERSIAN_LETTERS_RULE]}
            />
          </Col>
          <Col lg={6} md={6} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="عنوان نمایشی در اپلیکیشن"
              name="displayTitle"
              placeholder="عنوان نمایشی در اپلیکیشن"
              rules={[REQUIRED_NO_SPACE_RULE, PERSIAN_LETTERS_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="uni"
              label="واحد دانشگاهی"
              options={universityData ? universityData : []}
              isLoading={isUniversityDataLoading}
              placeholder="انتخاب کنید"
              form={form}
              onClick={getAllUniversityHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="managementType"
              label="نوع مدیریت"
              options={managementTypeData?.data}
              placeholder="انتخاب کنید"
              form={form}
              onClick={getManagementTypeHandler}
              isLoading={isManagementTypeLoading}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="timingType"
              label="نوع زمان‌بندی"
              options={schedulingTypeData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isSchedulingTypeLoading}
              onClick={getSchedulingTypeHandler}
              onChange={scheduleTypeOnChange}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          {isMonthly && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomRangePicker
                label="ماه‌ها"
                name="months"
                picker="month"
                rules={isMonthly ? [REQUIRED_RULE] : []}
                form={form}
                onChange={handleRangePickerChange}
                disabled={!isMonthly}
              />
            </Col>
          )}
          {isSemester && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <CustomSelect
                name="semester"
                label="نیم‌سال"
                options={semesterData?.data}
                placeholder="انتخاب کنید"
                form={form}
                loading={isSemesterLoading}
                onClick={getSemesterHandler}
                onChange={handleTimePicker}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          )}

          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="reservationType"
              label="نوع رزرو"
              options={reservationTypeData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isReservationTypeLoading}
              onClick={getReservationTypeHandler}
              onChange={(e) => reservationTypeChangeHandler(e as string)}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="paymentType"
              label="نوع پرداخت"
              options={paymentTypeData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isPaymentTypeLoading}
              mode="multiple"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="paymentMethod"
              label="شیوه پرداخت"
              options={paymentMethodData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isPaymentMethodLoading}
              mode="multiple"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="userGroup"
              label="گروه کاربری"
              options={userGroupData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isUserGroupLoading}
              mode="multiple"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="educationDegree"
              label="مقطع تحصیلی"
              options={educationGradeData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isEducationGradeLoading}
              mode="multiple"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="nationality"
              label="ملیت"
              options={nationalityData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isNationalityLoading}
              mode="multiple"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CustomSelect
              name="specialConditions"
              label="شرایط خاص"
              options={specialStatusData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isSpecialStatusLoading}
              mode="multiple"
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="applyingForAnother"
              label="امکان درخواست برای دیگری"
              options={feasibilityData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isFeasibilityLoading}
              onClick={getFeasibilityHandler}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="canDebt"
              label="امکان بدهی"
              options={feasibilityData?.data}
              placeholder="انتخاب کنید"
              form={form}
              loading={isFeasibilityLoading}
              onClick={getFeasibilityHandler}
              onChange={canDebtOnChange}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="سقف بدهی (ریال)"
              name="maxDebt"
              placeholder="سقف بدهی (ریال)"
              rules={[NUMBER_RULE]}
              disabled={canDebtState === 2}
            />
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="حداکثر تعداد اقساط جهت بدهی"
              name="installmentMaxNumber"
              placeholder="حداکثر تعداد اقساط جهت بدهی"
              rules={[NUMBER_RULE]}
              disabled={canDebtState === 2}
            />
          </Col>
          {isApplicationReviewDeadlineShow && (
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomSelect
                name="applicationReviewDeadline"
                label="مهلت بررسی درخواست"
                options={
                  applicationReviewDeadlineData?.data
                    ? applicationReviewDeadlineData?.data?.map((item) => ({
                        id: item.id,
                        title: `${item.title?.toString()} روز`,
                      }))
                    : []
                }
                placeholder="انتخاب کنید"
                form={form}
                loading={isApplicationReviewDeadlineLoading}
                onClick={geApplicationReviewDeadlineHandler}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          )}

          <Col lg={6} md={12} sm={24} xs={24}>
            <CustomSelect
              name="paymentDeadline"
              label="مهلت پرداخت"
              options={
                paymentDeadlineData?.data
                  ? paymentDeadlineData?.data?.map((item) => ({
                      id: item.id,
                      title: `${item.title?.toString()} روز`,
                    }))
                  : []
              }
              placeholder="انتخاب کنید"
              form={form}
              loading={isPaymentDeadlineLoading}
              onClick={gePaymentDeadlineHandler}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea label="توضیحات" name="desc" placeholder="توضیحات" />
          </Col>
        </Row>
        <AdmissionDetailEditableTimingInfo
          dataSource={dataSource((isMonthly || isSemester) ?? false, !isSemester)}
          form={form}
          key={isRangePickerUpdated}
        />
        <div className="btn-container">
          <CustomButton type="primary" ghost onClick={cancelBtnHandler}>
            انصراف
          </CustomButton>
          <CustomButton type="primary" onClick={nextBtnHandler}>
            مرحله بعد
          </CustomButton>
        </div>
      </Form>
    </Div>
  );
};

export default AdmissionModifyBasicInfoStep;
