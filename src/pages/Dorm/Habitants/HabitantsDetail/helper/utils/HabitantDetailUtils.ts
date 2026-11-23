import { HabitantAdmissionTabData } from "../components/FourthTabAdmissionProgram/@types/@fourthTabAdmissionProgram";

export const SEND_ABSENCE_PRESENCE_SUCCESS_MSG =
  "وضعیت حضور ساکن خوابگاه با موفقیت ثبت شد.";
export const SELECT_BED_REQUIRED_ERROR_MSG = "انتخاب تخت الزامی می باشد.";
export const payedStatus = {
  notPayed: 2,
  payed: 1,
};

export const titleGenerator: Record<number, string> = {
  1: "قسط اول",
  2: "قسط دوم",
  3: "قسط سوم",
  4: "قسط چهارم",
  5: "قسط پنجم",
  6: "قسط ششم",
  7: "قسط هفتم",
  8: "قسط هشتم",
  9: "قسط نهم",
  10: "قسط دهم",
};

export const dormFactorPayedStatus = {
  paid: 1, //پرداخت شده
  notPayed: 2, // پرداخت نشده
  overdue: 3, // سررسید شده
  notDue: 4, // سررسید نشده
};

export const admissionTabTimingCreator = (data: HabitantAdmissionTabData | null) => {
  if (!data) return [];
  return [
    {
      title: "زمان رزرو",
      startDate: data?.AssociationCategoryDeliverPlan?.reservationStartDate,
      endDate: data?.AssociationCategoryDeliverPlan?.reservationEndDate,
      startTime: data?.AssociationCategoryDeliverPlan?.reservationStartTime,
      endTime: data?.AssociationCategoryDeliverPlan?.reservationEndTime,
      id: 1,
    },
    {
      title: "زمان اسکان",
      startDate: data?.AssociationCategoryDeliverPlan?.residenceStartDate,
      endDate: data?.AssociationCategoryDeliverPlan?.residenceEndDate,
      startTime: data?.AssociationCategoryDeliverPlan?.residenceStartTime,
      endTime: data?.AssociationCategoryDeliverPlan?.residenceEndTime,
      id: 2,
    },
  ];
};
