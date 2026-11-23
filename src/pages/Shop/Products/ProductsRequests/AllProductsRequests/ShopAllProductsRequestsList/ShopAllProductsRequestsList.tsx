import { Tabs } from "antd";

import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  SHOP_PRODUCT_STATUSES,
  ShopProductStatusName,
} from "@pages/Shop/Products/_shared/utils/shopProductStatus";

import { SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB } from "./@types/@shopAllProductsRequestsList";
import ShopAllProductsRequestsListTabContent from "./helper/components/ShopAllProductsRequestsListTabContent/ShopAllProductsRequestsListTabContent";

const SHOP_ALL_PRODUCTS_REQUESTS_LIST_TAB_EXCEL_CODES: Record<
  typeof SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB | ShopProductStatusName,
  ExcelCodes
> = {
  [SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB]:
    ExcelCodes.SHOP_ALL_PRODUCTS_REQUESTS_ALL_LIST_TABLE,
  AWAITING_APPROVAL: ExcelCodes.SHOP_ALL_PRODUCTS_REQUESTS_AWAITING_APPROVAL_LIST_TABLE,
  ACCEPTED: ExcelCodes.SHOP_ALL_PRODUCTS_REQUESTS_ACCEPTED_LIST_TABLE,
  REJECTED: ExcelCodes.SHOP_ALL_PRODUCTS_REQUESTS_REJECTED_LIST_TABLE,
};

const ShopAllProductsRequestsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB;

  useTitle({ text: "درخواست‌های کالا" });

  //* ================================ Util Functions ================================
  const onTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const allRequestStatuses = SHOP_PRODUCT_STATUSES.map((status) => status.name);

  const tabsItems = [
    {
      key: SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB,
      label: "همه",
      children: (
        <ShopAllProductsRequestsListTabContent
          statuses={allRequestStatuses}
          draggableId={
            SHOP_ALL_PRODUCTS_REQUESTS_LIST_TAB_EXCEL_CODES[
              SHOP_ALL_PRODUCTS_REQUESTS_ALL_TAB
            ]
          }
        />
      ),
    },
    ...SHOP_PRODUCT_STATUSES.map((status) => ({
      key: status.name,
      label: status.title,
      children: (
        <ShopAllProductsRequestsListTabContent
          statuses={[status.name]}
          draggableId={SHOP_ALL_PRODUCTS_REQUESTS_LIST_TAB_EXCEL_CODES[status.name]}
        />
      ),
    })),
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default ShopAllProductsRequestsList;
