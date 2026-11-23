import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { ShopAllProductsListRecordType } from "../../../@types/@shopAllProductsList";

type ShopAllProductsListTableModelProps = {
  onView: (uuid: string) => void;
};

const ShopAllProductsListTableModel = ({
  onView,
}: ShopAllProductsListTableModelProps): CustomColumnType<ShopAllProductsListRecordType>[] => {
  return [
    {
      title: "عنوان کالا",
      dataIndex: "title",
      key: "title",
      width: 220,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
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
      title: "نویسنده",
      dataIndex: "a",
      key: "a",
      width: 160,
      render: (_value: string) => dataPlaceHolder({ data: emptyString }),
    },
    {
      title: "ناشر",
      dataIndex: "b",
      key: "b",
      width: 160,
      render: (_value: string) => dataPlaceHolder({ data: emptyString }),
    },
    {
      title: "تعداد فروشنده",
      dataIndex: "c",
      key: "c",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "",
        label: "تعداد فروشنده",
        type: "sort",
      }),
      render: () => dataPlaceHolder({ data: emptyString }),
    },
    {
      title: "کمترین قیمت (تومان)",
      dataIndex: "d",
      key: "d",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "",
        label: "کمترین قیمت (تومان)",
        type: "sort",
      }),
      render: () => dataPlaceHolder({ data: emptyString, isPrice: true, isRial: true }),
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "visible",
      key: "visible",
      width: 150,
      render: (value: boolean) => (
        <CustomTag className="w-fit" color={value ? "green" : "default"}>
          {value ? "قابل نمایش" : "غیرقابل نمایش"}
        </CustomTag>
      ),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "actions",
      width: 96,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllProductsListRecordType) => (
        <CustomButton type="link" onClick={() => onView(record.uuid)}>
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllProductsListTableModel;
