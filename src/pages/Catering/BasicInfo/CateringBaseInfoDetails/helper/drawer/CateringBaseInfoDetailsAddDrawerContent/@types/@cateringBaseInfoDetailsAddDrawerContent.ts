import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
export type CateringBaseInfoDetailsAddDrawerFormData = {
  foodTitle: string;
  description?: string;
  defaultFoodImage?: string;
};

export type CateringBaseInfoDetailsAddDrawerContentProps = {
  closeDrawerHandler: () => void;
  getData: () => void;
  productCategoryTitle: string;
  existingTitles: string[];
};

export type CateringBaseInfoDetailsAddUploadFile = UploadFile | File | Blob;

export type CateringBaseInfoDetailsAddOnUploadFileChangeParams = {
  image: UploadChangeParam<CateringBaseInfoDetailsAddUploadFile>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};

export type createBasicInfoFoodResponse = number;

export type createBasicInfoFoodRequest = {
  title: string;
  description?: string;
  mainImage?: string;
  secondImage?: string;
  active?: boolean;
  productCategoryId: number;
  taxStuffId?: number;
};
