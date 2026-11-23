import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type CateringMyFoodSideDishesListDeactivateModalFormType = {
  deActiveReason?: SelectType<IdTitle>;
};

export type CateringMyFoodSideDishesListDeactivateModalContentProps = {
  id: number;
  record: GetDetailMySelfsProductsContent | null;
  form: FormInstance<CateringMyFoodSideDishesListDeactivateModalFormType>;
};
