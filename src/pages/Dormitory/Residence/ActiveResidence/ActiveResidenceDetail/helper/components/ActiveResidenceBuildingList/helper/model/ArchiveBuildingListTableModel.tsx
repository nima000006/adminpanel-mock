import { PiStarFill } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { getActiveResidenceArchivedBuildingListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ArchiveBuildingDrawerContent/@types/@archiveBuildingDrawerContentTypes";

const ArchiveBuildingListTableModel =
  (): CustomColumnType<getActiveResidenceArchivedBuildingListContent>[] => [
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

      render: (value: getActiveResidenceArchivedBuildingListContent["qualityGrade"]) => (
        <div className="flex items-center gap-2">
          {value !== null ? (
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
export default ArchiveBuildingListTableModel;
