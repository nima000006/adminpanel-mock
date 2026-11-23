import { UploadFile } from "antd";

import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type EditFoodPriceDrawerContentFormTypes = {
  studentalPrice: number;
  maxPrice: number;
  description: string;
  mainImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type EditFoodPriceDrawerImageFieldName = keyof Pick<
  EditFoodPriceDrawerContentFormTypes,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type EditFoodPriceDrawerUploadFile = UploadFile | File | Blob;

export type EditFoodPriceDrawerOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  fieldName: EditFoodPriceDrawerImageFieldName;
};

export type EditFoodPriceDrawerContentProps = {
  product: GetDetailAllSelfsProductsContent;
  onClose: () => void;
  onSuccess: () => void;
};
