import { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
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

import WalletRequestUsersAcceptedModelTable from "./helper/model/WalletRequestUsersAcceptedModelTable/WalletRequestUsersAcceptedModelTable";
import {
  WithdrawalResponse,
  Withdrawal,
} from "../../../../../../_shared/@types/@walletRequestUsersList";
import { GetWithdrawalAdvanceFilterPersonalListRequest } from "../../../../../../_shared/@types/@withdrawalAdvanceFilterPersonalList";

const advanceFilterItems = ["firstname", "LastName", "nationalCode"];
const WalletRequestUsersConfirmed = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [contentData, setContentData] = useState<Withdrawal[]>([]);

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
    const isActiveFilter = hasActiveKeyWallet(params, advanceFilterItems);

    if (!(params?.tab === "1" && params?.subTab === "3")) return;

    const handleResponse = (res: WithdrawalResponse) => {
      const tempData =
        res?.content?.map((item) => ({
          ...item,
          firstname: item?.userStaffDetail?.firstname,
          LastName: item?.userStaffDetail?.LastName,
        })) || [];

      setContentData(tempData);
      setTotalPages(res?.totalElements || 0);
    };

    if (isActiveFilter) {
      const filters: Omit<
        GetWithdrawalAdvanceFilterPersonalListRequest,
        "pageSize" | "pageNumber"
      > = {
        ...(params?.firstname && { firstName: decodeURIComponent(params?.firstname) }),
        ...(params?.LastName && { lastName: decodeURIComponent(params?.LastName) }),
        ...(params?.nationalCode && {
          nationalCode: decodeURIComponent(params?.nationalCode),
        }),
      };

      advanceFilter({
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
        statuses: "ACCEPTED",
        ...filters,
      })
        .unwrap()
        .then(handleResponse);

      return;
    }

    getWithdrawalList({
      params: {
        pageNumber: currentPage - 1,
        pageSize: currentPageSize,
      },
      walletType: "PERSONAL",
      status: "ACCEPTED",
    })
      .unwrap()
      .then(handleResponse);
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
        title: "لیست درخواست های برداشت تأیید شده",
        params: { statuses: "ACCEPTED", ...filters },
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
      <CustomDivider text="لیست درخواست‌های برداشت" />
      <ToolBox
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
        dataSource={contentData}
        columns={WalletRequestUsersAcceptedModelTable()}
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
        draggableColumns
        rowKey="id"
        loading={withdrawalIsLoading || isAdvanceFilterLoading}
        className="wallet-request-users-accepted-model-table-container"
        draggableId={ExcelCodes.WALLET_WALLET_REQUEST_USERS_CONFIRMED_TABLE}
      />
    </>
  );
};

export default WalletRequestUsersConfirmed;
