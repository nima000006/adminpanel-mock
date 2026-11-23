import { PiAt } from "react-icons/pi";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { useUserContext } from "@pages/Auth/Profile/State/useUserContext";

const ChangeEmailModalContent = () => {
  const { userInfo } = useUserContext();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <SingleVerticalItem
      label="ایمیل"
      value={userInfo?.email}
      icon={<PiAt style={{ fontSize: 16 }} />}
    />
  );
};
export default ChangeEmailModalContent;
