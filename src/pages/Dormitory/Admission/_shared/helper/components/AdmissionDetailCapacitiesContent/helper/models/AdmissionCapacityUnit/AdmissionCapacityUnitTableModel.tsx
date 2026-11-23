import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AdmissionCapacityOccupancyStatus } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { GetAdmissionUnitListContent } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import DormitoryQualityGrade from "@pages/Dormitory/Admission/_shared/helper/components/QualityGrade/DormitoryQualityGrade";
import {
  ADMISSION_CAPACITY_OCCUPANCY_STATUS,
  ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG,
} from "@pages/Dormitory/Admission/_shared/util";

const AdmissionCapacityUnitTableModel = ({
  from,
  onEditPrice,
  onDeleteFromProgram,
}: {
  from?: "active-admission-detail";
  onEditPrice?: (record: GetAdmissionUnitListContent) => void;
  onDeleteFromProgram?: (record: GetAdmissionUnitListContent) => void;
} = {}): CustomColumnType<GetAdmissionUnitListContent>[] => [
  {
    title: "قیمت",
    dataIndex: "price",
    key: "price",
    width: 150,
    sortable: true,
    render: (value: number) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        currency: { isAvailable: true as const, type: "تومان" },
      }),
  },
  {
    title: "مبلغ ودیعه",
    dataIndex: "deposit",
    key: "deposit",
    width: 150,
    sortable: true,
    render: (value: number | null) =>
      dataPlaceHolder({
        data: value,
        isPrice: true,
        currency: { isAvailable: true as const, type: "تومان" },
      }),
  },
  {
    title: "وضعیت اشغال",
    dataIndex: "occupancyStatus",
    key: "occupancyStatus",
    width: 140,
    hidden: from === "active-admission-detail" ? false : true,
    render: (value: AdmissionCapacityOccupancyStatus | null | undefined) => {
      if (value == null || !ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG[value]) {
        return dataPlaceHolder({ data: value });
      }

      const occupancyConfig = ADMISSION_CAPACITY_OCCUPANCY_STATUS_CONFIG[value];

      return (
        <CustomTag className="w-fit" color={occupancyConfig.color}>
          {occupancyConfig.label}
        </CustomTag>
      );
    },
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
  {
    title: "آخرین اقدام کننده",
    dataIndex: "lastActor",
    key: "lastActor",
    width: 140,
    hidden: from === "active-admission-detail" ? false : true,
    render: (value: string | null | undefined) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تاریخ آخرین اقدام",
    dataIndex: "lastActionDate",
    key: "lastActionDate",
    width: 160,
    sortable: true,
    hidden: from === "active-admission-detail" ? false : true,
    render: (value: string | null | undefined) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "HH:mm، YYYY/MM/DD",
      }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 180,
    className: "tables-sticky-column-left",
    fixed: "right" as FixedType | undefined,
    hidden: from === "active-admission-detail" ? false : true,
    render: (_: unknown, record: GetAdmissionUnitListContent) => {
      const isActionsEnabled =
        record.roomType?.name === ADMISSION_CAPACITY_OCCUPANCY_STATUS.vacant;

      return (
        <div className="flex items-center">
          <CustomButton
            type="link"
            disabled={!isActionsEnabled}
            onClick={() => onEditPrice?.(record)}
          >
            ویرایش قیمت
          </CustomButton>
          <CustomButton
            type="link"
            danger
            disabled={!isActionsEnabled}
            onClick={() => onDeleteFromProgram?.(record)}
          >
            حذف از برنامه
          </CustomButton>
        </div>
      );
    },
  },
];

export default AdmissionCapacityUnitTableModel;
