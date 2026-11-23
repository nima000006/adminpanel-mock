import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { VENDOR_ORDERS_PERIOD_TABS } from "@pages/Catering/Orders/VendorOrders/_shared/utils";
import MyVendorOrdersListAll from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/helper/components/MyVendorOrdersListAll/MyVendorOrdersListAll";
import MyVendorOrdersListPast from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/helper/components/MyVendorOrdersListPast/MyVendorOrdersListPast";
import MyVendorOrdersListToday from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/helper/components/MyVendorOrdersListToday/MyVendorOrdersListToday";
import MyVendorOrdersListUpcoming from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/helper/components/MyVendorOrdersListUpcoming/MyVendorOrdersListUpcoming";

const MyVendorOrdersList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: "سفارشات",
      },
      {
        title: "سفارشات برای تامین من",
      },
    ],
  });

  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.period || VENDOR_ORDERS_PERIOD_TABS.TODAY;
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.period) {
      setSearchParams({ period: VENDOR_ORDERS_PERIOD_TABS.TODAY });
    }
  }, [params?.period]);
  //* ================================ Util Functions ================================
  const onTabChange = (period: string) => {
    setSearchParams({ period });
  };

  const tabItems = [
    {
      key: VENDOR_ORDERS_PERIOD_TABS.TODAY,
      label: "امروز",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.TODAY ? (
          <MyVendorOrdersListToday />
        ) : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.UPCOMING,
      label: "پیش‌رو",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.UPCOMING ? (
          <MyVendorOrdersListUpcoming />
        ) : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.PAST,
      label: "گذشته",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.PAST ? <MyVendorOrdersListPast /> : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.ALL,
      label: "همه",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.ALL ? <MyVendorOrdersListAll /> : null,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabItems} activeKey={activeKey} onChange={onTabChange} destroyOnHidden />
  );
};

export default MyVendorOrdersList;
