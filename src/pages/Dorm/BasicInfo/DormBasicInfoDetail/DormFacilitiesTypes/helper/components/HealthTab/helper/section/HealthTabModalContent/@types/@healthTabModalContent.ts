import { FormInstance } from "antd";

//! LAYOUT
export type HealthTabModalContentProps = {
  form: FormInstance<{ healthTitle: string; unitTitle: string; existInFloor: boolean }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
