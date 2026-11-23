import { useState } from "react";

import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { downloadListOfRequestInDormExcel } from "@infra/helpers/utils";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";

import { CustomDormRequestsExcelButtonProps } from "./@types/@customExcelButton";
import "./_customExcelButton.scss";

const CustomDormRequestsExcelButton = ({
  semester,
  status,
  title,
}: CustomDormRequestsExcelButtonProps) => {
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  //* ================================ Util Functions ================================
  // onGetExcelFileBtn
  const onGetExcelFileBtn = async () => {
    try {
      setIsDownloadLinkLoading(true);
      const downloadLink = await downloadListOfRequestInDormExcel(
        semester,
        status,
        title
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomButton
      onClick={onGetExcelFileBtn}
      loading={isDownloadLinkLoading}
      className="custom-dorm-request-excel-btn"
    >
      دانلود فایل اکسل
    </CustomButton>
  );
};

export default CustomDormRequestsExcelButton;
