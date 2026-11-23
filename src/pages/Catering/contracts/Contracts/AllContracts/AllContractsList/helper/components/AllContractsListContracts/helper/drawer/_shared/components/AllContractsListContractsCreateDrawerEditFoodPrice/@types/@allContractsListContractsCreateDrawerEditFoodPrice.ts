import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllContractsListContractsCreateDrawerEditFoodPriceFormType = {
  studentalPrice: number;
  maxPrice: number;
};

export type AllContractsListContractsCreateDrawerEditFoodPriceProps = {
  open: boolean;
  product: GetDetailAllSelfsProductsContent | null;
  onClose: () => void;
  onSuccess: () => void;
};
