import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyContractsListContractsCreateDrawerFoodsProps = {
  contractId: number;
  refreshKey: number;
  onEditPrice: (record: GetDetailMySelfsProductsContent) => void;
};
