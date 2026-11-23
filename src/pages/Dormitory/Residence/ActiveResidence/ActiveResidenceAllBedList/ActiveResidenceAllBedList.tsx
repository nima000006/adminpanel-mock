import { useEffect, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetActiveResidenceAllBedListQuery,
  useLazyGetActiveResidenceBedDetailQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  GetActiveResidenceAllBedListContent,
  GetActiveResidenceAllBedListRequest,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceAllBedList/@types/@activeResidenceAllBedList";
import ActiveResidenceAllBedListTableModel from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceAllBedList/helper/model/ActiveResidenceAllBedListTableModel";
import { getActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";
import ViewBedDetailDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ViewBedDetailDrawerContent/ViewBedDetailDrawerContent";

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

const ActiveResidenceAllBedList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [bedDetailData, setBedDetailData] = useState<
    getActiveResidenceBedDetailResponse | undefined
  >();
  //? ================================ Api Calls ================================
  // list
  const [
    getActiveResidenceAllBedList,
    {
      data: getActiveResidenceAllBedListData,
      isFetching: isGetActiveResidenceAllBedListLoading,
    },
  ] = useLazyGetActiveResidenceAllBedListQuery();

  // detail
  const [getBedDetail, { isFetching: isBedDetailLoading }] =
    useLazyGetActiveResidenceBedDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getActiveResidenceAllBedListHandler();
  }, [url?.residenceId, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getActiveResidenceAllBedListHandler = () => {
    if (!url?.residenceId) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    const requestParams: GetActiveResidenceAllBedListRequest = {
      uuid: url.residenceId,
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
        ...(sorting?.sortOrder && {
          sortDirection: String(sorting.sortOrder).toUpperCase(),
        }),
      },
    };

    getActiveResidenceAllBedList(requestParams);
  };

  // handler
  const closeViewDrawerHandler = () => {
    setIsviewDrawerOpen({ id: "-1", isOpen: false });
  };

  const viewAllBedDetailHandler = (id: string | undefined) => {
    if (!id) return;

    setIsviewDrawerOpen({ id, isOpen: true });
    setBedDetailData(undefined);

    getBedDetail(id)
      .unwrap()
      .then((res: getActiveResidenceBedDetailResponse) => {
        setBedDetailData(res);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ *
  return (
    <>
      {/* VIEW BED DETAIL */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewBedDetailDrawerContent
              closeViewDrawerHandler={closeViewDrawerHandler}
              data={bedDetailData}
              loading={isBedDetailLoading}
              buildingTitle={bedDetailData?.buildingTitle ?? ""}
              floorTitle={bedDetailData?.floorTitle ?? ""}
              unitTitle={bedDetailData?.roomTitle ?? ""}
            />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        <ToolBox
          rightSide={
            <div className="flex flex-wrap gap-2">
              <span className="text-neutral-13 font-bold!">{url?.residenceTitle}</span>
              <CustomTag
                className="w-fit"
                color={url?.viewStatus === "true" ? "green" : "orange"}
              >
                {url?.viewStatus === "true" ? "قابل نمایش" : "غیر قابل نمایش"}
              </CustomTag>
            </div>
          }
        />
        <div className="flex flex-col gap-4">
          <ToolBox
            leftSide={
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            }
          />
          <CustomTable<GetActiveResidenceAllBedListContent>
            dataSource={getActiveResidenceAllBedListData?.content ?? []}
            loading={isGetActiveResidenceAllBedListLoading}
            columns={ActiveResidenceAllBedListTableModel({ viewAllBedDetailHandler })}
            rowKey="uuid"
            draggableColumns
            draggableId={ExcelCodes.DORMITORY_RESIDENCE_ACTIVE_ALL_BEDS_LIST_TABLE}
            pagination={manualPaginationConfig({
              total: getActiveResidenceAllBedListData?.totalElements ?? 0,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"}`}
          />
        </div>
      </div>
    </>
  );
};
export default ActiveResidenceAllBedList;
