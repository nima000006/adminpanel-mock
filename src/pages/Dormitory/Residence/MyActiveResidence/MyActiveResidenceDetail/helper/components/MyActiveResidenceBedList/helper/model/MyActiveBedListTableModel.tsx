import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { getMyActiveResidenceBedListContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";

const MyActiveBedListTableModel = ({
  viewBedDetailHandler,
  editBedClickHandler,
  disableBedHandler,
}: {
  viewBedDetailHandler: (record: getMyActiveResidenceBedListContent) => void;
  editBedClickHandler: (record: getMyActiveResidenceBedListContent) => void;
  disableBedHandler: (record: getMyActiveResidenceBedListContent) => void;
}): CustomColumnType<getMyActiveResidenceBedListContent>[] => [
  {
    title: "کد تخت",
    dataIndex: "bedNumber",
    key: "bedNumber",
    width: 150,
  },
  {
    title: "عنوان تخت",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
  {
    title: "نوع تخت",
    dataIndex: "bedType",
    key: "bedType",
    width: 170,

    render: (value?: IdTitleName) => {
      const bedType = BED_TYPE[value?.name as keyof typeof BED_TYPE];
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
    width: 150,
  },
  {
    title: "ایجاد کننده",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 180,
  },
  {
    title: "تاریخ ایجاد",
    dataIndex: "createdDate",
    key: "createdDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "createdDate",
      label: "تاریخ ایجاد",
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
    title: "آخرین اقدام کننده",
    dataIndex: "modifiedBy",
    key: "modifiedBy",
    width: 180,
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
        customDateFormat: "HH:mm, YYYY/MM/DD ",
      }),
  },
  {
    title: "",
    dataIndex: "grade",
    key: "grade",
    width: 50,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: string, record: getMyActiveResidenceBedListContent) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => {
            viewBedDetailHandler(record);
          },
        },
        {
          id: 2,
          Icon: PiPencilLine,
          title: "ویرایش",
          onclick: () => {
            editBedClickHandler(record);
          },
        },
        {
          id: 3,
          Icon: PiTrash,
          title: "غیرفعالسازی (انتقال به آرشیو)",
          onclick: () => {
            disableBedHandler(record);
          },
        },
      ];
      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];
export default MyActiveBedListTableModel;
