import { useEffect } from "react";

import { Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetCountOrdersQuery } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import {
  SHOP_VENDOR_ORDER_STATUS,
  SHOP_VENDOR_ORDER_STATUS_LABELS,
} from "@pages/Shop/Vendors/_shared/utils";
import ShopAllVendorsDetailOrdersAll from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersAll/ShopAllVendorsDetailOrdersAll";
import ShopAllVendorsDetailOrdersCancelled from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersCancelled/ShopAllVendorsDetailOrdersCancelled";
import ShopAllVendorsDetailOrdersPendingApproval from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersPendingApproval/ShopAllVendorsDetailOrdersPendingApproval";
import ShopAllVendorsDetailOrdersReadyToShip from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersReadyToShip/ShopAllVendorsDetailOrdersReadyToShip";
import ShopAllVendorsDetailOrdersRejected from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersRejected/ShopAllVendorsDetailOrdersRejected";
import ShopAllVendorsDetailOrdersShipped from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/components/ShopAllVendorsDetailOrdersShipped/ShopAllVendorsDetailOrdersShipped";

const ShopAllVendorsDetailOrders = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.orderTab || "1";

  const { params: url } = useQueryParams();

  //? ================================ Api Calls ================================
  const [
    getCountOrders,
    { data: getCountOrdersData, isFetching: isGetCountOrdersLoading },
  ] = useLazyGetCountOrdersQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getCountOrders({ supplierUuids: [url.id] });
  }, []);

  //* ================================ Util Functions ================================
  const onOrderTabChange = (orderTab: string) => {
    setSearchParams({
      ...(params?.id && { id: params.id }),
      ...(params?.title && { title: params.title }),
      ...(params?.tab && { tab: params.tab }),
      orderTab,
    });
  };

  const getStatusCount = (statusId: number) =>
    getCountOrdersData?.find((item) => item.status.id === statusId)?.count ?? 0;

  const formatCount = (count: number) =>
    isGetCountOrdersLoading ? "..." : count.toLocaleString("fa-IR");

  const allCount =
    getCountOrdersData?.reduce((sum, item) => sum + (item.count ?? 0), 0) ?? 0;

  //* ================================ Tabs Items ================================
  const tabsItems = [
    {
      key: "1",
      label: `همه (${formatCount(allCount)})`,
      children: <ShopAllVendorsDetailOrdersAll />,
    },
    {
      key: "2",
      label: `${SHOP_VENDOR_ORDER_STATUS_LABELS[SHOP_VENDOR_ORDER_STATUS.AWAITING_APPROVAL]} (${formatCount(getStatusCount(SHOP_VENDOR_ORDER_STATUS.AWAITING_APPROVAL))})`,
      children: <ShopAllVendorsDetailOrdersPendingApproval />,
    },
    {
      key: "3",
      label: `${SHOP_VENDOR_ORDER_STATUS_LABELS[SHOP_VENDOR_ORDER_STATUS.AWAITING_SHIPMENT]} (${formatCount(getStatusCount(SHOP_VENDOR_ORDER_STATUS.AWAITING_SHIPMENT))})`,
      children: <ShopAllVendorsDetailOrdersReadyToShip />,
    },
    {
      key: "4",
      label: `${SHOP_VENDOR_ORDER_STATUS_LABELS[SHOP_VENDOR_ORDER_STATUS.SHIPPED]} (${formatCount(getStatusCount(SHOP_VENDOR_ORDER_STATUS.SHIPPED))})`,
      children: <ShopAllVendorsDetailOrdersShipped />,
    },
    {
      key: "5",
      label: `${SHOP_VENDOR_ORDER_STATUS_LABELS[SHOP_VENDOR_ORDER_STATUS.REJECTED]} (${formatCount(getStatusCount(SHOP_VENDOR_ORDER_STATUS.REJECTED))})`,
      children: <ShopAllVendorsDetailOrdersRejected />,
    },
    {
      key: "6",
      label: `${SHOP_VENDOR_ORDER_STATUS_LABELS[SHOP_VENDOR_ORDER_STATUS.CANCELED]} (${formatCount(getStatusCount(SHOP_VENDOR_ORDER_STATUS.CANCELED))})`,
      children: <ShopAllVendorsDetailOrdersCancelled />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      activeKey={activeKey}
      onChange={onOrderTabChange}
      destroyOnHidden
    />
  );
};

export default ShopAllVendorsDetailOrders;
