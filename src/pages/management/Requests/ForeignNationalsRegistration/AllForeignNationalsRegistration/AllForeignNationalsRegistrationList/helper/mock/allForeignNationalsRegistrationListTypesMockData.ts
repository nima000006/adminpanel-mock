/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  ForeignBannerResponse,
  AllForeignListResponse,
} from "../../@types/@allForeignNationalsRegistrationListTypes";

export const FOREIGN_BANNER_RESPONSE_MOCK: ForeignBannerResponse = {
  rejected: 1,
  accepted: 1,
  pendingReview: 1,
};

export const ALL_FOREIGN_LIST_RESPONSE_MOCK: AllForeignListResponse = {
  content: [{
  region: "region-mock",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  internationalCode: "0012345678",
  saurgCode: "0012345678",
  mobileNumber: "09121234567",
  gender: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  birthDate: "2026-05-02T10:20:27.741127",
  fatherName: "نمونه fatherName",
  id: 1,
  createdDate: "2026-05-02T10:20:27.741127",
  studentNumber: "studentNumber-mock",
  waitingDays: 1,
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const ALL_FOREIGN_LIST_ITEM_TYPE_LIST_MOCK: AllForeignListItemType[] = [
{
  region: "region-mock",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  internationalCode: "0012345678",
  saurgCode: "0012345678",
  mobileNumber: "09121234567",
  gender: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  birthDate: "2026-05-02T10:20:27.741127",
  fatherName: "نمونه fatherName",
  id: 1,
  createdDate: "2026-05-02T10:20:27.741127",
  studentNumber: "studentNumber-mock",
  waitingDays: 1,
},
{
  region: "region-mock-2",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  internationalCode: "0012345678",
  saurgCode: "0012345678",
  mobileNumber: "09121234567",
  gender: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  status: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  birthDate: "2026-05-02T10:20:27.741127",
  fatherName: "نمونه fatherName",
  id: 2,
  createdDate: "2026-05-02T10:20:27.741127",
  studentNumber: "studentNumber-mock-2",
  waitingDays: 2,
},
];
