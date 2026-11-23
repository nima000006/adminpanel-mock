import { FormInstance } from "antd";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AllSelfListDrawerContentFormType } from "@pages/Catering/Selfs/AllSelfs/_shared/components/AllSelfListDrawerContent/@types/@allSelfListDrawerContent";

export type AllSelfListDrawerContentInfoContactProps = {
  isProvinceSelected: boolean;
  form: FormInstance<AllSelfListDrawerContentFormType>;
  getCityListHandler: (provinceId: number) => void;
  setIsProvinceSelected: React.Dispatch<React.SetStateAction<boolean>>;
  provinceList: IdTitle[];
  cityList: IdTitle[];
  getCityListLoading: boolean;
  getProvinceListLoading: boolean;
};
