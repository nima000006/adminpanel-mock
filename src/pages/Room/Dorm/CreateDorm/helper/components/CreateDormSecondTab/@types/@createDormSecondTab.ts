import { FormInstance } from "antd";

//! LAYOUT
export type CreateDormSecondTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<any>;
  isLoading?: boolean;
};

//! APIs
export type CreateDormSecondTabRequest = {
  DormitoryId: string;
  Description: string;
  Policies: string;
  About: string;
  DormitoryPlanId: string;
};
