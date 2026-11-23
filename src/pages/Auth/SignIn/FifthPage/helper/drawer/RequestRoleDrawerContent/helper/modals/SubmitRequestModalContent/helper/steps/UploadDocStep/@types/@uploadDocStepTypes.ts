import { FormInstance, UploadFile } from "antd";

export type UploadDocStepProps = {
  setFirstImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
  firstImageList: UploadFile[];
  setFirstImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  secondImageList: UploadFile[];
  setSecondImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  firstStepId: number | undefined;
  submitSecondStepForm: FormInstance<any>;
  firstImageName: string;
  secondImageName: string;
};

export type AuthRequestPositionUploadFileResponse = {
  url: string;
  id: number;
};

export type DeleteUploadFileRequest = {
  requestEmployeeId: number;
  uploadFileId: number;
};
