import { PiCheck } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { convertDateToPersianTextDateWithWeekday } from "@infra/helpers/dateConvertor";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringSelfsFoodScheduleRecordType } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsFoodSchedule/@types/@cateringSelfsFoodSchedule";
import {
  getCateringFoodScheduleMealTagColor,
  getCateringFoodScheduleRequestTypeTagConfig,
  getCateringSelfStatusTypeTagConfig,
} from "@pages/Catering/Selfs/_shared/utils";

const CateringSelfsFoodScheduleTableModels =
  (): CustomColumnType<CateringSelfsFoodScheduleRecordType>[] => {
    return [
      {
        title: "تاریخ برنامه غذایی",
        dataIndex: "reserveDate",
        key: "reserveDate",
        width: 160,
        ...GetServerColumnSearchProps({
          dataIndex: "reserveDate",
          label: "تاریخ برنامه غذایی",
          type: "sort",
        }),
        render: (value: string) => convertDateToPersianTextDateWithWeekday(value),
      },
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
        render: (_: string, record: CateringSelfsFoodScheduleRecordType) => {
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
        title: "وضعیت",
        dataIndex: "statusType",
        key: "statusType",
        width: 120,
        render: (value: CateringSelfsFoodScheduleRecordType["statusType"]) => {
          const config = getCateringSelfStatusTypeTagConfig(value);

          if (!config?.label) {
            return dataPlaceHolder({ data: value?.faTitle ?? value?.title });
          }

          return (
            <CustomTag className="w-fit" color={config.color}>
              {config.label}
            </CustomTag>
          );
        },
      },
      {
        title: "غذا",
        dataIndex: "productTitle",
        key: "productTitle",
        width: 160,
        // TODO[nima]: Uncomment this when the API is updated
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
        width: 110,
        render: (value: string) => {
          if (!value) {
            return dataPlaceHolder({ data: value });
          }

          return (
            <CustomTag
              className="w-fit"
              color={getCateringFoodScheduleMealTagColor(value)}
            >
              {value}
            </CustomTag>
          );
        },
      },
      {
        title: "نوع برنامه غذایی",
        dataIndex: "requestType",
        key: "requestType",
        width: 140,
        render: (value: number, record: CateringSelfsFoodScheduleRecordType) => {
          const config = getCateringFoodScheduleRequestTypeTagConfig(
            value,
            record?.requestTitle
          );

          if (!config?.label) {
            return dataPlaceHolder({ data: record?.requestTitle });
          }

          return (
            <CustomTag className="w-fit" color={config.color}>
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
        render: (value: CateringSelfsFoodScheduleRecordType["sidePlans"]) => {
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
        title: "شروع رزرو",
        dataIndex: "startReservationDate",
        key: "startReservationDate",
        width: 170,
        // TODO[nima]: Uncomment this when the API is updated
        // ...GetServerColumnSearchProps({
        //   dataIndex: "startReservationDate",
        //   label: "شروع رزرو",
        //   type: "sort",
        // }),
        render: (value: string) => convertDateToPersianTextDateWithWeekday(value),
      },
      {
        title: "پایان رزرو",
        dataIndex: "endReservationDate",
        key: "endReservationDate",
        width: 170,
        render: (value: string) => convertDateToPersianTextDateWithWeekday(value),
      },
    ];
  };

export default CateringSelfsFoodScheduleTableModels;
