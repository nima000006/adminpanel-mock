import { FormInstance } from "antd";

//! LAYOUT
export type SafetyTabModalContentProps = {
  form: FormInstance<{ SafetyTitle: string; unitTitle: string; existInFloor: boolean }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
