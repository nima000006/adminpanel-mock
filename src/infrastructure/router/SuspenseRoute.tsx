import { Suspense, useEffect } from "react";

import { NProgress } from "nprogress-v2";
import { useLocation } from "react-router";
import "nprogress-v2/dist/index.css";
import "./_nprogressCustom.scss";

import MainSpinner from "@components/MainSpinner/MainSpinner";

NProgress.configure({ direction: "rtl" });

const FallbackWithProgress = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <MainSpinner />;
};

const SuspenseRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // Using location.pathname as key forces React to treat this as a new boundary
  // on every route change, causing the Suspense fallback to show immediately
  // instead of waiting behind startTransition.
  return (
    <Suspense fallback={<FallbackWithProgress />} key={location.pathname}>
      {children}
    </Suspense>
  );
};

export default SuspenseRoute;
