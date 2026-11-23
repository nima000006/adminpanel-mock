import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadWithdrawalsRequestLegalExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetWithdrawalAdvanceFilterLegalListQuery,
  useLazyGetWithdrawalListQuery,
} from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { hasActiveKeyWallet } from "@pages/Wallet/_shared/hasActiveKeyWallet";
import { GetWithdrawalAdvanceFilterLegalListRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@withdrawalAdvanceFilterLegalList";
import { UseCustomListAdvanceFilterFormType } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/hooks/useCustomListAdvanceFilterLegal/@types/UseCustomListAdvanceFilterFormType";
import WalletRequestBusinessSentToBankTableModel from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestBusinessBranches/helper/components/WalletRequestBusinessSentToBank/helper/models/WalletRequestBusinessSentToBank/WalletRequestBusinessSentToBankTableModel";
import WalletRequestReturnToRequestedDrawer from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestSentToBank/helper/drawers/WalletRequestReturnToRequested/WalletRequestReturnToRequestedDrawer";

import {
  Withdrawal,
  WithdrawalResponse,
} from "../../../../../../_shared/@types/@walletRequestUsersList";
import WalletRequestDrawer from "../../../../../../_shared/components/WalletRequestDrawer/WalletRequestDrawer";
import WalletRequestRejectedDrawer from "../../../../../../_shared/components/WalletRequestRejectedDrawer/WalletRequestRejectedDrawer";
import useCustomListAdvanceFilterLegal from "../../../../../../_shared/hooks/useCustomListAdvanceFilterLegal/useCustomListAdvanceFilterLegal";

const advanceFilterItems = ["samimServiceId", "branchIdId", "businessIdId"];

const WalletRequestBusinessSentToBank = ({ getStats }: { getStats: () => void }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isWalletRequestWaitingDrawerOpen, setIsWalletRequestWaitingDrawerOpen] =
    useState(false);
  const [
    isWalletRequestWaitingRejectedDrawerOpen,
    setIsWalletRequestWaitingRejectedDrawerOpen,
  ] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { params, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [isOpenReturnToRequested, setIsOpenReturnToRequested] = useState(false);

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const [form] = Form.useForm<UseCustomListAdvanceFilterFormType>();
  const { filterItemsList, fetchInitialData } = useCustomListAdvanceFilterLegal(form);

  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ Api ================================
  const [getWithdrawalList, { isFetching: withdrawalIsLoading }] =
    useLazyGetWithdrawalListQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterLoading }] =
    useLazyGetWithdrawalAdvanceFilterLegalListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.tab === "2" && params?.subTab === "2") {
      if (hasActiveKeyWallet(params, advanceFilterItems)) {
        const filters: Omit<
          GetWithdrawalAdvanceFilterLegalListRequest,
          "pageSize" | "pageNumber"
        > = {
          ...(params?.samimServiceId && {
            samimService: serviceOptions.filter(
              (item) => item?.id === +params?.samimServiceId
            )?.[0]?.value,
          }),
          ...(params?.branchIdId && { branchId: params?.branchIdId }),
          ...(params?.businessIdId && { businessId: params?.businessIdId }),
        };
        advanceFilter({
          pageNumber: currentPage - 1,
          pageSize: currentPageSize,
          statuses: decodeURIComponent("SENT_TO_BANK"),
          ...filters,
        })
          .unwrap()
          .then((res) => setWithdrawalData(res));
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
      walletType: "LEGAL",
      status: "SENT_TO_BANK",
    })
      .unwrap()
      .then((result) => {
        setWithdrawalData(result);
        setTotalPages(result?.totalElements);
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
  const onCloseWalletRequestWaitingDrawer = () => {
    setIsWalletRequestWaitingDrawerOpen(false);
  };
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
      GetWithdrawalAdvanceFilterLegalListRequest,
      "pageSize" | "pageNumber"
    > | null = null;

    if (hasActiveKeyWallet(params, advanceFilterItems)) {
      filters = {
        ...(params?.samimServiceId && {
          samimService: serviceOptions.filter(
            (item) => item?.id === +params?.samimServiceId
          )?.[0]?.value,
        }),
        ...(params?.branchIdId && { branchId: params?.branchIdId }),
        ...(params?.businessIdId && { businessId: params?.businessIdId }),
      };
    }

    try {
      setIsDownloadLinkLoading(true);
      const downloadLink = await downloadWithdrawalsRequestLegalExcel({
        title: "لیست درخواست های ارسال شده به بانک ",
        params: { statuses: "SENT_TO_BANK", ...filters },
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
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...params }}
        />
      )}
      {isWalletRequestWaitingDrawerOpen && (
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

      {isOpenReturnToRequested && (
        <CustomDrawer
          title="بازگشت گروهی درخواست به درانتظار بررسی"
          content={
            <WalletRequestReturnToRequestedDrawer
              selectedUsers={withdrawalData?.content.filter((item) =>
                selectedRowKeys?.includes(item?.id ?? item?.nationalCode)
              )}
              onClose={() => setIsOpenReturnToRequested(false)}
              refreshData={getWithDrawal}
              getStats={getStats}
            />
          }
          onClose={() => setIsOpenReturnToRequested(false)}
          open={isOpenReturnToRequested}
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
        rightSide={
          <CustomBadge count={badgeCount}>
            <CustomButton
              onClick={() => {
                setAdvanceModalOpen(true);
                fetchInitialData();
              }}
              icon={<AiOutlineFilter />}
            >
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
        leftSide={
          <>
            <CustomButton
              type="primary"
              danger
              disabled={selectedRowKeys?.length < 1}
              onClick={() => setIsWalletRequestWaitingRejectedDrawerOpen(true)}
            >
              رد گروهی
            </CustomButton>
            <CustomButton
              disabled={selectedRowKeys?.length < 1}
              onClick={() => setIsOpenReturnToRequested(true)}
            >
              بازگشت به درانتظار بررسی
            </CustomButton>
            <CustomButton
              onClick={() => setIsWalletRequestWaitingDrawerOpen(true)}
              disabled={selectedRowKeys?.length < 1}
            >
              تایید گروهی
            </CustomButton>
            <CustomButton
              icon={<IoIosArrowDown />}
              iconPlacement="end"
              onClick={onGetExcelFileBtn}
              loading={isDownloadLinkLoading}
            >
              خروجی
            </CustomButton>
          </>
        }
      />
      <CustomTable<Withdrawal>
        dataSource={withdrawalData?.content}
        columns={WalletRequestBusinessSentToBankTableModel()}
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
        draggableId={ExcelCodes.WALLET_WALLET_REQUEST_BUSINESS_USERS_SEND_TO_BANK_TABLE}
      />
    </>
  );
};

export default WalletRequestBusinessSentToBank;
