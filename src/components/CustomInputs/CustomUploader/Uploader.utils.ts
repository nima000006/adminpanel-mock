import type {
  FileMetadata,
  ValidationResult,
  UploadSizeLimitConfig,
} from "./Uploader.types";
import type { RcFile } from "antd/es/upload";

/**
 * Validates file format against allowed types
 */
export const validateFileFormat = (
  file: RcFile,
  allowedFormats: string[]
): ValidationResult => {
  const isValid = allowedFormats.includes(file.type);
  return {
    isValid,
    error: isValid ? undefined : `File type ${file.type} is not supported`,
  };
};

/**
 * Validates file size against limits
 */
export const validateFileSize = (
  file: RcFile,
  sizeConfig: UploadSizeLimitConfig
): ValidationResult => {
  if (!sizeConfig.isActive || !sizeConfig.size) {
    return { isValid: true };
  }

  const multiplier = sizeConfig.sizeUnit === "MB" ? 1024 * 1024 : 1024;
  const maxSizeBytes = sizeConfig.size * multiplier;
  const isValid = file.size <= maxSizeBytes;

  return {
    isValid,
    error: isValid
      ? undefined
      : `File size exceeds ${sizeConfig.size}${sizeConfig.sizeUnit}`,
  };
};

/**
 * Converts base64 data URL to File object
 */
export const base64ToFile = (
  base64Data: string,
  filename: string,
  mimeType = "image/jpeg"
): File => {
  try {
    // Remove base64 metadata prefix
    const base64String = base64Data.split(",")[1];

    // Convert base64 to binary
    const byteString = atob(base64String);
    const byteNumbers = new Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mimeType });
  } catch (error) {
    throw new Error(`Failed to convert base64 to file: ${error}`);
  }
};

/**
 * Detects file type from data URL or file extension
 */
export const detectFileType = (dataUrl: string, fallbackExtension?: string): string => {
  // Try to extract MIME type from data URL
  const mimeMatch = dataUrl.match(/^data:([^;]+);/);
  if (mimeMatch) {
    return mimeMatch[1];
  }

  // Fallback to extension-based detection
  if (fallbackExtension) {
    const extensionMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      pdf: "application/pdf",
    };

    const ext = fallbackExtension.toLowerCase().replace(".", "");
    return extensionMap[ext] || "application/octet-stream";
  }

  return "image/jpeg"; // Default fallback
};

/**
 * Generates unique file ID
 */
export const generateFileId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Checks if file is an image
 */
export const isImageFile = (file: FileMetadata | RcFile): boolean => {
  const type = "type" in file ? file.type : file.extension;
  return type ? type.startsWith("image/") : false;
};

/**
 * Checks if file is a PDF
 */
export const isPdfFile = (file: FileMetadata | RcFile): boolean => {
  const type = "type" in file ? file.type : file.extension;
  return type === "application/pdf" || type === "pdf";
};

/**
 * Creates a safe filename by removing invalid characters
 */
export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
};

/**
 * Extracts file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf(".");
  return lastDot > 0 ? filename.substring(lastDot + 1) : "";
};

/**
 * Creates URL for blob download
 */
export const createDownloadUrl = (blob: Blob, filename: string): string => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return url;
};

/**
 * Cleanup function for blob URLs
 */
export const cleanupBlobUrls = (urls: string[]): void => {
  urls.forEach((url) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  });
};

/**
 * Creates AbortController for request cancellation
 */
export class UploadController {
  private abortController: AbortController;
  private cleanupCallbacks: Array<() => void> = [];

  constructor() {
    this.abortController = new AbortController();
  }

  get signal(): AbortSignal {
    return this.abortController.signal;
  }

  abort(): void {
    this.abortController.abort();
    this.cleanup();
  }

  addCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }

  private cleanup(): void {
    this.cleanupCallbacks.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.warn("Cleanup callback failed:", error);
      }
    });
    this.cleanupCallbacks = [];
  }
}
