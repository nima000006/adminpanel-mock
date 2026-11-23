import { FormInstance } from "antd";

//! LAYOUT
export type BasicInfoStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<any>;
};
