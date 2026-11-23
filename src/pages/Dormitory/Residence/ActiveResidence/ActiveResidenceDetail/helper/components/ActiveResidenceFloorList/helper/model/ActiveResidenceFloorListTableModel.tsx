import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiStarFill, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { getActiveResidenceFloorListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";

const ActiveResidenceFloorListTableModel = ({
  editFloorClickHandler,
  viewFloorHandler,
  disableFloorHandler,
  viewUnitHandler,
}: {
  editFloorClickHandler: (id: string) => void;
  viewFloorHandler: (id: string) => void;
  disableFloorHandler: (record: getActiveResidenceFloorListContent) => void;
  viewUnitHandler: (id: string) => void;
}): CustomColumnType<getActiveResidenceFloorListContent>[] => [
  {
    title: "طبقه",
    dataIndex: "floorNumber",
    key: "floorNumber",
    width: 200,
  },
  {
    title: "عنوان طبقه",
    dataIndex: "title",
    key: "title",
    width: 200,
  },
  {
    title: "درجه کیفی",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 150,

    render: (value: getActiveResidenceFloorListContent["qualityGrade"]) => (
      <div className="flex items-center gap-2">
        {value !== null ? (
          <>
            <PiStarFill width={24} height={24} color="gold" />
            <span>{value?.title}</span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <PiStarFill width={24} height={24} color={NEUTRAL_05} />
            <span className="body-regular">فاقد درجه کیفی</span>
          </span>
        )}
      </div>
    ),
  },
  {
    title: "واحد اقامتی",
    dataIndex: "roomCount",
    key: "roomCount",
    width: 110,
    ...GetServerColumnSearchProps({
      dataIndex: "roomCount",
      label: "واحد اقامتی",
      type: "sort",
    }),
  },
  {
    title: "تخت",
    dataIndex: "bedCount",
    key: "bedCount",
    width: 110,
    ...GetServerColumnSearchProps({
      dataIndex: "bedCount",
      label: "تخت",
      type: "sort",
    }),
  },
  {
    title: "امکانات",
    dataIndex: "amenityCount",
    key: "amenityCount",
    width: 110,
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
      dataIndex: "createDate",
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
    width: 150,
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
    dataIndex: "uuid",
    key: "uuid",
    width: 50,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: string, record: getActiveResidenceFloorListContent) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => {
            viewFloorHandler(record?.uuid);
          },
        },
        {
          id: 2,
          Icon: BsEye,
          title: "مشاهده واحدهای اقامتی",
          onclick: () => {
            viewUnitHandler(record?.uuid);
          },
        },
        {
          id: 32,
          Icon: PiPencilLine,
          title: "ویرایش",
          onclick: () => {
            editFloorClickHandler(record?.uuid);
          },
        },
        {
          id: 4,
          Icon: PiTrash,
          title: "غیرفعالسازی (انتقال به آرشیو)",
          onclick: () => {
            disableFloorHandler(record);
          },
        },
      ];
      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];
export default ActiveResidenceFloorListTableModel;
