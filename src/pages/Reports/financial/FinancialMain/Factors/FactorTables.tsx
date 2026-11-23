import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvancedFilter from "@components/Renderers/AdvancedFilter/AdvancedFilter";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { FactorsTableModel } from "@infra/models/tableModels/Financial/FactorsTableModel/FactorsTableModel";
import {
  useGetFinancialListMutation,
  usePostFinancialAdvanceFilterMutation,
} from "@infra/states/redux/Apis/financialApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import {
  GetAdvanceFilterResponse,
  GetFinancialListResponse,
  SettlementModalType,
} from "@pages/Financial/FinancialMain/helper/components/Factors/@types/@factorTables";
import FilterChipGenerator from "@pages/Financial/FinancialMain/helper/components/Factors/helper/components/FilterChipGenerator";
import FinancialAdvancedFilter from "@pages/Financial/FinancialMain/helper/components/Factors/helper/components/FinancialAdvancedFilter";
import {
  downloadExcelAll,
  onClickGetChosenExcelFile,
} from "@pages/Financial/utils/financialUtils";
import ClearSettlementModal from "@pages/Reports/financial/FinancialMain/Factors/helper/modal/ClearSettlementModal/ClearSettlementModal";

import { FactorTablesProp, FactorUserType } from "./@types/@factorTables";
import "./_factorTable.scss";

const FactorTables = memo(({ type }: FactorTablesProp) => {
  const [advancedModal, setAdvancedModal] = useState({ isOpen: false });
  const [selectedUsers, setSelectedUsers] = useState<FactorUserType[]>([]);
  const [dataSource, setDataSource] = useState<FactorUserType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [settlementModal, setSettlementModal] = useState<SettlementModalType>({
    isOpen: false,
    data: [],
  });
  const [isSettlementUpdated, setIsSettlementUpdated] = useState(false);
  const [advanceFilterForm] = Form.useForm();
  const [badgeCount, setBadgeCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    beneficiaryBranchCode = null,
    branchCode = null,
    nationalNumber = null,
    referenceNumber = null,
    serviceName = null,
    trackingNumber = null,
    isFiltered = null,
    page,
    pageSize,
  } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  // useGetFinancialList hook
  const [
    getFinancialList,
    { isLoading: isGetFinancialLoading, isError: isGetFinancialError },
  ] = useGetFinancialListMutation();

  // Advanced search Api hook
  const [financialAdvancedFilter, { isLoading: isFinancialFilterDataLoading }] =
    usePostFinancialAdvanceFilterMutation();

  //* ================================ Util Functions ================================
  const searchParamCounter = () => {
    const urlObject = {
      beneficiaryBranchCode,
      branchCode,
      nationalNumber,
      referenceNumber,
      serviceName,
      trackingNumber,
    };

    // Filter the object to keep only the properties that are not null or undefined
    const nonNullValues = Object.values(urlObject).filter(
      (value) => value !== null && value !== undefined
    );

    // Get the count of non-null values
    const count = nonNullValues.length;
    if (count < 1) {
      setSearchParams({});
    }
    // You can set the badge count here if needed
    setBadgeCount(count);

    // console.log(count);
    // return count;
  };

  // getData
  const getData = () => {
    if (isFiltered) {
      // const {
      //   beneficiaryBranchCode = null,
      //   branchCode = null,
      //   nationalNumber = null,
      //   referenceNumber = null,
      //   serviceName = null,
      //   trackingNumber = null,
      // } = advanceFilterForm.getFieldsValue();
      searchParamCounter();

      financialAdvancedFilter({
        pageNumber: Number(page) - 1 || 0,
        pageSize: Number(pageSize) || 8,
        beneficiaryBranchCode: beneficiaryBranchCode ? beneficiaryBranchCode : null,
        branchCode: branchCode ? branchCode : null,
        nationalNumber: nationalNumber ? nationalNumber : null,
        referenceNumber: referenceNumber ? referenceNumber : null,
        serviceName: serviceName ? serviceName : null,
        trackingNumber: trackingNumber ? trackingNumber : null,
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

  if (isGetFinancialError) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
  }

  const onAdvanceFilterSubmit = () => {
    const {
      beneficiaryBranchCode = null,
      branchCode = null,
      nationalNumber = null,
      referenceNumber = null,
      serviceName = null,
      trackingNumber = null,
    } = advanceFilterForm.getFieldsValue();

    // Check if all values are null, and if so, show the warning message.
    if (
      !beneficiaryBranchCode &&
      !branchCode &&
      !nationalNumber &&
      !referenceNumber &&
      !serviceName &&
      !trackingNumber
    ) {
      return toast.warn("هیچ مقداری برای جستجو وارد نشده است");
    }

    // Creates an object with only non-null values
    const filteredParams = {
      isFiltered: "1", // Always include this
      ...(beneficiaryBranchCode && { beneficiaryBranchCode }),
      ...(branchCode && { branchCode }),
      ...(nationalNumber && { nationalNumber }),
      ...(referenceNumber && { referenceNumber }),
      ...(serviceName && { serviceName }),
      ...(trackingNumber && { trackingNumber }),
    };

    // Set the filtered search params
    setSearchParams(filteredParams);

    // Close the modal
    setAdvancedModal({ isOpen: false });
  };

  // onFinancialAdvancedFilterSuccess
  const onFinancialAdvancedFilterSuccess = useCallback(
    async (response: GetAdvanceFilterResponse) => {
      if (response?.status === 200) {
        setDataSource(response?.data?.paymentRequestDtoList);
        setTotalCount(response?.data?.totalElement);
        // backBtnHandler();
      }
    },
    []
  );

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
  ]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div>
        <ClearSettlementModal
          settlementModal={settlementModal}
          setSettlementModal={setSettlementModal}
          ids={rowSelection?.selectedRowKeys}
          setIsSettlementUpdated={setIsSettlementUpdated}
        />
        <div className="factor-table-container">
          <div className="filter-tag-container">
            <ToolBox
              rightSide={
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
              }
              leftSide={
                <>
                  {type === 0 ? (
                    <CustomButton
                      type="default"
                      onClick={() => downloadExcelAll(setIsDownloadLinkLoading)}
                      loading={isDownloadLinkLoading}
                    >
                      دانلود اکسل کل
                    </CustomButton>
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
                    </div>
                  ) : null}
                  {type === 2 ? (
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
                    >
                      دانلود اکسل فایل های انتخابی
                    </CustomButton>
                  ) : null}
                </>
              }
            />

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
              pageSizeOptions: ["8", "50", "100"],
              onChange: (page, pageSize) => {
                const filteredParams = {
                  ...(isFiltered && { isFiltered }),
                  ...(beneficiaryBranchCode && { beneficiaryBranchCode }),
                  ...(branchCode && { branchCode }),
                  ...(nationalNumber && { nationalNumber }),
                  ...(referenceNumber && { referenceNumber }),
                  ...(serviceName && { serviceName }),
                  ...(trackingNumber && { trackingNumber }),
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

      {/* advance filter modal */}
      {advancedModal?.isOpen && (
        <AdvancedFilter
          isModalOpen={advancedModal?.isOpen}
          closeModalHandler={() => setAdvancedModal({ isOpen: false })}
          onConfirmClickHandler={onAdvanceFilterSubmit}
          isConfirmButtonLoading={isFinancialFilterDataLoading}
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
    </>
  );
});
FactorTables.displayName = "FactorTables";
export default FactorTables;
