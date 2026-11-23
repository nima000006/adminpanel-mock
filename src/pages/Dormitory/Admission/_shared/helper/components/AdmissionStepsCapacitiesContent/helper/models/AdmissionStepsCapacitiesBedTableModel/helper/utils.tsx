import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AdmissionCapacityBedItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";
import {
  MY_ADMISSION_STATUS_CONFIG,
  SCHEDULE_TYPE_TAG_COLOR,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import { BED_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

export const getLinkedProgramColumns = (
  onTransfer?: (record: AdmissionCapacityBedItem) => void
): CustomColumnType<AdmissionCapacityBedItem>[] => {
  const columns: CustomColumnType<AdmissionCapacityBedItem>[] = [
    {
      title: "اطلاعات برنامه پذیرش متصل",
      children: [
        {
          title: "عنوان",
          dataIndex: "linkedProgramTitle",
          key: "linkedProgramTitle",
          width: 180,
          render: (value?: string) => (
            <Link to="">{dataPlaceHolder({ data: value })}</Link>
          ),
        },
        {
          title: "وضعیت",
          dataIndex: "linkedProgramStatus",
          key: "linkedProgramStatus",
          width: 120,
          render: (value?: string) => {
            if (!value || !(value in MY_ADMISSION_STATUS_CONFIG)) {
              return dataPlaceHolder({ data: value });
            }

            const status =
              MY_ADMISSION_STATUS_CONFIG[
                value as keyof typeof MY_ADMISSION_STATUS_CONFIG
              ];

            return (
              <CustomTag className="w-fit" color={status.color}>
                {status.title}
              </CustomTag>
            );
          },
        },
        {
          title: "نوع زمان‌بندی",
          dataIndex: "linkedProgramScheduleType",
          key: "linkedProgramScheduleType",
          width: 140,
          render: (value?: string) => {
            if (!value || !(value in SCHEDULE_TYPE_TAG_LABEL)) {
              return dataPlaceHolder({ data: value });
            }

            const scheduleType = value as keyof typeof SCHEDULE_TYPE_TAG_LABEL;

            return (
              <CustomTag className="w-fit" color={SCHEDULE_TYPE_TAG_COLOR[scheduleType]}>
                {SCHEDULE_TYPE_TAG_LABEL[scheduleType]}
              </CustomTag>
            );
          },
        },
        {
          title: "قیمت",
          dataIndex: "price",
          key: "linkedPrice",
          width: 150,
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
          dataIndex: "deposit",
          key: "linkedDeposit",
          width: 150,
          sortable: true,
          render: (value: number | null) =>
            dataPlaceHolder({
              data: value,
              isPrice: true,
              currency: { isAvailable: true, type: "تومان" },
            }),
        },
      ],
    },
    {
      title: "اطلاعات تخت",
      children: [
        {
          title: "کد تخت",
          dataIndex: "bedCode",
          key: "bedCode",
          width: 110,
          searchable: true,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "عنوان تخت",
          dataIndex: "bedTitle",
          key: "bedTitle",
          width: 120,
          searchable: true,
          render: (value: string | null) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نوع تخت",
          dataIndex: "bedType",
          key: "bedType",
          width: 140,
          render: (value?: string) => {
            const bedType = BED_TYPE[value as keyof typeof BED_TYPE];
            if (!bedType) return dataPlaceHolder({ data: value });

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
          render: (value: string | null) => dataPlaceHolder({ data: value }),
        },
        {
          title: "واحد اقامتی",
          dataIndex: "unitTitle",
          key: "unitTitle",
          width: 200,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نوع واحد اقامتی",
          dataIndex: "unitType",
          key: "unitType",
          width: 140,
          render: (value: string) => (
            <CustomTag className="w-fit">{dataPlaceHolder({ data: value })}</CustomTag>
          ),
        },
        {
          title: "درجه کیفی واحد اقامتی",
          dataIndex: "qualityGrade",
          key: "qualityGrade",
          width: 170,
          render: (value: string | null) => <DormitoryQualityGrade value={value} />,
        },
        {
          title: "طبقه",
          dataIndex: "floor",
          key: "floor",
          width: 120,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
        {
          title: "ساختمان",
          dataIndex: "building",
          key: "building",
          width: 130,
          render: (value: string) => dataPlaceHolder({ data: value }),
        },
      ],
    },
  ];

  if (onTransfer) {
    columns.push({
      title: "",
      key: "actions",
      fixed: "left" as FixedType,
      className: "tables-sticky-column-left",
      width: 160,
      render: (_: unknown, record: AdmissionCapacityBedItem) => (
        <CustomButton type="link" className="px-0!" onClick={() => onTransfer(record)}>
          انتقال به این برنامه
        </CustomButton>
      ),
    });
  }

  return columns;
};
