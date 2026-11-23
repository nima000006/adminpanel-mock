export type GetAllFoodHistoryRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
  body: {
    id: number;
  };
};

export type GetAllFoodHistoryContent = {
  revisionNumber: number;
  revisionType: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetAllFoodHistoryResponse = {
  content: GetAllFoodHistoryContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetAllFoodHistoryDetailRequest = {
  id: number;
  revisionNumber: number;
};

export type GetAllFoodHistoryDetailResponse = {
  revisionNumber: number;
  revisionDate: string;
  revisionType: string;
  id: number;
  title: string;
  userTitle: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  mainImageTitle: string;
  secondImageTitle: string;
  thirdImageTitle: string;
  fourthImageTitle: string;
  contractId: number;
  contractTitle: string;
  restaurantTitle: string;
  vendorTitle: string;
  vendorName: string;
  studentalPrice: number;
  maxPrice: number;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  deActiveReason: {
    id: number;
    title: string;
    faTitle: string;
  };
  invoiceProductId: number;
  baseProductId: number;
  baseProductTitle: string;
  productCategoryId: number;
  productCategoryTitle: string;
};
