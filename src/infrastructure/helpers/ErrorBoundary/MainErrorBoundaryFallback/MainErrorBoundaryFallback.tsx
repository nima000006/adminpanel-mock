import { FallbackProps } from "react-error-boundary";

import NotFound from "../../../../pages/NotFound/NotFound";

const knownErrorStatuses = [404, 401, 503, 418];

const isKnownErrorStatus = (status: number | null): boolean => {
  return status !== null && knownErrorStatuses.includes(status);
};

const MainErrorBoundaryFallback = ({ error }: FallbackProps) => {
  const status = error && typeof error.status === "number" ? error.status : null;

  if (isKnownErrorStatus(status) || !import.meta.env.DEV) {
    return <NotFound />;
  }

  return (
    <div className="main-container">
      <div className="error-container">
        <p className="error-message">
          <span className="label">Boundary Error Message:</span>{" "}
          {error?.message || "Unknown error"}
        </p>
        <p className="error-stack">
          <span className="label">Boundary Error Stack:</span>{" "}
          {error?.stack || "No stack trace available"}
        </p>
      </div>
    </div>
  );
};

export default MainErrorBoundaryFallback;
