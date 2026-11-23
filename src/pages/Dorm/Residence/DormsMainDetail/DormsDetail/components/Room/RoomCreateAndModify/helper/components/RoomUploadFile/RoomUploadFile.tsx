import { Col, Row } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
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
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import { RoomUploadFileProps } from "./@types/@roomUploadFile";

const BRANCH_CODE_ERROR_MSG = "شناسه واحد دانشگاهی صحیح نمی باشد.";

const RoomUploadFile = ({
  firstImageList,
  secondImageList,
  thirdImageList,
  fourthImageList,
  setFirstImageList,
  setSecondImageList,
  setThirdImageList,
  setFourthImageList,
  setFirstImageName,
  setSecondImageName,
  setThirdImageName,
  setFourthImageName,
}: RoomUploadFileProps) => {
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
      // .then((response) => onUploadFileSuccess({ response, setImage }))
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
    <Row>
      <Col>
        <CustomUploader
          fileList={firstImageList}
          setFileList={setFirstImageList}
          isReadOnly={false}
          uploaderText={
            <div className="room-image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
              <div className="upload-text-main">تصویر اول (حداکثر 2 مگابایت)</div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          // isDataLoading={isUploadFileLoading}
          // isDisabled={mainImageList?.length >= 1}
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
      <Col>
        <CustomUploader
          fileList={secondImageList}
          setFileList={setSecondImageList}
          isReadOnly={false}
          uploaderText={
            <div className="room-image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
              <div className="upload-text-main">تصویر دوم (حداکثر 2 مگابایت)</div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          // isDataLoading={isUploadFileLoading}
          // isDisabled={mainImageList?.length >= 1}
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
        />
      </Col>
      <Col>
        <CustomUploader
          fileList={thirdImageList}
          setFileList={setThirdImageList}
          isReadOnly={false}
          uploaderText={
            <div className="room-image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
              <div className="upload-text-main">تصویر سوم (حداکثر 2 مگابایت)</div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          // isDataLoading={isUploadFileLoading}
          // isDisabled={mainImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="thirdImage"
          imageGetterSource="dorm"
          isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
          isDisabled={thirdImageList?.length >= 1}
          imageSetter={setThirdImageName}
          onChange={(e: any) =>
            onUploadFileChange(e, setThirdImageName, setThirdImageList)
          }
        />
      </Col>
      <Col>
        <CustomUploader
          fileList={fourthImageList}
          setFileList={setFourthImageList}
          isReadOnly={false}
          uploaderText={
            <div className="room-image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
              <div className="upload-text-main">تصویر چهارم (حداکثر 2 مگابایت)</div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          // isDataLoading={isUploadFileLoading}
          // isDisabled={mainImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="fourthImage"
          imageGetterSource="dorm"
          isDataLoading={isUploadFileLoading || isCreateUploadFileLoading}
          isDisabled={fourthImageList?.length >= 1}
          imageSetter={setFourthImageName}
          onChange={(e: any) =>
            onUploadFileChange(e, setFourthImageName, setFourthImageList)
          }
        />
      </Col>
    </Row>
  );
};

export default RoomUploadFile;
