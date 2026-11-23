import { useEffect } from "react";

import { Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGeActiveResidenceArchivedFloorListQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { ArchiveFloorDrawerContentProps } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";
import { getActiveResidenceArchivedFloorListContent } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/drawer/ArchiveFloorDrawerContent/@types/@archiveFloorDrawerContentTypes";
import ArchiveFloorListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/helper/model/ArchiveFloorListTableModel";

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

const ArchiveFloorDrawerContent = ({
  closeDrawerHandler,
  id,
  buildingTitle,
}: ArchiveFloorDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getArchivedFloorList,
    { data: ArchivedFloorListData, isFetching: isArchivedFloorListLoading },
  ] = useLazyGeActiveResidenceArchivedFloorListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;
      const sortByMap: Record<string, string> = {
        archiveCreatedDate: "createdDate",
        archiveModifiedDate: "modifiedDate",
      };
      const sortBy = sorting?.sortBy ? sortByMap[sorting.sortBy] : undefined;

      getArchivedFloorList({
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
  const column = ArchiveFloorListTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="آرشیو طبقات (غیر فعال شده)"
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        طبقات غیر فعال شده در اقامتگاه{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span>
      </div>

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

      <CustomTable<getActiveResidenceArchivedFloorListContent>
        dataSource={ArchivedFloorListData?.content ?? []}
        loading={isArchivedFloorListLoading}
        columns={column}
        rowKey="uuid"
        pagination={manualPaginationConfig({
          total: ArchivedFloorListData?.totalElements || 0,
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
export default ArchiveFloorDrawerContent;
