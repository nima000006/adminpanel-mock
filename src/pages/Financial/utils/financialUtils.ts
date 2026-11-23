import { toast } from "react-toastify";

import { getToken } from "@infra/services/AuthProvider/helper/authUtil";

import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  downloadGetAllFilteredFinancialUsersExcelBody,
  FactorUserType,
} from "../FinancialMain/helper/components/Factors/@types/@factorTables";

export const downloadGetAllFinancialUsersExcel = async (from = "همه") => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${import.meta.env.VITE_URL_FINANCIAL_URL}financial/getAllUserExcel`,
      {
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
      link.download = `${from}.xlsx`;

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

export const downloadGetChosenUsersExcel = async (
  from = "پرداخت شده",
  users: FactorUserType[]
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${import.meta.env.VITE_URL_FINANCIAL_URL}financial/getSelectedUserExcel`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(users),
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${from}.xlsx`;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl; // Return the URL
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

//! labelGenerator
// export const financialFilterLabelGenerator = (value: string) => {
//   switch (value) {
//     case "nationalNumber":
//       return "فیلتر بر حسب کد ملی";
//     case "referenceNumber":
//       return "فیلتر بر حسب REF";
//     case "trackingNumber":
//       return "فیلتر بر حسب کد پیگیری";
//     case "serviceName":
//       return "فیلتر بر حسب نام سرویس";
//     default:
//       return "نا مشخص";
//   }
// };

//!
export const onClickGetChosenExcelFile = async (
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>,
  selectedUsers: FactorUserType[],
  type: number
) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadGetChosenUsersExcel(
      type === 1 ? "لیست پرداخت شده" : "لیست تسویه",
      selectedUsers
    );
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

//! downloadExcelAll
export const downloadExcelAll = async (
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadGetAllFinancialUsersExcel();
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
export const downloadGetAllFilteredFinancialUsersExcel = async (
  body: downloadGetAllFilteredFinancialUsersExcelBody
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json; charset=utf8");

    const response = await fetch(
      `${import.meta.env.VITE_URL_FINANCIAL_URL}financial/financialAdvancedFilterWithDateToExcel`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `filteredFactor.xlsx`;

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

//! downloadExcelAll
export const downloadExcelAllFiltered = async (
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>,
  body: downloadGetAllFilteredFinancialUsersExcelBody
) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await downloadGetAllFilteredFinancialUsersExcel(body);
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

export const ALL_FINANCIAL = 0;
export const PAID_FINANCIAL = 1;
export const SETTLED_FINANCIAL = 2;
