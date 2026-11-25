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
  uuid: `mock-${id}`,
  title: `نمونه رکورد ${id}`,
  name: `نمونه ${id}`,
  firstName: id % 2 === 0 ? "سارا" : "علی",
  lastName: id % 2 === 0 ? "احمدی" : "محمدی",
  fullName: id % 2 === 0 ? "سارا احمدی" : "علی محمدی",
  nationalCode: `00123456${String(id).padStart(2, "0")}`,
  studentNumber: `1405${String(1200 + id)}`,
  personnelCode: `EMP-${String(id).padStart(4, "0")}`,
  mobileNumber: `0912000000${id}`,
  phoneNumber: `0912000000${id}`,
  email: `mock.user${id}@example.com`,
  gender: id % 2 === 0 ? "زن" : "مرد",
  status: 1,
  statusId: 1,
  statusName: "ACTIVE",
  statusTitle: "فعال",
  branchId: 10,
  branchCode: "TEH-01",
  branchName: "واحد تهران مرکزی",
  branchTitle: "شعبه تهران",
  unitName: "واحد تهران مرکزی",
  service: "DANESHJOUYAR",
  serviceId: 7,
  serviceTitle: "دانشجویار",
  code: `MOCK-${String(id).padStart(3, "0")}`,
  number: id,
  count: id + 2,
  totalCount: 5,
  amount: 1250000 * id,
  price: String(1250000 * id),
  requestNumber: `REQ-1405-${String(id).padStart(3, "0")}`,
  requestDate: "2026-11-24T10:00:00",
  requestStatus: 1,
  requestStatusTitle: "در انتظار بررسی",
  insuranceName: "بیمه آزمایشی دانشجویار",
  insuranceType: "درمان تکمیلی",
  insuranceCount: id + 1,
  insuranceStatus: id % 2 === 0 ? 4 : 3,
  paymentType: id % 2 === 0 ? 1 : 2,
  primary: id === 1,
  invoiceId: `INV-${String(id).padStart(4, "0")}`,
  factorNumber: `FAC-${String(id).padStart(4, "0")}`,
  invoicePaymentDate: "2026-11-24T10:00:00",
  paymentDate: "2026-11-24T12:00:00",
  paymentReferenceNumber: `PAY-${String(id).padStart(5, "0")}`,
  issuanceDate: "2026-11-25T10:00:00",
  installmentCount: 4,
  overInstallment: 1,
  totalDebt: 250000,
  activeInstallmentStatus: "فعال",
  createdDate: "2026-01-01T10:00:00",
  createDate: "2026-01-01T10:00:00",
  createdAt: "2026-01-01T10:00:00",
  updatedDate: "2026-01-02T10:00:00",
  updatedAt: "2026-01-02T10:00:00",
  description: "داده آزمایشی برای نمایش لیست",
});

const MOCK_LIST_FIELD_NAMES = [
  "basketPlansDtos",
  "branchDtos",
  "branchServiceDtoList",
  "contractDtoList",
  "employeeDtos",
  "facilityList",
  "fileList",
  "filterItemsList",
  "financialPaymentDtos",
  "imageFileList",
  "insuredInsuranceInformationForAdminResponseDtoList",
  "paramDtos",
  "paymentRequestDtoList",
  "planDtos",
  "productDtos",
  "reportDetailDtos",
  "requestDtos",
  "simplePlanDtos",
  "simpleRequestDtos",
  "triggerItems",
  "userAdvancedFilterDtos",
  "userList",
] as const;

type MockRow = ReturnType<typeof createMockListRow>;
type MockCollection = MockRow[] & Record<string, unknown>;

const addCollectionFields = (target: MockCollection, items: MockRow[]) => {
  const page = createMockPage(items);
  Object.assign(target, items[0] ?? {}, page, {
    items,
    list: items,
    records: items,
    results: items,
    rows: items,
    total: items.length,
    totalElement: items.length,
    totalElements: items.length,
    totalPage: 1,
  });

  MOCK_LIST_FIELD_NAMES.forEach((fieldName) => {
    target[fieldName] = items;
  });

  return target;
};

/**
 * Supports the response shapes used across legacy and current features:
 * direct arrays, Spring pages, and GENERAL_RESPONSE.data list envelopes.
 */
export const createMockCollection = (items: MockRow[]): MockCollection => {
  const nested = addCollectionFields([...items] as MockCollection, items);
  const root = addCollectionFields([...items] as MockCollection, items);

  Object.assign(root, {
    status: 200,
    code: 200,
    msg: "عملیات با موفقیت انجام شد.",
    message: "عملیات با موفقیت انجام شد.",
    success: true,
    data: nested,
  });

  return root;
};

export const createMockDetail = (id = 1) => {
  const detail = createMockListRow(id);

  return {
    ...detail,
    status: 200,
    code: 200,
    msg: "عملیات با موفقیت انجام شد.",
    message: "عملیات با موفقیت انجام شد.",
    success: true,
    data: detail,
  };
};
