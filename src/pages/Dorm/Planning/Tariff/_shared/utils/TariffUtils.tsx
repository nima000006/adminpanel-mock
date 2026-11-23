import { AiFillQuestionCircle } from "react-icons/ai";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import { AdmissionDetailDrawer } from "../../TariffDetail/helper/Drawers/ActiveAdmissionScheduleDrawerContent/@types/@activeAdmissionScheduleDrawerContent";

export const DORM_TARIFF_LIST_ACTIVE = 1; // فعال
export const DORM_TARIFF_LIST_INACTIVE = 3; // غیرفعال
export const DORM_TARIFF_LIST_AWAITING_REVIEW = 1; // در حال بررسی
export const DORM_TARIFF_LIST_RETURNED = 4; // عودت داده شده
export const DORM_TARIFF_LIST_REJECTED = 3; // رد شده

export const DORM_PRICING_READ_ONLY = 2; //   قیمت گذاری غیر قابل تغییر
export const DORM_PRICING_MODIFY = 1; //   قیمت گذاری قابل تغییر

export const massageCreatorInactiveAlert = (date: string | undefined) => {
  return `این تعرفه در تاریخ ${date} غیر فعال شده است.`;
};

export const ADMISSION_SCHEDULE_MSG =
  "در این قسمت می‌توانید مشاهده کنید که این تعرفه در کدام برنامه پذیرش‌ها مورد استفاده قرار گرفته است.";

export const dormScheduleTitleCreator = (title: string, tooltipText?: string) => {
  return (
    <div className="flex items-center gap-1">
      <span>{title}</span>
      {"  "}
      <CustomTooltip title={tooltipText ?? title}>
        <AiFillQuestionCircle style={{ color: "#00000040" }} />
      </CustomTooltip>
    </div>
  );
};

export const admissionTableDataTransformer = (data: AdmissionDetailDrawer | null) => {
  if (!data) return [];
  return [
    {
      id: 1,
      scheduleTitle: dormScheduleTitleCreator(
        "زمان اعمال مؤثر",
        "بازه زمانی که برنامه پذیرش فعال و غیر فعال می‌شود."
      ),
      startDate: data?.appliedStartDate,
      startTime: data?.appliedStartTime,
      endDate: data?.appliedEndDate,
      endTime: data?.appliedEndTime,
    },
    {
      id: 2,
      scheduleTitle: dormScheduleTitleCreator(
        "زمان رزرو",
        "بازه زمانی مجاز برای انجام رزرو خوابگاه."
      ),
      startDate: data?.reservationStartDate,
      startTime: data?.reservationStartTime,
      endDate: data?.reservationEndDate,
      endTime: data?.reservationEndTime,
    },
    {
      id: 3,
      scheduleTitle: dormScheduleTitleCreator(
        "زمان اسکان",
        "تاریخ شروع و پایان حضور و اسکان متقاضی خوابگاه."
      ),
      startDate: data?.residenceStartDate,
      startTime: data?.residenceStartTime,
      endDate: data?.residenceEndDate,
      endTime: data?.residenceEndTime,
    },
    //Todo[Atefeh]: delete if not needed in the future */
    // {
    //   id: 4,
    //   scheduleTitle: dormScheduleTitleCreator("زمان تمدید"),
    //   startDate: data?.extensionStartDate,
    //   startTime: data?.extensionStartTime,
    //   endDate: data?.extensionEndDate,
    //   endTime: data?.extensionEndTime,
    // },
  ];
};
