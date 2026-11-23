import { useEffect } from "react";

import { Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGeActiveResidenceArchivedBuildingListQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { ArchiveBuildingDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/@types/@activeResidenceBuildingListTypes";
import { getActiveResidenceArchivedBuildingListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ArchiveBuildingDrawerContent/@types/@archiveBuildingDrawerContentTypes";
import ArchiveBuildingListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/model/ArchiveBuildingListTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const ArchiveBuildingDrawerContent = ({
  closeDrawerHandler,
  id,
}: ArchiveBuildingDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getArchivedBuildingList,
    { data: ArchivedBuildingListData, isFetching: isArchivedBuildingListLoading },
  ] = useLazyGeActiveResidenceArchivedBuildingListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;
      const sortByMap: Record<string, string> = {
        archiveCreatedDate: "createdDate",
        archiveModifiedDate: "modifiedDate",
      };
      const sortBy = sorting?.sortBy ? sortByMap[sorting.sortBy] : undefined;

      getArchivedBuildingList({
        uuid: id,
        params: {
          pageNumber: url?.archivePage ? Number(url.archivePage) - 1 : 0,
          pageSize: url?.archivePageSize ? Number(url.archivePageSize) : 8,
          ...(sortBy && {
            sortBy,
            ...(sorting?.sortOrder && {
              sortDirection: String(sorting.sortOrder).toUpperCase(),
            }),
          }),
        },
      });
    }
  }, [id, url?.archivePage, url?.archivePageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  // table column
  const column = ArchiveBuildingListTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="آرشیو ساختمان‌ها (غیر فعال شده)"
        closeDrawerHandler={closeDrawerHandler}
      />

      <ToolBox
        leftSide={
          <div className="flex flex-wrap gap-2">
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
      />

      <CustomTable<getActiveResidenceArchivedBuildingListContent>
        dataSource={ArchivedBuildingListData?.content ?? []}
        loading={isArchivedBuildingListLoading}
        columns={column}
        rowKey="uuid"
        pagination={manualPaginationConfig({
          total: ArchivedBuildingListData?.totalElements || 0,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              archivePage: page?.toString(),
              archivePageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.archivePage ? Number(url.archivePage) : 1,
          defaultPageSize: url?.archivePageSize ? Number(url.archivePageSize) : 8,
        })}
        key={`table-${url?.archivePageSize || "8"}`}
      />
    </div>
  );
};
export default ArchiveBuildingDrawerContent;
