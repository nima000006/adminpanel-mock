import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { VENDOR_ORDERS_PERIOD_TABS } from "@pages/Catering/Orders/VendorOrders/_shared/utils";
import AllVendorOrdersListAll from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/helper/components/AllVendorOrdersListAll/AllVendorOrdersListAll";
import AllVendorOrdersListPast from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/helper/components/AllVendorOrdersListPast/AllVendorOrdersListPast";
import AllVendorOrdersListToday from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/helper/components/AllVendorOrdersListToday/AllVendorOrdersListToday";
import AllVendorOrdersListUpcoming from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/helper/components/AllVendorOrdersListUpcoming/AllVendorOrdersListUpcoming";

const AllVendorOrdersList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: "سفارشات",
      },
      {
        title: "سفارشات برای تامین همه",
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
          <AllVendorOrdersListToday />
        ) : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.UPCOMING,
      label: "پیش‌رو",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.UPCOMING ? (
          <AllVendorOrdersListUpcoming />
        ) : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.PAST,
      label: "گذشته",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.PAST ? <AllVendorOrdersListPast /> : null,
    },
    {
      key: VENDOR_ORDERS_PERIOD_TABS.ALL,
      label: "همه",
      children:
        activeKey === VENDOR_ORDERS_PERIOD_TABS.ALL ? <AllVendorOrdersListAll /> : null,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabItems} activeKey={activeKey} onChange={onTabChange} destroyOnHidden />
  );
};

export default AllVendorOrdersList;
