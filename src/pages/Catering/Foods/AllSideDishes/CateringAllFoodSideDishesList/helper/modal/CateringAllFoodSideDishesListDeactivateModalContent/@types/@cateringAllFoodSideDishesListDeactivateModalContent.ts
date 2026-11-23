import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type CateringAllFoodSideDishesListDeactivateModalFormType = {
  deActiveReason?: SelectType<IdTitle>;
};

export type CateringAllFoodSideDishesListDeactivateModalContentProps = {
  id: number;
  record: GetDetailAllSelfsProductsContent | null;
  form: FormInstance<CateringAllFoodSideDishesListDeactivateModalFormType>;
};
