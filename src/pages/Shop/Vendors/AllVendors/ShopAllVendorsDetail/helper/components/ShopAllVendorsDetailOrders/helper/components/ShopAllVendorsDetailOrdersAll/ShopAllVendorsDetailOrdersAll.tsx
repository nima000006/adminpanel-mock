import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetVendorOrdersListQuery } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import {
  GetVendorOrdersListRequest,
  ShopAllVendorsDetailOrdersAdvanceFilterFormType,
  ShopAllVendorsDetailOrdersRecordType,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/@types/@shopAllVendorsDetailOrders";
import useShopAllVendorsDetailOrdersAdvanceFilter from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/hooks/useShopAllVendorsDetailOrdersAdvanceFilter/useShopAllVendorsDetailOrdersAdvanceFilter";
import ShopAllVendorsDetailOrdersTableModel from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/helper/model/ShopAllVendorsDetailOrdersTableModel";

const FILTER_ITEMS = [
  "dateDateStart",
  "dateDateEnd",
  // column
  "buyerFirstName",
  "buyerLastName",
  "nationalCode",
];

const ShopAllVendorsDetailOrdersAll = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm<ShopAllVendorsDetailOrdersAdvanceFilterFormType>();

  const { filterItemsList } = useShopAllVendorsDetailOrdersAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================ Api Calls ================================
  const [
    getVendorOrdersList,
    { data: getVendorOrdersListData, isFetching: isGetVendorOrdersListLoading },
  ] = useLazyGetVendorOrdersListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getVendorOrdersListHandler();
  }, [
    url?.id,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const getVendorOrdersListHandler = () => {
    if (!url?.id) return;

    const requestBody: GetVendorOrdersListRequest = {
      supplierUuids: [url.id],
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      sortBy: "createdDate", // default
      sortDirection: "DESC", // default

      // columns filter
      ...(url?.buyerFirstName && { buyerFirstName: url.buyerFirstName }),
      ...(url?.buyerLastName && { buyerLastName: url.buyerLastName }),
      ...(url?.nationalCode && { nationalCode: url.nationalCode }),

      // advance filter
      ...(url?.dateDateStart && {
        createdFrom: dayjs(url.dateDateStart).format("YYYY-MM-DD"),
      }),
      ...(url?.dateDateEnd && {
        createdTo: dayjs(url.dateDateEnd).format("YYYY-MM-DD"),
      }),
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

    getVendorOrdersList(requestBody);
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}

      <div className="mt-4 flex flex-col gap-4">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        <CustomTable<ShopAllVendorsDetailOrdersRecordType>
          dataSource={getVendorOrdersListData?.content ?? []}
          loading={isGetVendorOrdersListLoading}
          rowKey="uuid"
          columns={ShopAllVendorsDetailOrdersTableModel()}
          pagination={manualPaginationConfig({
            total: getVendorOrdersListData?.totalElements ?? 0,
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

export default ShopAllVendorsDetailOrdersAll;
