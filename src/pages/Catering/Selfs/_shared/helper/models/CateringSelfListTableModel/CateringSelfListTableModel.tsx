import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  CATERING_GENDER_TYPES_COLORS,
  CATERING_GENDER_TYPES_LABELS,
} from "@pages/Catering/_shared/utils";
import {
  CateringSelfRecordType,
  CateringSelfStatusTypeDto,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { CateringSelfListTableModelProps } from "@pages/Catering/Selfs/_shared/helper/models/CateringSelfListTableModel/@types/@cateringSelfListTableModel";
import { getCateringSelfStatusTypeTagConfig } from "@pages/Catering/Selfs/_shared/utils";

const CateringSelfListTableModel = ({
  onView,
  onEdit,
  onDeActive,
  isArchive = false,
}: CateringSelfListTableModelProps): CustomColumnType<CateringSelfRecordType>[] => {
  return [
    {
      title: "عنوان سلف",
      dataIndex: "title",
      key: "title",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان سلف",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "جنسیت",
      dataIndex: "genderType",
      key: "genderType",
      width: 100,
      render: (value: number | null | undefined) => {
        if (value == null || !CATERING_GENDER_TYPES_LABELS[value]) {
          return dataPlaceHolder({ data: value });
        }

        return (
          <CustomTag className="w-fit" color={CATERING_GENDER_TYPES_COLORS[value]}>
            {CATERING_GENDER_TYPES_LABELS[value]}
          </CustomTag>
        );
      },
    },
    {
      title: "شعبه / واحد",
      dataIndex: "ownerBranchCodeBranchName",
      key: "ownerBranchCodeBranchName",
      width: 220,
      render: (value: string) => <CustomTag className="w-fit">{value}</CustomTag>,
    },
    {
      title: "استان",
      dataIndex: "provinceName",
      key: "provinceName",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityName",
      key: "cityName",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام و نام خانوادگی مسئول",
      dataIndex: "managerFirstName",
      key: "managerFirstName",
      width: 175,
      render: (value: string, records) => {
        return (
          <>
            {dataPlaceHolder({ data: value })}{" "}
            {dataPlaceHolder({ data: records?.managerLastName })}
          </>
        );
      },
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "امتیاز کاربران",
      dataIndex: "score",
      key: "score",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "score",
        label: "امتیاز کاربران",
        type: "sort",
      }),
      render: (value: number) => dataPlaceHolder({ data: value }),
    },
    {
      title: "وضعیت نمایش به کاربر",
      dataIndex: "statusType",
      key: "statusType",
      hidden: isArchive,
      width: 150,
      render: (value: CateringSelfStatusTypeDto | null) => {
        const config = getCateringSelfStatusTypeTagConfig(value);

        if (!config) {
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
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 120,
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
      render: (value: string) => {
        return dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "actions",
      width: 50,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: CateringSelfRecordType) => {
        const contentItems = isArchive
          ? [
              {
                id: 1,
                Icon: BsEye,
                title: "مشاهده",
                onclick: () => onView(record.id),
              },
            ]
          : [
              {
                id: 1,
                Icon: BsEye,
                title: "مشاهده",
                onclick: () => onView(record.id),
              },
              {
                id: 2,
                Icon: PiPencilLine,
                title: "ویرایش",
                onclick: () => onEdit?.(record),
              },
              ...(onDeActive
                ? [
                    {
                      id: 3,
                      Icon: PiTrash,
                      title: "غیر فعال سازی",
                      onclick: () => onDeActive(record),
                    },
                  ]
                : []),
            ];

        return <MenuActionPopover contentItems={contentItems} />;
      },
    },
  ];
};

export default CateringSelfListTableModel;
