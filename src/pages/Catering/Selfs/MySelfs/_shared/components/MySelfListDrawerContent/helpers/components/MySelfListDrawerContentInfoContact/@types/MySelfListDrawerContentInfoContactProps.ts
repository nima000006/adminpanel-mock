import { FormInstance } from "antd";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MySelfListDrawerContentFormType } from "@pages/Catering/Selfs/MySelfs/_shared/components/MySelfListDrawerContent/@types/@mySelfListDrawerContent";

export type MySelfListDrawerContentInfoContactProps = {
  isProvinceSelected: boolean;
  form: FormInstance<MySelfListDrawerContentFormType>;
  getCityListHandler: (provinceId: number) => void;
  setIsProvinceSelected: React.Dispatch<React.SetStateAction<boolean>>;
  provinceList: IdTitle[];
  cityList: IdTitle[];
  getCityListLoading: boolean;
  getProvinceListLoading: boolean;
};
