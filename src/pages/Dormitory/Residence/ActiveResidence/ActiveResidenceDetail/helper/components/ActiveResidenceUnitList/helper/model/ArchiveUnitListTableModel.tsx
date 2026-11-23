import { PiStarFill } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getActiveResidenceArchivedUnitListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/helper/drawer/ArchiveUnitDrawerContent/@types/@archiveUnitDrawerContentTypes";

const ArchiveUnitListTableModel =
  (): CustomColumnType<getActiveResidenceArchivedUnitListContent>[] => [
    {
      title: "کد واحد اقامتی",
      dataIndex: "roomNumber",
      key: "roomNumber",
      width: 150,
    },
    {
      title: "عنوان واحد اقامتی",
      dataIndex: "faTitle",
      key: "faTitle",
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

      render: (value: string) => (
        <div className="flex items-center gap-2">
          {value !== null ? (
            <>
              <PiStarFill width={24} height={24} color="gold" />
              <span>{value}</span>
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
export default ArchiveUnitListTableModel;
