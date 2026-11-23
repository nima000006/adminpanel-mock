import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { SHOP_ALL_VENDORS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/shop";
import { ShopAllVendorsListRecordType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/@types/@shopAllVendorsListTypes";

const ShopAllVendorsListTableModel =
  (): CustomColumnType<ShopAllVendorsListRecordType>[] => {
    return [
      {
        title: "نام فروشنده",
        dataIndex: "title",
        key: "title",
        width: 220,
        ...GetServerColumnSearchProps({
          dataIndex: "title",
          label: "نام فروشنده",
          type: "text",
        }),
        render: (value: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "تعداد کالا",
        dataIndex: "bookCount",
        key: "bookCount",
        width: 100,
        ...GetServerColumnSearchProps({
          dataIndex: "bookCount",
          label: "تعداد کالا",
          type: "sort",
        }),
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سفارشات باز",
        dataIndex: "openOrderCount",
        key: "openOrderCount",
        width: 120,
        ...GetServerColumnSearchProps({
          dataIndex: "openOrderCount",
          label: "سفارشات باز",
          type: "sort",
        }),
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "سفارشات بسته",
        dataIndex: "closedOrderCount",
        key: "closedOrderCount",
        width: 120,
        ...GetServerColumnSearchProps({
          dataIndex: "closedOrderCount",
          label: "سفارشات بسته",
          type: "sort",
        }),
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "",
        dataIndex: "uuid",
        key: "actions",
        width: 200,
        className: "tables-sticky-column-left",
        fixed: "right" as FixedType,
        render: (_: unknown, record: ShopAllVendorsListRecordType) => (
          <Link
            to={{
              pathname: SHOP_ALL_VENDORS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: record.uuid,
                title: record.title,
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

export default ShopAllVendorsListTableModel;
