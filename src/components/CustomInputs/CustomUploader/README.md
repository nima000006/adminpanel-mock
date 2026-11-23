# Uploader Component - API Documentation

## Overview

The refactored Uploader component is a production-ready, feature-rich file upload solution that supports both viewer-only mode and full upload functionality with image cropping, progress tracking, and comprehensive error handling.

## Installation & Usage

```tsx
import UploaderRefactored from "./components/CustomInputs/CustomUploader/Uploader.refactor";
import type {
  UploaderProps,
  UploaderRef,
} from "./components/CustomInputs/CustomUploader/Uploader.types";
```

## Props API

### Core Props

| Prop               | Type                                                 | Default                                                       | Description              |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------------- | ------------------------ |
| `mode`             | `"viewer" \| "uploader" \| "gallery"`                | `"uploader"`                                                  | Component operation mode |
| `fileList`         | `UploadFile[]`                                       | Required                                                      | Current file list        |
| `setFileList`      | `React.Dispatch<React.SetStateAction<UploadFile[]>>` | Required                                                      | File list setter         |
| `validFileFormats` | `string[]`                                           | `["image/png", "image/jpeg", "image/jpg", "application/pdf"]` | Accepted file types      |
| `sizeLimitConfig`  | `UploadSizeLimitConfig`                              | `{ size: 2, sizeUnit: "MB", isActive: true }`                 | File size limits         |

### UI Customization

| Prop                | Type        | Default            | Description           |
| ------------------- | ----------- | ------------------ | --------------------- |
| `uploaderText`      | `ReactNode` | `"بارگذاری اسناد"` | Upload button text    |
| `hasUploaderIcon`   | `boolean`   | `true`             | Show upload icon      |
| `hasNullText`       | `boolean`   | `false`            | Show empty state      |
| `classNameOuterDiv` | `string`    | `""`               | Outer container class |
| `hasVerticalLabel`  | `boolean`   | `false`            | Vertical label layout |

### Upload Handlers

| Prop                        | Type                                                                | Description                  |
| --------------------------- | ------------------------------------------------------------------- | ---------------------------- |
| `handlers.onBeforeUpload`   | `(file: RcFile, fileList: RcFile[]) => boolean \| Promise<boolean>` | Pre-upload validation        |
| `handlers.onUploadProgress` | `(progress: number, file: UploadFile) => void`                      | Upload progress callback     |
| `handlers.onUploadSuccess`  | `(response: unknown, file: UploadFile) => void`                     | Upload success callback      |
| `handlers.onUploadError`    | `(error: Error, file: UploadFile) => void`                          | Upload error callback        |
| `handlers.customRequest`    | `CustomRequestFunction`                                             | Custom upload implementation |

### Image Cropping

| Prop                         | Type      | Description                     |
| ---------------------------- | --------- | ------------------------------- |
| `cropperConfig.aspectRatio`  | `number`  | Fixed aspect ratio (e.g., 16/9) |
| `cropperConfig.circularCrop` | `boolean` | Enable circular crop            |
| `cropperConfig.disabled`     | `boolean` | Disable cropping                |
| `cropperConfig.minWidth`     | `number`  | Minimum crop width              |
| `cropperConfig.maxWidth`     | `number`  | Maximum crop width              |

## Imperative Methods

```tsx
const uploaderRef = useRef<UploaderRef>(null);

// Available methods
uploaderRef.current?.focus(); // Focus upload input
uploaderRef.current?.open(); // Open file picker
uploaderRef.current?.abort(); // Cancel all uploads
uploaderRef.current?.retry(file); // Retry failed upload
uploaderRef.current?.getFiles(); // Get current files
uploaderRef.current?.clearFiles(); // Clear all files
```

## Usage Examples

### 1. Basic File Uploader

```tsx
import React, { useState } from "react";
import UploaderRefactored from "./Uploader.refactor";

const BasicUploader = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <UploaderRefactored
      mode="uploader"
      fileList={fileList}
      setFileList={setFileList}
      uploaderText="Upload Files"
      validFileFormats={["image/png", "image/jpeg", "application/pdf"]}
      sizeLimitConfig={{
        size: 5,
        sizeUnit: "MB",
        isActive: true,
        text: "Maximum file size is 5MB",
      }}
    />
  );
};
```

### 2. Image Gallery (Viewer Only)

```tsx
const ImageGallery = ({ images }: { images: UploadFile[] }) => {
  const [fileList, setFileList] = useState(images);

  return (
    <UploaderRefactored
      mode="viewer"
      fileList={fileList}
      setFileList={setFileList}
      imageGetterSource="gallery"
    />
  );
};
```

### 3. Avatar Uploader with Cropping

```tsx
const AvatarUploader = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <UploaderRefactored
      mode="uploader"
      fileList={fileList}
      setFileList={setFileList}
      imageSetter={setAvatarUrl}
      validFileFormats={["image/png", "image/jpeg"]}
      cropperConfig={{
        aspectRatio: 1, // Square crop
        circularCrop: true,
        minWidth: 100,
        maxWidth: 400,
      }}
      maxCount={1}
      uploaderText="Upload Avatar"
    />
  );
};
```

