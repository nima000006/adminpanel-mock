import { FormInstance } from "antd";

import {
  CityType,
  GetProvinceResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

export type FoodMySelfDetailsDrawerInfoContactProps = {
  form: FormInstance;
  getProvinceListData: GetProvinceResponse | undefined;
  getProvinceListLoading: boolean;
  getCityListHandler: (stateId: string) => void;
  cityList: CityType[];
  getCityListLoading: boolean;
};
