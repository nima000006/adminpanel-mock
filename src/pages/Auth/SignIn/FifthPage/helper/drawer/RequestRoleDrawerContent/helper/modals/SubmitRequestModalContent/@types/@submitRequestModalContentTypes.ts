import { FormInstance, UploadFile } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type SubmitRequestModalContentProps = {
  form: FormInstance<{
    personalCode: string;
    branch: SelectType<IdTitleName>;
    location: string;
    position: string;
    description: string;
  }>;
  step: number;
  setFirstImageName: React.Dispatch<React.SetStateAction<string>>;
  setSecondImageName: React.Dispatch<React.SetStateAction<string>>;
  firstImageList: UploadFile<any>[];
  setFirstImageList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  secondImageList: UploadFile<any>[];
  setSecondImageList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  firstStepId: number | undefined;
  submitSecondStepForm: FormInstance<any>;
  id: number;
  secondImageName: string;
  firstImageName: string;
};
