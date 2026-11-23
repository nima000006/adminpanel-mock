import { useEffect, useState } from "react";

import { Form } from "antd";
import moment from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/shop";
import { useGetShopAllProductsListQuery } from "@infra/states/redux/Apis/shop/products/productsApi";
import {
  SHOP_PRODUCT_STATUS,
  ShopProductStatusName,
} from "@pages/Shop/Products/_shared/utils/shopProductStatus";

import {
  ShopAllProductsRequestsListAdvanceFilterFormType,
  ShopAllProductsRequestsListRecordType,
} from "../../../@types/@shopAllProductsRequestsList";
import useShopAllProductsRequestsListAdvanceFilter from "../../modals/advanceFilterModals/shopAllProductsRequestsListAdvanceFilter";
import ShopAllProductsRequestsListTableModel from "../../models/ShopAllProductsRequestsList/ShopAllProductsRequestsListTableModel";

const ShopAllProductsRequestsListTabContent = ({
  statuses,
  draggableId,
}: {
  statuses?: ShopProductStatusName[];
  draggableId: ExcelCodes;
}) => {
  const navigate = useNavigate();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [form] = Form.useForm<ShopAllProductsRequestsListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useShopAllProductsRequestsListAdvanceFilter();
  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;
  const createdFrom = url?.createdDateStart
    ? moment(url.createdDateStart).format("YYYY-MM-DD")
    : undefined;
  const createdTo = url?.createdDateEnd
    ? moment(url.createdDateEnd).format("YYYY-MM-DD")
    : undefined;

  //? ================================ Api Calls ================================
  const {
    data: getShopAllProductsListData,
    isFetching: isGetShopAllProductsListLoading,
    isError: isGetShopAllProductsListError,
  } = useGetShopAllProductsListQuery(
    {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      statuses: statuses?.join(","),
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
      ...(url?.supplierTitle && { supplierTitle: url.supplierTitle }),
      ...(createdFrom && { createdFrom }),
      ...(createdTo && { createdTo }),
    },
    { refetchOnMountOrArgChange: true }
  );

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  //* ================================ Util Functions ================================
  const showRejectReasonColumn = !(
    statuses?.length === 1 &&
    (statuses[0] === SHOP_PRODUCT_STATUS.AWAITING_APPROVAL ||
      statuses[0] === SHOP_PRODUCT_STATUS.ACCEPTED)
  );

  const onViewHandler = (uuid: string) => {
    navigate({
      pathname: SHOP_PRODUCTS_REQUESTS_ALL_PRODUCTS_REQUESTS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: uuid }),
    });
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
      <div className="mt-4 flex flex-col gap-4">
        <ToolBox
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
        />
        {isGetShopAllProductsListError ? (
          <CustomAlert
            type="error"
            showIcon
            title="دریافت لیست درخواست‌های کالا ناموفق بود."
          />
        ) : (
          <CustomTable<ShopAllProductsRequestsListRecordType>
            dataSource={getShopAllProductsListData?.content ?? []}
            loading={isGetShopAllProductsListLoading}
            rowKey="uuid"
            columns={ShopAllProductsRequestsListTableModel({
              onView: onViewHandler,
              showRejectReason: showRejectReasonColumn,
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
            draggableId={draggableId}
          />
        )}
      </div>
    </>
  );
};

export default ShopAllProductsRequestsListTabContent;
