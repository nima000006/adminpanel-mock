import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import {
  RESIDENCE_REQUEST_AWAITING_REVIEW,
  RESIDENCE_REQUEST_CONFIRMATION,
  RESIDENCE_REQUEST_REJECT,
  RESIDENCE_REQUEST_RETURNED,
  StatusMode,
} from "@pages/Dorm/Residence/DormsMainDetail/utils/dormMainDetail";

const RequestAlert = ({ status }: { status: number }) => {
  return (
    <>
      {status === StatusMode?.answered ? (
        <CustomAlert message={RESIDENCE_REQUEST_CONFIRMATION} type="success" showIcon />
      ) : status === StatusMode?.waiting ? (
        <CustomAlert
          message={RESIDENCE_REQUEST_AWAITING_REVIEW}
          type="warning"
          showIcon
        />
      ) : status === StatusMode?.rejected ? (
        <CustomAlert message={RESIDENCE_REQUEST_REJECT} type="error" showIcon />
      ) : status === StatusMode?.returned ? (
        <CustomAlert message={RESIDENCE_REQUEST_RETURNED} type="warning" showIcon />
      ) : null}
    </>
  );
};
export default RequestAlert;
