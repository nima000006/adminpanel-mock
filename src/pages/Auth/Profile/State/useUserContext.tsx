import { useContext } from "react";

import { UserContext } from "./UserInfoContext";

export const useUserContext = () => {
  return useContext(UserContext);
};
