import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  displayStatusMap,
  facilitiesRelatedToConfig,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/_shared/utils";
import { DormitoryFacilitiesListItemType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/@types/@dormitoryBaseInfoFacilitiesList";
import { FACILITY_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const DormitoryBasicInfoFacilitiesListTableModel = ({
  onEditHandler,
}: {
  onEditHandler: (record: DormitoryFacilitiesListItemType) => void;
}): CustomColumnType<DormitoryFacilitiesListItemType>[] => {
  return [
    {
      title: "عنوان امکانات",
      dataIndex: "title",
      key: "title",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان امکانات",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "واحد اندازه‌گیری",
      dataIndex: "unitOfMeasure",
      key: "unitOfMeasure",
      width: 110,
      render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
    },
    {
      title: "نوع امکانات",
      dataIndex: "amenityCategory",
      key: "amenityCategory",
      width: 110,
      render: (value: IdTitleName) => {
        const facilityType = FACILITY_TYPE[value?.name as keyof typeof FACILITY_TYPE];

        if (!facilityType) {
          return dataPlaceHolder({ data: value?.title });
        }

        const Icon = facilityType.icon;
        return (
          <CustomTag className="w-fit" color={facilityType.color} icon={<Icon />}>
            {facilityType.label}
          </CustomTag>
        );
      },
    },
    {
      title: "امکانات مربوط به",
      dataIndex: "unitLevels",
      key: "unitLevels",
      width: 200,
      render: (value: IdTitleName[]) => (
        <div className="flex flex-wrap items-center gap-1">
          {value?.map((item) => {
            const config =
              facilitiesRelatedToConfig[
                item.name as keyof typeof facilitiesRelatedToConfig
              ];

            if (!config) {
              return (
                <CustomTag key={item.id}>
                  {dataPlaceHolder({ data: item.title })}
                </CustomTag>
              );
            }

            const Icon = config.icon;

            return (
              <CustomTag
                key={item.id}
                className="[&>svg]:h-5 [&>svg]:w-4"
                icon={<Icon />}
              >
                {config.title}
              </CustomTag>
            );
          })}
        </div>
      ),
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "visible",
      key: "visible",
      width: 150,
      render: (value: boolean) => {
        const status = displayStatusMap[String(value) as "true" | "false"];

        return (
          <CustomTag className="w-fit" color={status.color}>
            {status.title}
          </CustomTag>
        );
      },
    },
    {
      title: "ایجاد کننده",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 110,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "تاریخ آخرین اقدام",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY-MM-DD",
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: DormitoryFacilitiesListItemType) => (
        <div>
          <CustomButton type="link" onClick={() => onEditHandler(record)}>
            ویرایش
          </CustomButton>
        </div>
      ),
    },
  ];
};
export default DormitoryBasicInfoFacilitiesListTableModel;
