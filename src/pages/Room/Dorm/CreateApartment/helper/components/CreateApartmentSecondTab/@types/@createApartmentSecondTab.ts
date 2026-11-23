import { FormInstance } from "antd";

//! LAYOUT
export type CreateApartmentSecondTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  isLoading?: boolean;
};

//! APIs
export type CreateBuildingSecondTabResponse = {
  status: number;
  msg: string;
  data: number;
};

export type CreateBuildingSecondTabRequest = {
  BuildingId: number;
  Description: string;
  Policies: string;
  PhoneNumber: string;
  About: string;
  GenderTypeId: number;
  NearbyPlaceIds?: any[];
};
