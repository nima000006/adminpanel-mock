import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button, Form, Upload, UploadFile } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

// Import our types and utilities
import FilePreview from "./FilePreview";
import {
  validateFileFormat,
  validateFileSize,
  base64ToFile,
  detectFileType,
  generateFileId,
  UploadController,
  cleanupBlobUrls,
} from "./Uploader.utils";

// Import existing components (keeping compatibility)
import selfDefaultAvatar from "../../../assets/images/selfDefaultAvatar.webp";
import {
  ARE_YOU_SURE_TO_DELETE,
  FILE_TYPE_NOT_SUPPORTED,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import ConfirmationModalWithContent from "../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTooltip from "../../Renderers/CustomTooltip/CustomTooltip";
import Div from "../../Renderers/Div/Div";
import ImageCropperModal from "../../Renderers/ImageCropperModal/ImageCropperModal";

// Import constants

import type {
  UploaderProps,
  UploaderRef,
  DeleteConfirmation,
  ImageCropperState,
  UploadProgress,
  UploaderMode,
} from "./Uploader.types";
import type { RcFile } from "antd/es/upload";
import type { UploadChangeParam } from "antd/es/upload/interface";

// Import styles
import "./_customUploader.scss";

/**
 * Custom hook for managing upload state and operations
 */
const useUploadManager = (
  fileList: UploadFile[],
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>,
  _mode: UploaderMode,
  handlers?: UploaderProps["handlers"]
) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [activeUploads, setActiveUploads] = useState<Set<string>>(new Set());
  const uploadControllersRef = useRef<Map<string, UploadController>>(new Map());

  // Cleanup controllers on unmount
  useEffect(() => {
    const controllers = uploadControllersRef.current;
    return () => {
      controllers.forEach((controller) => {
        controller.abort();
      });
      controllers.clear();
    };
  }, []);

  const addFile = useCallback(
    (file: UploadFile) => {
      setFileList([...fileList, file]);

      if (handlers?.onChange) {
        handlers.onChange({
          file,
          fileList: [...fileList, file],
        } as UploadChangeParam<UploadFile>);
      }
    },
    [fileList, setFileList, handlers]
  );

  const removeFile = useCallback(
    (fileToRemove: UploadFile) => {
      const newFileList = fileList.filter((file) => file.uid !== fileToRemove.uid);
      setFileList(newFileList);

      // Abort any ongoing upload for this file
      const controller = uploadControllersRef.current.get(fileToRemove.uid);
      if (controller) {
        controller.abort();
        uploadControllersRef.current.delete(fileToRemove.uid);
      }

      // Clean up progress tracking
      setUploadProgress((prev) => {
        const { [fileToRemove.uid]: removed, ...rest } = prev;
        return rest;
      });

      setActiveUploads((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileToRemove.uid);
        return newSet;
      });

      if (handlers?.onChange) {
        handlers.onChange({
          file: fileToRemove,
          fileList: newFileList,
        } as UploadChangeParam<UploadFile>);
      }
    },
    [fileList, setFileList, handlers]
  );

  const updateFileStatus = useCallback(
    (fileId: string, status: UploadFile["status"], response?: unknown, error?: Error) => {
      setFileList((prevList: UploadFile[]) =>
        prevList.map((file: UploadFile) =>
          file.uid === fileId
            ? {
                ...file,
                status,
                response,
                error,
              }
            : file
        )
      );

      // Update progress
      setUploadProgress((prev) => ({
        ...prev,
        [fileId]: {
          percent:
            status === "done" ? 100 : status === "error" ? 0 : prev[fileId]?.percent || 0,
          status:
            status === "done" ? "success" : status === "error" ? "error" : "uploading",
          response,
          error,
        },
      }));

      if (status !== "uploading") {
        setActiveUploads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    },
    [setFileList]
  );

  const retryUpload = useCallback(
    (file: UploadFile) => {
      if (file.originFileObj && handlers?.customRequest) {
        const controller = new UploadController();
        uploadControllersRef.current.set(file.uid, controller);
        setActiveUploads((prev) => new Set(prev).add(file.uid));

        updateFileStatus(file.uid, "uploading");

        handlers.customRequest({
          file: file.originFileObj,
          onProgress: (progress: number) => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.uid]: {
                ...prev[file.uid],
                percent: progress,
                status: "uploading",
              },
            }));
          },
          onSuccess: (response: unknown) => {
            updateFileStatus(file.uid, "done", response);
            uploadControllersRef.current.delete(file.uid);

            if (handlers.onUploadSuccess) {
              handlers.onUploadSuccess(response, file);
            }
          },
          onError: (error: Error) => {
            updateFileStatus(file.uid, "error", undefined, error);
            uploadControllersRef.current.delete(file.uid);

            if (handlers.onUploadError) {
              handlers.onUploadError(error, file);
            }
          },
          abort: () => {
            updateFileStatus(file.uid, "error", undefined, new Error("Upload aborted"));
            uploadControllersRef.current.delete(file.uid);
          },
        });
      }
    },
    [handlers, updateFileStatus]
  );

  return {
    uploadProgress,
    activeUploads,
    addFile,
    removeFile,
    updateFileStatus,
    retryUpload,
    abortAll: () => {
      uploadControllersRef.current.forEach((controller) => controller.abort());
      uploadControllersRef.current.clear();
      setActiveUploads(new Set());
    },
  };
};

