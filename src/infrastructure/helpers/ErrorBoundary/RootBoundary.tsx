// RootErrorBoundary.tsx
import * as Sentry from "@sentry/react";
import { isRouteErrorResponse, useRouteError } from "react-router";

import NotFound from "../../../pages/NotFound/NotFound";

import "./_rootErrorBoundary.scss";
import React from "react";

// TypeScript interface for potential error types
interface CustomError extends Error {
  status?: number;
}

// Function to check if the error is a standard Error object
function isCustomError(error: any): error is CustomError {
  return error instanceof Error;
}

export default function RootErrorBoundary() {
  const error = useRouteError();

  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // Known status codes for which we want to show NotFound component
  const knownErrorStatuses = [404, 401, 503, 418];

  // Check if the error is a known route error and has a status code we handle
  if (isRouteErrorResponse(error) && knownErrorStatuses.includes(error?.status)) {
    return <NotFound />;
  }

  // In development mode, provide detailed error message and stack trace
  if (import.meta.env.DEV) {
    let errorMessage = "An unknown error occurred.";
    let errorStack = "No stack trace available.";

    // If it's a standard error object, extract the message and stack
    if (isCustomError(error)) {
      errorMessage = error?.message || errorMessage;
      errorStack = error?.stack || errorStack;
    }

    return (
      <div className="main-container">
        <div className="error-container">
          <p className="error-message">
            <span className="label">Error Message:</span>
            <div className="content">{errorMessage}</div>
          </p>
          <p className="error-stack">
            <span className="label">Error Stack:</span>
            <div className="content">{errorStack}</div>
          </p>
        </div>
      </div>
    );
  }

  // Default to NotFound component for unknown or unhandled errors in production
  return <NotFound />;
}
