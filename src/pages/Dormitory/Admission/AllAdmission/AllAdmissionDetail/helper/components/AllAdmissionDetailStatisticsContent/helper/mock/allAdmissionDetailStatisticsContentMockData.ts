/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetAllAdmissionDetailStatisticsTabResponse,
  GetAllAdmissionDetailStatisticsPriceResponse,
} from "../../@types/@allAdmissionDetailStatisticsContent";

export const GET_ALL_ADMISSION_DETAIL_STATISTICS_TAB_RESPONSE_MOCK: GetAllAdmissionDetailStatisticsTabResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  nominalCapacity: 1,
  totalBedCount: 10,
  planBedCount: 10,
  occupiedCount: 10,
  unassignedBedCount: 10,
  minPrice: 10,
  maxPrice: 10,
  minDeposit: 1,
  maxDeposit: 1,
};

export const GET_ALL_ADMISSION_DETAIL_STATISTICS_PRICE_RESPONSE_MOCK: GetAllAdmissionDetailStatisticsPriceResponse = {
  content: [{
  price: 10,
  capacityCount: 10,
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_ALL_ADMISSION_DETAIL_STATISTICS_PRICE_CONTENT_LIST_MOCK: GetAllAdmissionDetailStatisticsPriceContent[] = [
{
  price: 10,
  capacityCount: 10,
},
{
  price: 10,
  capacityCount: 10,
},
];