/**
 * Custom hook for managing cropper state
 */
const useCropper = (
  _cropperConfig?: UploaderProps["cropperConfig"],
  onCropComplete?: (croppedFile: File, croppedUrl: string) => void
) => {
  const [cropperState, setCropperState] = useState<ImageCropperState>({
    isOpen: false,
    data: {},
  });

  const openCropper = useCallback((imageData: string, originalFile?: RcFile) => {
    setCropperState({
      isOpen: true,
      data: { src: imageData, file: originalFile },
    });
  }, []);

  const closeCropper = useCallback(() => {
    setCropperState({
      isOpen: false,
      data: {},
    });
  }, []);

  const handleCropConfirm = useCallback(
    (croppedImageUrl?: string) => {
      if (!croppedImageUrl) {
        closeCropper();
        return;
      }

      try {
        const fileType = detectFileType(croppedImageUrl);
        const extension = fileType.split("/")[1] || "jpeg";
        const uid = generateFileId();
        const filename = `cropped-${uid}.${extension}`;

        const croppedFile = base64ToFile(croppedImageUrl, filename, fileType);

        if (onCropComplete) {
          onCropComplete(croppedFile, croppedImageUrl);
        }

        closeCropper();
      } catch (error) {
        console.error("Crop processing failed:", error);
        toast.error("Failed to process cropped image");
        closeCropper();
      }
    },
    [onCropComplete, closeCropper]
  );

  return {
    cropperState,
    openCropper,
    closeCropper,
    handleCropConfirm,
  };
};

/**
 * Custom hook for managing delete confirmation
 */
const useDeleteConfirmation = (onConfirmDelete?: (file: UploadFile) => void) => {
  const [deleteState, setDeleteState] = useState<DeleteConfirmation>({
    isOpen: false,
    fileInfo: {},
  });

  const showDeleteConfirmation = useCallback((file: UploadFile) => {
    setDeleteState({
      isOpen: true,
      fileInfo: file,
    });
  }, []);

  const hideDeleteConfirmation = useCallback(() => {
    setDeleteState({
      isOpen: false,
      fileInfo: {},
    });
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteState.fileInfo && onConfirmDelete) {
      onConfirmDelete(deleteState.fileInfo as UploadFile);
    }
    hideDeleteConfirmation();
  }, [deleteState.fileInfo, onConfirmDelete, hideDeleteConfirmation]);

  return {
    deleteState,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDelete,
  };
};

/**
 * Main Uploader Component - Part 3A-2 & 3A-3: Complete Implementation
 */
