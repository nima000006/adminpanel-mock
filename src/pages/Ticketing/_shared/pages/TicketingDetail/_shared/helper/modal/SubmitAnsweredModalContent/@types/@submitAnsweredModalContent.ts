import { SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

export type SubmitAnsweredModalContentProps = {
  form?: FormInstance<{ description: string }>;
  fileList?: UploadFile[];
  setFileList?: React.Dispatch<SetStateAction<UploadFile[]>>;
};
