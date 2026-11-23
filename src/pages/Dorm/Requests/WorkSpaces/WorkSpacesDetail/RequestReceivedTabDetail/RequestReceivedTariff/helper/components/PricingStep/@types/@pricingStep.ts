import { FormInstance } from "antd";

//! LAYOUT
export type PricingStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  BasicInfoData: (id: string) => void;
  pricingData: (id: string) => void;
  form: FormInstance<any>;
  isSemester: boolean;
  setIsSemester: React.Dispatch<React.SetStateAction<boolean>>;
};
