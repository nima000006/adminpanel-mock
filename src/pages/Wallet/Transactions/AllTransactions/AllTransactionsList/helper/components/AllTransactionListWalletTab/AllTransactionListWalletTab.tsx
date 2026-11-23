import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllTransactionSamimWalletListQuery,
  useLazyGetLegalWalletTransactionListAdvanceFilterQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { TRANSACTION_WALLET_TYPE_STATUS } from "@pages/Wallet/Transactions/_shared/utils";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { AllWalletDetailsWalletTransactionByAdvanceFilterRequest } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsTransactionSegmented/helper/components/AllWalletDetailsTransactionSegmentTable/@types/@allWalletDetailsTransactionSegmentTable";

import {
  AllTransactionSamimWalletContentType,
  GetAllTransactionSamimWalletListResponse,
} from "./@types/@allTransactionListWalletTab";
import { GetLegalWalletTransactionListAdvanceFilterResponse } from "../AllTransactionListBranchTab/@types/@allTransactionListBranchTab";
import { UseAllTransactionAdvanceFilterFormType } from "../AllTransactionListUsersTab/@types/@allTransactionListUsersTab";
import WalletMoreDetailDrawerContent from "./helper/drawer/WalletMoreDetailDrawerContent/WalletMoreDetailDrawerContent";
import AllTransactionListWalletTableModel from "./helper/models/AllTransactionListWalletTableModel/AllTransactionListWalletTableModel";
import useAllTransactionAdvanceFilter from "../AllTransactionListUsersTab/helper/models/AdvanceFilterModal/AllTransactionAdvanceFilter";

import "./_allTransactionListWalletTab.scss";
import { ExcelCodes } from "@infra/config/excel-codes";

const advanceFilterItems = [
  "uuid",
  "referenceNo",
  "trackNo",
  "dateDateStart",
  "dateDateEnd",
  "transactionTypeId",
];

const AllTransactionListWalletTab = () => {
  const [dataSource, setDataSource] = useState<AllTransactionSamimWalletContentType[]>(
    []
  );

  const [totalPages, setTotalPages] = useState(0);

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState({
    id: "",
    isOpen: false,
  });

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseAllTransactionAdvanceFilterFormType>();

  const { filterItemsList } = useAllTransactionAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getTransActionList, { isFetching: isTransActionListLoading }] =
    useLazyGetAllTransactionSamimWalletListQuery();

  const [
    getTransactionAdvanceFilterList,
    { isFetching: isTransactionAdvanceFilterListLoading },
  ] = useLazyGetLegalWalletTransactionListAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.tab === TRANSACTION_WALLET_TYPE_STATUS.wallet) {
      if (hasActiveKey(url, advanceFilterItems)) {
        let transactionType: string | undefined = "";

        if (url?.transactionTypeId) {
          transactionType = TRANSACTION_TYPE_STATUS_OPTIONS.find(
            (item) => item.id === +url?.transactionTypeId
          )?.text;
        }

        // Format dates: from should be start of day (00:00:00), to should be end of day (23:59:59) or current time if today
        let formattedFrom: string | undefined;
        let formattedTo: string | undefined;

        if (url?.dateDateStart) {
          formattedFrom = dayjs(url.dateDateStart).startOf("day").utc().toISOString();
        }

        if (url?.dateDateEnd) {
          const now = dayjs();
          const endDate = dayjs(url.dateDateEnd);

          const isToday =
            endDate.year() === now.year() &&
            endDate.month() === now.month() &&
            endDate.date() === now.date();

          if (isToday) {
            // اگر تاریخ مربوط به امروز باشد تا همین لحظه سیستم
            formattedTo = now.utc().toISOString();
          } else {
            // تا پایان روز 23:59:59
            formattedTo = endDate.endOf("day").utc().toISOString();
          }
        }

        const filters: AllWalletDetailsWalletTransactionByAdvanceFilterRequest = {
          ...(url?.uuid && { uuid: url?.uuid }),
          ...(url?.referenceNo && { referenceNo: url?.referenceNo }),
          ...(url?.trackNo && { trackNo: url?.trackNo }),
          ...(formattedFrom && { from: formattedFrom }),
          ...(formattedTo && { to: formattedTo }),
          ...(transactionType && { transactionType: transactionType }),
        };

        getTransactionAdvanceFilterList({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          ...filters,
          branchId: 1,
        })
          .unwrap()
          .then(getTransActionAdvanceFilterListSuccess);
      } else {
        getTransActionList({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })
          .unwrap()
          .then(getTransActionListSuccess);
      }
    }
  }, [
    url?.page,
    url?.tab,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  // ================================ Util Functions ================================
  const getTransActionListSuccess = async (
    value: GetAllTransactionSamimWalletListResponse
  ) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };

  const getTransActionAdvanceFilterListSuccess = (
    value: GetLegalWalletTransactionListAdvanceFilterResponse
  ) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };

  const closeDetailDrawerHandler = () => setIsDetailDrawerOpen({ id: "", isOpen: false });

  const viewDetails = (id: string) => setIsDetailDrawerOpen({ id, isOpen: true });

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
      <div className="all-transaction-list-wallet-tab-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={<CustomButton disabled={true}>خروجی </CustomButton>}
        />
        <CustomTable<AllTransactionSamimWalletContentType>
          dataSource={dataSource}
          rowKey="id"
          columns={AllTransactionListWalletTableModel({ viewDetails })}
          pagination={manualPaginationConfig({
            total: totalPages,
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
          loading={isTransActionListLoading || isTransactionAdvanceFilterListLoading}
          {...TABLE_PROPS(dataSource?.length)}
          draggableColumns
          draggableId={ExcelCodes.WALLET_ALL_TRANSACTION_LIST_WALLET_TAB_TABLE}
        />
      </div>
      {isDetailDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={isDetailDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          size="large"
          content={
            <WalletMoreDetailDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
              transactionUuid={isDetailDrawerOpen?.id}
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
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}
    </>
  );
};
export default AllTransactionListWalletTab;
