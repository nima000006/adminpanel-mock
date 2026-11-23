import { useEffect, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_BASE_INFO_DETAILS_PAGE_ROUTE,
  CATERING_BASE_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { CATERING_STATUS_TYPES_ARCHIVE_LIST } from "@pages/Catering/_shared/utils";
import { hasCateringProductCategoryId } from "@pages/Catering/BasicInfo/_shared/cateringBaseInfoCategory";
import {
  CateringBaseInfoDetailsRecord,
  getBasicInfoFoodsListRequest,
  getBasicInfoFoodsListResponse,
} from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import CateringBaseInfoDetailsArchivesViewDrawerContent from "@pages/Catering/BasicInfo/CateringBaseInfoDetailsArchives/helper/drawer/CateringBaseInfoDetailsArchivesViewDrawerContent/CateringBaseInfoDetailsArchivesViewDrawerContent";
import CateringBaseInfoDetailsArchivesTableModel from "@pages/Catering/BasicInfo/CateringBaseInfoDetailsArchives/helper/models/CateringBaseInfoDetailsArchivesTableModel/CateringBaseInfoDetailsArchivesTableModel";

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

const advanceFilterItems = ["title"];

const CateringBaseInfoDetailsArchives = () => {
  const [dataSource, setDataSource] = useState<CateringBaseInfoDetailsRecord[]>([]);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CateringBaseInfoDetailsRecord | null>(null);
  const { params: url } = useQueryParams();
  const productCategoryTitle =
    (typeof url?.productCategoryTitle === "string" && url.productCategoryTitle) || "غذا";

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_BASE_LIST_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: (
          <Link
            to={{
              pathname: CATERING_BASE_INFO_DETAILS_PAGE_ROUTE,
              search: makeSearchParams({
                productCategoryId: url?.productCategoryId,
                productCategoryTitle,
              }),
            }}
          >
            {productCategoryTitle}
          </Link>
        ),
      },
      {
        title: "آرشیو",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getBasicInfoFoodsList, { isLoading: isGetBasicInfoFoodsListLoading }] =
    useGetBasicInfoFoodsListMutation();

  const refetchFoodsList = () => {
    if (!hasCateringProductCategoryId(url?.productCategoryId)) return;

    const request: getBasicInfoFoodsListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
        productCategoryId: +url.productCategoryId,

        // search
        ...(url?.title && { title: url.title }),
      },
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder.toUpperCase() as "ASC" | "DESC";
      }
    }

    getBasicInfoFoodsList(request)
      .unwrap()
      .then((res: getBasicInfoFoodsListResponse) => {
        setDataSource(res?.content ?? []);
      });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    refetchFoodsList();
  }, [
    url?.page,
    url?.pageSize,
    url?.productCategoryId,
    url?.sortings,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (record: CateringBaseInfoDetailsRecord) => {
    setSelectedRecord(record);
    setIsViewDrawerOpen(true);
  };

  const onCloseViewDrawerHandler = () => {
    setIsViewDrawerOpen(false);
    setSelectedRecord(null);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isViewDrawerOpen && (
        <CustomDrawer
          open={isViewDrawerOpen}
          onClose={onCloseViewDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringBaseInfoDetailsArchivesViewDrawerContent
              closeDrawerHandler={onCloseViewDrawerHandler}
              record={selectedRecord}
              productCategoryTitle={productCategoryTitle}
            />
          }
        />
      )}
      <ToolBox
        className="mb-5"
        leftSide={
          <div className="flex gap-2">
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
      />
      <CustomTable<CateringBaseInfoDetailsRecord>
        dataSource={dataSource}
        loading={isGetBasicInfoFoodsListLoading}
        columns={CateringBaseInfoDetailsArchivesTableModel({
          onViewHandler,
          productCategoryTitle,
        })}
        rowKey="id"
        draggableColumns
        draggableId={ExcelCodes.FOOD_BASIC_INFO_DETAILS_ARCHIVES_TABLE}
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />
    </>
  );
};

export default CateringBaseInfoDetailsArchives;
