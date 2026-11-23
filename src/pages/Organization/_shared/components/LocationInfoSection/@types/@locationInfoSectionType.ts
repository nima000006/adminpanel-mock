import { FormInstance } from "antd";

import { IdentitiesStepFormType } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/IdentitiesStep/@types/@identitiesStepType";

export type GetBasicInfoProvinceAndCityResponse = {
  id: number;
  name: string;
}[];

export type LocationInfoSectionProps = { form: FormInstance<IdentitiesStepFormType> };

export type BasicInfoCityBasedMultipleProvinceDataType = {
  id: number;
  regionType: string;
  recordStatus: number;
  code: null;
  name: string;
  latitude: number;
  longitude: number;
  levelId: number;
};

export type GetBasicInfoCityBasedMultipleProvinceResponse =
  BasicInfoCityBasedMultipleProvinceDataType[];
