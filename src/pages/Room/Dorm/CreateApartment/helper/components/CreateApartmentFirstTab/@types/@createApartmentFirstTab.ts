import { FormInstance } from "antd";

//! LAYOUT
export type CreateApartmentFirstTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  isLoading?: boolean;
};

//! APIs
export type CreateBuildingFirstTabResponse = {
  status: number;
  msg: string;
  data: number;
};

export type CreateBuildingFirstTabRequest = { status: number; msg: string; data: number };
