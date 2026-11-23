import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiStarFill, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getActiveResidenceUnitListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";

const ActiveResidenceUnitListTableModel = ({
  editUnitClickHandler,
  viewUnitHandler,
  disableUnitHandler,
  viewBedHandler,
}: {
  editUnitClickHandler: (uuid: string) => void;
  viewUnitHandler: (uuid: string) => void;
  disableUnitHandler: (record: getActiveResidenceUnitListContent) => void;
  viewBedHandler: (uuid: string) => void;
}): CustomColumnType<getActiveResidenceUnitListContent>[] => [
  {
    title: "کد واحد اقامتی",
    dataIndex: "roomNumber",
    key: "roomNumber",
    width: 120,
  },
  {
    title: "عنوان واحد اقامتی",
    dataIndex: "title",
    key: "title",
    width: 200,
  },
  {
    title: "نوع واحد اقامتی",
    dataIndex: "roomType",
    key: "roomType",
    width: 120,
    render: (value: IdTitleName) => {
      return <CustomTag>{dataPlaceHolder({ data: value?.title })}</CustomTag>;
    },
  },
  {
    title: "درجه کیفی",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 150,
    render: (value: getActiveResidenceUnitListContent["qualityGrade"]) => (
      <div className="flex items-center gap-2">
        {value?.title ? (
          <>
            <PiStarFill width={24} height={24} color="gold" />
            <span>{value.title}</span>
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
    title: "ظرفیت استاندارد",
    dataIndex: "capacity",
    key: "capacity",
    width: 130,
    ...GetServerColumnSearchProps({
      dataIndex: "capacity",
      label: "ظرفیت استاندارد",
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
    render: (_: string, record: getActiveResidenceUnitListContent) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => {
            viewUnitHandler(record?.uuid);
          },
        },
        {
          id: 2,
          Icon: BsEye,
          title: "مشاهده تخت‌ها",
          onclick: () => {
            viewBedHandler(record?.uuid);
          },
        },
        {
          id: 32,
          Icon: PiPencilLine,
          title: "ویرایش",
          onclick: () => {
            editUnitClickHandler(record?.uuid);
          },
        },
        {
          id: 4,
          Icon: PiTrash,
          title: "غیرفعالسازی (انتقال به آرشیو)",
          onclick: () => {
            disableUnitHandler(record);
          },
        },
      ];
      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];
export default ActiveResidenceUnitListTableModel;
