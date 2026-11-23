import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { useLazyProfileUserInfoQuery } from "@infra/states/redux/Apis/auth/profileApis";

import { GetProfileUserInfoResponse } from "../@types/@profile";

type UserContextType = {
  userInfo: GetProfileUserInfoResponse | null;
  isLoading: boolean;
  refetchUserInfo: () => void;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<GetProfileUserInfoResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getUserInfo, { isLoading }] = useLazyProfileUserInfoQuery();

  const fetchUserInfo = () => {
    getUserInfo()
      .unwrap()
      .then((res) => {
        setUserInfo(res);
      })
      .catch((err) => {
        console.error("User info fetch error", err);
        setUserInfo(null);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const value = useMemo(
    () => ({
      userInfo,
      isLoading,
      refetchUserInfo: fetchUserInfo,
    }),
    [userInfo, isLoading, fetchUserInfo]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserInfoProvider;
