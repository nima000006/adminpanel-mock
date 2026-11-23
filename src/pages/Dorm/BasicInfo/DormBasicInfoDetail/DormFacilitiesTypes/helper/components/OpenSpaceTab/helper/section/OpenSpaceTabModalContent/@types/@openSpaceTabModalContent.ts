import { FormInstance } from "antd";

//! LAYOUT
export type OpenSpaceTabModalContentProps = {
  form: FormInstance<{
    openSpaceTitle: string;
    unitTitle: string;
    existInFloor: boolean;
  }>;
  setIsFloorActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFloorActive: boolean;
};
