import { FormInstance } from "antd";

//! LAYOUT
export type EducationTabModalContentProps = {
  form: FormInstance<{
    educationTitle: string;
    unitTitle: string;
    existInFloor: boolean;
  }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
