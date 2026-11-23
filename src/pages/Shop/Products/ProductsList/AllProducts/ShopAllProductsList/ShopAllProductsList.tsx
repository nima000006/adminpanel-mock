import { useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_ADD_PAGE_ROUTE,
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/shop";
import { useGetShopAllProductsListQuery } from "@infra/states/redux/Apis/shop/products/productsApi";
import { SHOP_PRODUCT_STATUS } from "@pages/Shop/Products/_shared/utils/shopProductStatus";

import {
  ShopAllProductsListAdvanceFilterFormType,
  ShopAllProductsListRecordType,
} from "./@types/@shopAllProductsList";
import useShopAllProductsListAdvanceFilter from "./helper/modals/advanceFilterModals/shopAllProductsListAdvanceFilter";
import ShopAllProductsListTableModel from "./helper/models/ShopAllProductsList/ShopAllProductsListTableModel";

const ShopAllProductsList = () => {
  useTitle({ text: "لیست کالا" });

  const navigate = useNavigate();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [form] = Form.useForm<ShopAllProductsListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useShopAllProductsListAdvanceFilter();
  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  //? ================================ Api Calls ================================
  const {
    data: getShopAllProductsListData,
    isFetching: isGetShopAllProductsListLoading,
    isError: isGetShopAllProductsListError,
  } = useGetShopAllProductsListQuery(
    {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      statuses: SHOP_PRODUCT_STATUS.ACCEPTED,
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
      ...(url?.title && { title: url.title }),
      ...(url?.isbn && { isbn: url.isbn }),
      ...(url?.supplierTitle && { supplierTitle: url.supplierTitle }),
      ...(url?.displayStatusId && {
        visible: url.displayStatusId === "1",
      }),
    },
    { refetchOnMountOrArgChange: true }
  );

  //* ================================ Util Functions ================================
  const onViewHandler = (uuid: string) => {
    navigate({
      pathname: SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: uuid }),
    });
  };

  const onAddProductHandler = () => {
    navigate(SHOP_PRODUCTS_LIST_ALL_PRODUCTS_ADD_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={onAddProductHandler}
              >
                افزودن کالا از بانک کالا
              </CustomButton>
            </div>
          }
        />
        <div>
          {isGetShopAllProductsListError ? (
            <CustomAlert type="error" showIcon title="دریافت لیست کالا ناموفق بود." />
          ) : (
            <CustomTable<ShopAllProductsListRecordType>
              dataSource={getShopAllProductsListData?.content ?? []}
              loading={isGetShopAllProductsListLoading}
              rowKey="uuid"
              columns={ShopAllProductsListTableModel({
                onView: onViewHandler,
              })}
              pagination={manualPaginationConfig({
                total: getShopAllProductsListData?.totalElements ?? 0,
                onChange: (page: number, pageSize: number) => {
                  setSearchParams({
                    ...url,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: url?.page ? Number(url.page) : 1,
                defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
              })}
              draggableColumns
              draggableId={ExcelCodes.SHOP_ALL_PRODUCTS_LIST_TABLE}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ShopAllProductsList;
