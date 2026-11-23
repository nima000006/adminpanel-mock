import { FormInstance } from "antd";

import { ShopAllVendorsListAddDrawerContractFormType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/@types/@shopAllVendorsListAddDrawerContent";

export type ShopAllVendorsListAddDrawerContractStepProps = {
  form: FormInstance<ShopAllVendorsListAddDrawerContractFormType>;
  supplierUuid: string | null;
  isConfirmModalOpen: boolean;
  onCloseConfirmModal: () => void;
  onCloseDrawer: () => void;
  getAllVendorsListHandler: () => void;
};
