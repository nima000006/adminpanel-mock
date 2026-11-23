import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import {
  ADMISSION_GENDER,
  ADMISSION_GENDER_CONFIG,
  ADMISSION_VISIBILITY,
  ADMISSION_VISIBILITY_CONFIG,
  RESERVABLE_CAPACITY_CONFIG,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

// mock data
const mockAdmissionProgramOptions = [
  { id: 1, title: "برنامه پذیرش پاییز ۱۴۰۶" },
  { id: 2, title: "برنامه پذیرش تابستان ۱۴۰۶" },
  { id: 3, title: "برنامه پذیرش زمستان ۱۴۰۵" },
  { id: 4, title: "برنامه پذیرش بهار ۱۴۰۶" },
  { id: 5, title: "برنامه پذیرش تابستان ۱۴۰۵" },
  { id: 6, title: "برنامه پذیرش پاییز ۱۴۰۵" },
];

const mockManagementTypeOptions = [
  { id: 1, title: "خودگردان" },
  { id: 2, title: "پیمانکاری" },
];

const mockResidenceOptions = [
  { id: 1, title: "شهید بهشتی" },
  { id: 2, title: "شهید چمران" },
  { id: 3, title: "فاطمه زهرا" },
  { id: 4, title: "امیرکبیر" },
  { id: 5, title: "شهید رجایی" },
  { id: 6, title: "خوابگاه آزادی" },
];

// mockdata from utils
const visibilityOptions = Object.values(ADMISSION_VISIBILITY).map((value, index) => ({
  id: index + 1,
  title: ADMISSION_VISIBILITY_CONFIG[value].label,
  name: value,
}));

const genderOptions = Object.values(ADMISSION_GENDER).map((value, index) => ({
  id: index + 1,
  title: ADMISSION_GENDER_CONFIG[value].label,
  name: value,
}));

const reservableCapacityOptions = Object.values(RESERVABLE_CAPACITY_TYPE).map(
  (value, index) => ({
    id: index + 1,
    title: RESERVABLE_CAPACITY_CONFIG[value].label,
    name: value,
  })
);

const scheduleTypeOptions = Object.values(SCHEDULE_TYPE).map((value, index) => ({
  id: index + 1,
  title: SCHEDULE_TYPE_TAG_LABEL[value],
  name: value,
}));

const reserveTypeOptions = Object.keys(RESERVE_TYPE).map((value, index) => ({
  id: index + 1,
  title: RESERVE_TYPE[value as keyof typeof RESERVE_TYPE].label,
  name: value,
}));

const paymentOptionOptions = Object.keys(PAYMENT_OPTION).map((value, index) => ({
  id: index + 1,
  title: PAYMENT_OPTION[value as keyof typeof PAYMENT_OPTION].label,
  name: value,
}));
// main hook
const useMyAdmissionActiveListAdvanceFilter = () => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "برنامه پذیرش",
      name: "admissionProgram",
      type: "select",
      mode: "multiple",
      options: mockAdmissionProgramOptions,
    },
    {
      label: "وضعیت نمایش به کاربران",
      name: "visibility",
      type: "select",
      options: visibilityOptions,
      isNeedsName: true,
    },
    {
      label: "نوع مدیریت",
      name: "managementType",
      type: "select",
      mode: "multiple",
      options: mockManagementTypeOptions,
    },
    {
      label: "اقامتگاه",
      name: "residence",
      type: "select",
      mode: "multiple",
      options: mockResidenceOptions,
    },
    {
      label: "جنسیت پذیرش",
      name: "gender",
      type: "select",
      mode: "multiple",
      options: genderOptions,
      isNeedsName: true,
    },
    {
      label: "ظرفیت قابل رزرو",
      name: "reservableCapacity",
      type: "select",
      options: reservableCapacityOptions,
      mode: "multiple",
      isNeedsName: true,
    },
    {
      label: "نوع زمانبندی",
      name: "scheduleType",
      type: "select",
      mode: "multiple",
      options: scheduleTypeOptions,
      isNeedsName: true,
    },
    {
      label: "نوع رزرو",
      name: "reserveType",
      type: "select",
      options: reserveTypeOptions,
      isNeedsName: true,
    },
    {
      label: "امکان پرداخت",
      name: "paymentOption",
      type: "select",
      mode: "multiple",
      options: paymentOptionOptions,
      isNeedsName: true,
    },
  ];

  return { filterItemsList };
};

export default useMyAdmissionActiveListAdvanceFilter;
