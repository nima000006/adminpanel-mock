import { FormInstance, FormListFieldData } from "antd";

import {
  ShopAllProductsDetailFormType,
  ShopAllProductsDetailGroupedCategoryRowType,
} from "../../../../@types/@shopAllProductsDetail";

export type ShopAllProductsDetailCategorySelectOptionType = {
  id: string;
  title: string;
};

export type ShopAllProductsDetailCategoryRowProps = {
  field: FormListFieldData;
  form: FormInstance<ShopAllProductsDetailFormType>;
  seedCategory?: ShopAllProductsDetailGroupedCategoryRowType;
  layer1Options: ShopAllProductsDetailCategorySelectOptionType[];
  remove: () => void;
  canRemove: boolean;
};
