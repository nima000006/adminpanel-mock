export type CateringBaseInfoDetailsRecord = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  mainImageUrl: string;
  secondImage: string;
  secondImageUrl: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  active: boolean;
  productCategoryId: number;
  productCategory: string;
  taxStuffId: number;
};

export type getBasicInfoFoodsListResponse = {
  content: CateringBaseInfoDetailsRecord[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type getBasicInfoFoodsListRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
  };
  body: {
    title?: string;
    taxStuffId?: number;
    statusType?: number[];
    productCategoryId?: number;
  };
};

export type deactivateBasicInfoFoodRequest = {
  id: number;
};
