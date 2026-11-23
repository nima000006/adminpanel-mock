import { PiDeviceMobileSpeakerLight } from "react-icons/pi";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { useUserContext } from "@pages/Auth/Profile/State/useUserContext";

const EditMobileNumberModalContent = () => {
  const { userInfo } = useUserContext();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <SingleVerticalItem
      label="شماره همراه فعلی"
      icon={<PiDeviceMobileSpeakerLight style={{ fontSize: 16 }} />}
      value={userInfo?.mobileNumber}
    />
  );
};
export default EditMobileNumberModalContent;
