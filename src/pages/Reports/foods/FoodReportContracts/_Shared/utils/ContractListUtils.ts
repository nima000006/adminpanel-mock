import { NamePath } from "antd/es/form/interface";

export const validateTotalPercentage = (getFieldValue: NamePath) => () => {
  const vendorPercentage = Number(getFieldValue("vendorPercentage"));
  const providerPercentage = Number(getFieldValue("providerPercentage"));
  const restaurantPercentage = Number(getFieldValue("restaurantPercentage"));

  if (vendorPercentage + providerPercentage + restaurantPercentage !== 100) {
    return Promise.reject(new Error("مجموع درصد باید 100 باشد."));
  }
  return Promise.resolve();
};
