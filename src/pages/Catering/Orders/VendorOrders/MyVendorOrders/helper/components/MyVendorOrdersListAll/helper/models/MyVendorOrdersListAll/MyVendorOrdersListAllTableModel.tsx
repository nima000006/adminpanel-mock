import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  CATERING_ORDER_DELIVERY_STATUS,
  CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS,
  getCateringOrderFoodProgramTypeTagColor,
  getCateringOrderMealTagColor,
} from "@pages/Catering/Orders/_shared/utils";
import {
  getVendorOrdersDeliveryStatusLabel,
  getVendorOrdersDeliveryStatusTagColor,
} from "@pages/Catering/Orders/VendorOrders/_shared/utils";
import {
  MyVendorOrdersListAllTableModelParams,
  MyVendorOrdersListDeliveryStatus,
  MyVendorOrdersListRecordType,
} from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/@types/@myVendorOrdersList";

const MyVendorOrdersListAllTableModel = ({
  onDeliverOrder,
}: MyVendorOrdersListAllTableModelParams = {}): CustomColumnType<MyVendorOrdersListRecordType>[] => [
  {
    title: "تاریخ برنامه غذایی",
    dataIndex: "startReservationDate",
    key: "startReservationDate",
    width: 162,
    ...GetServerColumnSearchProps({
      dataIndex: "reserveDate",
      label: "تاریخ برنامه غذایی",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "dddd DD MMMM YYYY",
      }),
  },
  {
    title: "وضعیت تحویل",
    dataIndex: "deliveryStatus",
    key: "deliveryStatus",
    width: 150,
    render: (value: MyVendorOrdersListDeliveryStatus) => {
      const label = getVendorOrdersDeliveryStatusLabel(value);

      return label ? (
        <CustomTag
          color={getVendorOrdersDeliveryStatusTagColor(value?.id)}
          className="w-fit"
        >
          {label}
        </CustomTag>
      ) : (
        dataPlaceHolder({ data: label })
      );
    },
  },
  {
    title: "زمان تحویل",
    dataIndex: "deliverDate",
    key: "deliverDate",
    width: 180,
    ...GetServerColumnSearchProps({
      dataIndex: "deliverDate",
      label: "زمان تحویل",
      type: "sort",
    }),
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "dddd DD MMMM YYYY، HH:mm",
      }),
  },
  {
    title: "تحویل دهنده",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    width: 130,
    //todo[nima] uncomment this after backend is updated
    // ...GetServerColumnSearchProps({
    //   dataIndex: "modifiedBy",
    //   label: "تحویل دهنده",
    //   type: "text",
    // }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شماره سفارش",
    dataIndex: "id",
    key: "id",
    width: 132,
    ...GetServerColumnSearchProps({
      dataIndex: "basketPlanIds",
      label: "شماره سفارش",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام",
    dataIndex: "firstName",
    key: "firstName",
    width: 88,
    ...GetServerColumnSearchProps({
      dataIndex: "firstName",
      label: "نام",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "lastName",
    key: "lastName",
    width: 125,
    ...GetServerColumnSearchProps({
      dataIndex: "lastName",
      label: "نام خانوادگی",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "کد ملی / فراگیر",
    dataIndex: "userName",
    key: "userName",
    width: 138,
    ...GetServerColumnSearchProps({
      dataIndex: "userName",
      label: "کد ملی / فراگیر",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شماره دانشجویی / پرسنلی",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: 198,
    ...GetServerColumnSearchProps({
      dataIndex: "studentNumber",
      label: "شماره دانشجویی / پرسنلی",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شعبه / واحد",
    dataIndex: "branchName",
    key: "branchName",
    width: 137,
    render: (value: string) =>
      value ? (
        <CustomTag className="w-fit">{value}</CustomTag>
      ) : (
        dataPlaceHolder({ data: value })
      ),
  },
  {
    title: "مقطع تحصیلی",
    dataIndex: "levelName",
    key: "levelName",
    width: 187,
    render: (value: string) =>
      value ? (
        <CustomTag className="w-fit">{value}</CustomTag>
      ) : (
        dataPlaceHolder({ data: value })
      ),
  },
  {
    title: "رشته تحصیلی",
    dataIndex: "fieldName",
    key: "fieldName",
    width: 136,
    render: (value: string) =>
      value ? (
        <CustomTag className="w-fit">{value}</CustomTag>
      ) : (
        dataPlaceHolder({ data: value })
      ),
  },
  {
    title: "غذا",
    dataIndex: "productTitle",
    key: "productTitle",
    width: 137,
    //todo[nima] uncomment this after backend is updated
    // ...GetServerColumnSearchProps({
    //   dataIndex: "productTitle",
    //   label: "غذا",
    //   type: "text",
    // }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "وعده",
    dataIndex: "mealName",
    key: "mealName",
    width: 81,
    render: (_: string, record: MyVendorOrdersListRecordType) => (
      <CustomTag color={getCateringOrderMealTagColor(record?.mealId)} className="w-fit">
        {dataPlaceHolder({ data: record?.mealName })}
      </CustomTag>
    ),
  },
  {
    title: "نوع برنامه غذایی",
    dataIndex: "requestType",
    key: "requestType",
    width: 116,
    render: (value: number, record: MyVendorOrdersListRecordType) => (
      <CustomTag color={getCateringOrderFoodProgramTypeTagColor(value)} className="w-fit">
        {dataPlaceHolder({
          data: record?.reserveName || CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS[value],
        })}
      </CustomTag>
    ),
  },
  {
    title: "تعداد",
    dataIndex: "quantity",
    key: "quantity",
    width: 87,
    ...GetServerColumnSearchProps({
      dataIndex: "quantity",
      label: "تعداد",
      type: "sort",
    }),
    render: (value: number) =>
      value == null
        ? dataPlaceHolder({ data: value })
        : `${dataPlaceHolder({ data: value })} سفارش`,
  },
  {
    title: "مخلفات",
    dataIndex: "basketSidePlans",
    key: "basketSidePlans",
    width: 220,
    //todo[nima] uncomment this after backend is updated
    // ...GetServerColumnSearchProps({
    //   dataIndex: "basketSidePlans",
    //   label: "مخلفات",
    //   type: "text",
    // }),
    render: (value: MyVendorOrdersListRecordType["basketSidePlans"]) =>
      dataPlaceHolder({
        data: value
          ?.map((item) => {
            const title = item?.productTitle || item?.sidePlanTitle;
            if (!title) {
              return null;
            }

            return item?.quantity == null ? title : `${title} (${item.quantity})`;
          })
          .filter(Boolean)
          .join(" - "),
      }),
  },
  {
    title: "قیمت کل سفارش",
    dataIndex: "totalAmountWithSidePlan",
    key: "totalAmountWithSidePlan",
    width: 146,
    ...GetServerColumnSearchProps({
      dataIndex: "totalamountwithsideplans",
      label: "قیمت کل سفارش",
      type: "sort",
    }),
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        isRial: true,
        currency: { isAvailable: true, type: "تومان" },
      }),
  },
  {
    title: "سلف",
    dataIndex: "restaurantTitle",
    key: "restaurantTitle",
    width: 169,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 120,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: number, record: MyVendorOrdersListRecordType) => (
      <CustomButton
        type="link"
        disabled={
          record?.deliveryStatus?.id !== CATERING_ORDER_DELIVERY_STATUS.NOT_DELIVERED
        }
        onClick={() => onDeliverOrder?.(record)}
      >
        تحویل سفارش
      </CustomButton>
    ),
  },
];

export default MyVendorOrdersListAllTableModel;
