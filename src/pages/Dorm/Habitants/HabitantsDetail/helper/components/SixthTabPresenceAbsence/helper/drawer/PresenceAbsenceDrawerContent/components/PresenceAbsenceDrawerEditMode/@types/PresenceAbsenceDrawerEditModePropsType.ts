import { FormInstance } from "antd";

import { DormPresenceAndAbsence } from "@pages/Dorm/BasicInfo/DormBasicInfoDetail/DormPresenceAndAbsenceTypes/@types/@dormPresenceAndAbsenceTypes";

import { PresenceAbsenceDrawerFormType } from "../../../@types/@presenceAbsenceDrawerContent";

export type PresenceAbsenceDrawerEditModePropsType = {
  form: FormInstance<PresenceAbsenceDrawerFormType>;
  onClose: () => void;
  onSubmit: () => void;
  data: {
    description?: string;
  };
  type: DormPresenceAndAbsence[];
  isLoading: boolean;
  isFetching: boolean;
  cellDate: string;
  drawerLoading: boolean;
};
