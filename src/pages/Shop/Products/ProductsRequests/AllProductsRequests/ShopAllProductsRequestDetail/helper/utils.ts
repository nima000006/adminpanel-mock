import { SHOP_PRODUCT_STATUS } from "@pages/Shop/Products/_shared/utils/shopProductStatus";

export const getRequestStatusDotClassName = (statusName?: string) => {
  if (statusName === SHOP_PRODUCT_STATUS.AWAITING_APPROVAL) {
    return "is-awaiting";
  }

  if (statusName === SHOP_PRODUCT_STATUS.ACCEPTED) {
    return "is-accepted";
  }

  if (statusName === SHOP_PRODUCT_STATUS.REJECTED) {
    return "is-rejected";
  }

  return "";
};
