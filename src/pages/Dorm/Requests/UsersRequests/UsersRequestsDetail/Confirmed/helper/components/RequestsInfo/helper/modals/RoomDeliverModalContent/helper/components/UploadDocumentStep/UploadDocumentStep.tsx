import { Col, Row } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import {
  fileDirCreator,
  fileNameCreator,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import useBranchCode from "@infra/hooks/useBranchCode/useBranchCode";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  DormCreateUploadFileResponse,
  useDormCreateUploadFileMutation,
  useDormUploadFileMutation,
} from "@infra/states/redux/Apis/dorm/basicInfo/dormBasicInfo";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import { UploadDocumentStepProps } from "./@types/@uploadDocumentStep";

const BRANCH_CODE_ERROR_MSG = "شناسه واحد دانشگاهی صحیح نمی باشد.";

const UploadDocumentStep = ({
  setFirstImageName,
  setSecondImageName,
  firstImageList,
  setFirstImageList,
  secondImageList,
  setSecondImageList,
}: UploadDocumentStepProps) => {
  const { branchCode } = useBranchCode();

  //? ================================  Api Calls ================================
  // UPLOAD FILE
  const [uploadFile, { isLoading: isUploadFileLoading }] = useDormUploadFileMutation();
  const [createUploadFile, { isLoading: isCreateUploadFileLoading }] =
    useDormCreateUploadFileMutation();

  //* ================================ Util Functions ================================

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => {
    if (!branchCode) {
      return toast.error(BRANCH_CODE_ERROR_MSG, { toastId: BRANCH_CODE_ERROR_MSG });
    }

    const formData = new FormData();
    formData.append("dir", fileDirCreator());
    formData.append("name", fileNameCreator() + `.${image?.file?.name?.split(".")[1]}`);
    formData.append("file", image?.file as any);
    const isFileFormatCorrect = isImageFormatValid({ fileFormat: image?.file?.type });
    if (!isFileFormatCorrect) {
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: image?.file?.size });
    if (!isUploadable) {
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }

    uploadFile(formData)
      .unwrap()
      .then((response) => {
        createUploadFile({
          table: "UploadFile",
          data: {
            ...response,
            baseUrl: import.meta.env.VITE_API_BPMS_UPLOAD_URL,
            tenant_id: branchCode?.toString(),
          },
        })
          .unwrap()
          .then((res) => {
            onUploadFileSuccess({ response: res, setImage });
          });
      })
      .catch(() => {
        console.error("error");
        imageListSetter?.([]);
        setImage("");
      });
  };
  // ON UPLOAD SUCCESS
  const onUploadFileSuccess = ({
    setImage,
    response,
  }: {
    setImage: React.Dispatch<React.SetStateAction<string>>;
    response: DormCreateUploadFileResponse;
  }) => {
    setImage(response?.id?.toString());
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="upload-document">
      <CustomAlert
        message="راهنما!"
        description="فرم‌های خواسته شده را اسکن نموده و بارگذاری نمایید."
        closable
      />
      <Row>
        <Col span={12}>
          <CustomUploader
            fileList={firstImageList}
            setFileList={setFirstImageList}
            isReadOnly={false}
            uploaderText={
              <div className="image-attachment-container">
                <div className="upload-logo-main">
                  <AiOutlinePlus />
                </div>
                <div className="upload-text-main">
                  فرم شماره 2 (فرم اطلاعات بستگان نسبی)
                </div>
              </div>
            }
            hasUploaderIcon={false}
            maxCount={1}
            UploadSizeLimitConfig={{
              isActive: true,
              text: "حداکثر 2 مگابایت",
              size: 2,
            }}
            validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
            name="firstImage"
            imageGetterSource="dorm"
            isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
            isDisabled={firstImageList?.length >= 1}
            imageSetter={setFirstImageName}
            onChange={(e: any) =>
              onUploadFileChange(e, setFirstImageName, setFirstImageList)
            }
          />
        </Col>
        <Col span={12}>
          <CustomUploader
            fileList={secondImageList}
            setFileList={setSecondImageList}
            isReadOnly={false}
            uploaderText={
              <div className="image-attachment-container">
                <div className="upload-logo-main">
                  <AiOutlinePlus />
                </div>
                <div className="upload-text-main">فرم شماره 3 ( فرم پزشک معتمد )</div>
              </div>
            }
            hasUploaderIcon={false}
            maxCount={1}
            UploadSizeLimitConfig={{
              isActive: true,
              text: "حداکثر 1 مگابایت",
              size: 1,
            }}
            validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
            name="secondImage"
            imageGetterSource="dorm"
            isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
            isDisabled={secondImageList?.length >= 1}
            imageSetter={setSecondImageName}
            onChange={(e: any) =>
              onUploadFileChange(e, setSecondImageName, setSecondImageList)
            }
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UploadDocumentStep;
