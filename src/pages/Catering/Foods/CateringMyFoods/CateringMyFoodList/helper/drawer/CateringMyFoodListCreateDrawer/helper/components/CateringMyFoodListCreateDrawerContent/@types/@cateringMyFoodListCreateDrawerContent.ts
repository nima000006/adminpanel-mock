import { ReactNode } from "react";

import { FormItemProps, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";

export type CateringMyFoodListCreateDrawerContentFormType = {
  productBase: SelectType<IdTitle>;
  userTitle: string;
  title: string;
  contract: SelectType<IdTitle>;
  studentalPrice: number;
  maxPrice: number;
  description: string;
  mainImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type CateringMyFoodListCreateDrawerImageFieldName = keyof Pick<
  CateringMyFoodListCreateDrawerContentFormType,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type CateringMyFoodListCreateDrawerUploadFile = UploadFile | File | Blob;

export type CateringMyFoodListCreateDrawerOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  fieldName: CateringMyFoodListCreateDrawerImageFieldName;
};

export type CateringMyFoodListCreateDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
  mode?: "create" | "edit";
  foodId?: number | null;
};

export type CateringMyFoodListCreateDrawerImageSlotProps = {
  fieldName: CateringMyFoodListCreateDrawerImageFieldName;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setImageName: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFile: () => void;
  uploaderTextNode: ReactNode;
  rules?: FormItemProps["rules"];
};
