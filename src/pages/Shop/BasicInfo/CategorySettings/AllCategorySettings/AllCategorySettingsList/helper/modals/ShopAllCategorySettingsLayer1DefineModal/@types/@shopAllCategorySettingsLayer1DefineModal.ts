import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllCategorySettingsLayer1DefineFormType = {
  title: string;
};

export type ShopAllCategorySettingsLayer1DefineModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  layerTitle: string;
};

//! APIs
export type CreateCategoryLevel1Request = {
  faTitle: string;
};

export type CreateCategoryLevel1Response = {
  uuid: string;
  title: string;
  level: IdTitleName;
  childCount: number;
};
