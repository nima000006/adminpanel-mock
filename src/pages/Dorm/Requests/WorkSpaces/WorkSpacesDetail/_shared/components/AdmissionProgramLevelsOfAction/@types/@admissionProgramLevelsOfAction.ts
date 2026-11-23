import { DataNode, EventDataNode } from "antd/es/tree";

import { AdmissionDetailBaseInfo } from "@pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import { ExtraTreeNodeTypes } from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/Drawers/ActiveAdmissionScheduleDrawerContent/@types/@activeAdmissionScheduleDrawerContent";

export type CustomTreeNode = EventDataNode<DataNode> & ExtraTreeNodeTypes;

export type AdmissionProgramLevelsOfActionProps = {
  data: AdmissionDetailBaseInfo | null;
  loading: boolean;
};
export type ApplicationLevelDataType = {
  residenceId: number | null;
  residenceTitle: string | null;
  selectedIds: string[];
};
