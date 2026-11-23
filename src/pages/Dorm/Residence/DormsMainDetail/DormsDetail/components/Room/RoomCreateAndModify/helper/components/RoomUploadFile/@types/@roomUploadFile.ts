import { UploadFile } from "antd";

export type RoomUploadFileProps = {
  firstImageList: UploadFile[];
  secondImageList: UploadFile[];
  thirdImageList: UploadFile[];
  fourthImageList: UploadFile[];
  setFirstImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setSecondImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setThirdImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setFourthImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setFirstImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
  setThirdImageName: React.Dispatch<React.SetStateAction<string>>;
  setFourthImageName: React.Dispatch<React.SetStateAction<string>>;
};
