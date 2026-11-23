import { BsEye } from "react-icons/bs";
import { FiArchive } from "react-icons/fi";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  ADMISSION_GENDER_CONFIG,
  ADMISSION_VISIBILITY,
  ADMISSION_VISIBILITY_CONFIG,
  RESERVABLE_CAPACITY_CONFIG,
  SCHEDULE_TYPE_TAG_COLOR,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionActiveListItem } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionActiveList/@types/@allAdmissionActiveList";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const AllAdmissionActiveListTableModel = ({
  onView,
  onDeactivate,
}: {
  onView: (id: number) => void;
  onDeactivate: (id: number) => void;
}): CustomColumnType<AllAdmissionActiveListItem>[] => [
  {
    title: "برنامه پذیرش",
    dataIndex: "programTitle",
    key: "programTitle",
    width: 200,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "وضعیت نمایش به کاربران",
    dataIndex: "isVisibleToUsers",
    key: "isVisibleToUsers",
    width: 170,
    render: (value: boolean | null | undefined) => {
      if (value == null) {
        return dataPlaceHolder({ data: value });
      }

      const visibility = value
        ? ADMISSION_VISIBILITY_CONFIG[ADMISSION_VISIBILITY.visible]
        : ADMISSION_VISIBILITY_CONFIG[ADMISSION_VISIBILITY.hidden];

      return (
        <CustomTag className="w-fit" color={visibility.color}>
          {visibility.label}
        </CustomTag>
      );
    },
  },
  {
    title: "اقامتگاه",
    dataIndex: "residence",
    key: "residence",
    width: 160,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "شعبه / واحد",
    dataIndex: "branch",
    key: "branch",
    width: 120,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managementType",
    key: "managementType",
    width: 110,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "جنسیت پذیرش",
    dataIndex: "gender",
    key: "gender",
    width: 160,
    render: (value: AllAdmissionActiveListItem["gender"] | null | undefined) => {
      if (value == null || !ADMISSION_GENDER_CONFIG[value]) {
        return dataPlaceHolder({ data: value });
      }

      const genderConfig = ADMISSION_GENDER_CONFIG[value];

      return (
        <CustomTag className="w-fit gap-1" color={genderConfig.color}>
          {genderConfig.label}
        </CustomTag>
      );
    },
  },
  {
    title: "ظرفیت قابل رزرو",
    dataIndex: "reservableCapacity",
    key: "reservableCapacity",
    width: 140,
    render: (
      value: AllAdmissionActiveListItem["reservableCapacity"] | null | undefined
    ) => {
      if (value == null || !RESERVABLE_CAPACITY_CONFIG[value]) {
        return dataPlaceHolder({ data: value });
      }

      const capacityConfig = RESERVABLE_CAPACITY_CONFIG[value];
      const Icon = capacityConfig.icon;

      return (
        <CustomTag className="w-fit gap-1" color={capacityConfig.color}>
          <Icon size={14} />
          {capacityConfig.label}
        </CustomTag>
      );
    },
  },
  {
    title: "نوع زمان‌بندی",
    dataIndex: "scheduleType",
    key: "scheduleType",
    width: 140,
    render: (value: AllAdmissionActiveListItem["scheduleType"] | null | undefined) => {
      if (value == null || !SCHEDULE_TYPE_TAG_LABEL[value]) {
        return dataPlaceHolder({ data: value });
      }

      return (
        <CustomTag className="w-fit" color={SCHEDULE_TYPE_TAG_COLOR[value]}>
          {SCHEDULE_TYPE_TAG_LABEL[value]}
        </CustomTag>
      );
    },
  },
  {
    title: "نوع رزرو",
    dataIndex: "reserveType",
    key: "reserveType",
    width: 140,
    render: (value: AllAdmissionActiveListItem["reserveType"] | null | undefined) => {
      const config = value ? RESERVE_TYPE[value as keyof typeof RESERVE_TYPE] : undefined;

      if (!config) {
        return dataPlaceHolder({ data: value });
      }

      const reserveConfig = config;
      const Icon = reserveConfig.icon;

      return (
        <CustomTag className="w-fit gap-1" color={reserveConfig.color}>
          <Icon size={14} />
          {reserveConfig.label}
        </CustomTag>
      );
    },
  },
  {
    title: "امکان پرداخت",
    dataIndex: "paymentOption",
    key: "paymentOption",
    width: 160,
    render: (value: AllAdmissionActiveListItem["paymentOption"] | null | undefined) => {
      const config = value
        ? PAYMENT_OPTION[value as keyof typeof PAYMENT_OPTION]
        : undefined;

      if (!config) {
        return dataPlaceHolder({ data: value });
      }

      const paymentConfig = config;

      return (
        <CustomTag className="w-fit" color={paymentConfig.color}>
          {paymentConfig.label}
        </CustomTag>
      );
    },
  },
  {
    title: "مانده به پایان مجاز اسکان",
    dataIndex: "allowedStayEndDate",
    key: "allowedStayEndDate",
    sortable: true,
    width: 180,
    render: (value: string) => {
      if (value == null || value === "") {
        return dataPlaceHolder({ data: value });
      }

      return <CustomTagWithDiffDays value={value} />;
    },
  },
  {
    title: "شناسه قرارداد",
    dataIndex: "contractId",
    key: "contractId",
    width: 130,
    searchable: true,
    render: (value: string) => {
      if (value == null || value === "") {
        return dataPlaceHolder({ data: value });
      }

      return (
        <CustomButton type="link" className="px-0!">
          {value}
        </CustomButton>
      );
    },
  },
  {
    title: "ایجاد کننده",
    dataIndex: "creator",
    key: "creator",
    width: 140,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "تاریخ ایجاد",
    dataIndex: "createDate",
    key: "createDate",
    width: 160,
    sortable: true,
    render: (value: string) =>
      dataPlaceHolder({
        data: value,
        isDate: true,
        customDateFormat: "HH:mm, YYYY/MM/DD ",
      }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "actions",
    width: 64,
    fixed: "right" as FixedType,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: AllAdmissionActiveListItem) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => onView(record.id),
        },
        {
          id: 2,
          Icon: FiArchive,
          title: "غیرفعالسازی (انتقال به آرشیو)",
          onclick: () => onDeactivate(record.id),
        },
      ];

      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];

export default AllAdmissionActiveListTableModel;