const UploaderRefactored = forwardRef<UploaderRef, UploaderProps>(
  (
    {
      // Core functionality props
      mode = "uploader",
      fileList,
      setFileList,
      validFileFormats = ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
      sizeLimitConfig = {
        size: 2,
        text: "مجموع حجم فایل ها کمتر از دو مگابایت باشد",
        isActive: true,
        sizeUnit: "MB",
      },
      alreadyUploaded,
      setAlreadyUploaded,

      // UI customization props
      uploaderText = "بارگذاری اسناد",
      hasUploaderIcon = true,
      hasNullText = false,
      classNameOuterDiv = "",
      hasVerticalLabel = false,

      // State management props
      imageSetter,
      isUploadFileLoading = false,
      isDataLoading = false,
      isReadOnly = false,

      // Image processing props
      cropperConfig,
      imageGetterSource = "committee",

      // Upload handlers
      handlers,

      // Form integration props
      formItemProps,

      // Upload component props
      multiple = false,
      disabled,
      maxCount,
      ...uploadProps
    },
    ref
  ) => {
    // Determine actual mode based on props
    const actualMode: UploaderMode = useMemo(() => {
      if (isReadOnly) return "viewer";
      return mode;
    }, [mode, isReadOnly]);

    // Initialize custom hooks
    const uploadManager = useUploadManager(fileList, setFileList, actualMode, handlers);

    const cropper = useCropper(cropperConfig, (croppedFile, croppedUrl) => {
      const uid = generateFileId();
      const uploadFile: UploadFile = {
        uid,
        name: croppedFile.name,
        status: "done",
        url: croppedUrl,
        type: croppedFile.type,
        size: croppedFile.size,
        originFileObj: croppedFile as RcFile,
      };

      uploadManager.addFile(uploadFile);

      if (imageSetter) {
        imageSetter(croppedUrl);
      }
    });

    const deleteConfirmation = useDeleteConfirmation((file) => {
      uploadManager.removeFile(file);

      // Clear image setter if this was the selected image
      if (imageSetter && file.url) {
        imageSetter("");
      }

      // Update already uploaded data
      if (setAlreadyUploaded && alreadyUploaded) {
        const newUploadedFiles = alreadyUploaded.data.filter(
          (item) => item.originalName !== file.name
        );
        setAlreadyUploaded({
          data: newUploadedFiles,
          count: newUploadedFiles.length,
        });
      }
    });

    // File validation function
    const validateFile = useCallback(
      (file: RcFile): { isValid: boolean; error?: string } => {
        // Format validation
        const formatValidation = validateFileFormat(file, validFileFormats);
        if (!formatValidation.isValid) {
          return formatValidation;
        }

        // Size validation
        const sizeValidation = validateFileSize(file, sizeLimitConfig);
        if (!sizeValidation.isValid) {
          return sizeValidation;
        }

        return { isValid: true };
      },
      [validFileFormats, sizeLimitConfig]
    );

    // Before upload handler
    const handleBeforeUpload = useCallback(
      (file: RcFile, fileListParam: RcFile[]) => {
        // Run validation
        const validation = validateFile(file);
        if (!validation.isValid) {
          toast.error(validation.error || FILE_TYPE_NOT_SUPPORTED, {
            toastId: validation.error || FILE_TYPE_NOT_SUPPORTED,
          });
          return false;
        }

        // Call custom beforeUpload if provided
        if (handlers?.onBeforeUpload) {
          const result = handlers.onBeforeUpload(file, fileListParam);
          if (result === false || (result instanceof Promise && result)) {
            return result;
          }
        }

        // For images, open cropper if cropping is enabled
        if (file.type.startsWith("image/") && cropperConfig && !cropperConfig.disabled) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            if (result) {
              cropper.openCropper(result, file);
            }
          };
          reader.onerror = () => {
            toast.error("Failed to read file");
          };
          reader.readAsDataURL(file);
          return false; // Prevent automatic upload, handle via cropper
        }

        // For non-image files or when cropping is disabled, add directly
        const uid = generateFileId();
        const uploadFile: UploadFile = {
          uid,
          name: file.name,
          status: "done",
          type: file.type,
          size: file.size,
          originFileObj: file,
        };

        uploadManager.addFile(uploadFile);
        return false; // Prevent automatic upload
      },
      [validateFile, handlers, cropperConfig, cropper, uploadManager]
    );

    // Calculate total file size for validation
    const totalFileSize = useMemo(() => {
      return fileList.reduce((acc, file) => acc + (file.size || 0), 0);
    }, [fileList]);

    // Check if upload button should be disabled
    const isUploadDisabled = useMemo(() => {
      if (disabled || actualMode === "viewer") return true;

      if (sizeLimitConfig.isActive && sizeLimitConfig.size) {
        const limitBytes =
          sizeLimitConfig.size * (sizeLimitConfig.sizeUnit === "MB" ? 1024 * 1024 : 1024);
        return totalFileSize >= limitBytes;
      }

      if (maxCount) {
        return fileList.length >= maxCount;
      }

      return false;
    }, [disabled, actualMode, sizeLimitConfig, totalFileSize, maxCount, fileList.length]);

    // Custom item renderer
    const itemRender = useCallback(
      (_originNode: React.ReactElement, file: UploadFile) => {
        const handleDownload = async (_fileToDownload: UploadFile) => {
          if (handlers?.customRequest) {
            // Custom download logic can be implemented here
            // console.log("Download:", fileToDownload);
          }
        };

        const handleRemove = (fileToRemove: UploadFile) => {
          if (actualMode !== "viewer") {
            deleteConfirmation.showDeleteConfirmation(fileToRemove);
          }
        };

        return (
          <div className="uploader-item-container">
            <FilePreview
              file={file as any}
              mode={actualMode}
              imageGetterSource={imageGetterSource}
              uploaderText={uploaderText}
              onDownload={handleDownload}
              onRemove={actualMode !== "viewer" ? handleRemove : undefined}
              isLoading={uploadManager.activeUploads.has(file.uid)}
            />
          </div>
        );
      },
      [
        actualMode,
        imageGetterSource,
        uploaderText,
        handlers,
        deleteConfirmation,
        uploadManager.activeUploads,
      ]
    );

    // Expose imperative methods
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          // Focus the upload input
          const uploadInput = document.querySelector(
            '.uploader-refactored input[type="file"]'
          ) as HTMLInputElement;
          uploadInput?.focus();
        },
        open: () => {
          // Trigger file picker
          const uploadInput = document.querySelector(
            '.uploader-refactored input[type="file"]'
          ) as HTMLInputElement;
          uploadInput?.click();
        },
        abort: () => {
          uploadManager.abortAll();
        },
        retry: (file: UploadFile) => {
          uploadManager.retryUpload(file);
        },
        getFiles: () => fileList,
        clearFiles: () => {
          setFileList([]);
          uploadManager.abortAll();
        },
      }),
      [fileList, setFileList, uploadManager]
    );

    // Cleanup blob URLs on unmount
    useEffect(() => {
      return () => {
        const blobUrls = fileList
          .map((file) => file.url)
          .filter((url) => url?.startsWith("blob:")) as string[];
        cleanupBlobUrls(blobUrls);
      };
    }, [fileList]);

    return (
      <div className={`uploader-refactored ${classNameOuterDiv}`}>
        {/* Image Cropper Modal */}
        <ImageCropperModal
          imageCropperInfo={{
            isOpen: cropper.cropperState.isOpen,
            data: { src: cropper.cropperState.data.src || "" },
          }}
          setImageCropperInfo={(state) => {
            if (typeof state === "function") {
              // Handle function updates
              cropper.closeCropper();
            } else if (!state.isOpen) {
              cropper.closeCropper();
            }
          }}
          onCropConfirm={cropper.handleCropConfirm}
          aspectRatio={cropperConfig?.aspectRatio}
          circularCrop={cropperConfig?.circularCrop}
          disabled={cropperConfig?.disabled}
          keepSelection={cropperConfig?.keepSelection}
          locked={cropperConfig?.locked}
          maxHeight={cropperConfig?.maxHeight}
          onComplete={cropperConfig?.onComplete}
          maxWidth={cropperConfig?.maxWidth}
          ruleOfThirds={cropperConfig?.ruleOfThirds}
          renderSelectionAddon={cropperConfig?.renderSelectionAddon}
          className={cropperConfig?.className}
        />

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.deleteState.isOpen && (
          <ConfirmationModalWithContent
            content={
              <div className="delete-image-modal-text">{ARE_YOU_SURE_TO_DELETE}</div>
            }
            isModalOpen={deleteConfirmation.deleteState.isOpen}
            isDangerous={true}
            closeModalHandler={deleteConfirmation.hideDeleteConfirmation}
            backBtnText="خیر"
            confirmBtnText="تایید"
            onConfirmClickHandler={deleteConfirmation.confirmDelete}
            showIcon={false}
          />
        )}

        {/* Main Upload Container */}
        <Div
          loading={isDataLoading}
          className="main-uploader-container"
          customHeight="100px"
        >
          <Form.Item
            {...formItemProps}
            className={`${hasVerticalLabel ? "vertical-label" : ""} ${
              formItemProps?.className || ""
            }`}
          >
            <Upload
              className="upload-container"
              listType="picture"
              multiple={multiple}
              fileList={fileList}
              itemRender={itemRender}
              beforeUpload={handleBeforeUpload}
              onRemove={(file) => {
                if (actualMode !== "viewer") {
                  deleteConfirmation.showDeleteConfirmation(file);
                }
                return false; // Prevent default removal, handle via confirmation
              }}
              disabled={isUploadDisabled}
              maxCount={maxCount}
              {...uploadProps}
            >
              {/* Upload Button - only show in uploader mode */}
              {actualMode === "uploader" && !isUploadDisabled && (
                <CustomTooltip title={sizeLimitConfig.text}>
                  <Button
                    icon={hasUploaderIcon ? <AiOutlineUpload /> : undefined}
                    className="custom-upload-btn"
                    loading={isUploadFileLoading}
                    aria-label={
                      typeof uploaderText === "string" ? uploaderText : "Upload files"
                    }
                  >
                    <span className="uploader-btn-text">{uploaderText}</span>
                  </Button>
                </CustomTooltip>
              )}

              {/* Empty State */}
              {hasNullText && fileList.length === 0 && (
                <div className="no-file-text">
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
                </div>
              )}
            </Upload>
          </Form.Item>
        </Div>
      </div>
    );
  }
);

UploaderRefactored.displayName = "UploaderRefactored";

export default UploaderRefactored;
export type { UploaderProps, UploaderRef };
