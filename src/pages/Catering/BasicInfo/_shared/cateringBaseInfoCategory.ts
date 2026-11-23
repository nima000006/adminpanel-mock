/** Main dish category — image upload/view is enabled. */
export const CATERING_MAIN_PRODUCT_CATEGORY_ID = 0;

/** Side dish category — image upload/view is disabled. */
export const CATERING_SIDE_PRODUCT_CATEGORY_ID = 1;

export const isCateringBaseInfoImageEnabled = (
  productCategoryId: number | string | null | undefined
): boolean => Number(productCategoryId) === CATERING_MAIN_PRODUCT_CATEGORY_ID;

export const hasCateringProductCategoryId = (
  productCategoryId: number | string | null | undefined
): boolean =>
  productCategoryId !== undefined &&
  productCategoryId !== null &&
  productCategoryId !== "";
