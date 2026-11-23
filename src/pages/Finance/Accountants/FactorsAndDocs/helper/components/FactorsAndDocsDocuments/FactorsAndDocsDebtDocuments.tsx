import { useEffect, useState, useMemo } from "react";

import { Form, MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDropdown from "@components/CustomInputs/CustomDropdown/CustomDropdown";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useLazyGetAccountingDebtDocumentQuery,
  useLazyGetAmountTurnOverQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import AccountingDebitDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingDebitDrawerContent/AccountingDebitDrawerContent";
import { calculateTotalPercentage, rangePresets } from "@pages/Finance/_shared/utils";
import { DocumentTypeList } from "@pages/Finance/Accountants/_shared/enums/@enumDocumentReason";
import useFactorsAndDocsDebtAdvanceFilter from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/hooks/useFactorsAndDocsDebtAdvanceFilter";
import PaymentBox from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/PaymentBox/PaymentBox";
import { GetAmountTurnOverResponse } from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";

import {
  AccountingDebtDocumentContent,
  AccountingDebtDocumentRequest,
  AccountingDebtDocumentResponse,
  FactorsAndDocsDebtDocumentsFormType,
} from "./@types/@factorsAndDocsDebtDocuments";
import FactorsAndDocsDocumentsTableModel from "./helper/models/FactorsAndDocsDebtDocumentsTableModel";

const exportMenu: MenuProps = {
  items: [
    { label: "خروجی Excel", key: "excel" },
    { label: "خروجی PDF", key: "pdf" },
  ],
};

const advanceFilterItems = [
  // modal search
  "servicesName",
  "businessId",
  "branchId",
  "cityId",
  "provinceId",
  "possibilitySettlementName",
  "statusName",
  "debtReasonName",
  // column search
  "id",
];

const FactorsAndDocsDebtDocuments = () => {
  const [tableData, setTableData] = useState<AccountingDebtDocumentContent[]>([]);
  const [statisticsData, setStatisticsData] = useState<GetAmountTurnOverResponse>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [isDetailOpen, setIsDetailOpen] = useState<{
    open: boolean;
    uuid: string;
  }>({
    open: false,
    uuid: "-1",
  });
  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<FactorsAndDocsDebtDocumentsFormType>();

  const { filterItemsList } = useFactorsAndDocsDebtAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Apis ================================
  // list and advance filter
  const [getDocuments, { data: documentData, isFetching: isGetDocumentsLoading }] =
    useLazyGetAccountingDebtDocumentQuery();

  // statistics
  const [getStatistics, { isFetching: isGetStatisticsLoading }] =
    useLazyGetAmountTurnOverQuery();

  //? ================================ Effects ================================
  // statistics
  useEffect(() => {
    if (url?.tab !== "3" && url?.tab) return;
    if (!fromDate || !toDate) return;

    getStatistics({
      ...(url?.servicesName && { samimServices: url?.servicesName }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.provinceId && { provinceIds: url?.provinceId }),
      ...(url?.possibilitySettlementName && {
        accountingInvoiceSettleStatus: url?.possibilitySettlementName,
      }),
      ...(url?.statusName && {
        settlementStatuses: url?.statusName,
      }),
      documentType: "DEBIT",
      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      documentReasons: url?.debtReasonName ?? DocumentTypeList,
      // column search
      ...(url?.id && { id: url?.id }),
    })
      .unwrap()
      .then((res: GetAmountTurnOverResponse) => {
        setStatisticsData(res);
      });
  }, [...advanceFilterItems.map((key) => url?.[key]), fromDate, toDate, url?.tab]);

  // range date
  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  useEffect(() => {
    const now = dayjs();

    const start = dayjs(defaultRange.start.toDate()).startOf("day").utc();

    const end = now.utc();

    setFromDate(start.toISOString());
    setToDate(end.toISOString());

    formRange.setFieldsValue({
      rangeDate: [
        moment(defaultRange.start).locale("fa"),
        moment(defaultRange.end).locale("fa"),
      ],
    });
  }, []);

  // list and advance filter
  useEffect(() => {
    if (url?.tab !== "3" && url?.tab) return;
    if (!fromDate || !toDate) return;

    const requestAdvanceFilterParams: AccountingDebtDocumentRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      documentType: "DEBIT",
      documentReasons: url?.debtReasonName ?? DocumentTypeList,

      // modal search
      ...(url?.servicesName && { samimServices: url?.servicesName }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.provinceId && { provinceIds: url?.provinceId }),
      ...(url?.possibilitySettlementName && {
        accountingInvoiceSettleStatus: url?.possibilitySettlementName,
      }),
      ...(url?.statusName && {
        settlementStatuses: url?.statusName,
      }),

      // column search
      ...(url?.id && { id: url?.id }),
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestAdvanceFilterParams.sortBy = sorting.sortBy;
      } else {
        delete requestAdvanceFilterParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestAdvanceFilterParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestAdvanceFilterParams.sortDirection;
      }
    } else {
      requestAdvanceFilterParams.sortBy = "createdDate";
      requestAdvanceFilterParams.sortDirection = "DESC";
    }

    getDocuments(requestAdvanceFilterParams)
      .unwrap()
      .then((res: AccountingDebtDocumentResponse) => {
        setTableData(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setTableData([]);
        setTotalElements(0);
      });
  }, [
    url?.page,
    url?.pageSize,
    fromDate,
    toDate,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
    url?.tab,
  ]);

  // ================================ Utils function ================================
  const onDetailClickHandler = (record: AccountingDebtDocumentContent) => {
    setIsDetailOpen({
      open: true,
      uuid: record?.uuid,
    });
    setSearchParams({ ...url, from: "factor" });
  };

  const onCloseDrawerHandler = () => {
    setIsDetailOpen({
      open: false,
      uuid: "-1",
    });
  };

  // handler when user selects date
  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      // Clear date range from state and reset page
      setFromDate(undefined);
      setToDate(undefined);
      setSearchParams({
        ...url,
        page: "1",
      });
      setTableData([]);
      setTotalElements(0);
      return;
    }

    const now = dayjs();

    const start = dates[0]?.startOf("day").utc();

    let end = dates[1];

    const isToday =
      end?.year() === now.year() &&
      end?.month() === now.month() &&
      end?.date() === now.date();

    if (isToday) {
      end = now;
    } else {
      end = end?.endOf("day") ?? null;
    }

    end = end?.utc() ?? null;

    // Store dates in state and reset page
    setFromDate(start ? start.toISOString() : undefined);
    setToDate(end ? end.toISOString() : undefined);
    setSearchParams({
      ...url,
      page: "1", // Reset page when range changes
    });
  };

  // table column
  const column = FactorsAndDocsDocumentsTableModel({ onDetailClickHandler });

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
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}
      {isDetailOpen?.open && (
        <CustomDrawer
          open={isDetailOpen?.open}
          onClose={onCloseDrawerHandler}
          className="finance-accounting-document-drawer-container"
          closeIcon={<AiOutlineClose />}
          title="مشاهده سند"
          content={
            <AccountingDebitDrawerContent
              onClose={onCloseDrawerHandler}
              uuid={isDetailOpen?.uuid}
            />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        <ToolBox
          centerSide={
            <Form form={formRange}>
              <CustomRangePicker
                name="rangeDate"
                onChange={changeDateHandler}
                label="سال مالی (بازه تاریخ)"
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                presets={rangePresets}
                form={formRange}
              />
            </Form>
          }
        />

        <Div loading={isGetStatisticsLoading}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <PaymentBox
              title="تعداد کل اسناد"
              amount={statisticsData?.totalNumber?.toString() ?? "0"}
              hasUnit={false}
            />

            <PaymentBox
              title=" غیر قابل پرداخت "
              amount={statisticsData?.unSettledAmount?.toString() ?? "0"}
              percentage={calculateTotalPercentage(
                statisticsData?.unSettledAmount,
                statisticsData?.totalDebit
              )}
              hasPercentage={true}
              hasTag={true}
            />

            <PaymentBox
              title="قابل پرداخت"
              amount={statisticsData?.settledAggregationAmount?.toString() ?? "0"}
              percentage={calculateTotalPercentage(
                statisticsData?.settledAggregationAmount,
                statisticsData?.totalDebit
              )}
              hasPercentage={true}
              hasTag={true}
            />

            <PaymentBox
              title=" در صف پرداخت"
              amount={statisticsData?.waitingForPaymentDocumentAmount?.toString() ?? "0"}
              percentage={calculateTotalPercentage(
                statisticsData?.waitingForPaymentDocumentAmount,
                statisticsData?.totalDebit
              )}
              hasPercentage={true}
              hasTag={true}
            />

            <PaymentBox
              title="پرداخت شده"
              amount={statisticsData?.paidDocumentsAmount?.toString() ?? "0"}
              percentage={calculateTotalPercentage(
                statisticsData?.paidDocumentsAmount,
                statisticsData?.totalDebit
              )}
              hasPercentage={true}
              hasTag={true}
            />
          </div>
        </Div>
        <div className="flex flex-col gap-4">
          <ToolBox
            className="accounting-toolBox-container"
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  onClick={() => setAdvanceModalOpen(true)}
                  icon={<AiOutlineFilter />}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <div className="accounting-custom-button">
                <CustomDropdown items={exportMenu} trigger={["click"]}>
                  <CustomButton disabled>
                    خروجی <IoIosArrowDown />
                  </CustomButton>
                </CustomDropdown>
              </div>
            }
          />

          <CustomTable<AccountingDebtDocumentContent>
            rowKey="id"
            loading={isGetDocumentsLoading}
            dataSource={tableData}
            columns={column}
            draggableColumns
            draggableId={ExcelCodes.FINANCE_ACCOUNTANTS_DOC_AND_FACTORS_DEBT_TAB_TABLE}
            pagination={manualPaginationConfig({
              total: totalElements,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(documentData?.content?.length || 0)}
          />
        </div>
      </div>
    </>
  );
};

export default FactorsAndDocsDebtDocuments;
