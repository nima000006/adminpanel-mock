import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/shop";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { SHOP_ORDERS_STATUS_COLORS } from "@pages/Shop/_shared/utils";
import {
  GetShopAllOrdersListContentType,
  ShopAllOrdersListTabVariant,
} from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/@types/@shopAllOrdersList";

const EVENT_DATE_TITLES: Partial<Record<ShopAllOrdersListTabVariant, string>> = {
  expired: "تاریخ و ساعت انقضا",
  cancelled: "تاریخ و ساعت لغو",
  rejected: "تاریخ و ساعت رد",
};

const showsEventDate = (variant: ShopAllOrdersListTabVariant) =>
  variant === "expired" || variant === "cancelled" || variant === "rejected";

const ShopAllOrdersListTableModel = ({
  variant,
}: {
  variant: ShopAllOrdersListTabVariant;
}): CustomColumnType<GetShopAllOrdersListContentType>[] => [
  {
    title: "کد سفارش",
    dataIndex: "uuid",
    key: "uuid",
    width: 200,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (status: IdTitleName) => {
      return (
        <CustomTag color={SHOP_ORDERS_STATUS_COLORS[status?.name]}>
          {status?.title}
        </CustomTag>
      );
    },
  },
  {
    title: "فروشنده",
    dataIndex: "supplierTitle",
    key: "supplierTitle",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "supplierTitle",
      label: "فروشنده",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام خریدار",
    dataIndex: "buyerFirstName",
    key: "buyerFirstName",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "buyerFirstName",
      label: "نام خریدار",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام خانوادگی خریدار",
    dataIndex: "buyerLastName",
    key: "buyerLastName",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "buyerLastName",
      label: "نام خانوادگی خریدار",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "کد ملی خریدار",
    dataIndex: "nationalCode",
    key: "nationalCode",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "nationalCode",
      label: "کد ملی خریدار",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شماره موبایل خریدار",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
    width: 160,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تاریخ ثبت سفارش",
    dataIndex: "createdDate",
    key: "createdDate",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "createdDate",
      label: "تاریخ ثبت سفارش",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "YYYY/MM/DD HH:mm",
      }),
  },
  {
    title: "تعداد کالا",
    dataIndex: "itemsCount",
    key: "itemsCount",
    width: 140,
    render: (_: number, record: GetShopAllOrdersListContentType) =>
      dataPlaceHolder({
        data: `${record.quantity} قلم / ${record.itemsCount} عدد`,
      }),
  },
  {
    title: "مبلغ کل (تومان)",
    dataIndex: "totalPrice",
    key: "totalPrice",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "totalPrice",
      label: "مبلغ کل (تومان)",
      type: "sort",
    }),
    render: (value: number) => dataPlaceHolder({ data: value, isPrice: true }),
  },
  {
    title: EVENT_DATE_TITLES[variant] ?? "تاریخ و ساعت انقضا",
    dataIndex: "eventDateTime",
    key: "eventDateTime",
    width: 190,
    hidden: !showsEventDate(variant),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 90,
    className: "tables-sticky-column-left",
    render: (_: number, record: GetShopAllOrdersListContentType) => (
      <Link
        to={{
          pathname: SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE,
          search: makeSearchParams({
            id: record.uuid,
            status: record?.status?.name,
          }),
        }}
        className="text-link"
      >
        مشاهده
      </Link>
    ),
  },
];

export default ShopAllOrdersListTableModel;
