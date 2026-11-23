import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
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

import WalletRequestBusinessUsersRejectedModelTable from "./helper/model/WalletRequestBusinessUsersRejectedModelTable/WalletRequestBusinessUsersRejectedModelTable";
import {
  Withdrawal,
  WithdrawalResponse,
} from "../../../../../../_shared/@types/@walletRequestUsersList";
import useCustomListAdvanceFilterLegal from "../../../../../../_shared/hooks/useCustomListAdvanceFilterLegal/useCustomListAdvanceFilterLegal";

const advanceFilterItems = ["samimServiceId", "branchIdId", "businessIdId"];

const WalletRequestBusinessUsersRejected = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;
  const [totalPages, setTotalPages] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  const [form] = Form.useForm<UseCustomListAdvanceFilterFormType>();
  const { filterItemsList, fetchInitialData } = useCustomListAdvanceFilterLegal(form);

  //? ================================ Api ================================
  const [getWithdrawalList, { isFetching: withdrawalIsLoading }] =
    useLazyGetWithdrawalListQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterLoading }] =
    useLazyGetWithdrawalAdvanceFilterLegalListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.tab === "2" && params?.subTab === "4") {
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
          statuses: decodeURIComponent("REJECTED"),
          ...filters,
        })
          .unwrap()
          .then((res) => setWithdrawalData(res));
      } else {
        getWithdrawalList({
          params: {
            pageNumber: currentPage - 1,
            pageSize: currentPageSize,
          },
          walletType: "LEGAL",
          status: "REJECTED",
        })
          .unwrap()
          .then((result) => {
            setWithdrawalData(result);
            setTotalPages(result?.totalElements);
          });
      }
    }
  }, [
    currentPage,
    currentPageSize,
    params?.tab,
    params?.subTab,
    ...advanceFilterItems.map((key) => params?.[key]),
  ]);

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
        title: "لیست درخواست های برداشت رد شده",
        params: { statuses: "REJECTED", ...filters },
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
          badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={{ ...params }}
        />
      )}

      <CustomDivider text="لیست درخواست‌های برداشت" />
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
          <CustomButton
            icon={<IoIosArrowDown />}
            iconPlacement="end"
            onClick={onGetExcelFileBtn}
            loading={isDownloadLinkLoading}
          >
            خروجی
          </CustomButton>
        }
      />
      <CustomTable<Withdrawal>
        dataSource={withdrawalData?.content}
        columns={WalletRequestBusinessUsersRejectedModelTable()}
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
        {...TABLE_PROPS(withdrawalData?.totalElements || 0)}
        rowKey="id"
        loading={withdrawalIsLoading || isAdvanceFilterLoading}
        className="wallet-request-business-users-rejected-model-table-container"
        draggableColumns
        draggableId={ExcelCodes.WALLET_WALLET_REQUEST_BUSINESS_USERS_REJECTED_TABLE}
      />
    </>
  );
};

export default WalletRequestBusinessUsersRejected;
