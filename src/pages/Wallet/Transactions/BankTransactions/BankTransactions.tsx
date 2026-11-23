import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBankTransactionListsQuery,
  useResolveConflictEstelamMutation,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { formatDateRangeHoursForApi } from "@pages/_shared/utils/formatDateRangeHoursForApi";
import {
  GetBankTransactionListsItems,
  GetBankTransactionListsRequest,
  GetBankTransactionListsResponse,
  UseBankTransactionAdvanceFilterFormType,
} from "@pages/Wallet/Transactions/BankTransactions/@types/@bankTransactions";
import BankMoreDetailDrawerContent from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/BankMoreDetailDrawerContent";
import useBankTransactionAdvanceFilter from "@pages/Wallet/Transactions/BankTransactions/helper/hooks/useBankTransactionAdvanceFilter";
import ResolveConflictModalContent from "@pages/Wallet/Transactions/BankTransactions/helper/modal/ResolveConflictModalContent/ResolveConflictModalContent";
import BankTransactionListTableModel from "@pages/Wallet/Transactions/BankTransactions/helper/models/BankTransactionListTableModel/BankTransactionListTableModel";

const ESTELAM_SUCCESS_MSG = "تراکنش موفق!";
const ESTELAM_FAILED_MSG = "تراکنش ناموفق!";

const BankTransactions = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: "تراکنش‌های بانکی",
      },
    ],
  });

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [dataList, setDataList] = useState<GetBankTransactionListsResponse>();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [selectedTransaction, setSelectedTransaction] = useState<{
    isOpen: boolean;
    transaction: GetBankTransactionListsItems;
  }>({
    isOpen: false,
    transaction: {} as GetBankTransactionListsItems,
  });

  const [resolveConflict, setIsResolveConflict] = useState({ isOpen: false, id: -1 });

  const [form] = Form.useForm<UseBankTransactionAdvanceFilterFormType>();

  const { filterItemsList } = useBankTransactionAdvanceFilter({
    advanceModalOpen,
  });

  //? ================================  Api Calls ================================
  // get list
  const [getBankTransaction, { isFetching: isGetBankTransactionLoading }] =
    useLazyGetBankTransactionListsQuery();

  // estelam
  const [estelam, { isLoading: isEstelamLoading }] = useResolveConflictEstelamMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    getBankTransactionHandler();
  }, [
    getBankTransaction,
    url?.branchIdsId,
    url?.dateDateEnd,
    url?.dateDateStart,
    url?.gateWayPaymentName,
    url?.nationalCode,
    url?.page,
    url?.pageSize,
    url?.personalCode,
    url?.referenceNumber,
    url?.samimServiceName,
    url?.sortings,
    url?.staffTypeName,
    url.successPaymentId,
    url?.trackNumber,
  ]);

  //* ================================ Util Functions ================================

  const getBankTransactionHandler = () => {
    const { from, to } = formatDateRangeHoursForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
      isUTC: true,
    });
    const requestParams: GetBankTransactionListsRequest = {
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      // modal search
      ...(url?.successPaymentId && {
        status: url.successPaymentName,
      }),
      ...(url?.gateWayPaymentName && { gateWayPayment: url?.gateWayPaymentName }),
      ...(url?.branchIdsId && { branchIds: url?.branchIdsId }),
      ...(url?.staffTypeName && { staffType: url?.staffTypeName }),
      ...(url?.samimServiceName && { samimService: url?.samimServiceName }),
      ...(url?.nationalCode && { nationalCode: url?.nationalCode }),
      ...(url?.personalCode && { personalCode: url?.personalCode }),
      ...(url?.referenceNumber && { referenceNumber: url?.referenceNumber }),
      ...(url?.trackNumber && { trackNumber: url?.trackNumber }),
      ...(from && { fromDate: from }),
      ...(to && { toDate: to }),
      sortBy: "createdDate",
      sortDirection: "DESC",
    };
    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestParams.sortBy = sorting.sortBy;
      } else {
        delete requestParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestParams.sortDirection;
      }
    }

    getBankTransaction(requestParams)
      .unwrap()
      .then((res) => setDataList(res))
      .catch(() => {
        setDataList({
          content: [],
          pageNumber: 0,
          pageSize: 0,
          first: false,
          last: true,
          totalElements: 0,
          totalPages: 0,
          size: 0,
        });
      });
  };

  const closeDetailDrawerHandler = () =>
    setSelectedTransaction({
      isOpen: false,
      transaction: {} as GetBankTransactionListsItems,
    });

  const viewDetails = (record: GetBankTransactionListsItems) =>
    setSelectedTransaction({
      isOpen: true,
      transaction: record,
    });

  const resolveConflictBtn = (paymentRequestId: number) => {
    setIsResolveConflict({
      isOpen: true,
      id: paymentRequestId,
    });
  };

  const estelamHandler = () => {
    if (resolveConflict.id > 0) {
      estelam(resolveConflict.id)
        .unwrap()
        .then(() => {
          //  اگر نتیجه استعلام مو فق بود
          toast.success(ESTELAM_SUCCESS_MSG, { toastId: ESTELAM_SUCCESS_MSG });
          closeResolveConflictModalHandler();
          getBankTransactionHandler();
        })
        .catch(() => {
          toast.error(ESTELAM_FAILED_MSG, { toastId: ESTELAM_FAILED_MSG });
        });
    }
  };

  const closeResolveConflictModalHandler = () => {
    setIsResolveConflict({
      isOpen: false,
      id: -1,
    });
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCE FILTER */}
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}

      {/* DRAWER DETAIL */}
      {selectedTransaction?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={selectedTransaction.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <BankMoreDetailDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
              transaction={selectedTransaction.transaction}
              setIsResolveConflict={setIsResolveConflict}
            />
          }
        />
      )}

      {/* RESOLVE CONFLICT MODAL */}
      {resolveConflict?.isOpen && (
        <ConfirmationModalWithContent
          title="رفع مغایرت"
          backBtnText="انصراف"
          confirmBtnText="استعلام از بانک و رفع مغایرت"
          isModalOpen={resolveConflict?.isOpen}
          onConfirmClickHandler={estelamHandler}
          closeModalHandler={closeResolveConflictModalHandler}
          isConfirmButtonLoading={isEstelamLoading}
          content={<ResolveConflictModalContent id={resolveConflict.id} />}
        />
      )}

      {/* RESOLVE CONFLICT RESULT MODAL */}
      {/* //Todo[Atefeh]: uncomment when not needed in the future */}
      {/* {resolveConflictResult && (
        <Modal
          title="نتیجه رفع مغایرت"
          open={resolveConflictResult}
          onCancel={closeResolveConflictResultModalHandler}
          footer={null}
          width={800}
          zIndex={2000}
        >
          <ResolveConflictResultModalContent showResult={showResult} />
        </Modal>
      )} */}

      <ToolBox
        rightSide={
          <CustomBadge count={badgeCount}>
            <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
        leftSide={<CustomButton disabled>خروجی </CustomButton>}
      />
      <CustomTable<GetBankTransactionListsItems>
        className="mt-3"
        dataSource={dataList?.content}
        rowKey="id"
        columns={BankTransactionListTableModel({ viewDetails, resolveConflictBtn })}
        pagination={manualPaginationConfig({
          total: dataList?.totalElements,
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
        loading={isGetBankTransactionLoading}
        draggableColumns
        draggableId={ExcelCodes.WALLET_BANK_TRANSACTION_LIST_TABLE}
      />
    </>
  );
};
export default BankTransactions;
