import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router";

import MainSpinner from "@components/MainSpinner/MainSpinner";
import AntdConfigProviderWrapper from "@infra/config/AntdConfigProviderWrapper";
import { handleAppError } from "@infra/services/Sentry/sentry.error-handle";

import MainErrorBoundaryFallback from "./infrastructure/helpers/ErrorBoundary/MainErrorBoundaryFallback/MainErrorBoundaryFallback";
import useOnlineStatus from "./infrastructure/hooks/useOnlineStatus";
import router from "./infrastructure/router";
import NoInternet from "./pages/NotFound/NoInternet/NoInternet";

function App() {
  const isOnline = useOnlineStatus();

  // Initialize Matomo Tag Manager
  // const { trackEvent } = useMatomoTagManagerInit();

  // useEffect(() => {
  //   GlobalDebug(isLocalHost);
  // }, []);
  return (
    <AntdConfigProviderWrapper>
      <ErrorBoundary
        fallbackRender={MainErrorBoundaryFallback}
        onError={(error, errorInfo) => {
          handleAppError(error, errorInfo);
        }}
        onReset={() => window.location.reload()}
      >
        <Suspense fallback={<MainSpinner />}>
          {isOnline ? <RouterProvider router={router} /> : <NoInternet />}
        </Suspense>
      </ErrorBoundary>
    </AntdConfigProviderWrapper>
  );
}

export default App;
