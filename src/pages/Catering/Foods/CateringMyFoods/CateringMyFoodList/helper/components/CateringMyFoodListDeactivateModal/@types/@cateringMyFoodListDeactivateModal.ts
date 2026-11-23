import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type CateringMyFoodListDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type CateringMyFoodListDeactivateModalProps = {
  open: boolean;
  record: GetDetailMySelfsProductsContent | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: CateringMyFoodListDeactivateModalFormType) => void;
};
