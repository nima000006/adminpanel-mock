export type DateRange = {
  startDate: string;
  endDate: string;
};

export const firstColumnMap: Record<number, string> = {
  1: "کسب و کارها",
  2: "استان‌ها",
  3: "استان‌ها",
  4: "شعبه‌ها / واحدها",
  5: "ذینفع",
  6: "سرویس‌ها",
};

export const firstColumnDataIndexMap: Record<number, string> = {
  1: "business",
  2: "province",
  3: "city",
  4: "branch",
  5: "beneficiary",
  6: "service",
};

export const sortIncome = [
  { id: "1", title: "بیشترین درآمد تسویه نشده" },
  { id: "2", title: "کمترین درآمد تسویه نشده" },
  { id: "3", title: "بیشترین درآمد تسویه شده" },
  { id: "4", title: "کمترین درآمد تسویه شده" },
  { id: "5", title: "بیشترین درآمد کل" },
  { id: "6", title: "کمترین درآمد کل" },
];
