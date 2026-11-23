import { FormInstance } from "antd";

import {
  CityType,
  GetProvinceResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

export type FoodAllSelfsDetailsDrawersInfoContactProps = {
  form: FormInstance;
  getProvinceListData: GetProvinceResponse | undefined;
  getProvinceListLoading: boolean;
  cityList: CityType[];
  getCityListLoading: boolean;
  getCityListHandler: (stateId: string) => void;
};
