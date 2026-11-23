import { FormInstance } from "antd";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AllSelfListDrawerContentFormType } from "@pages/Catering/Selfs/AllSelfs/_shared/components/AllSelfListDrawerContent/@types/@allSelfListDrawerContent";

export type AllSelfListDrawerContentInfoProps = {
  universityData: IdTitle[] | undefined;
  isUniversityDataLoading: boolean;
  form: FormInstance<AllSelfListDrawerContentFormType>;
  genderOptions: IdTitle[];
};
