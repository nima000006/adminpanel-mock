import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/shop";
import {
  getShopVendorOrderStatusColor,
  getShopVendorOrderStatusLabel,
} from "@pages/Shop/Vendors/_shared/utils";
import {
  ShopAllVendorsDetailOrdersRecordType,
  ShopVendorOrderStatusItem,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/@types/@shopAllVendorsDetailOrders";

const ShopAllVendorsDetailOrdersTableModel =
  (): CustomColumnType<ShopAllVendorsDetailOrdersRecordType>[] => {
    return [
      {
        title: "کد سفارش",
        dataIndex: "uuid",
        key: "uuid",
        width: 120,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "وضعیت",
        dataIndex: "status",
        key: "status",
        width: 220,
        render: (status: ShopVendorOrderStatusItem) =>
          status ? (
            <CustomTag className="w-fit" color={getShopVendorOrderStatusColor(status.id)}>
              {getShopVendorOrderStatusLabel(status.id, status.count)}
            </CustomTag>
          ) : (
            dataPlaceHolder({ data: null })
          ),
      },
      {
        title: "نام خریدار",
        dataIndex: "buyerFirstName",
        key: "buyerFirstName",
        width: 120,
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
        width: 150,
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
        width: 140,
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
        width: 150,
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تاریخ ثبت سفارش",
        dataIndex: "createdDate",
        key: "createdDate",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "createdDate",
          label: "تاریخ ثبت سفارش",
          type: "sort",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تعداد کالا",
        dataIndex: "itemsCount",
        key: "itemsCount",
        width: 140,
        render: (_: number, record: ShopAllVendorsDetailOrdersRecordType) =>
          dataPlaceHolder({
            data: `${record.itemsCount ?? 0} قلم / ${record.quantity ?? 0} عدد`,
          }),
      },
      {
        title: "مبلغ کل (تومان)",
        dataIndex: "totalPrice",
        key: "totalPrice",
        width: 140,
        ...GetServerColumnSearchProps({
          dataIndex: "totalPrice",
          label: "مبلغ کل (تومان)",
          type: "sort",
        }),
        render: (value: number) =>
          dataPlaceHolder({
            data: value != null ? value.toLocaleString("fa-IR") : null,
          }),
      },
      {
        title: "",
        dataIndex: "uuid",
        key: "actions",
        width: 80,
        fixed: "right" as FixedType,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: ShopAllVendorsDetailOrdersRecordType) => (
          <Link
            to={{
              pathname: SHOP_ALL_ORDERS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: record.uuid,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        ),
      },
    ];
  };

export default ShopAllVendorsDetailOrdersTableModel;
