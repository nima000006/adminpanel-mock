import { FormInstance } from "antd";

//! LAYOUT
export type SanitaryTabModalContentProps = {
  form: FormInstance<{ sanitaryTitle: string; unitTitle: string; existInFloor: boolean }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
