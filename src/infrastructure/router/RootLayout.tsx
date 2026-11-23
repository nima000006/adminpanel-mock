import { Suspense } from "react";

import { Outlet } from "react-router";

import MainSpinner from "@components/MainSpinner/MainSpinner";
import { AuthProvider } from "@infra/services/AuthProvider/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<MainSpinner />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default RootLayout;
