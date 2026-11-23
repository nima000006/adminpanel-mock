export type GetAllAdmissionDetailStatisticsTabRequest = string;

export type GetAllAdmissionDetailStatisticsTabResponse = {
  uuid: string;
  nominalCapacity: number;
  totalBedCount: number;
  planBedCount: number;
  occupiedCount: number;
  unassignedBedCount: number;
  minPrice: number;
  maxPrice: number;
  minDeposit: number;
  maxDeposit: number;
};

export type GetAllAdmissionDetailStatisticsPriceRequest = {
  uuid: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
};

export type GetAllAdmissionDetailStatisticsPriceContent = {
  price: number;
  capacityCount: number;
};

export type GetAllAdmissionDetailStatisticsPriceResponse = {
  content: GetAllAdmissionDetailStatisticsPriceContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
