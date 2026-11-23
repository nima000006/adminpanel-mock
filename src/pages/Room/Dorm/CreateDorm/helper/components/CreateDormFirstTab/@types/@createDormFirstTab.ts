import { FormInstance } from "antd";

//! LAYOUT
export type CreateDormFirstTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  isLoading?: boolean;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  lat: number;
  lng: number;
  isActive: boolean;
  setLat: React.Dispatch<React.SetStateAction<number>>;
};

//! APIs
export type CreateDormFirstTabResponse = {
  status: number;
  msg: string;
  data: number;
};

export type CreateDormFirstTabRequest = {
  active: boolean;
  IsShow: boolean;
  Name: string;
  Address: string;
  PhoneNumber: string;
  PostalCode: string;
  Lang: string;
  Lat: string;
  CityId?: number;
};

export type EditDormThirdTabRequest = {
  dormitoryId: number;
  active: boolean;
  IsShow: boolean;
  Name: string;
  Address: string;
  PhoneNumber: string;
  PostalCode: string;
  Lang: string;
  Lat: string;
  CityId?: number;
};

export type CreateDormitoryPlanResponse = {
  status: number;
  msg: string;
  data: {
    dormitoryPlanId: number;
  };
};

export type SetDormitoryPolicyPaymentResponse = {
  status: number;
  msg: string;
  data: number;
};
