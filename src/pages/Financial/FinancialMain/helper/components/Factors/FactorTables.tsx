import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import dayjs from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { AiFillFileExcel } from "react-icons/ai";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ExcelModal from "@components/Modals/GeneralModals/ExcelModal/ExcelModal";
import AdvancedFilter from "@components/Renderers/AdvancedFilter/AdvancedFilter";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { nonNullValues } from "@infra/helpers/utils";

import CustomBadge from "../../../../../../components/Renderers/CustomBadge/CustomBadge";
import manualPaginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { FactorsTableModel } from "../../../../../../infrastructure/models/tableModels/Financial/FactorsTableModel/FactorsTableModel";
import {
  useFinancialAdvanceFilterWithDateMutation,
  useGetFinancialListMutation,
} from "../../../../../../infrastructure/states/redux/Apis/financialApi";
import { GENERAL_ERROR_MESSAGE } from "../../../../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  downloadExcelAll,
  downloadExcelAllFiltered,
  onClickGetChosenExcelFile,
} from "../../../../utils/financialUtils";

import "./_factorTable.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  FactorTablesProp,
  FactorUserType,
  GetAdvanceFilterWithDateResponse,
  GetFinancialListResponse,
  SettlementModalType,
} from "./@types/@factorTables";
import FinancialAdvancedFilter from "./helper/components/FinancialAdvancedFilter";
import FilterChipGenerator from "./helper/components/FilterChipGenerator";
import ClearSettlementModal from "./helper/modal/ClearSettlementModal/ClearSettlementModal";

