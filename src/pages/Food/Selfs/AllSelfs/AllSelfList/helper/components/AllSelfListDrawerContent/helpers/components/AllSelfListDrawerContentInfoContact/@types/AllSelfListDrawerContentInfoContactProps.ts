import { FormInstance } from "antd";

import {
  CityType,
  GetProvinceResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

export type AllSelfListDrawerContentInfoContactProps = {
  isProvinceSelected: boolean;
  form: FormInstance;
  getCityListHandler: (event: unknown) => void;
  setIsProvinceSelected: React.Dispatch<React.SetStateAction<boolean>>;
  getProvinceListData: GetProvinceResponse | undefined;
  cityList: CityType[];
  getProvinceListLoading: boolean;
  getCityListLoading: boolean;
};
