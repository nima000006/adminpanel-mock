import { FormInstance } from "antd";

//! LAYOUT
export type WelfareTabModalContentProps = {
  form: FormInstance<{ welfareTitle: string; unitTitle: string; existInFloor: boolean }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
