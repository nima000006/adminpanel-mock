import { useState } from "react";

import { Col, Form, Row } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomUploader } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useAuthRequestPositionUploadFileMutation,
  useDeleteUploadFileMutation,
} from "@infra/states/redux/Apis/auth/signInApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  AuthRequestPositionUploadFileResponse,
  UploadDocStepProps,
} from "@pages/Auth/SignIn/FifthPage/helper/drawer/RequestRoleDrawerContent/helper/modals/SubmitRequestModalContent/helper/steps/UploadDocStep/@types/@uploadDocStepTypes";

import "./_uploadDocStep.scss";

const UploadDocStep = ({
  setFirstImageName,
  setSecondImageName,
  firstImageList,
  setFirstImageList,
  secondImageList,
  setSecondImageList,
  firstStepId,
  submitSecondStepForm,
  firstImageName,
  secondImageName,
}: UploadDocStepProps) => {
  const [firstUploadFileId, setFirstUploadFileId] = useState<number>(+firstImageName);
  const [secondUploadFileId, setSecondUploadFileId] = useState<number>(+secondImageName);

  const UPLOAD_SUCCESS_MSG = "با موفقیت اپلود شد.";

  //? ================================  Api Calls ================================
  // upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useAuthRequestPositionUploadFileMutation();

  // delete upload file
  const [deleteUploadFile] = useDeleteUploadFileMutation();

  //* ================================ Util Functions ================================
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => {
    const formData = new FormData();
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

    uploadFile({ formData, id: firstStepId ?? -1 })
      .unwrap()
      .then((res: AuthRequestPositionUploadFileResponse) => {
        if (imageListSetter === setFirstImageList) {
          setFirstUploadFileId(res.id);
        }

        if (imageListSetter === setSecondImageList) {
          setSecondUploadFileId(res.id);
        }

        return toast.success(UPLOAD_SUCCESS_MSG, { toastId: UPLOAD_SUCCESS_MSG });
      })
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form form={submitSecondStepForm} className="flex flex-col gap-4">
      <CustomAlert
        type="info"
        title="مدارک مورد نیاز"
        description="حکم کارگزینی و تصویر قرارداد خود را بارگذاری نمایید."
        showIcon
      />

      <Div loading={isUploadFileLoading}>
        <Row gutter={[16, 16]} className="uploader-wrapper">
          <Col>
            <CustomUploader
              fileList={firstImageList}
              setFileList={setFirstImageList}
              isReadOnly={false}
              uploaderText={
                <div className="image-attachment-container">
                  <div className="upload-logo-main">
                    <AiOutlinePlus />
                  </div>
                  <div className="upload-text-main">بارگذاری</div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={firstImageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 2 مگابایت",
                size: 2,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="firstImage"
              imageSetter={setFirstImageName}
              onChange={(e: any) =>
                onUploadFileChange(e, setFirstImageName, setFirstImageList)
              }
              hasVerticalLabel={true}
              label="بارگذاری تصویر حکم"
              imageGetterSource="dorm"
              rules={[
                () => ({
                  validator() {
                    if (!firstImageName) {
                      return Promise.reject(
                        new Error("لطفا تصویر حکم را انتخاب فرمائید")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
              onDeleteFile={() => {
                if (firstStepId && firstUploadFileId) {
                  deleteUploadFile({
                    requestEmployeeId: firstStepId,
                    uploadFileId: firstUploadFileId,
                  });
                }
              }}
            />
          </Col>
          <Col>
            <CustomUploader
              className="m-4!"
              fileList={secondImageList}
              setFileList={setSecondImageList}
              isReadOnly={false}
              label="بارگذاری تصویر قرارداد"
              hasVerticalLabel={true}
              uploaderText={
                <div className="image-attachment-container">
                  <div className="upload-logo-main">
                    <AiOutlinePlus />
                  </div>
                  <div className="upload-text-main">بارگذاری</div>
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
              isDataLoading={isUploadFileLoading}
              isDisabled={secondImageList?.length >= 1}
              imageSetter={setSecondImageName}
              onChange={(e: any) =>
                onUploadFileChange(e, setSecondImageName, setSecondImageList)
              }
              rules={[
                () => ({
                  validator() {
                    if (!secondImageName) {
                      return Promise.reject(
                        new Error("لطفا تصویر قرارداد را انتخاب فرمائید")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
              onDeleteFile={() => {
                if (firstStepId && secondUploadFileId) {
                  deleteUploadFile({
                    requestEmployeeId: firstStepId,
                    uploadFileId: secondUploadFileId,
                  });
                }
              }}
            />
          </Col>
        </Row>
      </Div>
    </Form>
  );
};
export default UploadDocStep;
