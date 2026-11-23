import { Dispatch, SetStateAction } from "react";

import { UploadFile } from "antd";

export type EvacuationAttachmentCardProps = {
  titleName: string;
  uploaderName: string;
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
};