const FactorTables = memo(({ type }: FactorTablesProp) => {
  const [excelForm] = Form.useForm();
  const [advancedModal, setAdvancedModal] = useState({ isOpen: false });
  const [selectedUsers, setSelectedUsers] = useState<FactorUserType[]>([]);
  const [dataSource, setDataSource] = useState<FactorUserType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [settlementModal, setSettlementModal] = useState<SettlementModalType>({
    isOpen: false,
    data: [],
  });
  const [isSettlementUpdated, setIsSettlementUpdated] = useState(false);
  const [advanceFilterForm] = Form.useForm();
  const [badgeCount, setBadgeCount] = useState(0);
  const [isExcelDownloadLinkLoading, setIsExcelDownloadLinkLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    beneficiaryBranchCode = null,
    branchCode = null,
    nationalNumber = null,
    referenceNumber = null,
    serviceName = null,
    trackingNumber = null,
    isFiltered = null,
    paymentStatus,
    page,
    pageSize,
    from,
    to,
  } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  // useGetFinancialList hook
  const [
    getFinancialList,
    { isLoading: isGetFinancialLoading, isError: isGetFinancialError },
  ] = useGetFinancialListMutation();

  // Advanced search Api hook
  // const [financialAdvancedFilter, { isLoading: isFinancialFilterDataLoading }] =
  //   usePostFinancialAdvanceFilterMutation();

  // Advanced search Api hook with Date
  const [
    financialAdvancedFilterWithDate,
    { isLoading: isFinancialFilterWithDateDataLoading },
  ] = useFinancialAdvanceFilterWithDateMutation();

  //* ================================ Util Functions ================================
  const searchParamCounter = () => {
    const urlObject = {
      beneficiaryBranchCode,
      branchCode,
      nationalNumber,
      referenceNumber,
      serviceName,
      trackingNumber,
      paymentStatus,
      from,
      to,
    };

    const count = nonNullValues(urlObject).length;

    if (count < 1) {
      setSearchParams({});
      setSelectedRowKeys([]);
      setSelectedUsers([]);
    }

    setBadgeCount(count);
  };

  // getData
  const getData = () => {
    if (isFiltered) {
      searchParamCounter();

      financialAdvancedFilterWithDate({
        pageNumber: Number(page) - 1 || 0,
        pageSize: Number(pageSize) || 8,
        beneficiaryBranchCode: beneficiaryBranchCode ? beneficiaryBranchCode : null,
        studentBranchCode: branchCode ? branchCode : null,
        referenceNumber: referenceNumber ? referenceNumber : null,
        // branchCode: branchCode ? branchCode : null,
        // nationalNumber: nationalNumber ? nationalNumber : null,
        // serviceName: serviceName ? serviceName : null,
        // trackingNumber: trackingNumber ? trackingNumber : null,
        trackNumber: trackingNumber ? trackingNumber : null,
        from: from ? from : null,
        to: to ? to : null,
        serviceName: serviceName ? serviceName : null,
        username: nationalNumber ? nationalNumber : null,
        status: paymentStatus ? paymentStatus : null,
      })
        .unwrap()
        .then(onFinancialAdvancedFilterSuccess)
        .catch(() => toast.error(GENERAL_ERROR_MESSAGE));
    } else if (!isFiltered) {
      getFinancialList({
        page: page ? Number(page) - 1 : 0,
        pageSize: pageSize ? Number(pageSize) : 8,
        // pageSize: DEFAULT_PAGE_SIZE,
        paymentStatus: type,
      })
        .unwrap()
        .then(onGetFinancialListSuccess)
        .catch(() => toast.error(GENERAL_ERROR_MESSAGE));
    }
  };

  const onGetFinancialListSuccess = useCallback(
    async (response: GetFinancialListResponse) => {
      if (response?.status === 200) {
        setDataSource(response?.data?.financialPaymentDtos);
        setTotalCount(response?.data?.totalElement);
      }
    },
    []
  );

  const onClickHomeActionBarFilter = useCallback(() => {
    setAdvancedModal({ isOpen: true });
  }, []);

  // On row check box selection change
  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[], selectedRows: FactorUserType[]) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedUsers(selectedRows);
      },
    }),
    [selectedRowKeys]
  );

  const onClearSettleHandler = useCallback(() => {
    setSettlementModal({ isOpen: true, data: selectedUsers });
  }, [selectedUsers]);

  if (isGetFinancialError) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
  }

  const onAdvanceFilterSubmit = () => {
    advanceFilterForm?.submit();

    setSelectedRowKeys([]);
    setSelectedUsers([]);

    const {
      beneficiaryBranchCode = null,
      branchCode = null,
      nationalNumber = null,
      referenceNumber = null,
      serviceName = null,
      trackingNumber = null,
      date,
      paymentStatus,
    } = advanceFilterForm.getFieldsValue();

    // Check if all values are null, and if so, show the warning message.
    if (
      !beneficiaryBranchCode &&
      !branchCode &&
      !nationalNumber &&
      !referenceNumber &&
      !serviceName &&
      !paymentStatus &&
      !date?.[0] &&
      !trackingNumber
    ) {
      return toast.warn("هیچ مقداری برای جستجو وارد نشده است");
    }

    const fromDate = dayjs(date?.[0]).utcOffset(0).startOf("day").toISOString();
    const toDate = dayjs(date?.[1]).utcOffset(0).endOf("day").toISOString();

    // const selectedPaymentStatus = type === 0 ? paymentStatus : type ===1 ?

    let selectedPaymentStatus;
    if (type === 0) {
      // قابلیت انتخاب دارد که از تسویه شده یا پرداخت شده باشد
      selectedPaymentStatus = paymentStatus;
    }
    if (type === 1) {
      //"پرداخت شده"
      selectedPaymentStatus = 1;
    }
    if (type === 2) {
      // "تسویه شده"
      selectedPaymentStatus = 2;
    }

    // Creates an object with only non-null values
    const filteredParams = {
      isFiltered: "1", // Always include this
      ...(beneficiaryBranchCode && { beneficiaryBranchCode }),
      ...(branchCode && { branchCode }),
      ...(nationalNumber && { nationalNumber }),
      ...(referenceNumber && { referenceNumber }),
      ...(serviceName && { serviceName }),
      ...(selectedPaymentStatus && { paymentStatus: selectedPaymentStatus?.toString() }),
      ...(trackingNumber && { trackingNumber }),
      ...(date?.[0] && {
        from: fromDate,
      }),
      ...(date?.[1] && { to: toDate }),
    };
    // Set the filtered search params
    setSearchParams(filteredParams);

    // Close the modal
    setAdvancedModal({ isOpen: false });
  };

  // onFinancialAdvancedFilterSuccess
  const onFinancialAdvancedFilterSuccess = useCallback(
    async (response: GetAdvanceFilterWithDateResponse) => {
      if (response?.status === 200) {
        setDataSource(response?.data?.financialPaymentDtos);
        setTotalCount(response?.data?.totalElements);
        // backBtnHandler();
      }
    },
    []
  );

  // const serviceIdGenerator = (name: string) => {
  //   switch (name) {
  //     case "مشاور":
  //       return 1;
  //     case "کارت دانشجويي":
  //       return 2;
  //     case "خوابگاه":
  //       return 3;
  //     case "تغذيه":
  //       return 4;
  //     case "بيمه":
  //       return 5;

  //     default:
  //       break;
  //   }
  // };

  //? ================================ Effects ================================
  useEffect(() => {
    getData();
  }, [
    page,
    pageSize,
    isFiltered,
    beneficiaryBranchCode,
    branchCode,
    nationalNumber,
    referenceNumber,
    serviceName,
    trackingNumber,
    isSettlementUpdated,
    from,
    paymentStatus,
    to,
  ]);

  //* ================================ Util Functions ================================
  // onConfirmExcelModalClickHandler
  const onConfirmExcelModalClickHandler = async ({
    count,
    totalItems,
  }: {
    count?: string;
    totalItems?: ["all"];
  }) => {
    const isTotalOnly = !!totalItems?.includes("all");

    await downloadExcelAllFiltered(setIsExcelDownloadLinkLoading, {
      ...(beneficiaryBranchCode && { beneficiaryBranchCode }),
      ...(referenceNumber && { referenceNumber }),
      ...(from && { from }),
      ...(to && { to }),
      ...(!isTotalOnly && count && { pageNumber: !isTotalOnly && count ? 0 : null }),
      ...(!isTotalOnly && count && { pageSize: !isTotalOnly && count ? +count : null }),
      ...(serviceName && {
        serviceName: serviceName ? serviceName : null,
      }),
      ...(branchCode && { studentBranchCode: branchCode }),
      ...(trackingNumber && { trackNumber: trackingNumber }),
      ...(nationalNumber && { username: nationalNumber }),
      ...(paymentStatus && { status: paymentStatus }),
    } as any);

    // RESET LOGIC
    setIsExcelModalOpen(false);
    excelForm?.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* Advance Filter Modal */}
      {advancedModal?.isOpen && (
        <AdvancedFilter
          isModalOpen={advancedModal?.isOpen}
          closeModalHandler={() => setAdvancedModal({ isOpen: false })}
          onConfirmClickHandler={onAdvanceFilterSubmit}
          isConfirmButtonLoading={isFinancialFilterWithDateDataLoading}
          content={
            <Form form={advanceFilterForm}>
              <FinancialAdvancedFilter
                form={advanceFilterForm}
                type={type}
                // onAdvanceFilterSubmit={onAdvanceFilterSubmit}
              />
            </Form>
          }
        />
      )}
      {/* CLEAR SETTLEMENT MODAL */}
      <ClearSettlementModal
        settlementModal={settlementModal}
        setSettlementModal={setSettlementModal}
        ids={rowSelection?.selectedRowKeys}
        setIsSettlementUpdated={setIsSettlementUpdated}
      />

      {/* EXCEl MODAL*/}
      {isExcelModalOpen ? (
        <ExcelModal
          closeModalHandler={() => setIsExcelModalOpen(false)}
          onExcelSubmit={onConfirmExcelModalClickHandler}
          form={excelForm}
          isModalOpen={isExcelModalOpen}
          isConfirmButtonLoading={isExcelDownloadLinkLoading}
        />
      ) : null}
      <div>
        <div className="factor-table-container">
          <div className="action-container">
            <div className="filter-tag-container">
              <CustomBadge count={isFiltered ? badgeCount : 0}>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineFilter />}
                  size="middle"
                  className="advanceFilter"
                  onClick={onClickHomeActionBarFilter}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </div>

            {type === 0 ? (
              <div className="print-btns-container">
                <CustomButton
                  type="primary"
                  onClick={() => downloadExcelAll(setIsDownloadLinkLoading)}
                  loading={isDownloadLinkLoading}
                  ghost
                  icon={<AiFillFileExcel />}
                  iconPlacement="end"
                >
                  دانلود اکسل کل
                </CustomButton>
                <CustomButton
                  type="dashed"
                  icon={<AiFillFileExcel />}
                  iconPlacement="end"
                  onClick={() => setIsExcelModalOpen(true)}
                  loading={isDownloadLinkLoading}
                  disabled={isFiltered !== "1"}
                >
                  دانلود اکسل فیلتر شده
                </CustomButton>
              </div>
            ) : null}

            {type === 1 ? (
              <div className="paid-action-btns-container">
                <CustomButton
                  type="default"
                  disabled={!(selectedUsers?.length > 0)}
                  onClick={() =>
                    onClickGetChosenExcelFile(
                      setIsDownloadLinkLoading,
                      selectedUsers,
                      type
                    )
                  }
                  loading={isDownloadLinkLoading}
                >
                  دانلود اکسل فایل های انتخابی
                </CustomButton>

                <CustomButton
                  type="primary"
                  className="clear-btn"
                  onClick={onClearSettleHandler}
                  disabled={!(selectedUsers?.length > 0)}
                >
                  تسویه
                </CustomButton>
              </div>
            ) : null}
            {type === 2 ? (
              <CustomButton
                type="default"
                disabled={!(selectedUsers?.length > 0)}
                onClick={() =>
                  onClickGetChosenExcelFile(setIsDownloadLinkLoading, selectedUsers, type)
                }
              >
                دانلود اکسل فایل های انتخابی
              </CustomButton>
            ) : null}
          </div>
          <div className="advance-filters-container">
            {isFiltered ? (
              <FilterChipGenerator isPaymentDisabled={type === 1 || type === 2} />
            ) : null}
          </div>
          <CustomTable
            dataSource={dataSource}
            columns={FactorsTableModel()}
            rowKey="id"
            pagination={manualPaginationConfig({
              total: totalCount,
              onChange: (page, pageSize) => {
                const filteredParams = {
                  ...(isFiltered && { isFiltered }),
                  ...(beneficiaryBranchCode && { beneficiaryBranchCode }),
                  ...(branchCode && { branchCode }),
                  ...(nationalNumber && { nationalNumber }),
                  ...(referenceNumber && { referenceNumber }),
                  ...(serviceName && { serviceName }),
                  ...(trackingNumber && { trackingNumber }),
                  ...(from && { from }),
                  ...(paymentStatus && { paymentStatus }),
                  ...(to && { to }),
                };
                setSearchParams({
                  ...filteredParams,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: page ? Number(page) : 1,
              defaultPageSize: pageSize ? Number(pageSize) : 8,
            })}
            loading={isGetFinancialLoading}
            className="factor-table"
            rowSelection={
              type === 1 || type === 2
                ? {
                    type: "checkbox",
                    ...rowSelection,
                  }
                : undefined
            }
            key={`table-${pageSize || "8"}`}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      </div>
    </>
  );
});
FactorTables.displayName = "FactorTables";
export default FactorTables;
