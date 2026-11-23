import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { ShopAllVendorsDetailVendorProductsAdvanceFilterFormType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/@types/@shopAllVendorsDetailVendorProducts";

const useShopAllVendorsDetailVendorProductsAdvanceFilter = ({
  form: _form,
  isAdvanceModalOpen: _isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<ShopAllVendorsDetailVendorProductsAdvanceFilterFormType>;
}) => {
  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "موجودی",
      name: "stock",
      type: "select",
      options: [],
      placeHolder: "انتخاب کنید",
      col: { xs: 24, md: 12 },
    },
    {
      label: "تاریخ افزودن",
      name: "date",
      type: "range",
      col: { xs: 24, md: 12 },
    },
  ];

  return { filterItemsList };
};

export default useShopAllVendorsDetailVendorProductsAdvanceFilter;
