import type { ReactNode } from "react";

import type { FormItemProps, UploadFile, UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadChangeParam } from "antd/es/upload/interface";
import type { PercentCrop, PixelCrop, ReactCropState } from "react-image-crop";

// Core file types
export interface FileMetadata {
  uid: string;
  name: string;
  status: "uploading" | "done" | "error" | "removed";
  url?: string;
  extension?: string;
  relativeUrl?: string;
  size?: number;
  type?: string;
}

export interface RawUploadFile {
  uid: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

// Upload configuration
export interface UploadSizeLimitConfig {
  size?: number;
  text?: string;
  isActive?: boolean;
  sizeUnit?: "MB" | "KB";
}

export interface AlreadyUploadedData {
  count: number;
  data: Array<{
    originalName: string;
    [key: string]: unknown;
  }>;
}

// Cropping configuration
export interface CropperConfig {
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  keepSelection?: boolean;
  locked?: boolean;
  ruleOfThirds?: boolean;
  circularCrop?: boolean;
  disabled?: boolean;
  className?: string;
  onComplete?: (crop: PixelCrop, percentCrop: PercentCrop) => void;
  onDragStart?: (e: PointerEvent) => void;
  onDragEnd?: (e: PointerEvent) => void;
  renderSelectionAddon?: (state: ReactCropState) => React.ReactNode;
}

// Upload handlers
export interface UploadHandlers {
  onBeforeUpload?: (file: RcFile, fileList: RcFile[]) => boolean | Promise<boolean>;
  onUploadProgress?: (progress: number, file: UploadFile) => void;
  onUploadSuccess?: (response: unknown, file: UploadFile) => void;
  onUploadError?: (error: Error, file: UploadFile) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  onChange?: (info: UploadChangeParam<UploadFile>) => void;
  customRequest?: (options: {
    file: RcFile;
    onProgress: (progress: number) => void;
    onSuccess: (response: unknown) => void;
    onError: (error: Error) => void;
    abort: () => void;
  }) => void;
}

// Component modes
export type UploaderMode = "viewer" | "uploader" | "gallery";

// Main component props
export interface UploaderProps extends Omit<UploadProps, "onChange" | "customRequest"> {
  // Core functionality
  mode?: UploaderMode;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;

  // Upload configuration
  validFileFormats?: string[];
  sizeLimitConfig?: UploadSizeLimitConfig;
  alreadyUploaded?: AlreadyUploadedData;
  setAlreadyUploaded?: React.Dispatch<React.SetStateAction<AlreadyUploadedData>>;

  // UI customization
  uploaderText?: ReactNode;
  hasUploaderIcon?: boolean;
  hasNullText?: boolean;
  classNameOuterDiv?: string;
  hasVerticalLabel?: boolean;

  // State management
  imageSetter?: (url: string) => void;
  isUploadFileLoading?: boolean;
  isDataLoading?: boolean;
  isReadOnly?: boolean;

  // Image processing
  cropperConfig?: CropperConfig;
  imageGetterSource?: string;

  // Upload handlers
  handlers?: UploadHandlers;

  // Form integration (subset of FormItemProps)
  formItemProps?: Pick<
    FormItemProps,
    | "name"
    | "label"
    | "rules"
    | "help"
    | "tooltip"
    | "required"
    | "validateStatus"
    | "hasFeedback"
    | "labelCol"
    | "labelAlign"
    | "colon"
    | "extra"
    | "hidden"
    | "className"
  >;
}

// Component ref methods
export interface UploaderRef {
  focus: () => void;
  open: () => void;
  abort: () => void;
  retry: (file: UploadFile) => void;
  getFiles: () => UploadFile[];
  clearFiles: () => void;
}

// Delete confirmation modal
export interface DeleteConfirmation {
  isOpen: boolean;
  fileInfo: Partial<FileMetadata>;
}

// Image cropper modal state
export interface ImageCropperState {
  isOpen: boolean;
  data: {
    src?: string;
    file?: RcFile;
  };
}

// Preview component props
export interface FilePreviewProps {
  file: FileMetadata & RawUploadFile;
  mode: UploaderMode;
  imageGetterSource?: string;
  uploaderText?: ReactNode;
  onDownload?: (file: FileMetadata) => Promise<void>;
  onRemove?: (file: FileMetadata) => void;
  isLoading?: boolean;
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Upload progress tracking
export interface UploadProgress {
  [fileId: string]: {
    percent: number;
    status: "uploading" | "success" | "error";
    response?: unknown;
    error?: Error;
  };
}
