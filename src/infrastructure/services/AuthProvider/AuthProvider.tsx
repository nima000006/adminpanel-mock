import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { MOCK_USER_INFO } from "@infra/mock/mockAuth";
import { isMockMode } from "@infra/mock/mockMode";
import { LANDING_PAGE_ROUTE } from "@infra/router/routes/general";
import { SIGN_IN_FIRST_PAGE_ROUTE } from "@infra/router/routes/public";
import { useLazyGetUserInfoQuery } from "@infra/states/redux/Apis/authenticationApi";
import {
  SUCCESS_ENTERING_MESSAGE,
  WARNING_LOGIN_MESSAGE,
} from "@infra/VARS/globalToasts/globalToasts";

import { LoginParams, userType } from "./auth-provider.types";
import { ACCESS_TOKEN_KEY } from "./constants";
import { getToken, setToken } from "./helper/authUtil";
import {
  getFromLocalStorage,
  removeFromStorage,
  setLocalStorage,
} from "../UserTokenStorageManager/UserTokenStorageManager";
import { sessionCleanup } from "./helper/sessionCleanup";
import { AuthContext } from "./helper/useAuth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userType | null>(null);
  // The router keeps reusing the same RootLayout element, so this provider does not re-render
  // on navigation. Reading the token from storage during render would therefore stay stale
  // after login and the route guards would still see an unauthenticated session.
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [getUserWithToken, { isFetching: isFetchingUser }] = useLazyGetUserInfoQuery();
  const navigate = useNavigate();

  //! Keep this tab in sync when another tab signs in or out
  useEffect(() => {
    const syncToken = (event: StorageEvent) => {
      if (event.key === null || event.key === ACCESS_TOKEN_KEY) {
        setTokenState(getToken());
      }
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     checkToken(token)
  //       .then((value) => console.log({ value }))
  //       .catch((error) => console.log({ error }));
  //   }
  // }, [token]);

  //! new get user info
  useEffect(() => {
    if (token && user === null) {
      if (isMockMode()) {
        setUser(MOCK_USER_INFO);
        setLocalStorage("meta", JSON.stringify(MOCK_USER_INFO));
        return;
      }

      getUserWithToken()
        .unwrap()
        .then((res) => {
          setUser(res);
          setLocalStorage("meta", JSON.stringify(res));
        })
        .catch(() => {
          setUser(null);
          // logout();
          toast.warn("دریافت اطلاعات کاربر با خطا مواجه شد");
        });
    }
  }, [user, token, getUserWithToken]);

  //! Login
  const login = useCallback(
    ({
      token: accessToken,
      refreshToken,
      originalPathName,
      needNavigate = false,
    }: LoginParams) => {
      setToken(accessToken);
      setTokenState(accessToken);
      // Clear user so the effect above refetches user-info for the new token/role.
      // Without this, role switch keeps the previous staff/branch data in useAuth().
      setUser(null);

      if (refreshToken) {
        setLocalStorage("refresh_token", refreshToken);
      }

      if (getFromLocalStorage("mainRefreshToken")) {
        removeFromStorage("mainRefreshToken");
      }

      toast.success(SUCCESS_ENTERING_MESSAGE, { toastId: SUCCESS_ENTERING_MESSAGE });

      if (needNavigate) {
        const targetPath = originalPathName || LANDING_PAGE_ROUTE;
        navigate(targetPath, { replace: true });
      }
    },
    [navigate]
  );

  //! Logout
  const logout = useCallback(() => {
    // Perform centralized cleanup (Auth tokens + IndexedDB)
    sessionCleanup().then(() => {
      setTokenState(null);
      setUser(null);
      toast.warning(WARNING_LOGIN_MESSAGE, { toastId: WARNING_LOGIN_MESSAGE });
      navigate(`${SIGN_IN_FIRST_PAGE_ROUTE}?reason=logout`, { replace: true });
    });
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!token,
      isFetchingUser,
    }),
    [user, token, isFetchingUser, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
