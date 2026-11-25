import { Suspense } from "react";

import { Outlet } from "react-router";

import MainSpinner from "@components/MainSpinner/MainSpinner";
import { useMockLinkRepair } from "@infra/hooks/useMockLinkRepair/useMockLinkRepair";
import { AuthProvider } from "@infra/services/AuthProvider/AuthProvider";

const RootLayout = () => {
  useMockLinkRepair();

  return (
    <AuthProvider>
      <Suspense fallback={<MainSpinner />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default RootLayout;
