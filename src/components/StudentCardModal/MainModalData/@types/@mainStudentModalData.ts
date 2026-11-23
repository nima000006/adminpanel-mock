import {
  actionInfoButton,
  userData,
} from "../../../../infrastructure/models/general.model";
import { getStudentInfoResponse } from "../../@types/@studentCardModal";

//! LAYOUT
export type MainStudentModalDataProps = {
  infoData: Partial<userData>;
  onCloseRequestHandler: () => void;
  onClickNextStudent: () => void;
  onClickPrevStudent: () => void;
  nextStudentData: getStudentInfoResponse | undefined;
  userInfoData: getStudentInfoResponse | undefined;
  onStudentCardPrintHandler: () => void;
  onAdminStateChangeHandler: (id: actionInfoButton) => void;
  mainModalCloseHandler: () => void;
};
