import { lazy } from "react";

import {
  SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE,
  SHOP_ALL_ORDERS_LIST_PAGE_ROUTE,
  SHOP_ALL_VENDORS_DETAIL_PAGE_ROUTE,
  SHOP_ALL_VENDORS_LIST_PAGE_ROUTE,
  SHOP_BASIC_INFO_ALL_CATEGORY_SETTINGS_LIST_PAGE_ROUTE,
  SHOP_BASIC_INFO_ALL_SENDING_SETTINGS_LIST_PAGE_ROUTE,
  SHOP_BASIC_INFO_MY_SENDING_SETTINGS_LIST_PAGE_ROUTE,
  SHOP_MY_ORDERS_DETAIL_PAGE_ROUTE,
  SHOP_MY_ORDERS_LIST_PAGE_ROUTE,
  SHOP_MY_VENDORS_DETAIL_PAGE_ROUTE,
  SHOP_MY_VENDORS_LIST_PAGE_ROUTE,
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_ADD_PAGE_ROUTE,
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE,
  SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_DETAIL_PAGE_ROUTE,
  SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/shop";

const ShopAllSendingSettingsList = lazy(
  () =>
    import("../../../pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/ShopAllSendingSettingsList")
);

const ShopMySendingSettingsList = lazy(
  () =>
    import("../../../pages/Shop/BasicInfo/SendingSettings/MySendingSettings/MySendingSettingsList/ShopMySendingSettingsList")
);

const ShopAllCategorySettingsList = lazy(
  () =>
    import("../../../pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/ShopAllCategorySettingsList")
);

const ShopMyOrdersList = lazy(
  () => import("../../../pages/Shop/Orders/MyOrders/ShopMyOrdersList/ShopMyOrdersList")
);

const ShopMyOrdersDetail = lazy(
  () =>
    import("../../../pages/Shop/Orders/MyOrders/ShopMyOrdersDetail/ShopMyOrdersDetail")
);

const ShopAllOrdersList = lazy(
  () => import("../../../pages/Shop/Orders/AllOrders/ShopAllOrdersList/ShopAllOrdersList")
);

const ShopAllOrdersDetail = lazy(
  () =>
    import("../../../pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/ShopAllOrdersDetail")
);

const ShopMyVendorsList = lazy(
  () =>
    import("../../../pages/Shop/Vendors/MyVendors/ShopMyVendorsList/ShopMyVendorsList")
);

const ShopMyVendorsDetail = lazy(
  () =>
    import("../../../pages/Shop/Vendors/MyVendors/ShopMyVendorsDetail/ShopMyVendorsDetail")
);

const ShopAllVendorsList = lazy(
  () =>
    import("../../../pages/Shop/Vendors/AllVendors/ShopAllVendorsList/ShopAllVendorsList")
);

const ShopAllVendorsDetail = lazy(
  () =>
    import("../../../pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/ShopAllVendorsDetail")
);

const ShopAllProductsList = lazy(
  () =>
    import("../../../pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsList/ShopAllProductsList")
);

const ShopAllProductsDetail = lazy(
  () =>
    import("../../../pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/ShopAllProductsDetail")
);

const ShopAllProductsAdd = lazy(
  () =>
    import("../../../pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsAdd/ShopAllProductsAdd")
);

const ShopAllProductsRequestsList = lazy(
  () =>
    import("../../../pages/Shop/Products/ProductsRequests/AllProductsRequests/ShopAllProductsRequestsList/ShopAllProductsRequestsList")
);

const ShopAllProductsRequestDetail = lazy(
  () =>
    import("../../../pages/Shop/Products/ProductsRequests/AllProductsRequests/ShopAllProductsRequestDetail/ShopAllProductsRequestDetail")
);

export const ShopScreens = [
  {
    component: ShopAllSendingSettingsList,
    path: SHOP_BASIC_INFO_ALL_SENDING_SETTINGS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopMySendingSettingsList,
    path: SHOP_BASIC_INFO_MY_SENDING_SETTINGS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllCategorySettingsList,
    path: SHOP_BASIC_INFO_ALL_CATEGORY_SETTINGS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopMyOrdersList,
    path: SHOP_MY_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopMyOrdersDetail,
    path: SHOP_MY_ORDERS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllOrdersList,
    path: SHOP_ALL_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllOrdersDetail,
    path: SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopMyVendorsList,
    path: SHOP_MY_VENDORS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopMyVendorsDetail,
    path: SHOP_MY_VENDORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllVendorsList,
    path: SHOP_ALL_VENDORS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllVendorsDetail,
    path: SHOP_ALL_VENDORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllProductsList,
    path: SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllProductsDetail,
    path: SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllProductsAdd,
    path: SHOP_PRODUCTS_LIST_ALL_PRODUCTS_ADD_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllProductsRequestsList,
    path: SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ShopAllProductsRequestDetail,
    path: SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
