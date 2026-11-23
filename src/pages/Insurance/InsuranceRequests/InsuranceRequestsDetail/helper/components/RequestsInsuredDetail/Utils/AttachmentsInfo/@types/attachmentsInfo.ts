import { UploadFile } from "antd";

//! LAYOUT
type AttachmentFile = { uid: string; name: string; status: string; url: string };

export type AttachmentsInfoProps = {
  fileList: UploadFile<AttachmentFile>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<AttachmentFile>[]>>;
};
