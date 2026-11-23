import { FormInstance, UploadFile } from "antd";

import { CreateBusinessStepFormType } from "../../CreateBusinessStep/@types/@createBusinessTypes";

export type DescAndDocumentsSectionProps = {
  form: FormInstance<CreateBusinessStepFormType>;
  view: string;
  setMainImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
  setThirdImageName: React.Dispatch<React.SetStateAction<string>>;
  setFourthImageName: React.Dispatch<React.SetStateAction<string>>;
  setFifthImageName: React.Dispatch<React.SetStateAction<string>>;

  mainImageList: UploadFile[];
  setMainImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  secondImageList: UploadFile[];
  setSecondImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  thirdImageList: UploadFile[];
  setThirdImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  fourthImageList: UploadFile[];
  setFourthImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  fifthImageList: UploadFile[];
  setFifthImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};

export type BusinessOnUploadFileSuccess = {
  response: BusinessUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

export type BusinessUploadFileResponse = {
  fileId: number;
};
