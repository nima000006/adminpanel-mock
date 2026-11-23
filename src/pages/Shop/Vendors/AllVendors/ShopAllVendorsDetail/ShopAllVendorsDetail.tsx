import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SHOP_ALL_VENDORS_LIST_PAGE_ROUTE } from "@infra/router/routes/shop";
import ShopAllVendorsDetailBaseInfo from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailBaseInfo/ShopAllVendorsDetailBaseInfo";
import ShopAllVendorsDetailContract from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/ShopAllVendorsDetailContract";
import ShopAllVendorsDetailOrders from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/ShopAllVendorsDetailOrders";
import ShopAllVendorsDetailVendorProducts from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/ShopAllVendorsDetailVendorProducts";

const ShopAllVendorsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";
  const vendorTitle = params?.title;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={SHOP_ALL_VENDORS_LIST_PAGE_ROUTE}>تامین‌کنندگان</Link>,
      },
      ...(vendorTitle
        ? [
            {
              title: vendorTitle,
            },
          ]
        : []),
    ],
  });

  //* ================================ Util Functions ================================
  const onTabChange = (tab: string) => {
    setSearchParams({
      ...(params?.id && { id: params.id }),
      ...(params?.title && { title: params.title }),
      tab,
    });
  };

  const tabsItems = [
    {
      key: "1",
      label: "اطلاعات پایه",
      children: <ShopAllVendorsDetailBaseInfo />,
    },
    {
      key: "2",
      label: "کالاهای فروشنده (--)",
      children: <ShopAllVendorsDetailVendorProducts />,
    },
    {
      key: "3",
      label: "سفارشات (--)",
      children: <ShopAllVendorsDetailOrders />,
    },
    {
      key: "4",
      label: "قرارداد",
      children: <ShopAllVendorsDetailContract />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="line"
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default ShopAllVendorsDetail;
