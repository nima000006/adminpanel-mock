import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllCategorySettingsLayer2DefineFormType = {
  title: string;
  layer1Category?: SelectType<{ id: string; title: string }>;
};

export type ShopAllCategorySettingsLayer2DefineModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  layerTitle: string;
};

//! APIs
export type CreateCategoryLevel2Request = {
  faTitle: string;
  parentUuid: string;
};

export type CreateCategoryLevel2Response = {
  uuid: string;
  title: string;
  level: IdTitleName;
  childCount: number;
};
