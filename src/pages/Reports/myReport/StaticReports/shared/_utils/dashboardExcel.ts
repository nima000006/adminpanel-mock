import { toast } from "react-toastify";

import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";

export const downloadDashboardExcel = async ({
  queryArg,
}: {
  queryArg: { id: number; params?: Record<string | number, string> };
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "text/csv");

    const response = await fetch(
      `${import.meta.env.VITE_URL_APP_VERSION}/admin/dashboard/export/csv`,
      {
        method: "POST",
        body: JSON.stringify(queryArg),
        headers: myHeaders,
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `گزارش.csv`;

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
export const dashboardExcelDownload = async ({
  setIsDownloadLinkLoading,
  queryArg,
}: {
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>;

  queryArg: {
    id: number;
    params?: Record<string | number, string>;
  };
}) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadDashboardExcel({
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
