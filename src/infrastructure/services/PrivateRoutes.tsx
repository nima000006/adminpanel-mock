import { Navigate, Outlet, useLocation } from "react-router";

import MainSpinner from "@components/MainSpinner/MainSpinner";

import { SIGN_IN_FIRST_PAGE_ROUTE } from "../router/routes/public";
import { useAuth } from "./AuthProvider/helper/useAuth";

const PrivateRoutes = () => {
  const location = useLocation();
  const originalPathName = location?.pathname + location?.search;
  const { isAuthenticated, isFetchingUser } = useAuth();

  if (isAuthenticated && isFetchingUser) {
    return <MainSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={SIGN_IN_FIRST_PAGE_ROUTE + "?reason=unauthorized"}
        state={{
          purpose: "redirected",
          originalPathName,
        }}
        replace
      />
    );
  }

  return <Outlet />;
};
export default PrivateRoutes;
