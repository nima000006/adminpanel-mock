import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";

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
import {
  useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery,
  useLazyGetMyTransactionSamimWalletListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";
import { TRANSACTION_WALLET_TYPE_STATUS } from "@pages/Wallet/Transactions/_shared/utils";
import { TRANSACTION_TYPE_STATUS_OPTIONS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import {
  GetMyLegalWalletTransactionListAdvanceFilterResponse,
  MyWalletDetailsWalletTransactionByAdvanceFilterRequest,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsTransactionSegmented/helper/components/MyWalletDetailsTransactionSegmentTable/@types/@myWalletDetailsTransactionSegmentTable";

import {
  GetMyTransactionSamimWalletListResponse,
  MyTransactionSamimWalletContentType,
  UseMyTransactionAdvanceFilterFormType,
} from "./@types/@myTransactionListWalletTab";
import WalletMoreDetailDrawerContent from "./helper/drawer/WalletMoreDetailDrawerContent/WalletMoreDetailDrawerContent";
import MyTransactionListWalletTableModel from "./helper/models/MyTransactionListWalletTableModel/MyTransactionListWalletTableModel";
import useMyTransactionAdvanceFilter from "../MyTransactionListUsersTab/helper/models/AdvanceFilterModal/MyTransactionAdvanceFilter";

import "./_myTransactionListWalletTab.scss";

const advanceFilterItems = [
  "uuid",
  "referenceNo",
  "trackNo",
  "dateDateStart",
  "dateDateEnd",
  "transactionTypeId",
];
const MyTransactionListWalletTab = () => {
  const [dataSource, setDataSource] = useState<MyTransactionSamimWalletContentType[]>([]);

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
    useLazyGetMyTransactionSamimWalletListQuery();

  const [
    getTransactionAdvanceFilterList,
    { isFetching: isTransactionAdvanceFilterListLoading },
  ] = useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery();

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

        const filters: MyWalletDetailsWalletTransactionByAdvanceFilterRequest = {
          ...(url?.uuid && { uuid: url?.uuid }),
          ...(url?.referenceNo && { referenceNo: url?.referenceNo }),
          ...(url?.trackNo && { trackNo: url?.trackNo }),
          ...(url?.dateDateStart && { from: url?.dateDateStart }),
          ...(url?.dateDateEnd && { to: url?.dateDateEnd }),
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
    value: GetMyTransactionSamimWalletListResponse
  ) => {
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
      {isDetailDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={isDetailDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
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
      <div className="my-transaction-list-wallet-tab-container">
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
        <CustomTable<MyTransactionSamimWalletContentType>
          dataSource={dataSource}
          rowKey="id"
          columns={MyTransactionListWalletTableModel({ viewDetails })}
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
          draggableId={ExcelCodes.WALLET_MY_TRANSACTION_LIST_WALLET_TAB_TABLE}
        />
      </div>
    </>
  );
};
export default MyTransactionListWalletTab;
