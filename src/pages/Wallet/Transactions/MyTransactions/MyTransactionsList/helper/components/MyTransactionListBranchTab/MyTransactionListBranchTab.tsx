import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
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
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery,
  useLazyGetMyTransactionListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import {
  TRANSACTION_WALLET_TYPE,
  TRANSACTION_WALLET_TYPE_STATUS,
} from "@pages/Wallet/Transactions/_shared/utils";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { GetMyLegalWalletTransactionListAdvanceFilterResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsTransactionSegmented/helper/components/MyWalletDetailsTransactionSegmentTable/@types/@myWalletDetailsTransactionSegmentTable";

import {
  GetMyTransactionListResponse,
  MyTransactionDataType,
  UseMyTransactionAdvanceFilterFormType,
  WalletMyTransactionByAdvanceFilterRequest,
  WalletMyTransactionDataType,
} from "../MyTransactionListUsersTab/@types/@myTransactionListUsersTab";
import BranchTabMoreDetailDrawerContent from "./helper/drawer/BranchTabMoreDetailDrawerContent/BranchTabMoreDetailDrawerContent";
import MyTransactionListBranchTableModel from "./helper/models/MyTransactionListBranchTableModel/MyTransactionListBranchTableModel";
import useMyTransactionAdvanceFilter from "../MyTransactionListUsersTab/helper/models/AdvanceFilterModal/MyTransactionAdvanceFilter";

import "./_myTransactionListBranchTab.scss";

const advanceFilterItems = [
  "uuid",
  "referenceNo",
  "trackNo",
  "dateDateStart",
  "dateDateEnd",
  "transactionTypeId",
];

const MyTransactionListBranchTab = () => {
  const [dataSource, setDataSource] = useState<
    MyTransactionDataType[] | WalletMyTransactionDataType[]
  >([]);

  const [totalPages, setTotalPages] = useState(0);

  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState({
    id: "",
    isOpen: false,
  });

  const { params: url, setSearchParams } = useQueryParams();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseMyTransactionAdvanceFilterFormType>();

  const { filterItemsList } = useMyTransactionAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getTransActionList, { isFetching: isTransActionListLoading }] =
    useLazyGetMyTransactionListQuery();

  const [
    getTransactionAdvanceFilterList,
    { isFetching: isTransactionAdvanceFilterListLoading },
  ] = useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.tab === TRANSACTION_WALLET_TYPE_STATUS.legal) {
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

        const filters: WalletMyTransactionByAdvanceFilterRequest = {
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
        })
          .unwrap()
          .then(getTransActionAdvanceFilterListSuccess);
      } else {
        getTransActionList({
          params: {
            pageNumber: url?.page ? Number(url?.page) - 1 : 0,
            pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          },
          walletType: TRANSACTION_WALLET_TYPE.legal,
        })
          .unwrap()
          .then(getTransActionListSuccess);
      }
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.tab,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  // ================================ Util Functions ================================
  const getTransActionListSuccess = async (value: GetMyTransactionListResponse) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };

  const getTransActionAdvanceFilterListSuccess = (
    value: GetMyLegalWalletTransactionListAdvanceFilterResponse
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
      {isDetailDrawerOpen?.id && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={isDetailDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <BranchTabMoreDetailDrawerContent
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

      <div className="my-transaction-list-branch-tab-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={<CustomButton disabled={true}>خروجی اکسل</CustomButton>}
        />
        <CustomTable<MyTransactionDataType | WalletMyTransactionDataType>
          dataSource={dataSource}
          rowKey="id"
          columns={MyTransactionListBranchTableModel({ viewDetails })}
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
          draggableColumns
          draggableId={ExcelCodes.WALLET_MY_TRANSACTION_LIST_BRANCH_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default MyTransactionListBranchTab;
