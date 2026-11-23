import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { ShopAllVendorsDetailOrdersAdvanceFilterFormType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/@types/@shopAllVendorsDetailOrders";

const useShopAllVendorsDetailOrdersAdvanceFilter = ({
  form: _form,
  isAdvanceModalOpen: _isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<ShopAllVendorsDetailOrdersAdvanceFilterFormType>;
}) => {
  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "تاریخ ثبت سفارش",
      name: "date",
      type: "range",
      col: { xs: 24, md: 24, lg: 24 },
    },
  ];

  return { filterItemsList };
};

export default useShopAllVendorsDetailOrdersAdvanceFilter;
