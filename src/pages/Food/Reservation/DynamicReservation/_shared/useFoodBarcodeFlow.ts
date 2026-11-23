import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import dayjs, { Dayjs } from "dayjs";

import useDynamicFoodNavigation, {
  FoodBarcodeFormFields,
} from "./useDynamicFoodNavigation";

export type FoodBarcodeFormValues = FoodBarcodeFormFields & {
  currentDate?: Dayjs;
};

export const useFoodBarcodeFlow = () => {
  const [barcodeForm] = Form.useForm<FoodBarcodeFormValues>();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { handleScanSuccess, onManualBarcodeEntryHandler } = useDynamicFoodNavigation();

  useEffect(() => {
    barcodeForm.setFieldsValue({ currentDate: dayjs() });
  }, [barcodeForm]);

  const submitManualBarcode = useCallback(
    () => onManualBarcodeEntryHandler(barcodeForm),
    [barcodeForm, onManualBarcodeEntryHandler]
  );

  const handleScannerSuccess = useCallback(
    (uuid: string) => {
      if (handleScanSuccess(uuid)) {
        setIsScannerOpen(false);
      }
    },
    [handleScanSuccess]
  );

  const openScanner = useCallback(() => setIsScannerOpen(true), []);
  const closeScanner = useCallback(() => setIsScannerOpen(false), []);

  return {
    barcodeForm,
    isScannerOpen,
    openScanner,
    closeScanner,
    handleScannerSuccess,
    submitManualBarcode,
  };
};

export default useFoodBarcodeFlow;
