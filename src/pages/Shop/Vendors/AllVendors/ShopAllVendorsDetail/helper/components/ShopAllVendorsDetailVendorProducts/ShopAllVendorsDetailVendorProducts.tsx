import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetVendorProductsDetailQuery } from "@infra/states/redux/Apis/shop/vendors/vendorsApi";
import {
  GetVendorProductsDetailRequest,
  ShopAllVendorsDetailVendorProductsAdvanceFilterFormType,
  ShopAllVendorsDetailVendorProductsRecordType,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/@types/@shopAllVendorsDetailVendorProducts";
import useShopAllVendorsDetailVendorProductsAdvanceFilter from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/helper/hooks/useShopAllVendorsDetailVendorProductsAdvanceFilter/useShopAllVendorsDetailVendorProductsAdvanceFilter";
import ShopAllVendorsDetailVendorProductsTableModel from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/helper/model/ShopAllVendorsDetailVendorProductsTableModel";

const COLUMN_FILTER_ITEMS = [
  // column
  "productTitle",
  "isbn",
];

const ShopAllVendorsDetailVendorProducts = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm<ShopAllVendorsDetailVendorProductsAdvanceFilterFormType>();

  const { filterItemsList } = useShopAllVendorsDetailVendorProductsAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================ Api Calls ================================
  const [
    getVendorProductsDetail,
    { data: getVendorProductsDetailData, isFetching: isGetVendorProductsDetailLoading },
  ] = useLazyGetVendorProductsDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getVendorProductsDetailHandler();
  }, [
    url?.id,
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const getVendorProductsDetailHandler = () => {
    if (!url?.id) return;

    const requestBody: GetVendorProductsDetailRequest = {
      uuid: url.id,
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      sortBy: "createdDate", // default
      sortDirection: "DESC", // default

      // columns filter
      ...(url?.productTitle && { title: url.productTitle }),
      ...(url?.isbn && { isbn: url.isbn }),
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

    getVendorProductsDetail(requestBody);
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const onViewHandler = (_record: ShopAllVendorsDetailVendorProductsRecordType) => {};

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

      <div>
        <ToolBox
          className="mb-5"
          leftSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="default"
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        <CustomTable<ShopAllVendorsDetailVendorProductsRecordType>
          dataSource={getVendorProductsDetailData?.content ?? []}
          loading={isGetVendorProductsDetailLoading}
          rowKey="uuid"
          columns={ShopAllVendorsDetailVendorProductsTableModel({
            onView: onViewHandler,
          })}
          pagination={manualPaginationConfig({
            total: getVendorProductsDetailData?.totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url.pageSize) : 10,
          })}
        />
      </div>
    </>
  );
};

export default ShopAllVendorsDetailVendorProducts;
