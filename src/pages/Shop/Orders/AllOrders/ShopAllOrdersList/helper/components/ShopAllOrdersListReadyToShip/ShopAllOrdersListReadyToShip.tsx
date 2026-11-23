import { useEffect } from "react";

import moment from "jalali-moment";

import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetShopAllOrdersListQuery } from "@infra/states/redux/Apis/shop/orders/ordersApi";
import { SHOP_ORDERS_STATUS_MAP } from "@pages/Shop/_shared/utils";
import { GetShopAllOrdersListRequest } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/@types/@shopAllOrdersList";
import ShopAllOrdersListTabContent from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/components/ShopAllOrdersListTabContent/ShopAllOrdersListTabContent";

const ShopAllOrdersListReadyToShip = () => {
  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getShopAllOrdersList, { data, isFetching: isGetShopAllOrdersListLoading }] =
    useLazyGetShopAllOrdersListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const params: GetShopAllOrdersListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 10,

      ...(url?.supplierTitle && {
        supplierTitle: url.supplierTitle,
      }),
      ...(url?.buyerFirstName && {
        buyerFirstName: url.buyerFirstName,
      }),
      ...(url?.buyerLastName && {
        buyerLastName: url.buyerLastName,
      }),
      ...(url?.nationalCode && {
        nationalCode: url.nationalCode,
      }),
      ...(url?.dateDateStart && {
        createdFrom: moment(url.dateDateStart)?.format("YYYY-MM-DD"),
      }),
      ...(url?.dateDateEnd && {
        createdTo: moment(url.dateDateEnd)?.format("YYYY-MM-DD"),
      }),
      statuses: [SHOP_ORDERS_STATUS_MAP.awaitingShipment],
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        params.sortBy = sorting?.sortBy;
      }

      if (sorting?.sortOrder) {
        params.sortDirection = sorting?.sortOrder?.toUpperCase();
      }
    }

    getShopAllOrdersList(params);
  }, [
    url?.page,
    url?.pageSize,
    // table columns
    url?.supplierTitle, // فروشنده
    url?.buyerFirstName, // نام خریدار
    url?.buyerLastName, // نام خانوادگی خریدار
    url?.nationalCode, // کد ملی خریدار
    url?.sortings,
    // filters
    url?.dateDateStart, // تاریخ شروع ثبت سفارش
    url?.dateDateEnd, // تاریخ پایان ثبت سفارش
  ]);

  return (
    <ShopAllOrdersListTabContent
      variant="readyToShip"
      dataSource={data}
      isLoading={isGetShopAllOrdersListLoading}
    />
  );
};

export default ShopAllOrdersListReadyToShip;
