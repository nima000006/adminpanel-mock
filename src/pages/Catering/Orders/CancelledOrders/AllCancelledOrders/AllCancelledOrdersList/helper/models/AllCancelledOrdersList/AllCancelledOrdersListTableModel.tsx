import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS,
  getCateringOrderFoodProgramTypeTagColor,
  getCateringOrderMealTagColor,
} from "@pages/Catering/Orders/_shared/utils";
import {
  AllCancelledOrdersListBasketSidePlan,
  AllCancelledOrdersListRecordType,
} from "@pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/@types/@allCancelledOrdersList";

const AllCancelledOrdersListTableModel =
  (): CustomColumnType<AllCancelledOrdersListRecordType>[] => [
    {
      title: "مبلغ عودت داده شده",
      dataIndex: "amount",
      key: "amount",
      width: 165,
      ...GetServerColumnSearchProps({
        dataIndex: "amount",
        label: "مبلغ عودت داده شده",
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
      title: "شماره تماس",
      dataIndex: "mobile",
      key: "mobile",
      width: 124,
      ...GetServerColumnSearchProps({
        dataIndex: "mobile",
        label: "شماره تماس",
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
      // todo[nima] add these filter when api will be ready
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
      render: (_: string, record: AllCancelledOrdersListRecordType) => (
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
      render: (value: number, record: AllCancelledOrdersListRecordType) => (
        <CustomTag
          color={getCateringOrderFoodProgramTypeTagColor(value)}
          className="w-fit"
        >
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
      render: (value: AllCancelledOrdersListBasketSidePlan[]) =>
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
      title: "زمان تحویل",
      dataIndex: "fromDeliveryTime",
      key: "fromDeliveryTime",
      width: 112,
      ...GetServerColumnSearchProps({
        dataIndex: "fromDeliveryTime",
        label: "زمان تحویل",
        type: "sort",
      }),
      render: (_: string, record: AllCancelledOrdersListRecordType) => {
        const from = dataPlaceHolder({
          data: record?.fromDeliveryTime,
          isDate: true,
          hasSpecialTime: true,
          customDateFormat: "HH:mm",
        });
        const to = dataPlaceHolder({
          data: record?.toDeliveryTime,
          isDate: true,
          hasSpecialTime: true,
          customDateFormat: "HH:mm",
        });

        if (from === "-" && to === "-") {
          return "-";
        }

        return `${to} - ${from}`;
      },
    },
    {
      title: "سلف",
      dataIndex: "restaurantTitle",
      key: "restaurantTitle",
      width: 169,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
  ];

export default AllCancelledOrdersListTableModel;
