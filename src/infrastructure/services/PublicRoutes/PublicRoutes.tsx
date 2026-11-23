import { useEffect } from "react";

import { Navigate, Outlet, useLocation, matchPath } from "react-router";
import { toast } from "react-toastify";

import { AUTH_ROUTES } from "@infra/router/routes/public";

import { useAuth } from "../AuthProvider/helper/useAuth";

const PublicRoutes = () => {
  const location = useLocation();
  const originalPathName = location?.pathname + location?.search;
  const { isAuthenticated } = useAuth();
  const shouldRedirectHome =
    isAuthenticated && AUTH_ROUTES.some((route) => matchPath(route, location.pathname));

  useEffect(() => {
    if (shouldRedirectHome) {
      toast.warn("شما قبلا وارد شده اید", { toastId: "already/loggedIn" });
    }
  }, [shouldRedirectHome]);

  if (shouldRedirectHome) {
    return (
      <Navigate
        to="/"
        state={{
          purpose: "redirected",
          originalPathName,
        }}
      />
    );
  }

  return <Outlet />;
};
export default PublicRoutes;
