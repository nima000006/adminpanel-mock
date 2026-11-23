import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { SHOP_ORDERS_STATUS_COLORS } from "@pages/Shop/_shared/utils";
import { GetShopAllOrdersDetailItem } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/@types/@shopAllOrdersDetail";

const ShopAllOrdersDetailItemsTableModel = ({
  showRejectAction,
  onView,
  onReject,
}: {
  showRejectAction: boolean;
  onView: (record: GetShopAllOrdersDetailItem) => void;
  onReject: (record: GetShopAllOrdersDetailItem) => void;
}): CustomColumnType<GetShopAllOrdersDetailItem>[] => [
  {
    title: "کالا",
    dataIndex: "title",
    key: "title",
    width: 280,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "قیمت واحد (تومان)",
    dataIndex: "unitPrice",
    key: "unitPrice",
    width: 160,
    render: (value: number) => dataPlaceHolder({ data: value, isPrice: true }),
  },
  {
    title: "تعداد",
    dataIndex: "quantity",
    key: "quantity",
    width: 90,
    render: (value: number) => dataPlaceHolder({ data: value }),
  },
  {
    title: "مبلغ کل (تومان)",
    dataIndex: "totalPrice",
    key: "totalPrice",
    width: 160,
    render: (value: number) => dataPlaceHolder({ data: value, isPrice: true }),
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
    width: 180,
    render: (status: IdTitleName) => (
      <CustomTag color={SHOP_ORDERS_STATUS_COLORS[status?.name]}>
        {status?.title}
      </CustomTag>
    ),
  },
  {
    title: "",
    dataIndex: "id",
    key: "view",
    fixed: "right" as FixedType,
    width: 90,
    className: "tables-sticky-column-left",
    render: (_: number, record: GetShopAllOrdersDetailItem) => (
      <div className="flex gap-2">
        {showRejectAction && (
          <CustomButton type="link" danger onClick={() => onReject(record)}>
            رد
          </CustomButton>
        )}
        <CustomButton type="link" className="text-link" onClick={() => onView(record)}>
          مشاهده
        </CustomButton>
      </div>
    ),
  },
];

export default ShopAllOrdersDetailItemsTableModel;
