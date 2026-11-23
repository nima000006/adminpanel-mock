import { useEffect, useState } from "react";

import { Image, Space } from "antd";
import {
  AiOutlineDownload,
  AiOutlineFilePdf,
  AiOutlineRotateLeft,
  AiOutlineRotateRight,
  AiOutlineSwap,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from "react-icons/ai";
import { toast } from "react-toastify";

import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { envBaseGenerator } from "@infra/VARS/globalConfig";
import { FONTSIZE_16 } from "@infra/VARS/globalStyles/globalStyles";

import selfDefaultAvatar from "../../../../assets/images/selfDefaultAvatar.webp";
import {
  attachmentDownloader,
  LimitText,
} from "../../../../infrastructure/helpers/utils";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import MainSpinner from "../../../MainSpinner/MainSpinner";
import CustomTooltip from "../../../Renderers/CustomTooltip/CustomTooltip";

import "./_imageUtils.scss";

export type RawUploadFileType = {
  uid: string;
  lastModified: number;
  lastModifiedDate: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
type FileType = {
  uid: string;
  name: string;
  status: string;
  url: string;
  extension: string;
  relativeUrl: string;
};

//! وقتی دکمه دانلود فایل زده می شود
const onImageClickHandler = async (
  file: any,
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsDownloadLinkLoading(true);
    const downloadLink = await attachmentDownloader({
      hasToken: file?.name?.startsWith("http") ? false : true,
      name: file?.relativeUrl,
      url: file?.name?.startsWith("http")
        ? file?.name
        : file?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".png") ||
            file?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".jpg") ||
            file?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".jpeg") ||
            file?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".pdf")
          ? `${import.meta.env.VITE_URL_COMMITTEE}/upload?path=${file?.relativeUrl}`
          : `${
              import.meta.env.VITE_URL_COMMITTEE
            }/upload?path=${file?.relativeUrl}.${file?.extension}`,
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

const ImagePreview = ({
  data,
  setIsDownloadLinkLoading,
  isAbsolute,
  uploaderText,
  isBase64,
  imageGetterSource,
}: {
  data: FileType & RawUploadFileType;
  setIsDownloadLinkLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAbsolute?: boolean;
  isBase64?: boolean;
  uploaderText?: React.ReactNode;
  imageGetterSource?: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${getToken()}`);

      try {
        const response = await fetch(
          isAbsolute
            ? data?.name
            : data?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".png") ||
                data?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".jpg") ||
                data?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".jpeg") ||
                data?.relativeUrl?.slice(-6)?.toLowerCase()?.includes(".pdf")
              ? `${envBaseGenerator(imageGetterSource)}/upload?path=${data?.relativeUrl}`
              : `${envBaseGenerator(
                  imageGetterSource
                )}/upload?path=${data?.relativeUrl}.${data?.extension}`,
          {
            method: "GET",
            headers: isAbsolute ? undefined : myHeaders,
          }
        );

        if (response.status === 200) {
          const blob = await response.blob();
          const blobUrl = URL?.createObjectURL(blob);
          setImageUrl(blobUrl);
        } else {
          toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
        }
      } catch (_) {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      } finally {
        setIsLoading(false);
      }
    };

    if ((data?.url || data?.relativeUrl) && !isBase64) {
      fetchImage();
    }
  }, [data?.uid, data?.name]);

  if (isBase64) {
    return (
      <Image
        src={data?.url}
        alt={data?.name}
        width={90}
        height={90}
        className="image-uploaded-preview"
        preview={{ zIndex: 1200 }}
      />
    );
  }

  if (data?.uid?.startsWith("rc-upload")) {
    if (data?.type?.includes("pdf")) {
      return (
        <div
          onClick={() => {
            // OLD CODE :  data?.relativeUrl &&
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            data?.relativeUrl && onImageClickHandler(data, setIsDownloadLinkLoading);
          }}
          // loading={isDownloadLinkLoading}
          className="pdf-uploaded-container"
          // disabled={!file?.relativeUrl}
        >
          <div className="pdf-holder">
            <span>
              <AiOutlineFilePdf style={{ fontSize: FONTSIZE_16 }} />
            </span>
            <span>{LimitText(data?.name, 4)}</span>
          </div>
        </div>
      );
    }

    return (
      <Image
        src={URL?.createObjectURL(new Blob([data as any], { type: "image/jpeg" }))}
        alt={data?.name}
        width={90}
        height={90}
        className="image-uploaded-preview"
        preview={{ zIndex: 1200 }}
      />
    );
  }
  if (data?.extension === "pdf") {
    return (
      <div
        onClick={() =>
          data?.relativeUrl && onImageClickHandler(data, setIsDownloadLinkLoading)
        }
        // loading={isDownloadLinkLoading}
        className="download-btn-container"
        // disabled={!file?.relativeUrl}
      >
        <div className="pdf-holder">
          <span>
            <AiOutlineFilePdf style={{ fontSize: FONTSIZE_16 }} />
          </span>
          <span>{LimitText(data?.name, 4)}</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <MainSpinner height="5vh" />;
  }

  return imageUrl ? (
    <Image
      src={imageUrl}
      alt={data?.name}
      width={90}
      height={90}
      style={{ borderRadius: "4px" }}
      preview={{
        zIndex: 1200,
        toolbarRender: (
          _,
          {
            actions: {
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
            },
          }
        ) => (
          <Space size={25} className="toolbar-wrapper">
            <CustomTooltip title="دانلود">
              <AiOutlineDownload
                onClick={() => onImageClickHandler(data, setIsDownloadLinkLoading)}
              />
            </CustomTooltip>
            <CustomTooltip title="جابجایی">
              <AiOutlineSwap rotate={90} onClick={onFlipY} />
            </CustomTooltip>
            <CustomTooltip title="تغییر جهت">
              <AiOutlineSwap onClick={onFlipX} />
            </CustomTooltip>
            <CustomTooltip title="چرخش خلاف عقربه">
              <AiOutlineRotateLeft onClick={onRotateLeft} />
            </CustomTooltip>
            <CustomTooltip title="چرخش در جهت عقربه">
              <AiOutlineRotateRight onClick={onRotateRight} />
            </CustomTooltip>
            <CustomTooltip title="">
              <AiOutlineZoomOut onClick={onZoomOut} />
            </CustomTooltip>
            <CustomTooltip title="بزرگنمایی">
              <AiOutlineZoomIn onClick={onZoomIn} />
            </CustomTooltip>
          </Space>
        ),
      }}
    />
  ) : (
    // <div className="corrupt-file-container">فایل وجود ندارد یا حذف شده است</div>
    // <Image src={selfDefaultAvatar} alt="عکس پیش فرض" width={90} height={90} />
    <CustomTooltip title={uploaderText}>
      <img
        src={selfDefaultAvatar}
        alt="عکس پیش فرض"
        width={90}
        height={90}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </CustomTooltip>
  );
};

export default ImagePreview;
