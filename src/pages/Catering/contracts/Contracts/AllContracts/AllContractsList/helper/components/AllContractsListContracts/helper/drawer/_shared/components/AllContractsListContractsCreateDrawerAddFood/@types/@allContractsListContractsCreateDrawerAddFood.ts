import { ReactNode } from "react";

import { FormItemProps, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";

export type AllContractsListContractsCreateDrawerAddFoodFormType = {
  productBase: SelectType<IdTitle>;
  userTitle: string;
  title: string;
  studentalPrice: number;
  maxPrice: number;
  description: string;
  mainImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type AllContractsListContractsCreateDrawerAddFoodImageFieldName = keyof Pick<
  AllContractsListContractsCreateDrawerAddFoodFormType,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type AllContractsListContractsCreateDrawerAddFoodUploadFile =
  UploadFile | File | Blob;

export type AllContractsListContractsCreateDrawerAddFoodOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setUploadResponse: React.Dispatch<React.SetStateAction<string>>;
  fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName;
};

export type AllContractsListContractsCreateDrawerAddFoodProps = {
  open: boolean;
  contractId: number | null;
  onClose: () => void;
  onSuccess: () => void;
};

export type AllContractsListContractsCreateDrawerAddFoodImageSlotProps = {
  fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setUploadResponse: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFile: () => void;
  uploaderTextNode: ReactNode;
  rules?: FormItemProps["rules"];
};
