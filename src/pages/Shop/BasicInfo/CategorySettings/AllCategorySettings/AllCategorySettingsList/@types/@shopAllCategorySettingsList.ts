import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllCategorySettingsListRecordType = {
  uuid: string;
  title: string;
  level: IdTitleName;
  childCount: number;
};

export type ShopAllCategorySettingsLayer1RecordType =
  ShopAllCategorySettingsListRecordType;

export type ShopAllCategorySettingsLayer2RecordType =
  ShopAllCategorySettingsListRecordType;

export type ShopAllCategorySettingsLayer3RecordType =
  ShopAllCategorySettingsListRecordType;

export type ShopAllCategorySettingsLayer2TabAdvanceFilterFormType = {
  layer1Category: SelectType<IdTitleName>;
};

export type ShopAllCategorySettingsLayer3TabAdvanceFilterFormType = {
  layer2Category: SelectType<IdTitleName>;
};

export const SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB = "1";
export const SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB = "2";
export const SHOP_ALL_CATEGORY_SETTINGS_LAYER_3_TAB = "3";

export type GetAllCategoriesSettingsListCountRequest = void;

export type GetAllCategoriesSettingsListCountResponse = {
  level: IdTitleName;
  count: number;
}[];

export type GetAllCategoriesSettingsListRequest = {
  pageSize: number;
  pageNumber: number;
  title?: string;
  level?: number;
  parentUuids?: string[];
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
};

export type GetAllCategoriesSettingsListResponse = {
  content: ShopAllCategorySettingsListRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetCategoryLevelsRequest = void;

export type GetCategoryLevelsResponse = IdTitleName[];
