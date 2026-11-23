import { ShopAllProductsDetailUuidTitleType } from "../@types/@shopAllProductsDetail";
import { ShopAllProductsDetailCategorySelectOptionType } from "./components/ShopAllProductsDetailCategoryPicker/@types/@shopAllProductsDetailCategoryPicker";

export const getSelectUuid = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "value" in value) {
    const selectValue = (value as { value?: unknown }).value;
    return typeof selectValue === "string" ? selectValue : undefined;
  }

  return undefined;
};

export const toSelectOption = (
  item?: ShopAllProductsDetailUuidTitleType
): ShopAllProductsDetailCategorySelectOptionType | null =>
  item?.uuid
    ? {
        id: item.uuid,
        title: item.title,
      }
    : null;

export const mergeOptions = (
  ...optionGroups: (ShopAllProductsDetailCategorySelectOptionType | null | undefined)[][]
): ShopAllProductsDetailCategorySelectOptionType[] => {
  const merged = new Map<string, ShopAllProductsDetailCategorySelectOptionType>();

  optionGroups.flat().forEach((option) => {
    if (!option?.id) {
      return;
    }

    merged.set(option.id, option);
  });

  return Array.from(merged.values());
};
