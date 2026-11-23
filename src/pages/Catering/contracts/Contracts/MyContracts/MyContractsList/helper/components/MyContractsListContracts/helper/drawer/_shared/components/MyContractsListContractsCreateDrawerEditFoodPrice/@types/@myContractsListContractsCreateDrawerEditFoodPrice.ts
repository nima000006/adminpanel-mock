import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyContractsListContractsCreateDrawerEditFoodPriceFormType = {
  studentalPrice: number;
  maxPrice: number;
};

export type MyContractsListContractsCreateDrawerEditFoodPriceProps = {
  open: boolean;
  product: GetDetailMySelfsProductsContent | null;
  onClose: () => void;
  onSuccess: () => void;
};
