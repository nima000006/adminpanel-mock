/** Shared option/list fixtures used by mock base query heuristics. */

export type IdTitle = { id: number; title: string };

export const ID_TITLE_OPTIONS: IdTitle[] = [
  { id: 1, title: "گزینه یک" },
  { id: 2, title: "گزینه دو" },
  { id: 3, title: "گزینه سه" },
  { id: 4, title: "گزینه چهار" },
  { id: 5, title: "گزینه پنج" },
];

export const BRANCH_OPTIONS: IdTitle[] = [
  { id: 10, title: "شعبه تهران" },
  { id: 11, title: "شعبه اصفهان" },
  { id: 12, title: "شعبه شیراز" },
  { id: 13, title: "شعبه مشهد" },
  { id: 14, title: "شعبه تبریز" },
];

export const PROVINCE_OPTIONS: IdTitle[] = [
  { id: 101, title: "تهران" },
  { id: 102, title: "اصفهان" },
  { id: 103, title: "فارس" },
  { id: 104, title: "خراسان رضوی" },
  { id: 105, title: "آذربایجان شرقی" },
];

export const CITY_OPTIONS: IdTitle[] = [
  { id: 1001, title: "تهران" },
  { id: 1002, title: "شهریار" },
  { id: 1101, title: "اصفهان" },
  { id: 1201, title: "شیراز" },
  { id: 1301, title: "مشهد" },
];

export const COUNTRY_OPTIONS = [
  {
    id: 10,
    title: "ایران",
    countryCode: "IR",
    regionType: 1,
    logo: null,
    description: "Iran",
    latitude: null,
    longitude: null,
  },
  {
    id: 11,
    title: "ترکیه",
    countryCode: "TR",
    regionType: 1,
    logo: null,
    description: "Turkey",
    latitude: null,
    longitude: null,
  },
  {
    id: 12,
    title: "عراق",
    countryCode: "IQ",
    regionType: 1,
    logo: null,
    description: "Iraq",
    latitude: null,
    longitude: null,
  },
];

export const GENDER_OPTIONS: IdTitle[] = [
  { id: 1, title: "مرد" },
  { id: 2, title: "زن" },
];

export const MARITAL_OPTIONS: IdTitle[] = [
  { id: 1, title: "مجرد" },
  { id: 2, title: "متاهل" },
];

export const RELIGION_OPTIONS: IdTitle[] = [
  { id: 1, title: "اسلام" },
  { id: 2, title: "مسیحیت" },
  { id: 3, title: "سایر" },
];

export const DEGREE_OPTIONS: IdTitle[] = [
  { id: 1, title: "کاردانی" },
  { id: 2, title: "کارشناسی" },
  { id: 3, title: "کارشناسی ارشد" },
  { id: 4, title: "دکتری" },
];

export const FIELD_OPTIONS: IdTitle[] = [
  { id: 101, title: "مهندسی کامپیوتر" },
  { id: 102, title: "مهندسی برق" },
  { id: 103, title: "مدیریت" },
  { id: 104, title: "حقوق" },
];

export const BUSINESS_OPTIONS: IdTitle[] = [
  { id: 1, title: "کسب‌وکار مرکزی" },
  { id: 2, title: "کسب‌وکار تغذیه" },
  { id: 3, title: "کسب‌وکار خوابگاه" },
];

export const SEMESTER_OPTIONS: IdTitle[] = [
  { id: 1, title: "پاییز ۱۴۰۵" },
  { id: 2, title: "بهار ۱۴۰۶" },
];

export const STATUS_OPTIONS: IdTitle[] = [
  { id: 1, title: "فعال" },
  { id: 2, title: "غیرفعال" },
  { id: 3, title: "در انتظار" },
];

/** Generic Spring-style page used by many list endpoints. */
export const createMockPage = <T>(items: T[], pageNumber = 0, pageSize = 10) => ({
  content: items,
  pageNumber,
  pageSize,
  first: true,
  last: true,
  totalElements: items.length,
  totalPages: 1,
  size: items.length,
  number: pageNumber,
  numberOfElements: items.length,
  empty: items.length === 0,
});

export const createMockListRow = (id: number) => ({
  id,
  title: `نمونه رکورد ${id}`,
  name: `نمونه ${id}`,
  status: 1,
  statusTitle: "فعال",
  branchId: 10,
  branchTitle: "شعبه تهران",
  createdDate: "2026-01-01T10:00:00",
  updatedDate: "2026-01-02T10:00:00",
  description: "داده آزمایشی برای نمایش لیست",
});
