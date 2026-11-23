import { createContext, useContext } from "react";

import { userType } from "../auth-provider.types";

interface AuthContextType {
  user: userType | null;
  login: ({
    token,
    refreshToken,
    originalPathName,
    needNavigate,
  }: {
    token: string;
    refreshToken?: string;
    originalPathName?: string;
    needNavigate?: boolean;
  }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isFetchingUser: boolean;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("از کانتکست در جای اشتباهی استفاده شده");
  return ctx;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
