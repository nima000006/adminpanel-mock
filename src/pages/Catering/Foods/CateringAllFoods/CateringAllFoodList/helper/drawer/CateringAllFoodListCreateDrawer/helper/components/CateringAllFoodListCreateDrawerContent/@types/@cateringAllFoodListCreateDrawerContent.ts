import { ReactNode } from "react";

import { FormItemProps, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";

export type CateringAllFoodListCreateDrawerContentFormType = {
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

export type CateringAllFoodListCreateDrawerImageFieldName = keyof Pick<
  CateringAllFoodListCreateDrawerContentFormType,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type CateringAllFoodListCreateDrawerUploadFile = UploadFile | File | Blob;

export type CateringAllFoodListCreateDrawerOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  fieldName: CateringAllFoodListCreateDrawerImageFieldName;
};

export type CateringAllFoodListCreateDrawerContentProps = {
  onCloseDrawer: () => void;
  onSuccess: () => void;
  mode?: "create" | "edit";
  foodId?: number | null;
};

export type CateringAllFoodListCreateDrawerImageSlotProps = {
  fieldName: CateringAllFoodListCreateDrawerImageFieldName;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setImageName: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFile: () => void;
  uploaderTextNode: ReactNode;
  rules?: FormItemProps["rules"];
};
