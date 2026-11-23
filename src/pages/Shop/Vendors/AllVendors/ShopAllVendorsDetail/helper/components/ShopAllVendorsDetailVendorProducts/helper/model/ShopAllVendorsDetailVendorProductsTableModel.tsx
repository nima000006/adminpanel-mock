import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { ShopAllVendorsDetailVendorProductsRecordType } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/@types/@shopAllVendorsDetailVendorProducts";

const ShopAllVendorsDetailVendorProductsTableModel = ({
  onView,
}: {
  onView: (record: ShopAllVendorsDetailVendorProductsRecordType) => void;
}): CustomColumnType<ShopAllVendorsDetailVendorProductsRecordType>[] => {
  return [
    {
      title: "عنوان کالا",
      dataIndex: "title",
      key: "title",
      width: 220,
      ...GetServerColumnSearchProps({
        dataIndex: "productTitle",
        label: "عنوان کالا",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شابک",
      dataIndex: "isbn",
      key: "isbn",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "isbn",
        label: "شابک",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قیمت خط خورده (تومان)",
      dataIndex: "price",
      key: "price",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "price",
        label: "قیمت خط خورده (تومان)",
        type: "sort",
      }),
      render: (value: number) => dataPlaceHolder({ data: value, isPrice: true }),
    },
    {
      title: "قیمت قابل پرداخت (تومان)",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "discountedPrice",
        label: "قیمت قابل پرداخت (تومان)",
        type: "sort",
      }),
      render: (value: number | null) => dataPlaceHolder({ data: value, isPrice: true }),
    },
    {
      title: "موجودی",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      ...GetServerColumnSearchProps({
        dataIndex: "quantity",
        label: "موجودی",
        type: "sort",
      }),
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ افزودن",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ افزودن",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "actions",
      width: 80,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllVendorsDetailVendorProductsRecordType) => (
        <CustomButton type="link" onClick={() => onView(record)}>
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllVendorsDetailVendorProductsTableModel;
