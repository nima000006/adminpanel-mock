import { useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { downloadWithdrawalsRequestPersonalExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetWithdrawalAdvanceFilterPersonalListQuery,
  useLazyGetWithdrawalAllListQuery,
} from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { hasActiveKeyWallet } from "@pages/Wallet/_shared/hasActiveKeyWallet";

import { WithdrawalAllResponse, WithdrawalAll } from "./@types/@walletRequestUsersAll";
import WalletRequestUsersAllModelTable from "./helper/model/WalletRequestUsersAllModelTable/WalletRequestUsersAllModelTable";
import { GetWithdrawalAdvanceFilterPersonalListRequest } from "../../../../../../_shared/@types/@withdrawalAdvanceFilterPersonalList";

const advanceFilterItems = ["firstname", "LastName", "nationalCode"];

const WalletRequestUsersAll = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentPage = params?.page ? Number(params.page) : 1;
  const currentPageSize = params?.pageSize ? Number(params.pageSize) : 8;
  const [totalPages, setTotalPages] = useState(0);
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalAllResponse | null>(
    null
  );
  const [contentData, setContentData] = useState<WithdrawalAll[]>([]);

  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);

  //? ================================ Api ================================

  const [getWithdrawalList, { isFetching: withdrawalIsLoading }] =
    useLazyGetWithdrawalAllListQuery();

  const [advanceFilter, { isFetching: isAdvanceFilterLoading }] =
    useLazyGetWithdrawalAdvanceFilterPersonalListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.tab === "1" && params?.subTab === "5") {
      if (hasActiveKeyWallet(params, advanceFilterItems)) {
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
        getWithdrawalList({
          params: {
            pageNumber: currentPage - 1,
            pageSize: currentPageSize,
          },
          walletType: "PERSONAL",
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
        title: "لیست همه درخواست های برداشت کاربران",
        params: filters,
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
      <CustomTable<WithdrawalAll>
        dataSource={contentData}
        columns={WalletRequestUsersAllModelTable()}
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
        className="wallet-request-users-all-model-table-container"
        // draggableColumns
        draggableId={ExcelCodes.WALLET_WALLET_REQUEST_USERS_ALL_TABLE}
      />
    </>
  );
};

export default WalletRequestUsersAll;
