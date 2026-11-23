import { UploadFile } from "antd";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { LocalStorageMetaType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";

import { getExtraZeroIfBelowTen } from "./formatters";
import { convertToMd5 } from "./generalUtils";

export const sheetToArrayBuffer = (s: any) => {
  const buffer = new ArrayBuffer(s.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buffer;
};

export const downloadListOfRequestInDormExcel = async (
  term: string,
  status: string,
  title = "لیست درخواستها"
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${
        import.meta.env.VITE_URL_ROOM
      }ManageReport/RequestExcelReport/requestReportForManager?term=${term}&status=${status}`,
      { method: "POST", headers: myHeaders }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.xlsx`;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl; // Return the URL if needed
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const downloadListOfResidentsInDormExcel = async (
  term: string,
  selectedUni: string
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${
        import.meta.env.VITE_URL_ROOM
      }ManageReport/PersonInDormitoryExcelReport/PersonInDormitory?term=${term}&branchCode=${selectedUni}`,
      { method: "POST", headers: myHeaders }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "لیست ساکنین.xlsx";

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl; // Return the URL if needed
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const downloadListOfDormitoryFactorsInDormExcel = async (dormitoryId: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${
        import.meta.env.VITE_URL_ROOM
      }ManageReport/DormitoryFactorListForMangerExcelReport/DormitoryFactorListForMangerExcel?dormitoryId=${dormitoryId}`,
      { method: "POST", headers: myHeaders }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `لیست فاکتور های خوابگاه.xlsx`;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl; // Return the URL if needed
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

const downloadCateringExcel = async ({
  path,
  body,
  title,
}: {
  path: string;
  body: object;
  title: string;
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${import.meta.env.VITE_URL_CATERING}/${path}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

      return blobUrl;
    }

    return null;
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const downloadCateringAllSelfsContractsExcel = async (
  body: object,
  title = "لیست قراردادها"
) => {
  return downloadCateringExcel({
    path: "admin/contract/filter/excel",
    body,
    title,
  });
};

export const downloadCateringMySelfsContractsExcel = async (
  body: object,
  title = "لیست قراردادها"
) => {
  return downloadCateringExcel({
    path: "manager/contract/filter/excel",
    body,
    title,
  });
};

export const downloadCateringAllSelfsFoodScheduleExcel = async (
  body: object,
  title = "برنامه غذایی"
) => {
  return downloadCateringExcel({
    path: "admin/plan/filter/excel",
    body,
    title,
  });
};

export const downloadCateringMySelfsFoodScheduleExcel = async (
  body: object,
  title = "برنامه غذایی"
) => {
  return downloadCateringExcel({
    path: "manager/plan/filter/excel",
    body,
    title,
  });
};

export const downloadCateringAllSelfsHistoryExcel = async (
  body: object,
  title = "تاریخچه سلف"
) => {
  return downloadCateringExcel({
    path: "admin/restaurant/history/excel",
    body,
    title,
  });
};

export const downloadCateringMySelfsHistoryExcel = async (
  body: object,
  title = "تاریخچه سلف"
) => {
  return downloadCateringExcel({
    path: "manager/restaurant/history/excel",
    body,
    title,
  });
};

export const downloadCateringAllVendorHistoryExcel = async (
  body: object,
  title = "تاریخچه تأمین کننده"
) => {
  return downloadCateringExcel({
    path: "admin/vendor/history/excel",
    body,
    title,
  });
};

export const downloadCateringMyVendorHistoryExcel = async (
  body: object,
  title = "تاریخچه تأمین کننده"
) => {
  return downloadCateringExcel({
    path: "manager/vendor/history/excel",
    body,
    title,
  });
};

export const downloadCateringAllFoodHistoryExcel = async (
  body: object,
  title = "تاریخچه غذا"
) => {
  return downloadCateringExcel({
    path: "admin/product/history/excel",
    body,
    title,
  });
};

export const downloadCateringMyFoodHistoryExcel = async (
  body: object,
  title = "تاریخچه غذا"
) => {
  return downloadCateringExcel({
    path: "manager/product/history/excel",
    body,
    title,
  });
};

export const downloadCateringAllFoodListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست غذاها"
) => {
  return downloadCateringExcel({
    path: `admin/product/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringBaseProductListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست اطلاعات پایه"
) => {
  return downloadCateringExcel({
    path: `admin/base-product/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMyFoodListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست غذاها"
) => {
  return downloadCateringExcel({
    path: `manager/product/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringAllVendorListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست تأمین کنندگان"
) => {
  return downloadCateringExcel({
    path: `admin/vendor/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMyVendorListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست تأمین کنندگان"
) => {
  return downloadCateringExcel({
    path: `manager/vendor/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringAllSelfListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سلف ها"
) => {
  return downloadCateringExcel({
    path: `admin/restaurant/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMySelfListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سلف ها"
) => {
  return downloadCateringExcel({
    path: `manager/restaurant/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringAllContractListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست قراردادها"
) => {
  return downloadCateringExcel({
    path: `admin/contract/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMyContractListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست قراردادها"
) => {
  return downloadCateringExcel({
    path: `manager/contract/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringAllContractHistoryExcel = async (
  body: object,
  title = "تاریخچه قرارداد"
) => {
  return downloadCateringExcel({
    path: "admin/contract/history/excel",
    body,
    title,
  });
};

export const downloadCateringMyContractHistoryExcel = async (
  body: object,
  title = "تاریخچه قرارداد"
) => {
  return downloadCateringExcel({
    path: "manager/contract/history/excel",
    body,
    title,
  });
};

export const downloadCateringAllCancelledOrdersListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سفارشات لغو شده"
) => {
  return downloadCateringExcel({
    path: `admin/basket-plan/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMyCancelledOrdersListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سفارشات لغو شده"
) => {
  return downloadCateringExcel({
    path: `manager/basket-plan/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringAllVendorOrdersListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سفارشات فروشنده"
) => {
  return downloadCateringExcel({
    path: `admin/basket-plan/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

export const downloadCateringMyVendorOrdersListExcel = async (
  {
    params,
    body,
  }: {
    params: {
      pageSize: number;
      pageNumber: number;
      sortBy?: string;
      sortDirection?: string;
    };
    body: object;
  },
  title = "لیست سفارشات فروشنده"
) => {
  return downloadCateringExcel({
    path: `manager/basket-plan/filter/excel${createQueryString(params)}`,
    body,
    title,
  });
};

// Payment
const downloadWalletExcel = async ({ path, title }: { path: string; title: string }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${import.meta.env.VITE_URL_WALLET}/${path}`, {
      method: "GET",
      headers: myHeaders,
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

      return blobUrl;
    }

    return null;
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const downloadWithdrawalsRequestPersonalExcel = async ({
  params = null,
  title = "لیست درخواست‌های برداشت",
}: {
  params?: object | null;
  title?: string;
}) => {
  return downloadWalletExcel({
    path: `/admin/withdrawal-requests/personal/advanced-filter/excel${params ? createQueryString(params) : ""}`,
    title,
  });
};

export const downloadWithdrawalsRequestLegalExcel = async ({
  params = null,
  title = "لیست درخواست‌های برداشت",
}: {
  params?: object | null;
  title?: string;
}) => {
  return downloadWalletExcel({
    path: `/admin/withdrawal-requests/legal/advanced-filter/excel${params ? createQueryString(params) : ""}`,
    title,
  });
};

export const attachmentDownloader = async ({
  url,
  name,
  hasToken,
}: {
  url: string;
  name: string;
  hasToken: boolean;
}) => {
  try {
    const myHeaders = new Headers();
    if (hasToken) {
      myHeaders.append("Authorization", `Bearer ${getToken()}`);
    }

    const response = await fetch(url, { method: "GET", headers: myHeaders });
    if (response.status === 200) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger a click event on the anchor to start the download
      link.click();

      // Remove the anchor from the body
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);

      return blobUrl; // Return the URL if needed
    } else {
      // in this case response was something other than 200 and we assume its a error
      return null;
    }
  } catch (error) {
    console.error("Error downloading the file:", error);
    throw error;
  }
};

export const uploadFile = async ({
  formData,
  url = `${import.meta.env.VITE_URL_COMMITTEE}/upload`,
}: {
  formData: any;
  url?: string;
}) => {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // "Content-Type": "multipart/form-data",
    },
  });

  return response.json();
};

export const fileDirCreator = () => {
  return (
    convertToMd5(
      `NaTn-${(JSON.parse(getFromLocalStorage("meta") ?? "") as LocalStorageMetaType)?.nationalCode}`
    ) +
    `/${new Date().getFullYear()}-${getExtraZeroIfBelowTen(
      new Date().getMonth() + 1
    )}/${new Date().getDate()}`
  );
};

export const fileNameCreator = () => {
  return convertToMd5(
    `${JSON.parse(getFromLocalStorage("meta") as any)?.nationalCode}-FilE-${Date.now()}`
  );
};

export function getFileType(base64String: string) {
  const mimeType = base64String.match(/^data:(.+);base64,/);
  if (mimeType) {
    return mimeType[1];
  }
  return null;
}

export function getFileSize(base64String: string) {
  // Remove the metadata (e.g., "data:image/png;base64,")
  const base64Data = base64String.split(",")[1];

  // Calculate the length of the Base64 string
  const base64Length = base64Data.length;

  // Calculate the padding
  const padding = base64Data.endsWith("==") ? 2 : base64Data.endsWith("=") ? 1 : 0;

  // Calculate the file size in bytes
  const fileSizeInBytes = (base64Length * 3) / 4 - padding;

  return fileSizeInBytes;
}

/// This function converts a Base64 data URL to a File object
const dataUrlToFile = (
  dataUrl: string,
  fileName: string,
  mimeType = "application/octet-stream"
) => {
  const [, data] = dataUrl.split(",");
  const base64Data = data || dataUrl;
  const byteString = atob(base64Data);
  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: mimeType });
};

// This function extracts the file name and other meta data from a given URL
export const getUploadFilePayload = (file: UploadFile): File | Blob | null => {
  const rawFile = file.originFileObj as
    | File
    | Blob
    | { data?: string; type?: string; path?: string; buffer?: ArrayBuffer }
    | null;

  if (rawFile instanceof Blob) {
    return rawFile as File | Blob;
  }

  if (file?.url && typeof file.url === "string" && file.url.startsWith("data:")) {
    const meta = file.url.split(",")[0] || "";
    const matches = meta.match(/data:(.*);base64/);
    const mime = (matches && matches[1]) || file.type || "application/octet-stream";
    return dataUrlToFile(file.url, file.name || `file-${Date.now()}`, mime);
  }

  if (
    rawFile &&
    typeof rawFile === "object" &&
    typeof rawFile.data === "string" &&
    rawFile.data.includes("base64")
  ) {
    const mime = rawFile.type || file.type || "application/octet-stream";
    return dataUrlToFile(rawFile.data, file.name || `file-${Date.now()}`, mime);
  }

  if (rawFile && rawFile.path && rawFile.buffer) {
    return new Blob([rawFile.buffer], {
      type: rawFile.type || file.type || "application/octet-stream",
    });
  }

  return null;
};
