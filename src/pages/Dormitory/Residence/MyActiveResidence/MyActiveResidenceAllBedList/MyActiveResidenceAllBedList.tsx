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
  useLazyGetMyActiveResidenceAllBedListQuery,
  useLazyGetMyActiveResidenceBedDetailQuery,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import {
  GetMyActiveResidenceAllBedListContent,
  GetMyActiveResidenceAllBedListRequest,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceAllBedList/@types/@myActiveResidenceAllBedList";
import MyActiveResidenceAllBedListTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceAllBedList/helper/model/MyActiveResidenceAllBedListTableModel";
import { getMyActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";
import MyViewBedDetailDrawerContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/drawer/MyViewBedDetailDrawerContent/MyViewBedDetailDrawerContent";

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

const MyActiveResidenceAllBedList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isViewDrawerOpen, setIsviewDrawerOpen] = useState({ isOpen: false, id: "-1" });
  const [bedDetailData, setBedDetailData] = useState<
    getMyActiveResidenceBedDetailResponse | undefined
  >();
  //? ================================ Api Calls ================================
  // list
  const [
    getMyActiveResidenceAllBedList,
    {
      data: getMyActiveResidenceAllBedListData,
      isFetching: isGetMyActiveResidenceAllBedListLoading,
    },
  ] = useLazyGetMyActiveResidenceAllBedListQuery();

  // detail
  const [getBedDetail, { isFetching: isBedDetailLoading }] =
    useLazyGetMyActiveResidenceBedDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyActiveResidenceAllBedListHandler();
  }, [url?.residenceId, url?.page, url?.pageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const getMyActiveResidenceAllBedListHandler = () => {
    if (!url?.residenceId) return;

    const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

    const requestParams: GetMyActiveResidenceAllBedListRequest = {
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

    getMyActiveResidenceAllBedList(requestParams);
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
      .then((res: getMyActiveResidenceBedDetailResponse) => {
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
            <MyViewBedDetailDrawerContent
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
          <CustomTable<GetMyActiveResidenceAllBedListContent>
            dataSource={getMyActiveResidenceAllBedListData?.content ?? []}
            loading={isGetMyActiveResidenceAllBedListLoading}
            columns={MyActiveResidenceAllBedListTableModel({ viewAllBedDetailHandler })}
            rowKey="uuid"
            draggableColumns
            draggableId={ExcelCodes.DORMITORY_RESIDENCE_ACTIVE_ALL_BEDS_LIST_TABLE}
            pagination={manualPaginationConfig({
              total: getMyActiveResidenceAllBedListData?.totalElements ?? 0,
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
export default MyActiveResidenceAllBedList;
