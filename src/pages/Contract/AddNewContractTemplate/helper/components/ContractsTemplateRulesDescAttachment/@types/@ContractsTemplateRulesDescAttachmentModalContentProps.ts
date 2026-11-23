import { FormInstance, UploadFile } from "antd";

type UploadFileWithOrigin = UploadFile & {
  originFileObj: NonNullable<UploadFile["originFileObj"]>;
};

export type ContractsTemplateRulesDescAttachmentFormValues = {
  title: string;
  file: {
    fileList: UploadFileWithOrigin[];
  };
};

export type ContractsTemplateRulesDescAttachmentModalContentProps = {
  form: FormInstance<ContractsTemplateRulesDescAttachmentFormValues>;
  onFinish?: () => void;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};
export type AttachmentType = {
  id: string | number;
  title: string;
  fileName: string;
  fileUrl: string;
  file?: UploadFile;
};

//! APIs
export type AddContractFileRequest = {
  id: number;
  title: string;
  body: FormData;
};
