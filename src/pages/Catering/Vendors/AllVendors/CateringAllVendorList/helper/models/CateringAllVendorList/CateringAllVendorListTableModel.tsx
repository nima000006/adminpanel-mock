import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { CateringAllVendorListRecordType } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";

type CateringAllVendorListTableModelProps = {
  onView: (id: number) => void;
  onEdit: (record: CateringAllVendorListRecordType) => void;
  onDeActive: (record: CateringAllVendorListRecordType) => void;
};

const CateringAllVendorListTableModel = ({
  onView,
  onEdit,
  onDeActive,
}: CateringAllVendorListTableModelProps): CustomColumnType<CateringAllVendorListRecordType>[] => {
  return [
    {
      title: "عنوان تأمین کننده",
      dataIndex: "title",
      key: "title",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "عنوان تأمین کننده",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره ملی حقوقی",
      dataIndex: "nationalNom",
      key: "nationalNom",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalNom",
        label: "شماره ملی حقوقی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد اقتصادی",
      dataIndex: "economicNom",
      key: "economicNom",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "استان",
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 120,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام رابط",
      dataIndex: "managerFirstName",
      key: "managerFirstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "managerFirstName",
        label: "نام رابط",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی رابط",
      dataIndex: "managerLastName",
      key: "managerLastName",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "managerLastName",
        label: "نام خانوادگی رابط",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره تلفن",
      dataIndex: "managerMobile",
      key: "managerMobile",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      width: 140,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 160,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "تاریخ آخرین اقدام",
        type: "sort",
      }),
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
      width: 50,
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      render: (_: unknown, record: CateringAllVendorListRecordType) => {
        const contentItems = [
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
            onclick: () => onEdit(record),
          },
          {
            id: 3,
            Icon: PiTrash,
            title: "غیر فعال سازی",
            onclick: () => onDeActive(record),
          },
        ];

        return <MenuActionPopover contentItems={contentItems} />;
      },
    },
  ];
};

export default CateringAllVendorListTableModel;
