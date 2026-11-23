import React, { useEffect, useState, useCallback } from "react";

import { Image, Space, Spin } from "antd";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineFilePdf,
  AiOutlineRotateLeft,
  AiOutlineRotateRight,
  AiOutlineSwap,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
} from "react-icons/ai";
import { toast } from "react-toastify";

import {
  isImageFile,
  isPdfFile,
  formatFileSize,
  cleanupBlobUrls,
} from "./Uploader.utils";
import selfDefaultAvatar from "../../../assets/images/selfDefaultAvatar.webp";
import { getToken } from "../../../infrastructure/services/AuthProvider/helper/authUtil";
import { envBaseGenerator } from "../../../infrastructure/VARS/globalConfig";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomTooltip from "../../Renderers/CustomTooltip/CustomTooltip";

import type { FilePreviewProps } from "./Uploader.types";

interface FilePreviewState {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  mode,
  imageGetterSource = "committee",
  uploaderText,
  onDownload,
  onRemove,
  isLoading: externalLoading,
}) => {
  const [state, setState] = useState<FilePreviewState>({
    imageUrl: null,
    isLoading: false,
    error: null,
  });

  const isReadOnly = mode === "viewer" || mode === "gallery";
  const showDeleteButton = !isReadOnly && onRemove;
  const isBase64 = file?.url?.includes(";base64");

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (state.imageUrl?.startsWith("blob:")) {
        cleanupBlobUrls([state.imageUrl]);
      }
    };
  }, [state.imageUrl]);

  // Handle download action
  const handleDownload = useCallback(async () => {
    if (!onDownload) return;

    try {
      await onDownload(file);
      toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
    }
  }, [file, onDownload]);

  // Handle remove action
  const handleRemove = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onRemove) {
        onRemove(file);
      }
    },
    [file, onRemove]
  );

  // Fetch image for remote files
  useEffect(() => {
    const fetchRemoteImage = async () => {
      if (isBase64 || !file?.relativeUrl) return;

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const headers = new Headers();
        const isAbsolute = file.name?.startsWith("http");

        if (!isAbsolute) {
          headers.append("Authorization", `Bearer ${getToken()}`);
        }

        // Build URL for image fetching
        let fetchUrl: string;
        if (isAbsolute) {
          fetchUrl = file.name;
        } else {
          const hasExtension = file.relativeUrl.match(/\\.(png|jpg|jpeg|pdf)$/i);
          const basePath = envBaseGenerator(imageGetterSource);
          fetchUrl = hasExtension
            ? `${basePath}/upload?path=${file.relativeUrl}`
            : `${basePath}/upload?path=${file.relativeUrl}.${file.extension}`;
        }

        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: isAbsolute ? undefined : headers,
        });

        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setState((prev) => ({ ...prev, imageUrl: blobUrl, isLoading: false }));
        } else {
          setState((prev) => ({
            ...prev,
            error: `Failed to load image: ${response.status}`,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Image fetch error:", error);
        setState((prev) => ({
          ...prev,
          error: "Network error loading image",
          isLoading: false,
        }));
      }
    };

    fetchRemoteImage();
  }, [file, isBase64, imageGetterSource]);

  // Loading state
  if (state.isLoading || externalLoading) {
    return (
      <div className="file-preview-loading">
        <Spin size="small" />
      </div>
    );
  }

  // Base64 image rendering
  if (isBase64 && isImageFile(file)) {
    return (
      <div className="file-preview-container">
        {showDeleteButton && (
          <div className="file-preview-actions">
            <CustomTooltip title="حذف فایل">
              <AiOutlineDelete
                className="file-delete-icon"
                onClick={handleRemove}
                aria-label="Delete file"
              />
            </CustomTooltip>
          </div>
        )}
        <Image
          src={file.url}
          alt={file.name}
          width={90}
          height={90}
          className="file-preview-image"
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      </div>
    );
  }

  // Newly uploaded file (starts with rc-upload)
  if (file.uid?.startsWith("rc-upload")) {
    if (isPdfFile(file)) {
      return (
        <div className="file-preview-container">
          {showDeleteButton && (
            <div className="file-preview-actions">
              <CustomTooltip title="حذف فایل">
                <AiOutlineDelete
                  className="file-delete-icon"
                  onClick={handleRemove}
                  aria-label="Delete file"
                />
              </CustomTooltip>
            </div>
          )}
          <div
            className="pdf-preview"
            role="button"
            tabIndex={0}
            onClick={handleDownload}
          >
            <AiOutlineFilePdf style={{ fontSize: "24px" }} />
            <span className="pdf-name">{file.name}</span>
            <span className="pdf-size">{formatFileSize(file.size || 0)}</span>
          </div>
        </div>
      );
    }

    // Handle blob URL for newly uploaded images
    if (isImageFile(file) && (file as any).originFileObj) {
      const blobUrl = URL.createObjectURL((file as any).originFileObj);
      return (
        <div className="file-preview-container">
          {showDeleteButton && (
            <div className="file-preview-actions">
              <CustomTooltip title="حذف فایل">
                <AiOutlineDelete
                  className="file-delete-icon"
                  onClick={handleRemove}
                  aria-label="Delete file"
                />
              </CustomTooltip>
            </div>
          )}
          <Image
            src={blobUrl}
            alt={file.name}
            width={90}
            height={90}
            className="file-preview-image"
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        </div>
      );
    }
  }

  // PDF file rendering
  if (isPdfFile(file)) {
    return (
      <div className="file-preview-container">
        {showDeleteButton && (
          <div className="file-preview-actions">
            <CustomTooltip title="حذف فایل">
              <AiOutlineDelete
                className="file-delete-icon"
                onClick={handleRemove}
                aria-label="Delete file"
              />
            </CustomTooltip>
          </div>
        )}
        <div className="pdf-preview" role="button" tabIndex={0} onClick={handleDownload}>
          <AiOutlineFilePdf style={{ fontSize: "24px" }} />
          <span className="pdf-name">{file.name}</span>
        </div>
      </div>
    );
  }

  // Remote image with full preview functionality
  if (state.imageUrl && !state.error) {
    return (
      <div className="file-preview-container">
        {showDeleteButton && (
          <div className="file-preview-actions">
            <CustomTooltip title="حذف فایل">
              <AiOutlineDelete
                className="file-delete-icon"
                onClick={handleRemove}
                aria-label="Delete file"
              />
            </CustomTooltip>
          </div>
        )}
        <Image
          src={state.imageUrl}
          alt={file.name}
          width={90}
          height={90}
          style={{ objectFit: "cover", borderRadius: "4px" }}
          preview={{
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
              <Space size={25} className="preview-toolbar">
                <CustomTooltip title="دانلود">
                  <AiOutlineDownload onClick={handleDownload} />
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
                <CustomTooltip title="کوچک نمایی">
                  <AiOutlineZoomOut onClick={onZoomOut} />
                </CustomTooltip>
                <CustomTooltip title="بزرگنمایی">
                  <AiOutlineZoomIn onClick={onZoomIn} />
                </CustomTooltip>
              </Space>
            ),
          }}
        />
      </div>
    );
  }

  // Fallback/error state
  return (
    <div className="file-preview-container">
      {showDeleteButton && (
        <div className="file-preview-actions">
          <CustomTooltip title="حذف فایل">
            <AiOutlineDelete
              className="file-delete-icon"
              onClick={handleRemove}
              aria-label="Delete file"
            />
          </CustomTooltip>
        </div>
      )}
      <CustomTooltip title={uploaderText || "فایل پیدا نشد"}>
        <img
          src={selfDefaultAvatar}
          alt="عکس پیش فرض"
          width={90}
          height={90}
          style={{ borderRadius: "4px", opacity: 0.6 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </CustomTooltip>
    </div>
  );
};

export default FilePreview;
