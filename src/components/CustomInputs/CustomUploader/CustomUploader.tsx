import React, { memo, ReactNode, useState } from "react";

import { Button, ColProps, Form, Upload, UploadFile } from "antd";
import { Rule } from "antd/es/form";
import { FeedbackIcons } from "antd/es/form/FormItem";
import { FormLabelAlign, NamePath, Store } from "antd/es/form/interface";
import { RcFile } from "antd/es/upload";
import { ItemRender, UploadChangeParam } from "antd/es/upload/interface";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import { PercentCrop, PixelCrop, ReactCropState } from "react-image-crop";
import { toast } from "react-toastify";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { imageCropperType } from "@components/Renderers/ImageCropperModal/@types/@imageCropperModal";
import ImageCropperModal from "@components/Renderers/ImageCropperModal/ImageCropperModal";
import { getFileType } from "@infra/helpers/utils";
import {
  ARE_YOU_SURE_TO_DELETE,
  FILE_COUNT_EXCEED_ERROR,
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import ImagePreview, { RawUploadFileType } from "./imageUtils/imageUtils";
import selfDefaultAvatar from "../../../assets/images/selfDefaultAvatar.webp";
import { ShouldUpdate } from "../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import { resolveFormFieldHtmlFor } from "../../../infrastructure/helpers/utils/formUtils";
import { BPMSUploadReturnType } from "../../../pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/@types/@newRulesAndLaws";
import ConfirmationModalWithContent from "../../Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import Div from "../../Renderers/Div/Div";

import "./_customUploader.scss";

type FileType = {
  uid: string;
  name: string;
  status: string;
  url: string;
  extension: string;
  relativeUrl: string;
};

type CustomUploaderProps = React.ComponentProps<typeof Upload> & {
  imageSetter?: React.Dispatch<React.SetStateAction<string>>;
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  fileList: UploadFile<any>[];
  isDisabled?: boolean;
  isUploadFileLoading?: boolean;
  isDataLoading?: boolean;
  isReadOnly?: boolean;
  imageGetterSource?: string;
  uploaderText?: React.ReactNode;
  classNameOuterDiv?: string;
  validFileFormat?: string[];
  UploadSizeLimitConfig?: {
    size?: number;
    text?: string;
    isActive?: boolean;
    sizeUnit?: "MB" | "KB";
  };
  alreadyUploaded?: {
    count: number;
    data: BPMSUploadReturnType[];
  };
  setAlreadyUploaded?: React.Dispatch<
    React.SetStateAction<{
      count: number;
      data: BPMSUploadReturnType[];
    }>
  >;

  //
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void;

  //Form Item props
  rules?: Rule[];
  label?: React.ReactNode;
  help?: React.ReactNode;
  colon?: boolean;
  multiple?: boolean;
  hasNullText?: boolean;
  hasUploaderIcon?: boolean;
  valuePropName?: string;
  /** Supports nested paths — e.g. `[field.name, "attachment"]` inside `Form.List` */
  name?: NamePath;
  className?: string;
  dependencies?: NamePath[];
  validateStatus?: "" | "success" | "warning" | "error" | "validating" | undefined;
  validateFirst?: boolean | "parallel" | undefined;
  validateDebounce?: number | undefined;
  trigger?: string | undefined;
  validateTrigger?: string | false | string[] | undefined;
  tooltip?: string;
  shouldUpdate?: ShouldUpdate<any>;
  required?: boolean;
  preserve?: boolean;
  noStyle?: boolean;
  hidden?: boolean;
  normalize?: ((value: any, prevValue: any, allValues: Store) => any) | undefined;
  messageVariables?: Record<string, string>;
  labelCol?: ColProps;
  labelAlign?: FormLabelAlign;
  initialValue?: any;
  hasFeedback?:
    | boolean
    | {
        icons: FeedbackIcons;
      };
  getValueProps?: (value: any) => Record<string, unknown>;
  getValueFromEvent?: (...args: any) => any;
  extra?: ReactNode;
  //
  locked?: boolean;
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  keepSelection?: boolean;
  isCropperDisabled?: boolean;
  cropperClassName?: string;
  style?: React.CSSProperties;
  onComplete?: (crop: PixelCrop, percentCrop: PercentCrop) => void;
  onDragStart?: (e: PointerEvent) => void;
  onDragEnd?: (e: PointerEvent) => void;
  renderSelectionAddon?: (state: ReactCropState) => React.ReactNode;
  ruleOfThirds?: boolean;
  circularCrop?: boolean;
  hasVerticalLabel?: boolean;
  onDeleteFile?: () => void;
};
type DeleteConfirmModalProps = {
  isOpen: boolean;
  fileInfo: Partial<FileType>;
};
const CustomUploader = ({
  multiple = false,
  imageSetter,
  fileList,
  setFileList,
  isUploadFileLoading,
  isDataLoading,
  uploaderText = "بارگذاری اسناد",
  isReadOnly = true,
  hasUploaderIcon = true,
  setAlreadyUploaded,
  alreadyUploaded,
  isDisabled,
  UploadSizeLimitConfig = {
    size: 2,
    text: "مجموع حجم فایل ها کمتر از دو مگابایت باشد",
    isActive: true,
    sizeUnit: "MB",
  },
  validFileFormat = ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
  hasNullText = false,
  classNameOuterDiv,
  //Form Item props
  name,
  rules,
  label,
  colon = false,
  dependencies,
  valuePropName,
  validateStatus,
  validateFirst = false,
  validateDebounce,
  trigger,
  validateTrigger,
  tooltip,
  shouldUpdate = false,
  imageGetterSource = "committee",
  // required = false,
  preserve = true,
  noStyle = false,
  normalize,
  messageVariables,
  labelCol,
  labelAlign = "right",
  initialValue,
  hidden = false,
  help,
  getValueProps,
  hasFeedback = false,
  getValueFromEvent,
  className,
  extra,
  onChange,
  aspectRatio,
  circularCrop,
  isCropperDisabled,
  keepSelection,
  locked,
  maxHeight,
  onComplete,
  maxWidth,
  ruleOfThirds,
  renderSelectionAddon,
  cropperClassName,
  hasVerticalLabel = false,
  onDeleteFile,
  maxCount,
  ...props
}: CustomUploaderProps) => {
  const [imageCropperInfo, setImageCropperInfo] = useState<imageCropperType>({
    isOpen: false,
    data: { src: "" },
  });
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<DeleteConfirmModalProps>({
    isOpen: false,
    fileInfo: {},
  });

  //! وقتی روی ایکون حذف کلیک می شود
  const onDeleteButtonClickHandler = (data: UploadFile<FileType>) => {
    setDeleteConfirmModal?.({
      isOpen: true,
      fileInfo: data,
    });
  };

  //!  دکمه تایید  حذف
  const onConfirmDelete = (
    file: Partial<{
      uid: string;
      name: string;
      status: any;
      url: string;
      extension: string;
      relativeUrl: string;
    }>
  ) => {
    imageSetter?.("");

    const index = fileList.indexOf(file as any);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    const newUploadedFiles = alreadyUploaded?.data?.filter(
      (item) => item?.originalName !== file?.name
    );

    if (newUploadedFiles) {
      setAlreadyUploaded?.({ data: newUploadedFiles, count: newUploadedFiles?.length });
    }
    setDeleteConfirmModal?.({
      isOpen: false,
      fileInfo: {},
    });

    if (onDeleteFile) {
      onDeleteFile();
    }
  };

  //! onRemove
  const onRemove = (file: UploadFile<any>) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const isPdfFile = (file: RcFile) =>
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  //! beforeUpload
  const beforeUpload = (
    file: RcFile
    /* FileList: RcFile[]*/
  ) => {
    const isPdf = isPdfFile(file);
    const isValidFormat =
      validFileFormat.some((item) => item === file?.type) ||
      (isPdf && validFileFormat.includes("application/pdf"));

    // developer should enter the uploadLimitConfig.size to this feature gets implemented
    const isSizeValid =
      UploadSizeLimitConfig?.isActive &&
      file?.size &&
      UploadSizeLimitConfig?.size &&
      file?.size / 1024 / 1024 < (UploadSizeLimitConfig?.size ?? 1);

    if (!isValidFormat) {
      toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
      return false;
    }
    if (isSizeValid === false) {
      toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
      return false;
    }

    // PDFs skip the image cropper and are added directly to the file list
    if (isPdf) {
      if (maxCount && fileList.length >= maxCount) {
        toast.error(FILE_COUNT_EXCEED_ERROR, {
          toastId: FILE_COUNT_EXCEED_ERROR,
        });
        return false;
      }

      if (fileList.some((existing) => existing.uid === file.uid)) {
        return false;
      }

      const uploadFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        type: file.type || "application/pdf",
        size: file.size,
        originFileObj: file,
      };

      onChange?.({
        file: uploadFile,
        fileList: multiple ? [...fileList, uploadFile] : [uploadFile],
      });

      setFileList((prev) => {
        if (maxCount && prev.length >= maxCount) {
          return prev;
        }
        if (prev.some((existing) => existing.uid === file.uid)) {
          return prev;
        }
        return multiple ? [...prev, uploadFile] : [uploadFile];
      });

      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageCropperInfo({
        isOpen: true,
        data: { src: e?.target?.result as string | undefined },
      });
    };
    reader.readAsDataURL(file);

    // if return true it will upload file automatically
    return false;
  };

  //! itemRender
  const itemRender: ItemRender<any> = (_: any, file: UploadFile<FileType>) => {
    return (
      <div className="item-render-main">
        <Button
          // onClick={() => file?.relativeUrl && onImageClickHandler(file)}
          loading={isDownloadLinkLoading}
          className="download-btn-container"
          style={{ height: isReadOnly ? "92px" : "125px" }}
          // disabled={!file?.relativeUrl}
        >
          {/* //! rendered the delete btn or not */}
          {!isReadOnly /*&& file?.relativeUrl*/ && (
            <span
              className="delete-file-container"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteButtonClickHandler(file);
              }}
            >
              <CustomTooltip title="برای حذف فایل رو آیکون کلیک کنید">
                <AiOutlineDelete className="file-delete-icon" />
              </CustomTooltip>
            </span>
          )}

          {/* //! image itself */}
          <span>
            <ImagePreview
              data={file as FileType & RawUploadFileType}
              setIsDownloadLinkLoading={setIsDownloadLinkLoading}
              isAbsolute={file?.name?.startsWith("http")}
              isBase64={file?.url?.includes(";base64")}
              uploaderText={uploaderText}
              imageGetterSource={imageGetterSource}
            />
          </span>
        </Button>
      </div>
    );
  };

  // old CROP CONFIRM
  // const onCropConfirm = async (croppedImageUrl?: string) => {
  //   if (croppedImageUrl) {
  //     const fileType = getFileType(croppedImageUrl) ?? "";
  //     const extension = fileType.split("/")[1] ?? "";
  //     const uid = Date.now().toString();
  //     console.log({ croppedImageUrl });

  //     // Convert base64 URL to a Blob
  //     const base64Response = await fetch(croppedImageUrl);
  //     const blob = await base64Response.blob();

  //     // Create a real File instance from the Blob
  //     const croppedFile: File = new File([blob], `cropped-${uid}.${extension}`, {
  //       type: fileType,
  //     });

  //     const uploadFile: UploadFile = {
  //       uid: uid,
  //       name: croppedFile.name,
  //       status: "done",
  //       url: croppedImageUrl,
  //       type: croppedFile.type,
  //       size: croppedFile.size,
  //       originFileObj: {
  //         ...croppedFile,
  //         lastModifiedDate: new Date(),
  //         uid: uid,
  //       },
  //     };

  //     onChange?.({
  //       file: croppedFile as any,
  //       fileList: [...fileList, uploadFile], // uploadFile should get switched with cropped file if it has issues in Bpms
  //     });

  //     setFileList((prevFileList) => [...prevFileList, uploadFile]);

  //     if (imageSetter) {
  //       imageSetter(croppedImageUrl);
  //     }
  //   }
  // };

  const onCropConfirm = (croppedImageUrl?: string) => {
    if (croppedImageUrl) {
      const fileType = getFileType(croppedImageUrl) ?? "image/jpeg"; // Default to JPEG if no type is detected
      const extension = fileType.split("/")[1] ?? "jpeg";
      const uid = Date.now().toString();

      // Remove base64 metadata prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = croppedImageUrl.split(",")[1];

      // Convert base64 string to binary data
      const byteString = atob(base64Data);
      const byteNumbers = new Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
      }

      // Create Uint8Array and File instance
      const byteArray = new Uint8Array(byteNumbers);
      const croppedFile: File = new File([byteArray], `cropped-${uid}.${extension}`, {
        type: fileType,
      });

      const uploadFile: UploadFile = {
        uid: uid,
        name: croppedFile.name,
        status: "done",
        url: croppedImageUrl,
        type: croppedFile.type,
        size: croppedFile.size,
        originFileObj: {
          ...croppedFile,
          lastModifiedDate: new Date(),
          uid: uid,
        },
      };

      onChange?.({
        file: croppedFile as any,
        fileList: [...fileList, uploadFile],
      });

      setFileList((prevFileList) => [...prevFileList, uploadFile]);

      if (imageSetter) {
        imageSetter(croppedImageUrl);
      }
    }
  };

  return (
    <>
      <ImageCropperModal
        imageCropperInfo={imageCropperInfo}
        setImageCropperInfo={setImageCropperInfo}
        onCropConfirm={onCropConfirm}
        aspectRatio={aspectRatio}
        circularCrop={circularCrop}
        disabled={isCropperDisabled}
        keepSelection={keepSelection}
        locked={locked}
        maxHeight={maxHeight}
        onComplete={onComplete}
        maxWidth={maxWidth}
        ruleOfThirds={ruleOfThirds}
        renderSelectionAddon={renderSelectionAddon}
        className={cropperClassName}
      />
      {deleteConfirmModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <div className="delete-image-modal-text">{ARE_YOU_SURE_TO_DELETE}</div>
          }
          isModalOpen={deleteConfirmModal?.isOpen}
          isDangerous={true}
          closeModalHandler={() =>
            setDeleteConfirmModal?.({ isOpen: false, fileInfo: {} })
          }
          backBtnText="خیر"
          confirmBtnText="تایید"
          onConfirmClickHandler={() => onConfirmDelete(deleteConfirmModal?.fileInfo)}
          showIcon={false}
        />
      )}

      <Div
        loading={isDataLoading}
        className={`main-uploader-container ${classNameOuterDiv}`}
        customHeight="100px"
      >
        <Form.Item
          label={label}
          htmlFor={name ? resolveFormFieldHtmlFor(name) : undefined}
          name={name}
          className={`${hasVerticalLabel && "vertical-label"} ${className ? className : ""}`}
          rules={rules}
          colon={colon}
          dependencies={dependencies}
          valuePropName={valuePropName}
          validateStatus={validateStatus}
          validateFirst={validateFirst}
          validateDebounce={validateDebounce}
          trigger={trigger}
          validateTrigger={validateTrigger}
          tooltip={tooltip}
          shouldUpdate={shouldUpdate}
          // required={required}
          preserve={preserve}
          noStyle={noStyle}
          normalize={normalize}
          messageVariables={messageVariables}
          labelCol={labelCol}
          labelAlign={labelAlign}
          initialValue={initialValue}
          hidden={hidden}
          help={help}
          hasFeedback={hasFeedback}
          getValueProps={getValueProps}
          extra={extra}
          getValueFromEvent={getValueFromEvent}
        >
          <Upload
            className="upload-container"
            listType="picture"
            multiple={multiple}
            fileList={fileList}
            itemRender={itemRender}
            beforeUpload={beforeUpload}
            onRemove={onRemove}
            onChange={(e) => {
              // Images still go through cropper via beforeUpload; skip re-entry for PDFs already added
              if (isPdfFile(e?.file as RcFile)) {
                return;
              }
              beforeUpload?.(e?.file as RcFile);
            }}
            // disabled={!fileList?.length}
            maxCount={maxCount}
            {...props}
          >
            {!isReadOnly && !isDisabled && (
              <CustomTooltip title={UploadSizeLimitConfig?.text}>
                <Button
                  icon={hasUploaderIcon ? <AiOutlineUpload /> : null}
                  className="custom-upload-btn"
                  disabled={
                    UploadSizeLimitConfig?.isActive
                      ? fileList.reduce(
                          (acc, item) => (item?.size ? acc + item.size : 0),
                          0
                        ) >
                        (UploadSizeLimitConfig?.size ?? 2) *
                          (UploadSizeLimitConfig?.sizeUnit === "MB" ? 1000000 : 1000)
                      : false
                  }
                  loading={isUploadFileLoading}
                >
                  <span className="uploader-btn-text">{uploaderText}</span>
                  {/* <span className="upload-traffic-limitation">
                    {UploadSizeLimitConfig?.text}
                  </span> */}
                </Button>
              </CustomTooltip>
            )}
            <div
              className="no-file-text"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {hasNullText && !fileList?.length ? (
                <CustomTooltip title={uploaderText}>
                  <img src={selfDefaultAvatar} alt="عکس پیش فرض" width={90} height={90} />
                </CustomTooltip>
              ) : null}
            </div>
          </Upload>
        </Form.Item>
      </Div>
    </>
  );
};

export default memo(CustomUploader);
