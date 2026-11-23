import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllCategorySettingsLayer3DefineFormType = {
  title: string;
  layer2Category?: SelectType<{ id: string; title: string }>[];
};

export type ShopAllCategorySettingsLayer3DefineModalProps = {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  layerTitle: string;
};

//! APIs
export type CreateCategoryLevel3Request = {
  faTitle: string;
  parentUuids: string[];
};

export type CreateCategoryLevel3Response = {
  uuid: string;
  title: string;
  level: IdTitleName;
  childCount: number;
};
