import { useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetWalletTransactionDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import BusinessTransactionMoreDetailDrawerContent from "@pages/Wallet/_shared/drawers/BusinessTransaction/BusinessTransactionMoreDetailDrawerContent";
import UsersTransactionMoreDetailDrawerContent from "@pages/Wallet/_shared/drawers/UsersTransaction/UsersTransactionMoreDetailDrawerContent";
import {
  AllTransactionDataType,
  UseAllTransactionAdvanceFilterFormType,
} from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";
import useAllTransactionAdvanceFilter from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/helper/models/AdvanceFilterModal/AllTransactionAdvanceFilter";
import { WalletsTransactionsContentByWalletIdType } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/@types/@allWalletsDetail";

import {
  GetWalletTransactionDetailResponse,
  SegmentTableProps,
} from "./@types/@segmentTable";
import AllWalletsDetailListTableModel from "./helper/models/AllWalletsDetailList/AllWalletsDetailListTableModel";

const SegmentTable = ({ data, loading }: SegmentTableProps) => {
  const [userTransactionModalOpen, setUserTransactionModalOpen] = useState(false);

  const [businessTransactionDrawerOpen, setBusinessTransactionDrawerOpen] =
    useState(false);

  const [transactionDetail, setTransactionDetail] =
    useState<GetWalletTransactionDetailResponse | null>(null);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(0);

  const { params: url, setSearchParams } = useQueryParams();

  const [form] = Form.useForm<UseAllTransactionAdvanceFilterFormType>();

  const { filterItemsList } = useAllTransactionAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getTransactionDetail, { isFetching: isTransactionDetailLoading }] =
    useLazyGetWalletTransactionDetailQuery();

  //* ================================ Util Functions ================================
  //user
  const openUserDrawer = (id: string) => {
    setUserTransactionModalOpen(true);

    getTransactionDetail(id)
      .unwrap()
      .then((value) => setTransactionDetail(value));
  };
  const closeUserDrawer = () => {
    setUserTransactionModalOpen(false);
  };

  //business
  const openBusinessDrawer = (id: string) => {
    setBusinessTransactionDrawerOpen(true);

    getTransactionDetail(id)
      .unwrap()
      .then((value) => setTransactionDetail(value));
  };
  const closeBusinessDrawer = () => {
    setBusinessTransactionDrawerOpen(false);
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {userTransactionModalOpen && (
        <CustomDrawer
          onClose={closeUserDrawer}
          open={userTransactionModalOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <UsersTransactionMoreDetailDrawerContent
              closeDrawerHandler={closeUserDrawer}
              transactionDetail={transactionDetail}
              loading={isTransactionDetailLoading}
            />
          }
        />
      )}
      {businessTransactionDrawerOpen && (
        <CustomDrawer
          onClose={closeBusinessDrawer}
          open={businessTransactionDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <BusinessTransactionMoreDetailDrawerContent
              closeDrawerHandler={closeBusinessDrawer}
              transactionDetail={transactionDetail}
              loading={isTransactionDetailLoading}
            />
          }
        />
      )}
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...url }}
        />
      )}
      <div className="table-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          // Todo[Nima]:uncomment when api got ready
          // leftSide={
          //   <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
          //     خروجی
          //   </CustomButton>
          // }
        />
        <CustomTable<WalletsTransactionsContentByWalletIdType | AllTransactionDataType>
          className="all-wallets-list-table-container"
          dataSource={data?.content}
          columns={AllWalletsDetailListTableModel({
            walletType: +url?.from,
            openUserDrawer,
            openBusinessDrawer,
          })}
          loading={loading}
          pagination={manualPaginationConfig({
            total: data?.totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          {...TABLE_PROPS(data?.content?.length ?? 0)}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.WALLET_SEGMENT_TABLE_TABLE}
        />
      </div>
    </>
  );
};

export default SegmentTable;
