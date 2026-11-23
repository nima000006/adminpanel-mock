import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";

import {
  ShopAllProductsDetailRecordType,
  ShopAllProductsDetailTableModelProps,
} from "../../../@types/@shopAllProductsDetail";

const ShopAllProductsDetailTableModel = ({
  onVisibleChange,
  pendingUuid,
  pendingVisible,
  isVisibleLoading,
}: ShopAllProductsDetailTableModelProps): CustomColumnType<ShopAllProductsDetailRecordType>[] => {
  return [
    {
      title: "فروشنده",
      dataIndex: "supplierTitle",
      key: "supplierTitle",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "قیمت خط خورده (تومان)",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      width: 180,
      render: (value?: number) =>
        dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "قیمت قابل پرداخت (تومان)",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (value: number) =>
        dataPlaceHolder({ data: value?.toString(), isPrice: true, isRial: true }),
    },
    {
      title: "موجودی",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "quantity",
        label: "موجودی",
        type: "sort",
      }),
      render: (value: number) => dataPlaceHolder({ data: value?.toString() }),
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
      title: "نمایش به کاربر",
      dataIndex: "visible",
      key: "visible",
      width: 140,
      render: (value: boolean, record: ShopAllProductsDetailRecordType) => {
        const isPendingRow = pendingUuid === record.uuid;

        return (
          <CustomSwitch
            valuePropName={`supplierVisible-${record.uuid}`}
            checked={isPendingRow && pendingVisible !== null ? pendingVisible : value}
            loading={!!isVisibleLoading && isPendingRow}
            onChange={(checked: boolean) => onVisibleChange(record.uuid, checked)}
          />
        );
      },
    },
  ];
};

export default ShopAllProductsDetailTableModel;
