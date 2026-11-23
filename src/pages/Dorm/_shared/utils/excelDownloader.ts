import { getToken } from "@infra/services/AuthProvider/helper/authUtil";

type ExcelDownloaderProps = {
  restOfUrl?: string;
  title?: string;
  method?: string;
  formId: string;
  file_type?: string;
};

export const excelDownloader = async ({
  restOfUrl,
  title = "لیست درخواستها",
  method = "GET",
  formId,
  file_type = "excel",
}: ExcelDownloaderProps) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_BPMS_URL
      }/dormitory/data/form/${formId}/export/${file_type}${restOfUrl ? restOfUrl : ""}`,
      { method, headers: myHeaders }
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
