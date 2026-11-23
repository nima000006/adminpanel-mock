import { Progress } from "antd";
import { BsEye } from "react-icons/bs";
import { PiCheck, PiCopy, PiPencilLine, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { convertDateToPersianTextDateWithWeekday } from "@infra/helpers/dateConvertor";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, intlNumber } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  AllFoodSchedulesTableTodayTabTableModelProps,
  AllFoodSchedulesTableTodayTabRecordType,
} from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTableTodayTab/@types/@allFoodSchedulesTableTodayTab";
import {
  CATERING_FOOD_SCHEDULE_MEALS_COLORS,
  CATERING_FOOD_SCHEDULE_MEALS_LABELS,
  getCateringFoodScheduleRequestTypeTagConfig,
} from "@pages/Catering/Selfs/_shared/utils";

const FULL_CAPACITY_PERCENT = 100;
const EMPTY_CAPACITY_COUNT = 0;
const PROGRESS_STROKE_EMPTY = "var(--neutral-5)";
const PROGRESS_STROKE_PARTIAL = "var(--primary-6)";
const PROGRESS_STROKE_FULL = "var(--dustred-5)";
const PROGRESS_STROKE_WIDTH = 4;

const getOrderToCapacityStrokeColor = (percent: number) => {
  if (percent <= EMPTY_CAPACITY_COUNT) {
    return PROGRESS_STROKE_EMPTY;
  }

  if (percent >= FULL_CAPACITY_PERCENT) {
    return PROGRESS_STROKE_FULL;
  }

  return PROGRESS_STROKE_PARTIAL;
};

const renderReservationDateTime = (value: string) => {
  if (!value) {
    return dataPlaceHolder({ data: value });
  }

  const dateLabel = convertDateToPersianTextDateWithWeekday(value);
  const timeLabel = dataPlaceHolder({
    data: value,
    isDate: true,
    hasSpecialTime: true,
    customDateFormat: "HH:mm",
  });

  return `${dateLabel} - ${timeLabel}`;
};

const AllFoodSchedulesTableTodayTabTableModel = ({
  onView,
  onEdit,
  onCopy,
  onDeActive,
}: AllFoodSchedulesTableTodayTabTableModelProps): CustomColumnType<AllFoodSchedulesTableTodayTabRecordType>[] => [
  {
    title: "زمان تحویل",
    dataIndex: "fromDeliveryTime",
    key: "fromDeliveryTime",
    width: 140,
    ...GetServerColumnSearchProps({
      dataIndex: "fromDeliveryTime",
      label: "زمان تحویل",
      type: "sort",
    }),
    render: (_: string, record: AllFoodSchedulesTableTodayTabRecordType) => {
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

      return `${from} - ${to}`;
    },
  },
  {
    title: "غذا",
    dataIndex: "productTitle",
    key: "productTitle",
    width: 160,
    ...GetServerColumnSearchProps({
      dataIndex: "productTitle",
      label: "غذا",
      type: "text",
    }),
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "وعده",
    dataIndex: "mealId",
    key: "mealId",
    width: 100,
    render: (value: number) => (
      <CustomTag color={CATERING_FOOD_SCHEDULE_MEALS_COLORS[value]} className="w-fit">
        {dataPlaceHolder({ data: CATERING_FOOD_SCHEDULE_MEALS_LABELS[value] })}
      </CustomTag>
    ),
  },
  {
    title: "نوع برنامه غذایی",
    dataIndex: "requestType",
    key: "requestType",
    width: 130,
    render: (value: number, record: AllFoodSchedulesTableTodayTabRecordType) => {
      const config = getCateringFoodScheduleRequestTypeTagConfig(
        value,
        record?.requestTitle
      );

      if (!config?.label) {
        return dataPlaceHolder({ data: record?.requestTitle });
      }

      return (
        <CustomTag color={config.color} className="w-fit">
          {config.label}
        </CustomTag>
      );
    },
  },
  {
    title: "مخلفات",
    dataIndex: "sidePlans",
    key: "sidePlans",
    width: 90,
    render: (value: AllFoodSchedulesTableTodayTabRecordType["sidePlans"]) => {
      if (!value?.length) {
        return null;
      }

      return (
        <CustomTooltip
          title={
            <div className="flex flex-col gap-1">
              {value.map((sidePlan) => (
                <span key={sidePlan.id}>
                  {dataPlaceHolder({
                    data: sidePlan.sidePlanTitle + " " + sidePlan.sidePlanTypeTitle,
                  })}
                </span>
              ))}
            </div>
          }
        >
          <CustomTag className="w-fit" color="green">
            <PiCheck />
          </CustomTag>
        </CustomTooltip>
      );
    },
  },
  {
    title: "نسبت سفارش به ظرفیت",
    dataIndex: "reservationsCount",
    key: "reservationsCount",
    width: 170,
    ...GetServerColumnSearchProps({
      dataIndex: "reservationsCount",
      label: "نسبت سفارش به ظرفیت",
      type: "sort",
    }),
    render: (_: number, record: AllFoodSchedulesTableTodayTabRecordType) => {
      const orderCount = record?.reservationsCount ?? EMPTY_CAPACITY_COUNT;
      const capacity = record?.maxCount ?? EMPTY_CAPACITY_COUNT;
      const percent =
        capacity > EMPTY_CAPACITY_COUNT
          ? Math.min(
              FULL_CAPACITY_PERCENT,
              Math.round((orderCount / capacity) * FULL_CAPACITY_PERCENT)
            )
          : EMPTY_CAPACITY_COUNT;

      return (
        <div className="flex w-full flex-col gap-1">
          <span className="text-neutral-11 text-sm whitespace-nowrap">
            {`${intlNumber(orderCount)} از ${intlNumber(capacity)}`}
          </span>
          <Progress
            className="m-0!"
            percent={percent}
            strokeColor={getOrderToCapacityStrokeColor(percent)}
            strokeWidth={PROGRESS_STROKE_WIDTH}
            showInfo={false}
          />
        </div>
      );
    },
  },
  {
    title: "سلف",
    dataIndex: "restaurantTitle",
    key: "restaurantTitle",
    width: 180,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شروع رزرو",
    dataIndex: "startReservationDate",
    key: "startReservationDate",
    width: 200,
    render: (value: string) => renderReservationDateTime(value),
  },
  {
    title: "پایان رزرو",
    dataIndex: "endReservationDate",
    key: "endReservationDate",
    width: 200,
    render: (value: string) => renderReservationDateTime(value),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 50,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: AllFoodSchedulesTableTodayTabRecordType) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => onView(record),
        },
        {
          id: 2,
          Icon: PiPencilLine,
          title: "ویرایش",
          onclick: () => onEdit(record),
        },
        {
          id: 3,
          Icon: PiCopy,
          title: "کپی",
          onclick: () => onCopy(record),
        },
        {
          id: 4,
          Icon: PiTrash,
          title: "غیر فعال سازی",
          onclick: () => onDeActive(record),
        },
      ];

      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];

export default AllFoodSchedulesTableTodayTabTableModel;
