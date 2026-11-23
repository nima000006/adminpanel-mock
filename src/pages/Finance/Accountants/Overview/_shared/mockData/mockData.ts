//mock sort filters
export const INITIAL_SORT_FILTERS = [
  { title: "بیشترین بدهکاری", id: 1 },
  { title: "کمترین بدهکاری", id: 2 },
  { title: "بیشترین بستانکاری", id: 3 },
  { title: "کمترین بستانکاری", id: 4 },
];
export const dataSource: any[] = [
  {
    id: 1,
    businessName: "دانشگاه آزاد اسلامی",
    beginningBalance: "100000000",
    indebtedness: "100000000",
    creditor: "100000000",
    endingBalance: "100000000",
    debtPercent: "0.001%",
    creditPercent: "99.1%",
    inDebt: true,
    business: "دانشگاه آزاد",
    branchName: "واحد تهران مرکز",
    serviceName: "خوابگاه",
    stakeHolderName: "مرکز مشاوره آفتاب نو",
    service: "FOOD",
  },
  {
    id: 2,
    businessName: "دانشگاه تهران",
    beginningBalance: "50000000",
    indebtedness: "20000000",
    creditor: "30000000",
    endingBalance: "60000000",
    debtPercent: "0.001%",
    creditPercent: "99.1%",
    inDebt: false,
    business: "دانشگاه آزاد",
    branchName: "واحد تهران غرب",
    serviceName: "تغذیه",
    stakeHolderName: "مرکز مشاوره تهران غرب",
    service: "WALLET",
  },
  {
    id: 3,
    businessName: "دانشگاه صنعتی شریف",
    beginningBalance: "80000000",
    indebtedness: "10000000",
    creditor: "70000000",
    endingBalance: "90000000",
    debtPercent: "0.001%",
    creditPercent: "99.1%",
    inDebt: true,
    business: "دانشگاه آزاد",
    branchName: "واحد رودهن",
    serviceName: "بیمه",
    stakeHolderName: "مرکز مشاوره شهر زیبا",
    service: "TICKET",
  },
  {
    id: 4,
    businessName: "دانشگاه صنعتی شریف",
    beginningBalance: "80000000",
    indebtedness: "10000000",
    creditor: "70000000",
    endingBalance: "90000000",
    debtPercent: "0.001%",
    creditPercent: "99.1%",
    inDebt: false,
    business: "دانشگاه آزاد",
    branchName: "واحد رودهن",
    serviceName: "دکتر من",
    stakeHolderName: "مرکز مشاوره شهر زیبا",
    service: "FOOD",
  },
];
// Helper to get unique items by key
const getUniqueFilters = (arr: any[], key: keyof any) => {
  const map = new Map<string, { id: number; title: string }>();
  arr.forEach((item) => {
    const value = item[key] as string;
    if (!map.has(value)) {
      map.set(value, { id: item.id, title: value });
    }
  });
  return Array.from(map.values());
};

// Fill filters from dataSource
export const INITIAL_SORT_BUSINESS_FILTERS = getUniqueFilters(dataSource, "businessName");
export const INITIAL_SORT_BRANCHES_FILTERS = getUniqueFilters(dataSource, "branchName");
export const INITIAL_SORT_STAKEHOLDERS_FILTERS = getUniqueFilters(
  dataSource,
  "stakeHolderName"
);
export const INITIAL_SORT_SERVICES_FILTERS = getUniqueFilters(dataSource, "serviceName");
