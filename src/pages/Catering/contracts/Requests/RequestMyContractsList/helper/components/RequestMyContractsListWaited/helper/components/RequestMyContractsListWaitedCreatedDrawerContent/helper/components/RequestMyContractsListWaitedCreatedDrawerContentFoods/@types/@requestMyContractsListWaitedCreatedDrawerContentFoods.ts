import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type RequestMyContractsListWaitedCreatedDrawerContentFoodsProps = {
  contractId?: number;
  onEditPriceClick?: (product: GetDetailMySelfsProductsContent) => void;
};

export type UpdateMyRequestContractProductRequest = {
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

export type UpdateMyRequestContractProductResponse = number;

export type DeleteMyRequestContractProductRequest = {
  id: number;
};

export type DeleteMyRequestContractProductResponse = number;
