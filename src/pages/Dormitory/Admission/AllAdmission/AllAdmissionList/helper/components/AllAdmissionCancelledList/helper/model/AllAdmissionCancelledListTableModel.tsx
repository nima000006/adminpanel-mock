import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import {
  ADMISSION_GENDER_CONFIG,
  RESERVABLE_CAPACITY_CONFIG,
  SCHEDULE_TYPE_TAG_COLOR,
  SCHEDULE_TYPE_TAG_LABEL,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionCancelledListItem } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionCancelledList/@types/@allAdmissionCancelledList";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const AllAdmissionCancelledListTableModel =
  (): CustomColumnType<AllAdmissionCancelledListItem>[] => [
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 140,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نوع درخواست",
      dataIndex: "requestType",
      key: "requestType",
      width: 130,
      render: (value: string) => {
        if (value == null || value === "") {
          return dataPlaceHolder({ data: value });
        }

        return (
          <CustomTag className="w-fit gap-1" color="green">
            <AiOutlinePlus />
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "برنامه پذیرش",
      dataIndex: "programTitle",
      key: "programTitle",
      width: 200,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "اقامتگاه",
      dataIndex: "residence",
      key: "residence",
      width: 160,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کسب و کار",
      dataIndex: "business",
      key: "business",
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
      title: "جنسیت پذیرش",
      dataIndex: "gender",
      key: "gender",
      width: 160,
      render: (value: AllAdmissionCancelledListItem["gender"] | null | undefined) => {
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
        value: AllAdmissionCancelledListItem["reservableCapacity"] | null | undefined
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
      render: (
        value: AllAdmissionCancelledListItem["scheduleType"] | null | undefined
      ) => {
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
      render: (
        value: AllAdmissionCancelledListItem["reserveType"] | null | undefined
      ) => {
        const config = value
          ? RESERVE_TYPE[value as keyof typeof RESERVE_TYPE]
          : undefined;

        if (!config) {
          return dataPlaceHolder({ data: value });
        }

        const Icon = config.icon;

        return (
          <CustomTag className="w-fit gap-1" color={config.color}>
            <Icon size={14} />
            {config.label}
          </CustomTag>
        );
      },
    },
    {
      title: "امکان پرداخت",
      dataIndex: "paymentOption",
      key: "paymentOption",
      width: 160,
      render: (
        value: AllAdmissionCancelledListItem["paymentOption"] | null | undefined
      ) => {
        if (value == null) {
          return dataPlaceHolder({ data: value });
        }

        const paymentConfig = PAYMENT_OPTION[value as keyof typeof PAYMENT_OPTION];

        if (!paymentConfig) {
          return dataPlaceHolder({ data: value });
        }

        return (
          <CustomTag className="w-fit" color={paymentConfig.color}>
            {paymentConfig.label}
          </CustomTag>
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
      title: "تاریخ آخرین اقدام",
      dataIndex: "lastActionDate",
      key: "lastActionDate",
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
      width: 90,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, _record: AllAdmissionCancelledListItem) => (
        <Link
          to={{
            pathname: DORMITORY_ALL_ADMISSION_PROGRAM_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: "30acd599-f0fd-4d67-9593-aab003100e2e", // mock id
            }),
          }}
        >
          <CustomButton type="link" className="px-0!">
            مشاهده
          </CustomButton>
        </Link>
      ),
    },
  ];

export default AllAdmissionCancelledListTableModel;
