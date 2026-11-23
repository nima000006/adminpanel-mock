import { ResidenceHistoryItem } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/helper/components/ResidenceHistoryCard/@types/@residenceHistoryCardTypes";

export const MOCK_RESIDENCE_HISTORY: ResidenceHistoryItem[] = [
  {
    id: 1,
    title: "نیم ترم دوم ۱۴۰۵",
    scheduleType: "term",
    dateRange: "از ۱۲ مهر ۱۴۰۵ تا ۱۷ خرداد ۱۴۰۵",
    entryDate: "۱۳ مهر ۱۴۰۵",
    endDate: "۲۰ مهر ۱۴۰۵",
    location: {
      floor: "همکف",
      building: "ساختمان دانش",
      room: "دانش ۱۵، دانش ۴، اتاق مستقل",
      bed: "۱۵",
    },
    installments: [
      { id: 1, status: "paid" },
      { id: 2, status: "paid" },
      { id: 3, status: "paid" },
      { id: 4, status: "paid" },
    ],
    defaultExpanded: true,
  },
  {
    id: 2,
    title: "پلن تابستونی",
    scheduleType: "monthly",
    dateRange: "از ۰۱ مرداد ۱۴۰۴ تا ۳۰ شهریور ۱۴۰۴",
    entryDate: "۱۳ مرداد ۱۴۰۵",
    endDate: "۳۱ شهریور ۱۴۰۵",
    location: {
      floor: "همکف",
      building: "ساختمان دانش",
      room: "دانش ۴، اتاق مستقل",
      bed: "۱۵",
    },
    installments: [
      { id: 1, status: "paid" },
      { id: 2, status: "pendingPayment" },
    ],
  },
  {
    id: 3,
    title: "نیم ترم دوم ۱۴۰۵",
    scheduleType: "daily",
    dateRange: "از ۱۲ مهر ۱۴۰۴ تا ۱۷ آبان ۱۴۰۴",
    entryDate: "۱۳ مهر ۱۴۰۵",
    endDate: "۲۰ مهر ۱۴۰۵",
    location: {
      floor: "همکف",
      building: "ساختمان دانش",
      room: "دانش ۴",
      bed: "۱۰",
    },
    installments: [{ id: 1, status: "paid" }],
  },
];
