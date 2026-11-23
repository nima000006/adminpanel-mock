import React, { useState, forwardRef, useEffect } from "react";

import { CloudUploadOutlined } from "@ant-design/icons";
import { Upload, Form, Modal, UploadProps, FormItemProps } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

import { imageCropperType } from "../../Renderers/ImageCropperModal/@types/@imageCropperModal";
import ImageCropperModal from "../../Renderers/ImageCropperModal/ImageCropperModal";
import "./_customNewUploader.scss";

// Utility types to extract props
type AntUploadProps = UploadProps;
type AntFormItemProps = FormItemProps;

export interface CustomNewUploaderProps extends Omit<AntUploadProps, "onChange"> {
  /** Supports nested paths — e.g. `[field.name, "file"]` inside `Form.List` */
  name: NamePath;
  label?: React.ReactNode;
  rules?: Rule[];
  dependencies?: AntFormItemProps["dependencies"];
  initialValue?: any;
  valuePropName?: string; // Default: 'fileList'
  labelCol?: AntFormItemProps["labelCol"];
  wrapperCol?: AntFormItemProps["wrapperCol"];
  help?: AntFormItemProps["help"];
  extra?: AntFormItemProps["extra"];
  validateStatus?: AntFormItemProps["validateStatus"];
  hasFeedback?: AntFormItemProps["hasFeedback"];
  required?: boolean;
  noStyle?: boolean;

  validFileFormat?: string[];
  maxFileSize?: number; // in MB
  // Custom Props
  cropAspect?: number;
  cropShape?: "rect" | "round"; // 'round' for circular crop
  isCropperEnabled?: boolean;

  // To handle the "value" coming from Form
  value?: UploadFile[];
  onChange?: (info: UploadChangeParam<UploadFile> | UploadFile[]) => void;

  // Custom text for upload button
  uploadText?: React.ReactNode;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CustomNewUploader = forwardRef<any, CustomNewUploaderProps>(
  (
    {
      // Form Props
      name,
      label,
      rules,
      dependencies,
      initialValue,
      valuePropName = "fileList",
      labelCol,
      wrapperCol,
      help,
      extra,
      validateStatus,
      hasFeedback,
      required,
      noStyle,

      // Upload Props
      value,
      onChange,
      fileList, // handled by Form via value
      validFileFormat,
      maxFileSize,
      beforeUpload,

      // Custom Props
      cropAspect,
      cropShape = "rect",
      isCropperEnabled = false,
      uploadText = "Upload",
      ...uploadProps
    },
    ref
  ) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // Cropper State
    const [cropperInfo, setCropperInfo] = useState<imageCropperType>({
      isOpen: false,
      data: { src: "" },
    });
    const [resolveCrop, setResolveCrop] = useState<((file: RcFile) => void) | null>(null);
    const [rejectCrop, setRejectCrop] = useState<((reason?: any) => void) | null>(null);

    const handleCancelPreview = () => setPreviewOpen(false);

    // Watch for modal close to reject the promise if not confirmed
    useEffect(() => {
      if (!cropperInfo.isOpen && rejectCrop) {
        rejectCrop("Crop cancelled");
        setRejectCrop(null);
        setResolveCrop(null);
      }
    }, [cropperInfo.isOpen, rejectCrop]);

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    /**
      // Validation
      if (validFileFormat && validFileFormat.length > 0) {
        if (!validFileFormat.includes(file.type)) {
          toast.error(FILE_TYPE_NOT_SUPPORTED);
          return Upload.LIST_IGNORE;
        }
      }

      if (maxFileSize) {
        const isLt = file.size / 1024 / 1024 < maxFileSize;
        if (!isLt) {
          toast.error(SIZE_EXCEED_ERROR);
          return Upload.LIST_IGNORE;
        }
      }
rform cropping.
     * Returns a Promise that resolves with the CROPPED file, or rejects to cancel upload.
     */
    const handleBeforeUpload = (file: RcFile, FileList: RcFile[]) => {
      if (!isCropperEnabled) {
        return beforeUpload ? beforeUpload(file, FileList) : true;
      }

      // Check if it's an image
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        return beforeUpload ? beforeUpload(file, FileList) : true;
      }

      return new Promise<RcFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setCropperInfo({
            isOpen: true,
            data: { src: reader.result as string },
          });
          setResolveCrop(() => resolve);
          setRejectCrop(() => reject);
        });
        reader.readAsDataURL(file);
      });
    };

    const handleCropConfirm = async (blob: Blob) => {
      if (!resolveCrop) return;

      // Convert Blob to RcFile (File)
      const fileName = "cropped-image.png"; // You might want dynamic names
      const croppedFile = new File([blob], fileName, { type: "image/png" }) as RcFile;
      // croppedFile.uid = Date.now().toString(); // Antd will assign uid if missing

      resolveCrop(croppedFile);

      // Important: Clear reject first so the effect doesn't trigger
      setRejectCrop(null);
      setResolveCrop(null);

      // Reset
      setCropperInfo((prev) => ({ ...prev, isOpen: false }));
    };

    const normalizeFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    return (
      <>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          dependencies={dependencies}
          initialValue={initialValue}
          valuePropName={valuePropName}
          getValueFromEvent={normalizeFile}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          help={help}
          extra={extra}
          validateStatus={validateStatus}
          hasFeedback={hasFeedback}
          required={required}
          noStyle={noStyle}
        >
          <Upload
            ref={ref}
            listType="picture-card"
            onPreview={handlePreview}
            beforeUpload={handleBeforeUpload}
            fileList={value || fileList}
            onChange={onChange as any} // Antd Form passes 'value' and 'onChange', we map them
            {...uploadProps}
          >
            {(value?.length || 0) >= (uploadProps.maxCount || Infinity) ? null : (
              <div style={{ marginTop: 8 }}>
                <CloudUploadOutlined />
                <div style={{ marginTop: 8 }}>{uploadText}</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}
          zIndex={1200}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        {isCropperEnabled && (
          <ImageCropperModal
            imageCropperInfo={cropperInfo}
            setImageCropperInfo={setCropperInfo}
            onCropConfirm={handleCropConfirm}
            aspectRatio={cropAspect}
            circularCrop={cropShape === "round"}
            title="Crop Image"
          />
        )}
      </>
    );
  }
);

export default CustomNewUploader;
