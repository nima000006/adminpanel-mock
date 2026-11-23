import { FormInstance } from "antd";

//! LAYOUT
export type SportsTabModalContentProps = {
  form: FormInstance<{ SportsTitle: string; unitTitle: string; existInFloor: boolean }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
