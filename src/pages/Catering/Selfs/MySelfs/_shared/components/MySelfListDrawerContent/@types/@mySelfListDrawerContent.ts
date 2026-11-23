import { UploadFile } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  CreateCateringMyRestaurantRequest,
  UpdateCateringMyRestaurantRequest,
  cateringUploadFileResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";

export type MySelfListDrawerContentFormType = {
  logo: UploadFile[];
  cover: UploadFile[];
  title: string;
  capacity: string;
  gender: SelectType<IdTitle>;
  selfManagerName?: string;
  selfManagerLastName?: string;
  nationalCode?: string;
  phoneManager?: string;
  desc: string;
  rule: string;
  province: SelectType<IdTitle>;
  city: SelectType<IdTitle>;
  postalCode: string;
  phonOne: string;
  phoneTwo?: string;
  address: string;
};

export type MySelfListDrawerUploadFile = UploadFile | File | Blob;

export type MySelfListOnUploadFileSuccess = {
  response: cateringUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

export type MySelfListDrawerContentProps = {
  onCloseDrawer: () => void;
  getRestaurantData: () => void;
  mode: "create" | "edit";
  /** Used only to fetch detail in edit mode — form is populated from the detail query */
  selfId?: number | null;
};

export type { CreateCateringMyRestaurantRequest, UpdateCateringMyRestaurantRequest };
