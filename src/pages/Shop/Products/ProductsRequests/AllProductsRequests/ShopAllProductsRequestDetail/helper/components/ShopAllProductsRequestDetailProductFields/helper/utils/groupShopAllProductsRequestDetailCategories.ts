import {
  GetShopAllProductsDetailResponse,
  ShopAllProductsDetailGroupedCategoryRowType,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/@types/@shopAllProductsDetail";

export const groupShopAllProductsRequestDetailCategories = (
  categories?: GetShopAllProductsDetailResponse["categories"]
): ShopAllProductsDetailGroupedCategoryRowType[] => {
  if (!categories?.length) {
    return [];
  }

  const grouped = new Map<string, ShopAllProductsDetailGroupedCategoryRowType>();

  categories.forEach((category) => {
    const key = `${category.level1?.uuid ?? ""}__${category.level2?.uuid ?? ""}`;
    const existing = grouped.get(key);

    if (existing) {
      if (
        category.level3?.uuid &&
        !existing.level3.some((item) => item.uuid === category.level3?.uuid)
      ) {
        existing.level3.push(category.level3);
      }
      return;
    }

    grouped.set(key, {
      level1: category.level1,
      level2: category.level2,
      level3: category.level3?.uuid ? [category.level3] : [],
    });
  });

  return Array.from(grouped.values());
};
