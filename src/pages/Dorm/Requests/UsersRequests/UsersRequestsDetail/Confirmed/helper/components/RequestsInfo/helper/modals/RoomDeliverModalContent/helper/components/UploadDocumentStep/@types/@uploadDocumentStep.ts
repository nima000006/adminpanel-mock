import { UploadFile } from "antd/es/upload";

export type UploadDocumentStepProps = {
  setFirstImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
  firstImageList: UploadFile[];
  setFirstImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  secondImageList: UploadFile[];
  setSecondImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};
