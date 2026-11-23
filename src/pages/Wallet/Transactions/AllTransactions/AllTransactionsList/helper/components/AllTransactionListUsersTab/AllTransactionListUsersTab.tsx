import { useEffect, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllTransactionListQuery,
  useLazyGetPersonalWalletTransactionListAdvanceFilterQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import {
  TRANSACTION_WALLET_TYPE,
  TRANSACTION_WALLET_TYPE_STATUS,
} from "@pages/Wallet/Transactions/_shared/utils";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { AllWalletDetailsWalletTransactionByAdvanceFilterRequest } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsTransactionSegmented/helper/components/AllWalletDetailsTransactionSegmentTable/@types/@allWalletDetailsTransactionSegmentTable";

import {
  AllTransactionDataType,
  GetAllTransactionListResponse,
  GetPersonalWalletTransactionListAdvanceFilterResponse,
  UseAllTransactionAdvanceFilterFormType,
} from "./@types/@allTransactionListUsersTab";
import MoreDetailDrawerContent from "./helper/drawer/MoreDetailDrawerContent/MoreDetailDrawerContent";
import useAllTransactionAdvanceFilter from "./helper/models/AdvanceFilterModal/AllTransactionAdvanceFilter";
import AllTransactionListUsersTableModel from "./helper/models/AllTransactionListUsersTableModel/AllTransactionListUsersTableModel";

import "./_allTransactionListUsersTab.scss";

const advanceFilterItems = [
  "uuid",
  "referenceNo",
  "trackNo",
  "dateDateStart",
  "dateDateEnd",
  "transactionTypeId",
];

const AllTransactionListUsersTab = () => {
  const [dataSource, setDataSource] = useState<AllTransactionDataType[]>([]);

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
    useLazyGetAllTransactionListQuery();

  const [
    getTransactionAdvanceFilterList,
    { isFetching: isTransactionAdvanceFilterListLoading },
  ] = useLazyGetPersonalWalletTransactionListAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.tab === TRANSACTION_WALLET_TYPE_STATUS.personal) {
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
        })
          .unwrap()
          .then(getTransActionAdvanceFilterListSuccess);
      } else {
        getTransActionList({
          params: {
            pageNumber: url?.page ? Number(url?.page) - 1 : 0,
            pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          },
          walletType: TRANSACTION_WALLET_TYPE.personal,
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
  const getTransActionListSuccess = async (value: GetAllTransactionListResponse) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };

  const getTransActionAdvanceFilterListSuccess = (
    value: GetPersonalWalletTransactionListAdvanceFilterResponse
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
      {isDetailDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={isDetailDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          size="large"
          content={
            <MoreDetailDrawerContent
              transactionUuid={isDetailDrawerOpen?.id}
              closeDrawerHandler={closeDetailDrawerHandler}
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
      <div className="all-transaction-list-users-tab-container">
        <CustomDivider text="لیست تراکنش‌ها" />
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
        <CustomTable<AllTransactionDataType>
          dataSource={dataSource}
          rowKey="id"
          columns={AllTransactionListUsersTableModel({ viewDetails })}
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
          loading={isTransActionListLoading || isTransactionAdvanceFilterListLoading}
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
          draggableColumns
          draggableId={ExcelCodes.WALLET_ALL_TRANSACTION_LIST_USERS_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default AllTransactionListUsersTab;
