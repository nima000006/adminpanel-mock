import { useEffect, useState } from "react";

import { PiPlus } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllVendorsListQuery } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import {
  GetAllVendorsListRequest,
  ShopAllVendorsListRecordType,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/@types/@shopAllVendorsListTypes";
import ShopAllVendorsListAddDrawerContent from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/ShopAllVendorsListAddDrawerContent";
import ShopAllVendorsListTableModel from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/model/ShopAllVendorsListTableModel";

const COLUMN_FILTER_ITEMS = [
  // column
  "title",
];

const ShopAllVendorsList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تامین‌کنندگان",
      },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  //? ================================ Api Calls ================================
  // list
  const [
    getAllVendorsList,
    { data: getAllVendorsListData, isFetching: isGetAllVendorsListLoading },
  ] = useLazyGetAllVendorsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllVendorsListHandler();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const getAllVendorsListHandler = () => {
    const requestBody: GetAllVendorsListRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      sortBy: "createdDate",
      sortDirection: "DESC",

      // columns filter
      ...(url?.title && { title: url.title }),
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        requestBody.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        requestBody.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    getAllVendorsList(requestBody);
  };

  const openAddDrawerHandler = () => {
    setIsAddDrawerOpen(true);
  };

  const closeAddDrawerHandler = () => {
    setIsAddDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAddDrawerOpen && (
        <CustomDrawer
          open={isAddDrawerOpen}
          onClose={closeAddDrawerHandler}
          closable={false}
          destroyOnHidden
          content={
            <ShopAllVendorsListAddDrawerContent
              onCloseDrawer={closeAddDrawerHandler}
              getAllVendorsListHandler={getAllVendorsListHandler}
            />
          }
        />
      )}

      <div>
        <ToolBox
          className="mb-5"
          leftSide={
            <CustomButton
              icon={<PiPlus />}
              type="primary"
              onClick={openAddDrawerHandler}
              iconPlacement="start"
            >
              افزودن تامین‌کننده
            </CustomButton>
          }
        />
        <CustomTable<ShopAllVendorsListRecordType>
          dataSource={getAllVendorsListData?.content ?? []}
          loading={isGetAllVendorsListLoading}
          rowKey="uuid"
          columns={ShopAllVendorsListTableModel()}
          pagination={manualPaginationConfig({
            total: getAllVendorsListData?.totalElements ?? 0,
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
        />
      </div>
    </>
  );
};

export default ShopAllVendorsList;
