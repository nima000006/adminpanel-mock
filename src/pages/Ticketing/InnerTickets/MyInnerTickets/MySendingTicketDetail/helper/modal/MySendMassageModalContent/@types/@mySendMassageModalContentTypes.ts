import { FormInstance, UploadFile } from "antd";

export type MySendMassageModalContentProps = {
  form?: FormInstance<{ note: string }>;
  fileList?: UploadFile[];
  setFileList?: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};
