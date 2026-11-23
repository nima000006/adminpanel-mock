import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

import {
  CustomButton,
  CustomInputNumber,
  CustomRangePicker,
  CustomRangeTimePicker,
  CustomSelect,
} from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import AdmissionRadioCard from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionRadioCard/AdmissionRadioCard";
import AdmissionSwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSwitchAlert/AdmissionSwitchAlert";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import {
  MY_ADMISSION_DETAIL_TABS,
  SCHEDULE_TYPE,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionStepsEditDetailSchedulingFormType } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailSchedulingContent/@types/@allAdmissionStepsEditDetailSchedulingContent";

const data = ADMISSION_DETAIL_MOCK_DATA;

const TERM_OPTIONS = [{ id: data.term, title: data.term }];

const RESERVE_PATTERN_OPTIONS: {
  value: ScheduleType;
  title: string;
  description: string;
}[] = [
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

const AllAdmissionStepsEditDetailSchedulingContent = () => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const [form] = Form.useForm<AllAdmissionStepsEditDetailSchedulingFormType>();

  const isTermic = data.scheduleType === SCHEDULE_TYPE.termic;
  const isMonthly = data.scheduleType === SCHEDULE_TYPE.monthly;
  const isDailyFree = data.scheduleType === SCHEDULE_TYPE.dailyFree;
  const isDailyPackage = data.scheduleType === SCHEDULE_TYPE.dailyPackage;
  const isDaily = isDailyFree || isDailyPackage;
  const showStayLimits = isMonthly || isDailyFree;
  const stayLimitUnit = isMonthly ? "ماه" : "روز";

  const scheduleTypeOptions = [
    {
      value: SCHEDULE_TYPE.termic,
      title: SCHEDULE_TYPE_TAG_LABEL[SCHEDULE_TYPE.termic],
      disabled: !isTermic,
    },
    {
      value: SCHEDULE_TYPE.monthly,
      title: SCHEDULE_TYPE_TAG_LABEL[SCHEDULE_TYPE.monthly],
      disabled: !isMonthly,
    },
    {
      value: isDaily ? data.scheduleType : SCHEDULE_TYPE.dailyFree,
      title: "روزانه",
      disabled: !isDaily,
    },
  ];

  //* ================================ Util Functions ================================
  const cancelEditHandler = () => {
    navigate({
      pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: url?.id ?? data.id,
        tab: MY_ADMISSION_DETAIL_TABS.scheduling,
      }),
    });
  };

  const viewAllPackagesHandler = () => {
    // TODO: open all packages view when ready
  };

  const submitHandler = (_values: AllAdmissionStepsEditDetailSchedulingFormType) => {
    // TODO: wire submit API when contract is available
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-1 flex-col gap-6"
      initialValues={{
        scheduleType: data.scheduleType,
        term: data.term,
        reserveDateRange: [data.reserveDateRange, data.reserveDateRange],
        reservePattern: data.scheduleType,
        hasMinStayLimit: data.hasMinStayLimit,
        hasMaxStayLimit: data.hasMaxStayLimit,
        minStayDuration: 1,
        maxStayDuration: 2,
        packageDuration: 4,
      }}
      onFinish={submitHandler}
    >
      <AdmissionRadioCard
        form={form}
        name="scheduleType"
        label="نوع زمان‌بندی"
        options={scheduleTypeOptions}
      />

      <Row gutter={[16, 16]}>
        {data.isStudent ? (
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="term"
              label="ترم"
              form={form}
              options={TERM_OPTIONS}
              rules={[REQUIRED_RULE]}
              placeholder="انتخاب کنید"
              tooltip="ترم"
            />
          </Col>
        ) : null}

        <SingleVerticalWithCol
          label="تاریخ شروع و پایان مجاز اسکان"
          value={data.stayDateRange}
          hint={data.stayDateDurationHint}
        />

        <SingleVerticalWithCol
          label="ساعت شروع و پایان مجاز اسکان"
          value={data.stayTimeRange}
        />

        <Col xl={6} lg={6} md={8} sm={12} xs={24}>
          <CustomRangePicker
            name="reserveDateRange"
            label="تاریخ شروع و پایان مجاز رزرو کاربران"
            form={form}
            rules={[REQUIRED_RULE]}
            placeholder={["تاریخ شروع", "تاریخ پایان"]}
          />
          <span className="text-neutral-7 text-xs">{data.reserveDateDurationHint}</span>
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
          className="mt-10"
          name="reservePattern"
          label="الگوی رزرو"
          options={RESERVE_PATTERN_OPTIONS.map((option) => ({
            value: option.value,
            title: option.title,
            description: option.description,
            disabled: option.value !== data.scheduleType,
          }))}
        />
      ) : null}

      {isDailyPackage ? (
        <Row gutter={[16, 16]}>
          <Col xl={6} lg={6} md={8} sm={12} xs={24}>
            <CustomInputNumber
              name="packageDuration"
              label="مدت هر بسته"
              rules={[REQUIRED_RULE]}
              suffix={stayLimitUnit}
              min={1}
            />
          </Col>
        </Row>
      ) : null}

      {showStayLimits ? (
        <div className="mt-10 flex flex-col gap-4">
          <AdmissionSwitchAlert
            question="آیا حداقل مدت اسکان قابل رزرو برای کاربران محدود شود؟"
            valuePropName="hasMinStayLimit"
            defaultChecked={data.hasMinStayLimit}
          />

          <AdmissionSwitchAlert
            question="آیا حداکثر مدت اسکان قابل رزرو برای کاربران محدود شود؟"
            valuePropName="hasMaxStayLimit"
            defaultChecked={data.hasMaxStayLimit}
          />

          <Row gutter={[16, 16]}>
            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomInputNumber
                name="minStayDuration"
                label="حداقل مدت اسکان"
                rules={[REQUIRED_RULE]}
                suffix={stayLimitUnit}
                min={1}
              />
            </Col>

            <Col xl={6} lg={6} md={8} sm={12} xs={24}>
              <CustomInputNumber
                name="maxStayDuration"
                label="حداکثر مدت اسکان"
                rules={[REQUIRED_RULE]}
                suffix={stayLimitUnit}
                min={1}
              />
            </Col>
          </Row>
        </div>
      ) : null}

      {isDailyPackage ? (
        <div className="flex flex-col gap-4">
          <CustomDivider
            text="نمونه بسته‌های قابل رزرو"
            extraContent={
              <CustomButton
                type="link"
                icon={<AiOutlineArrowLeft />}
                iconPlacement="end"
                onClick={viewAllPackagesHandler}
              >
                مشاهده همه
              </CustomButton>
            }
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.packageSamples.map((sample) => (
              <div
                key={sample.title}
                className="border-neutral-5 bg-neutral-2 flex flex-col gap-2 rounded-lg border p-3"
              >
                <span className="text-neutral-11 text-sm font-medium">
                  {sample.title}
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-neutral-10 text-sm">{sample.dateRange}</span>
                  <span className="text-neutral-7 text-xs">{sample.durationLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-end gap-4 self-end">
        <CustomButton onClick={cancelEditHandler}>انصراف از ویرایش</CustomButton>
        <CustomButton type="primary" htmlType="submit">
          ثبت و اعمال تغییرات
        </CustomButton>
      </div>
    </Form>
  );
};

export default AllAdmissionStepsEditDetailSchedulingContent;
