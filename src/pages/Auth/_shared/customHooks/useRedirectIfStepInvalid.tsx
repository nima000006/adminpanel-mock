import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";

const useRedirectIfStepInvalid = (requiredStep: number, fallbackRoute: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const currentPageRaw = getFromLocalStorage("currentPage");
      const page = parseInt(currentPageRaw ?? "", 10);

      if (!isNaN(page) && page !== requiredStep && location.pathname !== fallbackRoute) {
        setTimeout(() => {
          navigate(fallbackRoute, { replace: true });
        }, 0);
      }
    } catch (err) {
      console.error("useRedirectIfStepInvalid error:", err);
      navigate(fallbackRoute, { replace: true });
    }
  }, [navigate, requiredStep, fallbackRoute, location.pathname]);
};

export default useRedirectIfStepInvalid;