### 4. Custom Upload Handler

```tsx
const S3Uploader = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadToS3 = async ({ file, onProgress, onSuccess, onError }) => {
    try {
      // Custom S3 upload logic
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-to-s3", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onSuccess(result);
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <UploaderRefactored
      mode="uploader"
      fileList={fileList}
      setFileList={setFileList}
      handlers={{
        customRequest: uploadToS3,
        onUploadProgress: (progress, file) => {
          console.log(`${file.name}: ${progress}%`);
        },
        onUploadSuccess: (response, file) => {
          console.log(`${file.name} uploaded successfully:`, response);
        },
        onUploadError: (error, file) => {
          console.error(`${file.name} upload failed:`, error);
        },
      }}
    />
  );
};
```

### 5. Form Integration

```tsx
const FormWithUploader = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <Form form={form} layout="vertical">
      <UploaderRefactored
        mode="uploader"
        fileList={fileList}
        setFileList={setFileList}
        formItemProps={{
          name: "attachments",
          label: "Upload Documents",
          rules: [{ required: true, message: "Please upload at least one document" }],
          help: "Supported formats: PNG, JPG, PDF",
        }}
      />
    </Form>
  );
};
```

## Migration Guide

### From Original CustomUploader

#### Step 1: Use Compatibility Wrapper (Zero Breaking Changes)

```tsx
// Before
import CustomUploader from "./CustomUploader/CustomUploader";

// After (immediate compatibility)
import CustomUploader from "./CustomUploader/CustomUploader.compat";
```

#### Step 2: Migrate to New Component (Recommended)

```tsx
// Old props structure
<CustomUploader
  isReadOnly={false}
  UploadSizeLimitConfig={{ size: 2, sizeUnit: "MB" }}
  validFileFormat={["image/png"]}
  hasUploaderIcon={true}
  // ... many other props
/>

// New props structure
<UploaderRefactored
  mode="uploader"
  sizeLimitConfig={{ size: 2, sizeUnit: "MB" }}
  validFileFormats={["image/png"]}
  hasUploaderIcon={true}
  // Cleaner, more organized props
/>
```

## Accessibility Features

### ARIA Support

- All interactive elements have proper ARIA labels
- Upload status is announced to screen readers
- Error states are properly described
- Keyboard navigation fully supported

### Testing Accessibility

```tsx
// Manual testing checklist
// ✅ Tab navigation works through all interactive elements
// ✅ Screen reader announces file status changes
// ✅ Error messages are accessible via aria-describedby
// ✅ Upload button has descriptive aria-label
// ✅ Delete buttons have confirmation prompts
```

## Performance Optimizations

### Memoization

- Callbacks are memoized to prevent unnecessary re-renders
- File validation is cached
- Preview components only re-render when necessary

### Memory Management

- Automatic cleanup of blob URLs
- AbortController cancels requests on unmount
- File objects are properly dereferenced

### Recommended Limits

```tsx
// For optimal performance
const RECOMMENDED_LIMITS = {
  maxConcurrentUploads: 3,
  maxFileSize: 10, // MB
  maxTotalFiles: 20,
  chunkSize: 1024 * 1024, // 1MB chunks for large files
};
```

## Error Handling

### Built-in Validations

- File type validation with user-friendly messages
- File size validation with configurable limits
- Upload progress tracking with retry mechanisms
- Network error recovery

### Custom Error Handling

```tsx
<UploaderRefactored
  handlers={{
    onUploadError: (error, file) => {
      if (error.name === "NetworkError") {
        // Show retry option
        showRetryNotification(file);
      } else {
        // Show generic error
        showErrorMessage(error.message);
      }
    },
  }}
/>
```

## Browser Support

- **Modern Browsers**: Full support (Chrome 88+, Firefox 85+, Safari 14+)
- **File API**: Required for drag/drop and preview
- **Blob URLs**: Required for preview functionality
- **AbortController**: Required for upload cancellation

## Change Log

### v2.0.0 (Refactored)

- ✅ **ADDED**: TypeScript strict mode compliance
- ✅ **ADDED**: Memory leak prevention
- ✅ **ADDED**: Upload progress tracking
- ✅ **ADDED**: Retry mechanisms
- ✅ **ADDED**: Accessibility improvements
- ✅ **ADDED**: Imperative API methods
- ✅ **IMPROVED**: Error handling and validation
- ✅ **IMPROVED**: Performance optimizations
- ✅ **IMPROVED**: Props organization and clarity
- 🔄 **MAINTAINED**: Full backward compatibility via wrapper

### Risk Assessment

- **LOW RISK**: Props mapping and basic functionality
- **LOW RISK**: Form integration and validation
- **MEDIUM RISK**: Complex cropping workflows (test thoroughly)
- **LOW RISK**: Memory management and cleanup
