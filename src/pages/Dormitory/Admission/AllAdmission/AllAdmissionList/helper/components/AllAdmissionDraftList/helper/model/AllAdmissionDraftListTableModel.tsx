import { AiOutlinePlus } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AllAdmissionDraftListItem } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionDraftList/@types/@allAdmissionDraftList";

const AllAdmissionDraftListTableModel = ({
  onContinue,
  onDelete,
}: {
  onContinue: (id: number) => void;
  onDelete: (id: number) => void;
}): CustomColumnType<AllAdmissionDraftListItem>[] => [
  {
    title: "برنامه پذیرش",
    dataIndex: "programTitle",
    key: "programTitle",
    width: 220,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "اقامتگاه",
    dataIndex: "residence",
    key: "residence",
    width: 180,
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
    width: 140,
    render: (value: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نوع مدیریت",
    dataIndex: "managementType",
    key: "managementType",
    width: 120,
    render: (value: string) => dataPlaceHolder({ data: value }),
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
    render: (_: unknown, record: AllAdmissionDraftListItem) => {
      const contentItems = [
        {
          id: 1,
          Icon: AiOutlinePlus,
          title: "ادامه فرایند ایجاد",
          onclick: () => onContinue(record.id),
        },
        {
          id: 2,
          Icon: PiTrash,
          title: "حذف",
          onclick: () => onDelete(record.id),
        },
      ];

      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];

export default AllAdmissionDraftListTableModel;
