import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getShopProductStatusColor } from "@pages/Shop/Products/_shared/utils/shopProductStatus";

import { ShopAllProductsRequestsListRecordType } from "../../../@types/@shopAllProductsRequestsList";

const ShopAllProductsRequestsListTableModel = ({
  onView,
  showRejectReason = true,
}: {
  onView: (uuid: string) => void;
  showRejectReason?: boolean;
}): CustomColumnType<ShopAllProductsRequestsListRecordType>[] => {
  return [
    {
      title: "عنوان کالا",
      dataIndex: "title",
      key: "title",
      width: 186,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شابک",
      dataIndex: "isbn",
      key: "isbn",
      width: 160,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "فروشنده",
      dataIndex: "supplier",
      key: "supplier",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "supplierTitle",
        label: "فروشنده",
        type: "text",
      }),
      render: (value: ShopAllProductsRequestsListRecordType["supplier"]) =>
        dataPlaceHolder({ data: value?.title }),
    },
    ...(showRejectReason
      ? [
          {
            title: "دلیل رد",
            dataIndex: "rejectReason",
            key: "rejectReason",
            width: 240,
            render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
          },
        ]
      : []),
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value: IdTitleName) =>
        value?.title ? (
          <CustomTag className="w-fit" color={getShopProductStatusColor(value?.name)}>
            {value.title}
          </CustomTag>
        ) : (
          dataPlaceHolder({ data: value?.title })
        ),
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ثبت",
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
      width: 96,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: ShopAllProductsRequestsListRecordType) => (
        <CustomButton type="link" onClick={() => onView(record.uuid)}>
          مشاهده
        </CustomButton>
      ),
    },
  ];
};

export default ShopAllProductsRequestsListTableModel;
