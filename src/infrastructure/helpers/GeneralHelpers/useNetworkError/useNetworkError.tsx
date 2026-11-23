import { useEffect } from "react";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { sessionCleanup } from "@infra/services/AuthProvider/helper/sessionCleanup";

import { SIGN_IN_FIRST_PAGE_ROUTE } from "../../../router/routes/public";
import { logoutUser } from "../../../states/redux/Slices/AuthSlice";
import {
  GENERAL_ERROR_MESSAGE,
  YOU_DONT_HAVE_ENOUGH_PERMISSION,
} from "../../../VARS/globalToasts/globalToasts";
import { resetUserStatus } from "../generalUserHelper/generalUserHelper";

// Function to check if a string contains Farsi characters
function isFarsiMessage(msg: string): boolean {
  const farsiRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return farsiRegex.test(msg);
}

//! handles request related issues and generates a toast if any error exists
const useNetworkError = (
  requestDataStatus?: number,
  error?: FetchBaseQueryError | SerializedError | { status: number }
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if ((requestDataStatus && requestDataStatus > 400) || error) {
      //todo [saman]: this is a temporary solution for the 401 error
      if ((error as any)?.status === 401) {
        // Clear session data including IDB
        sessionCleanup();

        resetUserStatus();
        dispatch(logoutUser());

        navigate(SIGN_IN_FIRST_PAGE_ROUTE);
      }
      if (error && "status" in error) {
        toast.error(
          error.status === 403 ? YOU_DONT_HAVE_ENOUGH_PERMISSION : GENERAL_ERROR_MESSAGE,
          {
            toastId:
              error.status === 403
                ? YOU_DONT_HAVE_ENOUGH_PERMISSION
                : GENERAL_ERROR_MESSAGE,
          }
        );
      }
      if (isFarsiMessage((error as any)?.data?.msg)) {
        toast.error((error as any)?.data?.msg, { toastId: (error as any)?.data?.msg });
      } else {
        // Handle error types that don't have a status property
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
      }
    }
  }, [requestDataStatus, error, dispatch, navigate]);
};

export default useNetworkError;
