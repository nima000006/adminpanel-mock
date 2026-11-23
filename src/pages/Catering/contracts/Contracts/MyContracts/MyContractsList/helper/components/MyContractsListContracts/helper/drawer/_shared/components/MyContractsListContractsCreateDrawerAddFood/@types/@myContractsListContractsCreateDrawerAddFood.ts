import { ReactNode } from "react";

import { FormItemProps, UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";

export type MyContractsListContractsCreateDrawerAddFoodFormType = {
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

export type MyContractsListContractsCreateDrawerAddFoodImageFieldName = keyof Pick<
  MyContractsListContractsCreateDrawerAddFoodFormType,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type MyContractsListContractsCreateDrawerAddFoodUploadFile =
  UploadFile | File | Blob;

export type MyContractsListContractsCreateDrawerAddFoodOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setUploadResponse: React.Dispatch<React.SetStateAction<string>>;
  fieldName: MyContractsListContractsCreateDrawerAddFoodImageFieldName;
};

export type MyContractsListContractsCreateDrawerAddFoodProps = {
  open: boolean;
  contractId: number | null;
  onClose: () => void;
  onSuccess: () => void;
};

export type MyContractsListContractsCreateDrawerAddFoodImageSlotProps = {
  fieldName: MyContractsListContractsCreateDrawerAddFoodImageFieldName;
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  setUploadResponse: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFile: () => void;
  uploaderTextNode: ReactNode;
  rules?: FormItemProps["rules"];
};
