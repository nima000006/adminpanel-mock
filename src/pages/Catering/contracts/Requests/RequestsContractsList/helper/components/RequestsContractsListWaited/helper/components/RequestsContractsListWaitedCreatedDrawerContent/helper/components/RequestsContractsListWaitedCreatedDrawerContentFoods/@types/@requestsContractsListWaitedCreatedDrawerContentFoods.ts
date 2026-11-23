import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type RequestsContractsListWaitedCreatedDrawerContentFoodsProps = {
  contractId?: number;
  onEditPriceClick?: (product: GetDetailAllSelfsProductsContent) => void;
};

export type UpdateAllRequestContractProductRequest = {
  id: number;
  contractId: number;
  title: string;
  userTitle?: string;
  productBaseId?: number;
  description: string;
  studentalPrice: number;
  maxPrice: number;
  minPrice?: number;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
  active?: boolean;
};

export type UpdateAllRequestContractProductResponse = number;

export type DeleteAllRequestContractProductRequest = {
  id: number;
};

export type DeleteAllRequestContractProductResponse = number;
