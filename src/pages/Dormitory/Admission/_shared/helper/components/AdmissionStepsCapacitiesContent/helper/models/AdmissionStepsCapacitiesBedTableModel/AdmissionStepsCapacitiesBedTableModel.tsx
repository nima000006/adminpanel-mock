import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetAdmissionBedsListContent } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import { ADMISSION_STEPS_CAPACITIES_TABS } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/helper/util";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";
import {
  ADMISSION_STATUS_CAPACITIES_TABS,
  SCHEDULE_TYPE_TAG_COLOR,
} from "@pages/Dormitory/Admission/_shared/util";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

import { AdmissionStepsCapacitiesBedTableModelProps } from "./@types/@admissionStepsCapacitiesBedTableModelProps";

const AdmissionStepsCapacitiesBedTableModel = ({
  variant,
  onAdd,
  onEditPrice,
  onRemove,
  onTransfer,
}: AdmissionStepsCapacitiesBedTableModelProps): CustomColumnType<GetAdmissionBedsListContent>[] => {
  return [
    ...(variant === ADMISSION_STEPS_CAPACITIES_TABS.transferable ||
    variant === ADMISSION_STEPS_CAPACITIES_TABS.nonAddable
      ? [
          {
            title: "اطلاعات برنامه پذیرش متصل",
            children: [
              {
                title: "عنوان",
                dataIndex: "admissionPlanTitle",
                key: "admissionPlanTitle",
                width: 180,
                render: (value?: string) => (
                  <Link to="">{dataPlaceHolder({ data: value })}</Link>
                ),
              },
              {
                title: "وضعیت",
                dataIndex: "admissionPlanStatus",
                key: "admissionPlanStatus",
                width: 120,
                render: (value?: IdTitleName) => {
                  const config =
                    ADMISSION_STATUS_CAPACITIES_TABS[
                      value?.name as keyof typeof ADMISSION_STATUS_CAPACITIES_TABS
                    ];
                  if (!config) return dataPlaceHolder({ data: value?.title });

                  return (
                    <CustomTag className="w-fit" color={config.color}>
                      {config.title}
                    </CustomTag>
                  );
                },
              },
              {
                title: "نوع زمان‌بندی",
                dataIndex: "periodType",
                key: "periodType",
                width: 140,
                render: (value?: IdTitleName) => {
                  const color =
                    SCHEDULE_TYPE_TAG_COLOR[
                      value?.name as keyof typeof SCHEDULE_TYPE_TAG_COLOR
                    ];

                  if (!color) return dataPlaceHolder({ data: value?.title });

                  return (
                    <CustomTag className="w-fit" color={color}>
                      {value?.title}
                    </CustomTag>
                  );
                },
              },
              {
                title: "قیمت",
                dataIndex: "linkedPrice",
                key: "linkedPrice",
                width: 150,
                sortable: true,
                render: (_: number, record: GetAdmissionBedsListContent) =>
                  dataPlaceHolder({
                    data: record?.price,
                    isPrice: true,
                    currency: { isAvailable: true, type: "تومان" },
                  }),
              },
              {
                title: "مبلغ ودیعه",
                dataIndex: "linkedDepositAmount",
                key: "linkedDepositAmount",
                width: 150,
                sortable: true,
                render: (_: number, record: GetAdmissionBedsListContent) =>
                  dataPlaceHolder({
                    data: record?.depositAmount,
                    isPrice: true,
                    currency: { isAvailable: true, type: "تومان" },
                  }),
              },
            ],
          },
        ]
      : []),
    {
      title: "اطلاعات تخت",
      children: [
        {
          title: "قیمت",
          dataIndex: "price",
          key: "price",
          width: 150,
          hidden: variant !== ADMISSION_STEPS_CAPACITIES_TABS.thisProgram,
          sortable: true,
          render: (value: number) =>
            dataPlaceHolder({
              data: value,
              isPrice: true,
              currency: { isAvailable: true, type: "تومان" },
            }),
        },
        {
          title: "مبلغ ودیعه",
          dataIndex: "depositAmount",
          key: "depositAmount",
          width: 150,
          hidden: variant !== ADMISSION_STEPS_CAPACITIES_TABS.thisProgram,
          sortable: true,
          render: (value: number | null) =>
            dataPlaceHolder({
              data: value,
              isPrice: true,
              currency: { isAvailable: true, type: "تومان" },
            }),
        },
        {
          title: "کد تخت",
          dataIndex: "bedNumber",
          key: "bedNumber",
          width: 110,
          searchable: true,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "عنوان تخت",
          dataIndex: "title",
          key: "title",
          width: 120,
          searchable: true,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نوع تخت",
          dataIndex: "bedType",
          key: "bedType",
          width: 140,
          render: (value?: IdTitleName) => {
            const bedType = BED_TYPE[value?.name as keyof typeof BED_TYPE];
            if (!bedType) return dataPlaceHolder({ data: value?.title });

            const Icon = bedType.icon;
            return (
              <CustomTag className="w-fit" color={bedType.color}>
                <Icon size={16} />
                {bedType.label}
              </CustomTag>
            );
          },
        },
        {
          title: "موقعیت تخت",
          dataIndex: "bedPosition",
          key: "bedPosition",
          width: 120,
          render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
        },
        {
          title: "واحد اقامتی",
          dataIndex: "roomTitle",
          key: "roomTitle",
          width: 200,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نوع واحد اقامتی",
          dataIndex: "roomType",
          key: "roomType",
          width: 140,
          render: (value: IdTitleName) => (
            <CustomTag className="w-fit">
              {dataPlaceHolder({ data: value?.title })}
            </CustomTag>
          ),
        },
        {
          title: "درجه کیفی واحد اقامتی",
          dataIndex: "qualityGradeTitle",
          key: "qualityGradeTitle",
          width: 170,
          render: (value: string | null) => <DormitoryQualityGrade value={value} />,
        },
        {
          title: "طبقه",
          dataIndex: "floorTitle",
          key: "floorTitle",
          width: 120,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "ساختمان",
          dataIndex: "buildingTitle",
          key: "buildingTitle",
          width: 130,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "",
          key: "actions",
          fixed: "left" as FixedType,
          className: "tables-sticky-column-left",
          hidden: variant === ADMISSION_STEPS_CAPACITIES_TABS.nonAddable,
          width: variant === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram ? 220 : 140,
          render: (_: unknown, record: GetAdmissionBedsListContent) => {
            if (variant === ADMISSION_STEPS_CAPACITIES_TABS.withoutProgram) {
              return (
                <CustomButton
                  type="link"
                  className="px-0!"
                  onClick={() => onAdd?.(record)}
                >
                  افزودن به برنامه
                </CustomButton>
              );
            }

            if (variant === ADMISSION_STEPS_CAPACITIES_TABS.thisProgram) {
              return (
                <div className="flex items-center gap-2">
                  <CustomButton
                    type="link"
                    className="px-0!"
                    onClick={() => onEditPrice?.(record)}
                  >
                    ویرایش قیمت
                  </CustomButton>
                  <CustomButton
                    type="link"
                    danger
                    className="px-0!"
                    onClick={() => onRemove?.(record)}
                  >
                    حذف از برنامه
                  </CustomButton>
                </div>
              );
            }
            if (variant === ADMISSION_STEPS_CAPACITIES_TABS.transferable) {
              return (
                <CustomButton
                  type="link"
                  className="px-0!"
                  onClick={() => onTransfer?.(record)}
                >
                  انتقال به این برنامه
                </CustomButton>
              );
            }
          },
        },
      ],
    },
  ];
};

export default AdmissionStepsCapacitiesBedTableModel;
