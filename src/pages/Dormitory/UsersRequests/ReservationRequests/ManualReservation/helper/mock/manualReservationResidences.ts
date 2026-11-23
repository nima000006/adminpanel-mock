import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { AdmissionProgramOption } from "../components/SelectResidenceStep/@types/@selectResidenceStep";

/** 01 مهر ۱۴۰۵ → 31 تیر ۱۴۰۶ */
const TERMIC_STAY_RANGE: [string, string] = [
  "2026-09-23T00:00:00.000Z",
  "2027-07-22T00:00:00.000Z",
];
export const MANUAL_RESERVATION_MOCK_RESIDENCES: IdTitle[] = [
  { id: 1, title: "شهید چمران" },
  { id: 2, title: "شهید بهشتی" },
  { id: 3, title: "ولیعصر" },
];

export const MANUAL_RESERVATION_MOCK_BRANCHES: IdTitle[] = [
  { id: 1, title: "تهران شمال" },
  { id: 2, title: "تهران مرکز" },
  { id: 3, title: "تهران جنوب" },
];

export const MANUAL_RESERVATION_MOCK_ADMISSION_PROGRAMS: AdmissionProgramOption[] = [
  {
    id: 1,
    title: "ثبت‌نام ترم مهر ۱۴۰۵ ،دوره ای(ترمیک)،رزرو تخت",
    type: "termic",
    stayRange: TERMIC_STAY_RANGE,
    allocationType: "bed",
  },
  {
    id: 2,
    title: "ثبت‌نام ترم مهر ۱۴۰۵ ،ماهانه،رزرو تخت",
    type: "monthly",
    allocationType: "bed",
  },
  {
    id: 3,
    title: "ثبت‌نام ترم مهر ۱۴۰۵ ،روزانه،رزرو واحد",
    type: "daily",
    allocationType: "unit",
  },
  {
    id: 4,
    title: "ثبت‌نام ترم مهر ۱۴۰۵ ،روزانه بسته ای،رزرو ساختمان",
    type: "dailyPackage",
    allocationType: "building",
  },
];
