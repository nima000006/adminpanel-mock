import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useBusinessUploadFileMutation } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  BusinessOnUploadFileSuccess,
  DescAndDocumentsSectionProps,
} from "./@types/@descAndDocumentsSection";

import "./_descAndDocumentsSection.scss";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  LICENSE_DOCUMENT,
  NEWSPAPER_DOCUMENT,
  SegmentMode,
} from "../../../../utils/createBusinessUtils";

const DescAndDocumentsSection = ({
  form,
  view,
  setMainImageName,
  setSecondImageName,
  setThirdImageName,
  setFourthImageName,
  setFifthImageName,
  mainImageList,
  setMainImageList,
  secondImageList,
  setSecondImageList,
  thirdImageList,
  setThirdImageList,
  fourthImageList,
  setFourthImageList,
  fifthImageList,
  setFifthImageList,
}: DescAndDocumentsSectionProps) => {
  //upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useBusinessUploadFileMutation();

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: BusinessOnUploadFileSuccess) => {
    setImage(response?.fileId?.toString());
  };

  // onUploadFileChange
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
    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        imageListSetter?.([]);
        // setImage("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text="توضیحات و مستندات" />
      <Form form={form} className="desc-documents-section-container">
        <div className="attach-file">
          <CustomUploader
            fileList={mainImageList}
            setFileList={setMainImageList}
            label={view === SegmentMode.legal ? "مستندات روزنامه رسمی" : "مستندات مجوز"}
            tooltip={view === SegmentMode.legal ? NEWSPAPER_DOCUMENT : LICENSE_DOCUMENT}
            hasVerticalLabel={true}
            isReadOnly={false}
            rules={[REQUIRED_RULE]}
            name="mainImage"
            maxCount={1}
            isDataLoading={isUploadFileLoading}
            imageSetter={setMainImageName}
            isDisabled={mainImageList?.length >= 1}
            hasUploaderIcon={false}
            onChange={(e: any) =>
              onUploadFileChange(e, setMainImageName, setMainImageList)
            }
            uploaderText={
              <div className="all-self-upload-text-container">
                <div className="upload-text">با کلیک کردن فایل خود را بارگذاری کنید.</div>
                <div className="upload-logo">
                  <AiOutlinePlus />
                </div>
              </div>
            }
          />

          <CustomUploader
            fileList={secondImageList}
            setFileList={setSecondImageList}
            label={view === SegmentMode.legal ? "مستندات روزنامه رسمی" : "مستندات مجوز"}
            tooltip={view === SegmentMode.legal ? NEWSPAPER_DOCUMENT : LICENSE_DOCUMENT}
            hasVerticalLabel={true}
            isReadOnly={false}
            name="secondImage"
            maxCount={1}
            isDataLoading={isUploadFileLoading}
            imageSetter={setSecondImageName}
            isDisabled={secondImageList?.length >= 1}
            hasUploaderIcon={false}
            onChange={(e: any) =>
              onUploadFileChange(e, setSecondImageName, setSecondImageList)
            }
            uploaderText={
              <div className="all-self-upload-text-container">
                <div className="upload-text">با کلیک کردن فایل خود را بارگذاری کنید.</div>
                <div className="upload-logo">
                  <AiOutlinePlus />
                </div>
              </div>
            }
          />
          <CustomUploader
            fileList={thirdImageList}
            setFileList={setThirdImageList}
            label={view === SegmentMode.legal ? "مستندات روزنامه رسمی" : "مستندات مجوز"}
            tooltip={view === SegmentMode.legal ? NEWSPAPER_DOCUMENT : LICENSE_DOCUMENT}
            hasVerticalLabel={true}
            isReadOnly={false}
            name="thirdImage"
            maxCount={1}
            isDataLoading={isUploadFileLoading}
            imageSetter={setThirdImageName}
            isDisabled={thirdImageList?.length >= 1}
            hasUploaderIcon={false}
            onChange={(e: any) =>
              onUploadFileChange(e, setThirdImageName, setThirdImageList)
            }
            uploaderText={
              <div className="all-self-upload-text-container">
                <div className="upload-text">با کلیک کردن فایل خود را بارگذاری کنید.</div>
                <div className="upload-logo">
                  <AiOutlinePlus />
                </div>
              </div>
            }
          />
          <CustomUploader
            fileList={fourthImageList}
            setFileList={setFourthImageList}
            label={view === SegmentMode.legal ? "مستندات روزنامه رسمی" : "مستندات مجوز"}
            tooltip={view === SegmentMode.legal ? NEWSPAPER_DOCUMENT : LICENSE_DOCUMENT}
            hasVerticalLabel={true}
            isReadOnly={false}
            name="fourthImage"
            maxCount={1}
            isDataLoading={isUploadFileLoading}
            imageSetter={setFourthImageName}
            isDisabled={fourthImageList?.length >= 1}
            hasUploaderIcon={false}
            onChange={(e: any) =>
              onUploadFileChange(e, setFourthImageName, setFourthImageList)
            }
            uploaderText={
              <div className="all-self-upload-text-container">
                <div className="upload-text">با کلیک کردن فایل خود را بارگذاری کنید.</div>
                <div className="upload-logo">
                  <AiOutlinePlus />
                </div>
              </div>
            }
          />
          <CustomUploader
            fileList={fifthImageList}
            setFileList={setFifthImageList}
            label={view === SegmentMode.legal ? "مستندات روزنامه رسمی" : "مستندات مجوز"}
            tooltip={view === SegmentMode.legal ? NEWSPAPER_DOCUMENT : LICENSE_DOCUMENT}
            hasVerticalLabel={true}
            isReadOnly={false}
            name="fifthImage"
            maxCount={1}
            isDataLoading={isUploadFileLoading}
            imageSetter={setFifthImageName}
            isDisabled={fifthImageList?.length >= 1}
            hasUploaderIcon={false}
            validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
            onChange={(e: any) =>
              onUploadFileChange(e, setFifthImageName, setFifthImageList)
            }
            uploaderText={
              <div className="all-self-upload-text-container">
                <div className="upload-text">با کلیک کردن فایل خود را بارگذاری کنید.</div>
                <div className="upload-logo">
                  <AiOutlinePlus />
                </div>
              </div>
            }
          />
        </div>
        <Row>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              placeholder="توضیحات بیشتر در مورد کسب و کار"
              showCount
              maxLength={1024}
              tooltip={{ icon: <span>(اختیاری)</span> }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default DescAndDocumentsSection;
