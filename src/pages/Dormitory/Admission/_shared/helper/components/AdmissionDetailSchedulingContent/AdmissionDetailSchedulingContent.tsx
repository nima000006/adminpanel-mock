import { useEffect, useState } from "react";

import { Row } from "antd";
import moment from "jalali-moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiCalendarBlank, PiCubeFocus, PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { convertDateToPersianTextDateWithoutHours } from "@infra/helpers/dateConvertor";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionSchedulingQuery,
  useLazyGetMyAdmissionSchedulingQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import ReadonlySwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/helpers/components/ReadonlySwitchAlert/ReadonlySwitchAlert";
import { AdmissionDetailSchedulingContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailSchedulingContent/@types/@admissionDetailSchedulingContent";
import AdmissionStepsPackagesDrawer from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/helper/components/AdmissionStepsPackagesDrawer/AdmissionStepsPackagesDrawer";
import {
  MY_ADMISSION_STATUS,
  PERIOD_TYPE,
  SCHEDULE_TYPE,
  SCHEDULE_TYPE_TAG_COLOR,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";

const AdmissionDetailSchedulingContent = ({
  variant,
  data,
  editTo,
  status,
}: AdmissionDetailSchedulingContentProps) => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const [isPackagesDrawerOpen, setIsPackagesDrawerOpen] = useState(false);

  const isActiveVariant = variant === "active";
  const isAllVariant = variant === "all";
  const isMyVariant = variant === "my";
  const isApiVariant = isAllVariant || isMyVariant;
  const showEdit = status === MY_ADMISSION_STATUS.waiting;

  //? ================================  Api Calls ================================
  // admin
  const [
    getAllAdmissionScheduling,
    { data: allAdmissionSchedulingData, isFetching: isGetAllAdmissionSchedulingLoading },
  ] = useLazyGetAllAdmissionSchedulingQuery();

  // manager
  const [
    getMyAdmissionScheduling,
    { data: myAdmissionSchedulingData, isFetching: isGetMyAdmissionSchedulingLoading },
  ] = useLazyGetMyAdmissionSchedulingQuery();

  const admissionSchedulingData = isMyVariant
    ? myAdmissionSchedulingData
    : allAdmissionSchedulingData;
  const isGetAdmissionSchedulingLoading = isMyVariant
    ? isGetMyAdmissionSchedulingLoading
    : isGetAllAdmissionSchedulingLoading;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) return;

    if (isMyVariant) {
      getMyAdmissionScheduling(url.id);
      return;
    }

    if (isAllVariant) {
      getAllAdmissionScheduling(url.id);
    }
  }, [isAllVariant, isMyVariant, url?.id]);

  //* ================================ Util Functions ================================
  const isMonthly = admissionSchedulingData?.periodType?.name === SCHEDULE_TYPE.monthly;
  const isDailyFree =
    admissionSchedulingData?.periodType?.name === PERIOD_TYPE.daily &&
    admissionSchedulingData?.bookingMode?.name === PERIOD_TYPE.dailyFree;
  const isDailyPackage =
    admissionSchedulingData?.periodType?.name === PERIOD_TYPE.daily &&
    admissionSchedulingData?.bookingMode?.name === PERIOD_TYPE.dailyPackage;
  const showStayLimits = isMonthly || isDailyFree;
  const hasPackageSamples =
    admissionSchedulingData?.packages && admissionSchedulingData.packages.length > 0;

  const showTerm = isApiVariant
    ? admissionSchedulingData?.accommodationType?.name === "STUDENT_DORMITORY"
    : data.isStudent;
  const term = isApiVariant ? admissionSchedulingData?.academicTerm?.title : data.term;

  const stayDateRange = isApiVariant
    ? admissionSchedulingData?.occupancyStartDate &&
      admissionSchedulingData?.occupancyEndDate
      ? `${dataPlaceHolder({
          data: admissionSchedulingData.occupancyStartDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })} — ${dataPlaceHolder({
          data: admissionSchedulingData.occupancyEndDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}`
      : undefined
    : data.stayDateRange;

  const stayDateDurationHint = isApiVariant
    ? admissionSchedulingData?.occupancyStartDate &&
      admissionSchedulingData?.occupancyEndDate
      ? `${moment(admissionSchedulingData.occupancyEndDate)
          .startOf("day")
          .diff(
            moment(admissionSchedulingData.occupancyStartDate).startOf("day"),
            "days"
          )} روز`
      : undefined
    : data.stayDateDurationHint;

  const stayTimeRange = isApiVariant
    ? admissionSchedulingData?.occupancyStartDate &&
      admissionSchedulingData?.occupancyEndDate
      ? `${dataPlaceHolder({
          data: admissionSchedulingData.occupancyStartDate,
          isDate: true,
          customDateFormat: "HH:mm",
        })} — ${dataPlaceHolder({
          data: admissionSchedulingData.occupancyEndDate,
          isDate: true,
          customDateFormat: "HH:mm",
        })}`
      : undefined
    : data.stayTimeRange;

  const reserveDateRange = isApiVariant
    ? admissionSchedulingData?.reservationStartAt &&
      admissionSchedulingData?.reservationEndAt
      ? `${dataPlaceHolder({
          data: admissionSchedulingData.reservationStartAt,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })} — ${dataPlaceHolder({
          data: admissionSchedulingData.reservationEndAt,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}`
      : undefined
    : data.reserveDateRange;

  const reserveDateDurationHint = isApiVariant
    ? admissionSchedulingData?.reservationStartAt &&
      admissionSchedulingData?.reservationEndAt
      ? `${moment(admissionSchedulingData.reservationEndAt)
          .startOf("day")
          .diff(
            moment(admissionSchedulingData.reservationStartAt).startOf("day"),
            "days"
          )} روز`
      : undefined
    : data.reserveDateDurationHint;

  const reserveTimeRange = isApiVariant
    ? admissionSchedulingData?.reservationStartAt &&
      admissionSchedulingData?.reservationEndAt
      ? `${dataPlaceHolder({
          data: admissionSchedulingData.reservationStartAt,
          isDate: true,
          customDateFormat: "HH:mm",
        })} — ${dataPlaceHolder({
          data: admissionSchedulingData.reservationEndAt,
          isDate: true,
          customDateFormat: "HH:mm",
        })}`
      : undefined
    : data.reserveTimeRange;

  // handler
  const openPackagesDrawerHandler = () => {
    setIsPackagesDrawerOpen(true);
  };

  const closePackagesDrawerHandler = () => {
    setIsPackagesDrawerOpen(false);
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isApiVariant && isGetAdmissionSchedulingLoading}>
      <div className="flex flex-col gap-6">
        {isActiveVariant && (
          <CustomAlert
            type="warning"
            showIcon
            className="border border-dashed!"
            title={`مانده با پایان مجاز اسکان : '${data.remainingStayDays}' روز`}
            description="پس از پایان دوره مجاز اسکان این برنامه پذیرش غیرفعال می‌شود."
          />
        )}

        {!isActiveVariant && (
          <CustomDivider
            text=""
            extraContent={
              <div className="flex items-center gap-4">
                <CustomTag
                  color={
                    SCHEDULE_TYPE_TAG_COLOR[
                      admissionSchedulingData?.periodType
                        ?.name as keyof typeof SCHEDULE_TYPE_TAG_COLOR
                    ]
                  }
                >
                  {
                    SCHEDULE_TYPE_TAG_LABEL[
                      admissionSchedulingData?.periodType
                        ?.name as keyof typeof SCHEDULE_TYPE_TAG_LABEL
                    ]
                  }
                </CustomTag>
                {isAllVariant && showEdit && editTo && (
                  <CustomButton
                    type="dashed"
                    icon={<PiPencilLine />}
                    onClick={() => navigate(editTo)}
                  >
                    ویرایش
                  </CustomButton>
                )}
              </div>
            }
          />
        )}

        <Row gutter={[16, 16]}>
          {showTerm && <SingleVerticalWithCol label="ترم" value={term} lg={8} md={12} />}
          <SingleVerticalWithCol
            label="تاریخ شروع و پایان مجاز اسکان"
            value={stayDateRange}
            hint={stayDateDurationHint}
            lg={8}
            md={12}
          />
          <SingleVerticalWithCol
            label="ساعت شروع و پایان مجاز اسکان"
            value={stayTimeRange}
            lg={8}
            md={12}
          />
          <SingleVerticalWithCol
            label="تاریخ شروع و پایان مجاز رزرو کاربران"
            value={reserveDateRange}
            hint={reserveDateDurationHint}
            md={12}
          />
          <SingleVerticalWithCol
            label="ساعت شروع و پایان مجاز رزرو کاربران"
            value={reserveTimeRange}
            lg={8}
            md={12}
          />
        </Row>

        {(isDailyFree || isDailyPackage) && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-12 text-sm">الگوی رزرو</span>
              <CustomTag
                className="w-fit gap-1"
                color={
                  admissionSchedulingData?.bookingMode?.name === "PACKAGE"
                    ? "blue"
                    : "default"
                }
                icon={
                  isDailyPackage ? (
                    <PiCubeFocus size={14} />
                  ) : (
                    <PiCalendarBlank size={14} />
                  )
                }
              >
                {admissionSchedulingData?.bookingMode?.name === "PACKAGE"
                  ? "بسته‌ای"
                  : "آزاد"}
              </CustomTag>
            </div>

            {isDailyPackage && (
              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol
                  label="مدت هر بسته"
                  value={
                    admissionSchedulingData?.packageDays != null
                      ? String(admissionSchedulingData.packageDays)
                      : ""
                  }
                  symbol={
                    admissionSchedulingData?.packageDays != null ? "روز" : undefined
                  }
                  lg={6}
                  md={12}
                />
              </Row>
            )}
          </div>
        )}

        {showStayLimits && (
          <div className="flex flex-col gap-4">
            <ReadonlySwitchAlert
              valuePropName="hasMinStayLimit"
              checked={admissionSchedulingData?.minStayPeriods === null ? false : true}
              question="آیا حداقل مدت اسکان قابل رزرو برای کاربران محدود شود؟"
            />
            <ReadonlySwitchAlert
              valuePropName="hasMaxStayLimit"
              checked={admissionSchedulingData?.maxStayPeriods === null ? false : true}
              question="آیا حداکثر مدت اسکان قابل رزرو برای کاربران محدود شود؟"
            />

            <Row gutter={[16, 16]}>
              {admissionSchedulingData?.minStayPeriods != null ? (
                <SingleVerticalWithCol
                  label="حداقل مدت اسکان"
                  value={
                    admissionSchedulingData?.minStayPeriods != null
                      ? String(admissionSchedulingData.minStayPeriods)
                      : ""
                  }
                  symbol={
                    admissionSchedulingData?.minStayPeriods != null ? "روز" : undefined
                  }
                />
              ) : null}
              {admissionSchedulingData?.maxStayPeriods != null ? (
                <SingleVerticalWithCol
                  label="حداکثر مدت اسکان"
                  value={
                    admissionSchedulingData?.maxStayPeriods != null
                      ? String(admissionSchedulingData.maxStayPeriods)
                      : ""
                  }
                  symbol={
                    admissionSchedulingData?.maxStayPeriods != null ? "روز" : undefined
                  }
                />
              ) : null}
            </Row>
          </div>
        )}

        {isDailyPackage && (
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {admissionSchedulingData?.packages.map((sample, index) => {
                const isFirstSample = index === 0;
                const isLastSample =
                  index === admissionSchedulingData?.packages.length - 1;

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

                      <span className="text-neutral-7 text-xs">{sample.days} روز</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isPackagesDrawerOpen && (
        <AdmissionStepsPackagesDrawer
          data={data.packageSamples}
          open={isPackagesDrawerOpen}
          onClose={closePackagesDrawerHandler}
        />
      )}
    </Div>
  );
};

export default AdmissionDetailSchedulingContent;
