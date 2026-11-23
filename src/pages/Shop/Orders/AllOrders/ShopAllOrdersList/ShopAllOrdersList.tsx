import { useEffect } from "react";

import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetShopAllOrdersListCountQuery } from "@infra/states/redux/Apis/shop/orders/ordersApi";
import { SHOP_ORDERS_STATUS_MAP } from "@pages/Shop/_shared/utils";
import ShopAllOrdersListAll from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListAll/ShopAllOrdersListAll";
import ShopAllOrdersListCancelled from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListCancelled/ShopAllOrdersListCancelled";
import ShopAllOrdersListExpired from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListExpired/ShopAllOrdersListExpired";
import ShopAllOrdersListPendingApproval from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListPendingApproval/ShopAllOrdersListPendingApproval";
import ShopAllOrdersListReadyToShip from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListReadyToShip/ShopAllOrdersListReadyToShip";
import ShopAllOrdersListRejected from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListRejected/ShopAllOrdersListRejected";
import ShopAllOrdersListShipped from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListShipped/ShopAllOrdersListShipped";

const ShopAllOrdersList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: "سفارشات",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getCountData, { data: ordersCountData, isFetching: isGetCountDataLoading }] =
    useLazyGetShopAllOrdersListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getCountData({});
  }, []);

  //* ================================ Util Functions ================================
  const onTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const tabsItems = [
    {
      key: "1",
      label: `همه (${ordersCountData?.reduce((acc, item) => acc + item.count, 0)})`,
      children: <ShopAllOrdersListAll />,
    },
    {
      key: "2",
      label: `در انتظار تایید (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.awaitingApproval)?.count})`,
      children: <ShopAllOrdersListPendingApproval />,
    },
    {
      key: "3",
      label: `آماده ارسال (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.awaitingShipment)?.count})`,
      children: <ShopAllOrdersListReadyToShip />,
    },
    {
      key: "4",
      label: `ارسال شد (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.shipped)?.count})`,

      children: <ShopAllOrdersListShipped />,
    },
    {
      key: "5",
      label: `رد شده (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.rejected)?.count})`,

      children: <ShopAllOrdersListRejected />,
    },
    {
      key: "6",
      label: `لغو شده (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.canceled)?.count})`,
      children: <ShopAllOrdersListCancelled />,
    },
    {
      key: "7",
      label: `منقضی شده (${ordersCountData?.find((item) => item?.status?.name === SHOP_ORDERS_STATUS_MAP?.expired)?.count})`,
      children: <ShopAllOrdersListExpired />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetCountDataLoading}>
      <Tabs
        items={tabsItems}
        activeKey={activeKey}
        onChange={onTabChange}
        destroyOnHidden
      />
    </Div>
  );
};

export default ShopAllOrdersList;
