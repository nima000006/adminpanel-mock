import { ManualReservationUserType } from "../components/SelectUserStep/@types/@selectUserStep";

export const MANUAL_RESERVATION_MOCK_USERS: ManualReservationUserType[] = [
  {
    id: "1",
    fullName: "سینا سوجه",
    phoneNumber: "09123387968",
    birthDate: "1378/01/12",
    nationalCode: "0021116090",
    studentRoles: [
      {
        id: "student-1",
        studentNumber: "12563",
        unit: "تهران شمال",
        degree: "کارشناسی ارشد",
        major: "مدیریت بازرگانی",
        entryYear: "1393",
      },
      {
        id: "student-2",
        studentNumber: "12563",
        unit: "تهران مرکز",
        degree: "کارشناسی",
        major: "حسابداری",
        entryYear: "1400",
      },
    ],
    employeeRoles: [
      {
        id: "employee-1",
        personnelNumber: "12563",
        unit: "تهران شمال",
        position: "استاد",
      },
      {
        id: "employee-2",
        personnelNumber: "12563",
        unit: "تهران شمال",
        position: "هیئت علمی",
      },
    ],
  },
  {
    id: "2",
    fullName: "مریم احمدی",
    phoneNumber: "09121234567",
    birthDate: "1375/06/20",
    nationalCode: "0012345678",
    studentRoles: [
      {
        id: "student-3",
        studentNumber: "33421",
        unit: "تهران جنوب",
        degree: "کارشناسی",
        major: "مهندسی کامپیوتر",
        entryYear: "1398",
      },
    ],
    employeeRoles: [],
  },
];
