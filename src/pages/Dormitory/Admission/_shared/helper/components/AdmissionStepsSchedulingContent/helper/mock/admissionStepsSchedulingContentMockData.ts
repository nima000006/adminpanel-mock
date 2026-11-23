/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetDormitoryAcademicTermsResponse,
  GetAllAdmissionSchedulingResponse,
} from "../../@types/@admissionStepsSchedulingContent";

export const GET_DORMITORY_ACADEMIC_TERMS_RESPONSE_MOCK: GetDormitoryAcademicTermsResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_ALL_ADMISSION_SCHEDULING_RESPONSE_MOCK: GetAllAdmissionSchedulingResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  periodType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  academicTerm: {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
  accommodationType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  occupancyStartDate: "2026-05-02T10:20:27.741127",
  occupancyEndDate: "2026-05-02T10:20:27.741127",
  reservationStartAt: "2026-05-02T10:20:27.741127",
  reservationEndAt: "2026-05-02T10:20:27.741127",
  bookingMode: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  minStayPeriods: 1,
  maxStayPeriods: 1,
  packageDays: 1,
  packages: [{
  startDate: "2026-05-02T10:20:27.741127",
  endDate: "2026-05-02T10:20:27.741127",
  days: 1,
}],
};

export const GET_DORMITORY_ACADEMIC_TERMS_CONTENT_LIST_MOCK: GetDormitoryAcademicTermsContent[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
];
