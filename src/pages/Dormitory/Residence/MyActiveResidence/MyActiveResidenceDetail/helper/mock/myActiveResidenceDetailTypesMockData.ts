/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  getMyActiveResidenceDetailBannerResponse,
  GetQualityGradeListResponse,
  GetAmenityTemplateListResponse,
} from "../../@types/@myActiveResidenceDetailTypes";

export const GET_MY_ACTIVE_RESIDENCE_DETAIL_BANNER_RESPONSE_MOCK: getMyActiveResidenceDetailBannerResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  visible: true,
  nominalCapacity: 1,
  buildingCount: 10,
  floorCount: 10,
  roomCount: 10,
  bedCount: 10,
};

export const GET_QUALITY_GRADE_LIST_RESPONSE_MOCK: GetQualityGradeListResponse = {
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

export const GET_AMENITY_TEMPLATE_LIST_RESPONSE_MOCK: GetAmenityTemplateListResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  amenityCategory: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  unitLevel: [{ id: 1, title: "نمونه", name: "نمونه", value: "1" }],
  iconKey: "HomeOutlined",
  template: true,
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_QUALITY_GRADE_LIST_CONTENT_LIST_MOCK: GetQualityGradeListContent[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
];

export const GET_AMENITY_TEMPLATE_LIST_CONTENT_LIST_MOCK: GetAmenityTemplateListContent[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  amenityCategory: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  unitLevel: [{ id: 1, title: "نمونه", name: "نمونه", value: "1" }],
  iconKey: "HomeOutlined",
  template: true,
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
  amenityCategory: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  unitLevel: [{ id: 2, title: "نمونه", name: "نمونه", value: "1" }],
  iconKey: "HomeOutlined",
  template: true,
},
];
