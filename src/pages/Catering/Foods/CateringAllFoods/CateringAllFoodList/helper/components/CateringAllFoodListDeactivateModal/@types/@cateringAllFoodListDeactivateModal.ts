import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type CateringAllFoodListDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type CateringAllFoodListDeactivateModalProps = {
  open: boolean;
  record: GetDetailAllSelfsProductsContent | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: CateringAllFoodListDeactivateModalFormType) => void;
};
