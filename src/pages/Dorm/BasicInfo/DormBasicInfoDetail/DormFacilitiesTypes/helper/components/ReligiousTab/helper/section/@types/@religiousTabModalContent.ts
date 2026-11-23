import { FormInstance } from "antd";

//! LAYOUT
export type ReligiousTabModalContentProps = {
  form: FormInstance<{
    religiousTitle: string;
    unitTitle: string;
    existInFloor: boolean;
  }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
