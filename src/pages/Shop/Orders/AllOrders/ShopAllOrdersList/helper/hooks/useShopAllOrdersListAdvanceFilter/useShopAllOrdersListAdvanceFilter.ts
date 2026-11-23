import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { ShopAllOrdersListAdvanceFilterFormType } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/@types/@shopAllOrdersList";

const useShopAllOrdersListAdvanceFilter = ({
  form: _form,
  isAdvanceModalOpen: _isAdvanceModalOpen,
}: {
  isAdvanceModalOpen: boolean;
  form: FormInstance<ShopAllOrdersListAdvanceFilterFormType>;
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

export default useShopAllOrdersListAdvanceFilter;
