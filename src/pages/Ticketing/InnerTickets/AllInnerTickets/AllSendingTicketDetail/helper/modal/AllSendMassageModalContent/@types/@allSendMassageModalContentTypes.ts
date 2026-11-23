import { FormInstance, UploadFile } from "antd";

export type AllSendMassageModalContentProps = {
  form?: FormInstance<{ note: string }>;
  fileList?: UploadFile[];
  setFileList?: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};
