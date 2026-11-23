import { FormInstance } from "antd";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MySelfListDrawerContentFormType } from "@pages/Catering/Selfs/MySelfs/_shared/components/MySelfListDrawerContent/@types/@mySelfListDrawerContent";

export type MySelfListDrawerContentInfoProps = {
  form: FormInstance<MySelfListDrawerContentFormType>;
  genderOptions: IdTitle[];
  isEditMode?: boolean;
  unitDisplayValue?: string;
};
