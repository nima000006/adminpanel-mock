import { useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  GetShopAllOrdersListContentType,
  GetShopAllOrdersListResponse,
  ShopAllOrdersListAdvanceFilterFormType,
  ShopAllOrdersListTabVariant,
} from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/@types/@shopAllOrdersList";
import useShopAllOrdersListAdvanceFilter from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/hooks/useShopAllOrdersListAdvanceFilter/useShopAllOrdersListAdvanceFilter";
import ShopAllOrdersListTableModel from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/helper/model/ShopAllOrdersListTableModel";

const ShopAllOrdersListTabContent = ({
  variant,
  dataSource,
  isLoading,
}: {
  variant: ShopAllOrdersListTabVariant;
  dataSource: GetShopAllOrdersListResponse | undefined;
  isLoading: boolean;
}) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [form] = Form.useForm<ShopAllOrdersListAdvanceFilterFormType>();

  const { filterItemsList } = useShopAllOrdersListAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  // Must run every render: GetServerColumnSearchProps uses hooks internally.
  const columns = ShopAllOrdersListTableModel({ variant });

  //* ================================ Util Functions ================================
  const closeAdvanceFilterHandler = () => {
    form.resetFields();
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
        <CustomTable<GetShopAllOrdersListContentType>
          dataSource={dataSource?.content || []}
          loading={isLoading}
          rowKey="uuid"
          columns={columns}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements || 0,
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
          emptyDescription="سفارشی برای نمایش وجود ندارد"
        />
      </div>
    </>
  );
};

export default ShopAllOrdersListTabContent;
