import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetWalletWithdrawalRequestsListAdvanceFilterQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";

import {
  AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType,
  AllWalletDetailsWithdrawWalletTabProps,
} from "./@types/@allWalletDetailswithdrawWalletTab";
import AllWalletDetailsWithdrawWalletDrawerContent from "../../drawer/AllWalletDetailsWithdrawWalletDrawerContent/AllWalletDetailsWithdrawWalletDrawerContent";
import MyWalletWithdrawWalletTabTableModel from "../../models/AllWalletDetailsWithdrawWalletTabTableModel/AllWalletDetailsWithdrawWalletTabTableModel";

import "./_allWalletDetailsWithdrawWalletTab.scss";

const AllWalletDetailsWithdrawWalletTab = ({
  walletUuid,
  walletSearchForm,
}: AllWalletDetailsWithdrawWalletTabProps) => {
  const [dataSource, setDataSource] = useState<
    AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType[]
  >([]);

  const [withdrawWalletDrawerOpen, setWithdrawWalletDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getWithdrawalList,
    { data: withdrawalListData, isFetching: isWithdrawalListLoading },
  ] = useLazyGetWalletWithdrawalRequestsListAdvanceFilterQuery();

  //* ================================ Util Functions ================================

  useEffect(() => {
    const formData = walletSearchForm?.getFieldsValue();

    if (walletUuid) {
      getWithdrawalList({
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        walletUuid: walletUuid,
        branchId: formData?.branch?.code,
        samimService: formData?.service?.item?.name,
        businessId: formData?.business?.code,
      })
        .unwrap()
        .then((value) => setDataSource(value?.content));
    }
  }, [url?.page, url?.pageSize, walletSearchForm, walletUuid]);

  const viewBtnHandler = (id: number) => {
    setWithdrawWalletDrawerOpen({
      isOpen: true,
      id: id,
    });
  };

  // DRAWER HANDLER
  const closeWithdrawWalletDrawer = () => {
    setWithdrawWalletDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {withdrawWalletDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeWithdrawWalletDrawer}
          open={withdrawWalletDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AllWalletDetailsWithdrawWalletDrawerContent
              closeDrawerHandler={closeWithdrawWalletDrawer}
              id={withdrawWalletDrawerOpen?.id}
            />
          }
        />
      )}

      <div className="all-wallet-withdraw-wallet-tab-container">
        <ToolBox
          rightSide={
            <CustomButton icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} disabled iconPlacement="end">
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType>
          className="my-wallets-transaction-list-table-container"
          dataSource={dataSource}
          columns={MyWalletWithdrawWalletTabTableModel({ viewBtnHandler })}
          loading={isWithdrawalListLoading}
          pagination={manualPaginationConfig({
            total: withdrawalListData?.totalElements,
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
          key={`table-${url?.pageSize || "8"} `}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.WALLET_ALL_WALLET_DETAILS_WITHDRAW_WALLET_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default AllWalletDetailsWithdrawWalletTab;
