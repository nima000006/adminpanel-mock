import { BsEye } from "react-icons/bs";
import { PiPencilLine, PiStarFill, PiTrash } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import MenuActionPopover from "@components/Renderers/MenuActionPopover/MenuActionPopover";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { getMyActiveResidenceBuildingListContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";

const MyActiveResidenceBuildingListTableModel = ({
  editBuildingClickHandler,
  viewBuildingHandler,
  disableBuildingHandler,
  viewFloorHandler,
}: {
  editBuildingClickHandler: (id: string) => void;
  viewBuildingHandler: (id: string) => void;
  disableBuildingHandler: (record: getMyActiveResidenceBuildingListContent) => void;
  viewFloorHandler: (id: string) => void;
}): CustomColumnType<getMyActiveResidenceBuildingListContent>[] => [
  {
    title: "ساختمان",
    dataIndex: "title",
    key: "title",
    width: 200,
  },
  {
    title: "درجه کیفی",
    dataIndex: "qualityGrade",
    key: "qualityGrade",
    width: 150,
    render: (value: getMyActiveResidenceBuildingListContent["qualityGrade"]) => (
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
    title: "طبقه",
    dataIndex: "floorCount",
    key: "floorCount",
    width: 110,
    ...GetServerColumnSearchProps({
      dataIndex: "floorCount",
      label: "طبقه",
      type: "sort",
    }),
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
    width: 170,
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
    key: "actions",
    width: 50,
    className: "tables-sticky-column-left",
    fixed: "right",
    render: (_: string, record: getMyActiveResidenceBuildingListContent) => {
      const contentItems = [
        {
          id: 1,
          Icon: BsEye,
          title: "مشاهده",
          onclick: () => {
            viewBuildingHandler(record?.uuid);
          },
        },
        {
          id: 2,
          Icon: BsEye,
          title: "مشاهده طبقات",
          onclick: () => {
            viewFloorHandler(record?.uuid);
          },
        },
        {
          id: 32,
          Icon: PiPencilLine,
          title: "ویرایش",
          onclick: () => {
            editBuildingClickHandler(record?.uuid);
          },
        },
        {
          id: 4,
          Icon: PiTrash,
          title: "غیرفعالسازی (انتقال به آرشیو)",
          onclick: () => {
            disableBuildingHandler(record);
          },
        },
      ];
      return <MenuActionPopover contentItems={contentItems} />;
    },
  },
];
export default MyActiveResidenceBuildingListTableModel;
