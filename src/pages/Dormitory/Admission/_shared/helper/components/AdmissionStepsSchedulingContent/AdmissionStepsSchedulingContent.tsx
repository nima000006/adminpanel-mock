import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

import {
  CustomButton,
  CustomInputNumber,
  CustomRangePicker,
  CustomRangeTimePicker,
  CustomSelect,
} from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionSchedulingQuery,
  useLazyGetMyAdmissionSchedulingQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import { useLazyGetDormitoryAcademicTermsQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import {
  AdmissionStepsSchedulingContentProps,
  AdmissionStepsSchedulingFormType,
  GetAllAdmissionSchedulingPackage,
  GetAllAdmissionSchedulingResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import AdmissionStepsPackagesDrawer from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/components/AdmissionStepsPackagesDrawer/AdmissionStepsPackagesDrawer";
import { getEffectiveScheduleType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/util";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";
import {
  ADMISSION_SCHEDULE_TYPE_DATA,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import { resetUtc } from "@pages/Food/FoodSchedules/_shared/utils/foodScheduleUtils";

const RESERVE_PATTERN_OPTIONS = [
  {
    value: SCHEDULE_TYPE.dailyFree,
    title: "آزاد",
    description: "کاربران می‌توانند هر بازه‌ای را در بازه مجاز اسکان انتخاب کنند.",
  },
  {
    value: SCHEDULE_TYPE.dailyPackage,
    title: "بسته‌ای",
    description: "کاربران فقط می‌توانند بسته‌های زمانی تعریف شده را رزرو کنند.",
  },
];

const AdmissionStepsSchedulingContent = ({
  from = "all",
  isSubmitAndContinueLoading,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsSchedulingContentProps) => {
  const [isUniversityDormitory, setIsUniversityDormitory] = useState(false);
  const [hasMinStayLimit, setHasMinStayLimit] = useState(false);
  const [hasMaxStayLimit, setHasMaxStayLimit] = useState(false);

  const [reservationPackagesList, setReservationPackagesList] = useState<
    GetAllAdmissionSchedulingPackage[]
  >([]);

  const [form] = Form.useForm<AdmissionStepsSchedulingFormType>();

  const [isPackagesDrawerOpen, setIsPackagesDrawerOpen] = useState(false);

  const { params } = useQueryParams();

  const scheduleType = Form.useWatch("scheduleType", form);
  const stayDateRange = Form.useWatch("stayDateRange", form);
  const reserveDateRange = Form.useWatch("reserveDateRange", form);
  const reservePattern = Form.useWatch("reservePattern", form);
  const packageDuration = Form.useWatch("packageDuration", form);

  const effectiveScheduleType = getEffectiveScheduleType({
    scheduleType,
    reservePattern,
  });

  const isMonthly = scheduleType === "MONTHLY";
  const isDaily = scheduleType === "DAILY";

  const isDailyFree = effectiveScheduleType === SCHEDULE_TYPE.dailyFree;
  const isDailyPackage = effectiveScheduleType === SCHEDULE_TYPE.dailyPackage;
  const showStayLimits = isMonthly || isDailyFree;
  const stayLimitUnit = isMonthly ? "ماه" : "روز";
  const hasPackageSamples = Boolean(packageDuration);

  const getRangeDurationHint = (
    range: [string, string] | undefined,
    unit: "day" | "month",
    unitLabel: string
  ) => {
    if (!range?.[0] || !range?.[1]) {
      return `X ${unitLabel}`;
    }

    const duration = moment(range[1])
      .startOf("day")
      .diff(moment(range[0]).startOf("day"), unit);

    return `${duration} ${unitLabel}`;
  };

  const stayDateDurationHint = getRangeDurationHint(
    stayDateRange,
    isMonthly ? "month" : "day",
    stayLimitUnit
  );

  const reserveDateDurationHint = getRangeDurationHint(reserveDateRange, "day", "روز");

  useEffect(() => {
    if (stayDateRange && isDailyPackage && packageDuration) {
      const [stayStart, stayEnd] = stayDateRange;
      let packageStart = moment(stayStart).startOf("day");
      const occupancyEnd = moment(stayEnd).startOf("day");

      const totalDays = occupancyEnd.diff(packageStart, "day");
      const fullPackagesCount = Math.floor(totalDays / packageDuration);
      const remainderDays = totalDays % packageDuration;

      const tempReservationPackagesList: GetAllAdmissionSchedulingPackage[] = [];

      // بسته‌های کامل: مثلا ۹ روز با مدت ۴ → دو بسته ۱–۴ و ۵–۸
      // moment.add mutate می‌کند؛ حتماً clone بزن
      for (let index = 0; index < fullPackagesCount; index++) {
        const packageEnd = packageStart.clone().add(packageDuration - 1, "day");

        tempReservationPackagesList.push({
          startDate: packageStart.format("YYYY-MM-DD"),
          endDate: packageEnd.format("YYYY-MM-DD"),
          days: packageDuration,
        });

        packageStart = packageEnd.clone().add(1, "day");
      }

      // بسته باقیمانده: مثلا ۱ روز → ۹–۹
      if (remainderDays > 0) {
        const packageEnd = packageStart.clone().add(remainderDays - 1, "day");

        tempReservationPackagesList.push({
          startDate: packageStart.format("YYYY-MM-DD"),
          endDate: packageEnd.format("YYYY-MM-DD"),
          days: remainderDays,
        });
      }

      setReservationPackagesList(tempReservationPackagesList);
    }
  }, [stayDateRange, isDailyPackage, packageDuration]);

  //? ================================  Api Calls ================================

  const [
    getDormitoryAcademicTerms,
    {
      data: getDormitoryAcademicTermsData,
      isFetching: isGetDormitoryAcademicTermsLoading,
    },
  ] = useLazyGetDormitoryAcademicTermsQuery();

  const [getAllAdmissionScheduling, { isFetching: isGetAllAdmissionSchedulingLoading }] =
    useLazyGetAllAdmissionSchedulingQuery();

  const [getMyAdmissionScheduling, { isFetching: isGetMyAdmissionSchedulingLoading }] =
    useLazyGetMyAdmissionSchedulingQuery();

  const isGetAdmissionSchedulingLoading =
    from === "my"
      ? isGetMyAdmissionSchedulingLoading
      : isGetAllAdmissionSchedulingLoading;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.id) {
      return;
    }

    const getAdmissionScheduling =
      from === "my" ? getMyAdmissionScheduling : getAllAdmissionScheduling;

    getAdmissionScheduling(params.id)
      .unwrap()
      .then((schedulingData) => {
        fillSchedulingForm(schedulingData);
        // نوع اقامتگاه دانشجویی باشد
        if (schedulingData?.accommodationType?.name === "STUDENT_DORMITORY") {
          getDormitoryAcademicTerms({
            pageNumber: 0,
            pageSize: 100,
          });

          setIsUniversityDormitory(true);
        }
      });
  }, [params?.id]);

  //* ================================ Util Functions ================================
  const fillSchedulingForm = (schedulingData: GetAllAdmissionSchedulingResponse) => {
    const occupancyStart = schedulingData.occupancyStartDate;
    const occupancyEnd = schedulingData.occupancyEndDate;
    const reservationStart = schedulingData.reservationStartAt;
    const reservationEnd = schedulingData.reservationEndAt;

    const occupancyStartTime = resetUtc(schedulingData.occupancyStartDate);
    const occupancyEndTime = resetUtc(schedulingData.occupancyEndDate);

    const reservationStartTime = resetUtc(schedulingData.reservationStartAt);
    const reservationEndTime = resetUtc(schedulingData.reservationEndAt);

    form.setFieldsValue({
      scheduleType: schedulingData.periodType
        ?.name as AdmissionStepsSchedulingFormType["scheduleType"],
      ...(schedulingData.academicTerm
        ? {
            term: selectDefaultValueGenerator({
              id: schedulingData.academicTerm.uuid,
              title: schedulingData.academicTerm.title,
            }),
          }
        : {}),
      stayDateRange: [occupancyStart, occupancyEnd] as unknown as [string, string],
      stayTimeRange: schedulingData.occupancyStartDate
        ? ([occupancyStartTime, occupancyEndTime] as unknown as [string, string])
        : [],
      reserveDateRange: [reservationStart, reservationEnd] as unknown as [string, string],
      reserveTimeRange: schedulingData.reservationStartAt
        ? ([reservationStartTime, reservationEndTime] as unknown as [string, string])
        : [],

      ...(schedulingData.bookingMode
        ? {
            reservePattern: schedulingData.bookingMode
              .name as AdmissionStepsSchedulingFormType["reservePattern"],
          }
        : {}),
      hasMinStayLimit: Boolean(schedulingData.minStayPeriods),
      hasMaxStayLimit: Boolean(schedulingData.maxStayPeriods),
      minStayDuration: schedulingData.minStayPeriods || undefined,
      maxStayDuration: schedulingData.maxStayPeriods || undefined,
      packageDuration: schedulingData.packageDays || undefined,
    });

    setHasMinStayLimit(Boolean(schedulingData.minStayPeriods));
    setHasMaxStayLimit(Boolean(schedulingData.maxStayPeriods));
  };

  const openPackagesDrawerHandler = () => {
    setIsPackagesDrawerOpen(true);
  };

  const closePackagesDrawerHandler = () => {
    setIsPackagesDrawerOpen(false);
  };

  const fixStayEndHandler = () => {
    if (!stayDateRange || !packageDuration || reservationPackagesList.length === 0) {
      return;
    }

    const lastPackage = reservationPackagesList[reservationPackagesList.length - 1];
    if (!lastPackage || lastPackage.days >= packageDuration) {
      return;
    }

    // کمبود آخرین بسته را به تاریخ پایان اسکان اضافه می‌کند تا بسته کامل شود
    const daysToAdd = packageDuration - lastPackage.days;
    const [stayStart, stayEnd] = stayDateRange;

    form.setFieldValue("stayDateRange", [
      stayStart,
      moment(stayEnd).add(daysToAdd, "day"),
    ]);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetAdmissionSchedulingLoading}>
      <Form
        form={form}
        className="flex flex-1 flex-col gap-6"
        onFinish={onSubmitAndContinue}
      >
        <AdmissionRadioCard
          form={form}
          name="scheduleType"
          label="نوع زمان‌بندی"
          rules={[REQUIRED_RULE]}
          options={
            ADMISSION_SCHEDULE_TYPE_DATA?.map((item) => ({
              value: item.name,
              title: item.title,
            })) ?? []
          }
        />

        <Row gutter={[16, 16]}>
          {isUniversityDormitory ? (
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="term"
                label="ترم"
                form={form}
                options={
                  getDormitoryAcademicTermsData?.content?.map((item) => ({
                    id: item.uuid,
                    title: item.title,
                  })) ?? []
                }
                rules={[REQUIRED_RULE]}
                placeholder="انتخاب کنید"
                tooltip="ترم"
                loading={isGetDormitoryAcademicTermsLoading}
              />
            </Col>
          ) : null}

          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomRangePicker
              name="stayDateRange"
              label="تاریخ شروع و پایان مجاز اسکان"
              form={form}
              rules={[REQUIRED_RULE]}
              placeholder={["از تاریخ", "تا تاریخ"]}
            />
            <span className="text-neutral-7 text-xs">{stayDateDurationHint}</span>
          </Col>

          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomRangeTimePicker
              name="stayTimeRange"
              label="ساعت شروع و پایان مجاز اسکان"
              rules={[REQUIRED_RULE]}
              defaultValue={undefined}
              extra={null}
              format="HH:mm"
              className="vertical-label w-full"
              placeholder={["ساعت شروع", "ساعت پایان"]}
            />
          </Col>

          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomRangePicker
              name="reserveDateRange"
              label="تاریخ شروع و پایان مجاز رزرو کاربران"
              form={form}
              rules={[REQUIRED_RULE]}
              placeholder={["از تاریخ", "تا تاریخ"]}
            />
            <span className="text-neutral-7 text-xs">{reserveDateDurationHint}</span>
          </Col>

          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomRangeTimePicker
              name="reserveTimeRange"
              label="ساعت شروع و پایان مجاز رزرو کاربران"
              rules={[REQUIRED_RULE]}
              defaultValue={undefined}
              extra={null}
              format="HH:mm"
              className="vertical-label w-full"
              placeholder={["ساعت شروع", "ساعت پایان"]}
            />
          </Col>
        </Row>

        {isDaily ? (
          <AdmissionRadioCard
            form={form}
            className="mt-4"
            name="reservePattern"
            label="الگوی رزرو"
            rules={[REQUIRED_RULE]}
            options={RESERVE_PATTERN_OPTIONS}
          />
        ) : null}

        {isDailyPackage ? (
          <Row gutter={[16, 16]}>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomInputNumber
                name="packageDuration"
                label="مدت هر بسته"
                rules={[REQUIRED_RULE]}
                suffix="روز"
                min={1}
                placeholder="مثلا ۲"
              />
            </Col>
          </Row>
        ) : null}

        {showStayLimits ? (
          <div className="mt-4 flex flex-col gap-4">
            <AdmissionSwitchAlert
              question="آیا حداقل مدت اسکان قابل رزرو برای کاربران محدود شود؟"
              valuePropName="hasMinStayLimit"
              defaultChecked={hasMinStayLimit}
              value={hasMinStayLimit}
              onChange={(checked) => {
                setHasMinStayLimit(checked);
                form.setFieldValue("hasMinStayLimit", checked);
              }}
            />

            <AdmissionSwitchAlert
              question="آیا حداکثر مدت اسکان قابل رزرو برای کاربران محدود شود؟"
              valuePropName="hasMaxStayLimit"
              defaultChecked={hasMaxStayLimit}
              value={hasMaxStayLimit}
              onChange={(checked) => {
                setHasMaxStayLimit(checked);
                form.setFieldValue("hasMaxStayLimit", checked);
              }}
            />

            {hasMinStayLimit || hasMaxStayLimit ? (
              <Row gutter={[16, 16]}>
                {hasMinStayLimit ? (
                  <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                    <CustomInputNumber
                      name="minStayDuration"
                      label="حداقل مدت اسکان"
                      rules={[REQUIRED_RULE]}
                      suffix={stayLimitUnit}
                      min={1}
                    />
                  </Col>
                ) : null}

                {hasMaxStayLimit ? (
                  <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                    <CustomInputNumber
                      name="maxStayDuration"
                      label="حداکثر مدت اسکان"
                      rules={[REQUIRED_RULE]}
                      suffix={stayLimitUnit}
                      min={1}
                    />
                  </Col>
                ) : null}
              </Row>
            ) : null}
          </div>
        ) : null}

        {isDailyPackage ? (
          <div className="flex flex-col gap-4">
            <CustomDivider
              text="نمونه بسته‌های قابل رزرو"
              extraContent={
                hasPackageSamples ? (
                  <CustomButton
                    type="link"
                    icon={<AiOutlineArrowLeft />}
                    iconPlacement="end"
                    onClick={openPackagesDrawerHandler}
                  >
                    مشاهده همه
                  </CustomButton>
                ) : null
              }
            />

            {reservationPackagesList?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reservationPackagesList.map((sample, index) => {
                  const isFirstSample = index === 0;
                  const isLastSample = index === reservationPackagesList.length - 1;

                  if (!isFirstSample && !isLastSample) {
                    return null;
                  }

                  const title = isFirstSample ? "اولین بسته" : "آخرین بسته";

                  return (
                    <div
                      key={title}
                      className="border-neutral-5 bg-neutral-2 flex flex-col gap-2 rounded-lg border p-3"
                    >
                      <span className="text-neutral-11 text-sm font-medium">{title}</span>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-10 text-sm">
                            {convertDateToPersianTextDateWithoutHours(sample.startDate)}
                          </span>
                          <IoIosArrowRoundBack className="text-neutral-10 w-4 text-lg" />
                          <span className="text-neutral-10 text-sm">
                            {convertDateToPersianTextDateWithoutHours(sample.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-7 text-xs">
                            {sample.days} روز
                          </span>
                          {packageDuration && sample.days < packageDuration ? (
                            <CustomButton
                              type="link"
                              className="h-auto self-start p-0!"
                              onClick={fixStayEndHandler}
                            >
                              اصلاح پایان مجاز اسکان
                            </CustomButton>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <CustomEmpty description="جهت مشاهده نمونه بسته‌های قابل رزرو مدت هر بسته را مشخص نمایید..." />
            )}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-end gap-4 self-end">
          <CustomButton onClick={onBack}>بازگشت</CustomButton>
          <CustomButton onClick={onSaveDraft}>ثبت پیش‌نویس</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
            loading={isSubmitAndContinueLoading}
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </Form>

      {isPackagesDrawerOpen && (
        <AdmissionStepsPackagesDrawer
          open={isPackagesDrawerOpen}
          onClose={closePackagesDrawerHandler}
          data={reservationPackagesList}
        />
      )}
    </Div>
  );
};

export default AdmissionStepsSchedulingContent;
