import { toast } from "react-toastify";

import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";

type Role = "admin" | "manager";

export const downloadFoodReservationExcel = async ({
  role,
  isTotalOnly,
  count,
  queryArg,
}: {
  role: Role;
  isTotalOnly?: boolean;
  count?: string;
  queryArg?: string;
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${import.meta.env.VITE_URL_FOOD}/${role}/basketplans/filter/excel${isTotalOnly ? `${queryArg}` : `?pageNo=0&pageSize=${count}${queryArg}`}`,
      {
        //! /basketplans/filter/excel?pageNo=0&pageSize=5000 // کل
        //! /basketplans/filter/excel?pageNo=0&pageSize=5000 // فیلتر شده ها
        method: "GET",
        headers: myHeaders,
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `سفارشات.xlsx`;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const downloadAllFoodReservationExcel = async ({
  role,
  isTotalOnly,
  count,
}: {
  role: Role;
  isTotalOnly?: boolean;
  count?: string;
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${import.meta.env.VITE_URL_FOOD}/${role}/basketplans/all/excel${isTotalOnly ? `` : `?pageNo=0&pageSize=${count}`}`,
      {
        //! /admin/basketplans/all/excel // کل
        //! /admin/basketplans/all/excel?pageNo=0&pageSize=5000 // کل با تعداد
        method: "GET",
        headers: myHeaders,
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `سفارشات.xlsx`;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

//! اکسل فیلتر شده ها
export const foodExcelDownload = async ({
  setIsDownloadLinkLoading,
  role,
  isTotalOnly,
  count,
  queryArg,
}: {
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>;
  role: Role;
  isTotalOnly?: boolean;
  count?: string;
  queryArg: string;
}) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadFoodReservationExcel({
      role,
      isTotalOnly,
      count,
      queryArg,
    });

    if (downloadLink?.length) {
      toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
    } else {
      toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
    }
  } catch (_) {
    toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
  } finally {
    setIsDownloadLinkLoading(false);
  }
};

//! اکسل کلی
export const allFoodExcelDownload = async ({
  setIsDownloadLinkLoading,
  role,
  isTotalOnly,
  count,
}: {
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>;
  role: Role;
  isTotalOnly?: boolean;
  count?: string;
}) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadAllFoodReservationExcel({
      role,
      isTotalOnly,
      count,
    });

    if (downloadLink?.length) {
      toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
    } else {
      toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
    }
  } catch (_) {
    toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
  } finally {
    setIsDownloadLinkLoading(false);
  }
};
