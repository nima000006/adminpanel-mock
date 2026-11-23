import { FormInstance } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { makeSearchParams } from "@infra/helpers/utils";

import {
  DYNAMIC_FOOD_ROUTE,
  ENTER_THE_VALUE_TEXT,
  UUID_NOT_VALID,
} from "./dynamicFoodConstants";

export type FoodBarcodeFormFields = {
  barcode?: string;
};

export const useDynamicFoodNavigation = () => {
  const navigate = useNavigate();

  const navigateToDynamic = (opts: { deliverUuid?: string; manualCode?: string }) => {
    navigate({
      pathname: `/${DYNAMIC_FOOD_ROUTE}`,
      search: makeSearchParams({
        ...(opts?.deliverUuid && { deliverUuid: opts?.deliverUuid }),
        ...(opts?.manualCode && { manualCode: opts?.manualCode }),
      }),
    });
  };

  const handleScanSuccess = (uuid?: string) => {
    if (uuid && uuid.length > 1) {
      navigateToDynamic({ deliverUuid: uuid });
      return true;
    }
    toast.warn(UUID_NOT_VALID, { toastId: UUID_NOT_VALID });
    return false;
  };

  const onManualBarcodeEntryHandler = async (
    form?: FormInstance<FoodBarcodeFormFields>
  ) => {
    const values = await form?.getFieldsValue?.();
    if (values?.barcode) {
      navigateToDynamic({ manualCode: values.barcode });
      return true;
    }
    toast.warn(ENTER_THE_VALUE_TEXT, { toastId: ENTER_THE_VALUE_TEXT });
    return false;
  };

  return { navigateToDynamic, handleScanSuccess, onManualBarcodeEntryHandler };
};

export default useDynamicFoodNavigation;
