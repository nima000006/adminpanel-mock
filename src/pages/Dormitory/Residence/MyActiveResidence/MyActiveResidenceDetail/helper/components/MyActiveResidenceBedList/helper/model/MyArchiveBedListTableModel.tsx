import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { getMyActiveResidenceArchivedBedListContent } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/drawer/MyArchiveBedDrawerContent/@types/@myArchiveBedDrawerContentTypes";

const MyArchiveBedListTableModel =
  (): CustomColumnType<getMyActiveResidenceArchivedBedListContent>[] => [
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

      render: (value: IdTitleName) => {
        const bedType = BED_TYPE[value?.name as keyof typeof BED_TYPE];

        if (!bedType) {
          return dataPlaceHolder({ data: value?.title || value?.name });
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
      render: (value?: IdTitleName) => {
        return dataPlaceHolder({
          data: value?.title,
        });
      },
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
        dataIndex: "archiveCreatedDate",
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
        dataIndex: "archiveModifiedDate",
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
  ];
export default MyArchiveBedListTableModel;
