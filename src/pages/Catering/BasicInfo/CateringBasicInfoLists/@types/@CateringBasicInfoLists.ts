export type BasicInfoCategoryCount = {
  productCategoryId: number;
  productCategoryTitle: string;
  totalCount: number;
};

export type getBasicInfoCategoryCountResponse = BasicInfoCategoryCount[];

export type getBasicInfoCategoryCountRequest = {
  title?: string;
  taxStuffId?: number;
  statusType?: number[];
};
