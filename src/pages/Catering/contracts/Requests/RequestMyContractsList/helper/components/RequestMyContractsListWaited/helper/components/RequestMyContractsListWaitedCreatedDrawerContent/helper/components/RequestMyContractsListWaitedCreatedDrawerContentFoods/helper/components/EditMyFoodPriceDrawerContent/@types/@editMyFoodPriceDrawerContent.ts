import { UploadFile } from "antd";

import { cateringUploadFileResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type EditMyFoodPriceDrawerContentFormTypes = {
  studentalPrice: number;
  maxPrice: number;
  description: string;
  mainImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type EditMyFoodPriceDrawerImageFieldName = keyof Pick<
  EditMyFoodPriceDrawerContentFormTypes,
  "mainImage" | "secondImage" | "thirdImage" | "fourthImage"
>;

export type EditMyFoodPriceDrawerUploadFile = UploadFile | File | Blob;

export type EditMyFoodPriceDrawerOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  fieldName: EditMyFoodPriceDrawerImageFieldName;
};

export type EditMyFoodPriceDrawerContentProps = {
  product: GetDetailMySelfsProductsContent;
  onClose: () => void;
  onSuccess: () => void;
};
