import { FormInstance } from "antd";

//! LAYOUT
export type CreateDormThirdTabProps = {
  form: FormInstance<any>;
  isLoading?: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

//! APIs
export type CreateDormThirdTabRequest = {
  DormitoryId: number;
  MainBranchId: number;
  BranchIds: number[];
};
