import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadWithdrawalsRequestPersonalExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetWithdrawalAdvanceFilterPersonalListQuery,
  useLazyGetWithdrawalListQuery,
} from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { hasActiveKeyWallet } from "@pages/Wallet/_shared/hasActiveKeyWallet";
import WalletRequestSentToBankDrawer from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestUsersWaiting/helper/drawers/WalletRequestSentToBank/WalletRequestSentToBankDrawer";

import WalletRequestUsersWaitingModelTable from "./helper/model/WalletRequestUsersWaitingModelTable/WalletRequestUsersWaitingModelTable";
import {
  Withdrawal,
  WithdrawalResponse,
} from "../../../../../../_shared/@types/@walletRequestUsersList";
import { GetWithdrawalAdvanceFilterPersonalListRequest } from "../../../../../../_shared/@types/@withdrawalAdvanceFilterPersonalList";
import WalletRequestRejectedDrawer from "../../../../../../_shared/components/WalletRequestRejectedDrawer/WalletRequestRejectedDrawer";

import "./_walletRequestUsersWaiting.scss";

const advanceFilterItems = ["firstname", "LastName", "nationalCode"];
const WalletRequestUsersWaiting = ({ getStats }: { getStats: () => void }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /* Todo[Atefeh]: uncomment this when the drawer is needed */
  // const [isWalletRequestWaitingDrawerOpen, setIsWalletRequestWaitingDrawerOpen] =
  //   useState(false);

  const [
    isWalletRequestWaitingRejectedDrawerOpen,
    setIsWalletRequestWaitingRejectedDrawerOpen,
  ] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalResponse | null>(null);
  const [contentData, setContentData] = useState<Withdrawal[]>([]);

  const [
    isWalletRequestWaitingSentToBankDrawerOpen,
    setIsWalletRequestWaitingSentToBankDrawerOpen,
  ] = useState(false);

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const { params, setSearchParams } = useQueryParams();

  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ Api ================================
  const [getWithdrawalList, { isFetching: withdrawalIsLoading }] =
    useLazyGetWithdrawalListQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterLoading }] =
    useLazyGetWithdrawalAdvanceFilterPersonalListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.tab === "1" && params?.subTab === "1") {
      if (hasActiveKeyWallet(params, advanceFilterItems)) {
        const filters: Omit<
          GetWithdrawalAdvanceFilterPersonalListRequest,
          "pageSize" | "pageNumber"
        > = {
          ...(params?.firstname && { firstName: params?.firstname }),
          ...(params?.LastName && { lastName: params?.LastName }),
          ...(params?.nationalCode && {
            nationalCode: params?.nationalCode,
          }),
        };
        advanceFilter({
          pageNumber: currentPage - 1,
          pageSize: currentPageSize,
          statuses: decodeURIComponent("REQUESTED"),
          ...filters,
        })
          .unwrap()
          .then((res) => {
            setWithdrawalData(res);
            const tempData = res?.content?.map((item) => ({
              ...item,
              firstname: item?.userStaffDetail?.firstname,
              LastName: item?.userStaffDetail?.LastName,
            }));
            setContentData(tempData);
          });
      } else {
        getWithDrawal();
      }
    }
  }, [
    currentPage,
    currentPageSize,
    params?.tab,
    params?.subTab,
    ...advanceFilterItems.map((key) => params?.[key]),
  ]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [withdrawalData]);
  // ================================ Utils function ================================

  const getWithDrawal = () => {
    getWithdrawalList({
      params: {
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
      },
      walletType: "PERSONAL",
      status: "REQUESTED",
    })
      .unwrap()
      .then((res) => {
        setWithdrawalData(res);
        const tempData = res?.content?.map((item) => ({
          ...item,
          firstname: item?.userStaffDetail?.firstname,
          LastName: item?.userStaffDetail?.LastName,
        }));
        setContentData(tempData);
        setTotalPages(res?.totalElements);
      });
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKeys = dataList.map((item) => item.id).filter(Boolean);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  /* Todo[Atefeh]: uncomment this when the drawer is needed */
  // const onCloseWalletRequestWaitingDrawer = () => {
  //   setIsWalletRequestWaitingDrawerOpen(false);
  // };
  const onCloseWalletRequestWaitingRejectedDrawer = () => {
    setIsWalletRequestWaitingRejectedDrawerOpen(false);
  };
  const dataList: Withdrawal[] = withdrawalData?.content ?? [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const allSelected = dataList.length > 0 && selectedRowKeys.length === dataList.length;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < dataList.length;

  // Excel
  const onGetExcelFileBtn = async () => {
    let filters: Omit<
      GetWithdrawalAdvanceFilterPersonalListRequest,
      "pageSize" | "pageNumber"
    > | null = null;

    if (hasActiveKeyWallet(params, advanceFilterItems)) {
      filters = {
        ...(params?.firstname && { firstName: params?.firstname }),
        ...(params?.LastName && { lastName: params?.LastName }),
        ...(params?.nationalCode && {
          nationalCode: params?.nationalCode,
        }),
      };
    }

    try {
      setIsDownloadLinkLoading(true);
      const downloadLink = await downloadWithdrawalsRequestPersonalExcel({
        title: "لیست درخواست های برداشت در انتظار بررسی",
        params: { statuses: "REQUESTED", ...filters },
      });

      if (downloadLink?.length) {
        toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
      } else {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      }
    } catch (_) {
      toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
    } finally {
      setIsDownloadLinkLoading(false);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* Todo[Atefeh]: uncomment this when the drawer is needed */}
      {/* {isWalletRequestWaitingDrawerOpen && (
        <CustomDrawer
          title="تایید گروهی درخواست"
          content={
            <WalletRequestDrawer
              selectedUsers={withdrawalData?.content.filter((item) =>
                selectedRowKeys?.includes(item?.id ?? item?.nationalCode)
              )}
              onClose={onCloseWalletRequestWaitingDrawer}
              refreshData={getWithDrawal}
              getStats={getStats}
            />
          }
          onClose={onCloseWalletRequestWaitingDrawer}
          open={isWalletRequestWaitingDrawerOpen}
          closeIcon={<AiOutlineClose />}
        />
      )} */}
      {isWalletRequestWaitingSentToBankDrawerOpen && (
        <CustomDrawer
          title="ارسال گروهی به بانک"
          content={
            <WalletRequestSentToBankDrawer
              selectedUsers={withdrawalData?.content.filter((item) =>
                selectedRowKeys?.includes(item?.id ?? item?.nationalCode)
              )}
              onClose={() => setIsWalletRequestWaitingSentToBankDrawerOpen(false)}
              refreshData={getWithDrawal}
              getStats={getStats}
              from="personal"
            />
          }
          onClose={() => setIsWalletRequestWaitingSentToBankDrawerOpen(false)}
          open={isWalletRequestWaitingSentToBankDrawerOpen}
          closeIcon={<AiOutlineClose />}
        />
      )}
      {isWalletRequestWaitingRejectedDrawerOpen && (
        <CustomDrawer
          title="رد گروهی درخواست"
          content={
            <WalletRequestRejectedDrawer
              selectedUsers={withdrawalData?.content.filter((item) =>
                selectedRowKeys?.includes(item?.id ?? item?.nationalCode)
              )}
              onClose={onCloseWalletRequestWaitingRejectedDrawer}
              refreshData={getWithDrawal}
              getStats={getStats}
            />
          }
          onClose={onCloseWalletRequestWaitingRejectedDrawer}
          open={isWalletRequestWaitingRejectedDrawerOpen}
          closeIcon={<AiOutlineClose />}
        />
      )}
      <CustomDivider
        text="لیست درخواست‌های برداشت"
        extraContent={
          <Checkbox
            indeterminate={isIndeterminate}
            onChange={onCheckAllChange}
            checked={allSelected}
          >
            انتخاب همه
          </Checkbox>
        }
      />
      <ToolBox
        className="wallet-request-waiting-toolbox-container"
        leftSide={
          <div className="actions-button-container">
            <CustomButton
              type="primary"
              danger
              disabled={selectedRowKeys?.length < 1}
              onClick={() => setIsWalletRequestWaitingRejectedDrawerOpen(true)}
            >
              رد گروهی
            </CustomButton>

            {/* Todo[Atefeh]: uncomment this when the drawer is needed */}
            {/* <CustomButton
              onClick={() => setIsWalletRequestWaitingDrawerOpen(true)}
              disabled={selectedRowKeys?.length < 1}
            >
              تایید گروهی
            </CustomButton> */}
            <CustomButton
              onClick={() => setIsWalletRequestWaitingSentToBankDrawerOpen(true)}
              disabled={selectedRowKeys?.length < 1}
            >
              ارسال گروهی به بانک
            </CustomButton>
            <CustomButton
              icon={<IoIosArrowDown />}
              iconPlacement="end"
              onClick={onGetExcelFileBtn}
              loading={isDownloadLinkLoading}
            >
              خروجی
            </CustomButton>
          </div>
        }
      />
      <CustomTable<Withdrawal>
        dataSource={contentData}
        columns={WalletRequestUsersWaitingModelTable()}
        pagination={manualPaginationConfig({
          total: totalPages,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...params,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: params?.page ? Number(params?.page) : 1,
          defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
        })}
        key={`table-${params?.pageSize || "8"}`}
        rowKey="id"
        loading={withdrawalIsLoading || isAdvanceFilterLoading}
        className="wallet-request-users-waiting-model-table-container"
        rowSelection={rowSelection}
        draggableColumns
        draggableId={ExcelCodes.WALLET_WALLET_REQUEST_USERS_WAITING_TABLE}
      />
    </>
  );
};

export default WalletRequestUsersWaiting;
