import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { GetMyActiveResidenceAllBedListContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceAllBedList/@types/@myActiveResidenceAllBedList";

const MyActiveResidenceAllBedListTableModel = ({
  viewAllBedDetailHandler,
}: {
  viewAllBedDetailHandler: (id: string | undefined) => void;
}): CustomColumnType<GetMyActiveResidenceAllBedListContent>[] => [
  {
    title: "کد تخت",
    dataIndex: "bedNumber",
    key: "bedNumber",
    width: 150,
    render: (value?: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "عنوان تخت",
    dataIndex: "title",
    key: "title",
    width: 150,
    render: (value?: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "نوع تخت",
    dataIndex: "bedType",
    key: "bedType",
    width: 170,
    render: (value?: IdTitleName) => {
      const bedType = BED_TYPE[value?.name as keyof typeof BED_TYPE];

      if (!bedType) {
        return dataPlaceHolder({ data: value?.title });
      }

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
    render: (value?: IdTitleName) => dataPlaceHolder({ data: value?.title }),
  },
  {
    title: "واحد اقامتی",
    dataIndex: "roomTitle",
    key: "roomTitle",
    width: 270,
    render: (value?: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "طبقه",
    dataIndex: "floorTitle",
    key: "floorTitle",
    width: 110,
    render: (value?: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "ساختمان",
    dataIndex: "buildingTitle",
    key: "buildingTitle",
    width: 150,
    render: (value?: string) => dataPlaceHolder({ data: value }),
  },
  {
    title: "ایجاد کننده",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 150,
    render: (value?: string) => dataPlaceHolder({ data: value }),
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
    render: (value?: string) =>
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
    render: (value?: string) => dataPlaceHolder({ data: value }),
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
    render: (value?: string) =>
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
    fixed: "right" as FixedType,
    render: (_: unknown, record: GetMyActiveResidenceAllBedListContent) => (
      <div className="flex gap-2">
        <CustomButton
          iconPlacement="end"
          type="link"
          onClick={() => viewAllBedDetailHandler(record?.uuid)}
        >
          مشاهده
        </CustomButton>
      </div>
    ),
  },
];

export default MyActiveResidenceAllBedListTableModel;
