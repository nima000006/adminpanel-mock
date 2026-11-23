import { useState } from "react";

import { Modal, Switch, Upload, UploadFile } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";

import { PADDING_40 } from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import "./_uploadImageSection.scss";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImageSection = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://placehold.co/400",
    },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://placehold.co/400",
    // },
  ]);

  //* ================================ Util Functions ================================
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <AiOutlinePlus />
      <div style={{ marginTop: 8 }}>بارگذاری تصاویر</div>
    </div>
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="upload-image-section-container-main" padding={PADDING_40}>
      <div className="upload-image-section-container">
        <div className="upload-image-section-label">تصاویر</div>
        <div>
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
        </div>
      </div>
      <div className="uploaded-images-container">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewOpen && (
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        )}
      </div>
    </CustomCard>
  );
};

export default UploadImageSection;
