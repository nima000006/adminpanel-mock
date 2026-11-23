import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";

import { RequestAlertProps } from "./@types/@requestAlertTypes";
import {
  StatusMode,
  WORK_SPACES_REQUEST_AWAITING_REVIEW,
  WORK_SPACES_REQUEST_CONFIRMATION,
  WORK_SPACES_REQUEST_REJECT,
  WORK_SPACES_REQUEST_RETURNED,
} from "../../utils/WorkSpaceDetailUtils";

const RequestAlert = ({ status }: RequestAlertProps) => {
  return (
    <>
      {status === StatusMode?.answered ? (
        <CustomAlert message={WORK_SPACES_REQUEST_CONFIRMATION} type="success" showIcon />
      ) : status === StatusMode?.waiting ? (
        <CustomAlert
          message={WORK_SPACES_REQUEST_AWAITING_REVIEW}
          type="warning"
          showIcon
        />
      ) : status === StatusMode?.rejected ? (
        <CustomAlert message={WORK_SPACES_REQUEST_REJECT} type="error" showIcon />
      ) : status === StatusMode?.returned ? (
        <CustomAlert message={WORK_SPACES_REQUEST_RETURNED} type="warning" showIcon />
      ) : null}
    </>
  );
};
export default RequestAlert;
