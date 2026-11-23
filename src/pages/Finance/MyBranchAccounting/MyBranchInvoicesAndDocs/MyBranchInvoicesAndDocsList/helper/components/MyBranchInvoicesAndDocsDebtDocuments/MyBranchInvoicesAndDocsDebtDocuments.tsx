import { useEffect, useMemo, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
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
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useLazyGetMyBranchAccountingListTurnOverQuery,
  useLazyGeyMyBranchAccountingAmountTotalDiffQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import AccountingDebitDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingDebitDrawerContent/AccountingDebitDrawerContent";
import { calculateTotalPercentage, rangePresets } from "@pages/Finance/_shared/utils";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";
import { DocumentTypeList } from "@pages/Finance/Accountants/_shared/enums/@enumDocumentReason";
import { GeyMyBranchAccountingAmountTotalDiffResponse } from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/_shared/@types/@geyMyBranchAccountingAmountTotalDiffTypes";
import {
  GetMyBranchAccountingListTurnOver,
  GetMyBranchAccountingListTurnOverRequest,
  GetMyBranchAccountingListTurnOverResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/@types/@getMyBranchAccountingListTurnOverTypes";

import MyBranchInvoicesAndDocsPaymentOnAccountDrawerContent from "./helper/components/MyBranchInvoicesAndDocsPaymentOnAccountDrawerContent/MyBranchInvoicesAndDocsPaymentOnAccountDrawerContent";
import useMyBranchInvoicesAndDocsDebtDocumentsAdvanceFilter from "./helper/hooks/useMyBranchInvoicesAndDocsDebtDocumentsAdvanceFilter";
import { MyInvoicesAndDocsDebtDocumentsAdvanceFilterFormType } from "./helper/models/MyBranchInvoicesAndDocsDebtDocumentsTableModel/@types/@myBranchInvoicesAndDocsDebtDocumentsTableModelPropsType";
import MyBranchInvoicesAndDocsDebtDocumentsTableModel from "./helper/models/MyBranchInvoicesAndDocsDebtDocumentsTableModel/MyBranchInvoicesAndDocsDebtDocumentsTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const advanceFilterItems = [
  // modal search
  "servicesName",
  "possibilitySettlementName",
  "statusName",
  "debtReasonName",
  // column search
  "id",
];

const MyBranchInvoicesAndDocsDebtDocuments = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [openDrawerDetails, setOpenDrawerDetails] = useState({
    isOpen: false,
    uuid: "",
  });

  const [totalElements, setTotalElements] = useState(0);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [tableData, setTableData] = useState<GetMyBranchAccountingListTurnOver[]>([]);
  const [statisticsData, setStatisticsData] =
    useState<GeyMyBranchAccountingAmountTotalDiffResponse>();

  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const [form] = Form.useForm<MyInvoicesAndDocsDebtDocumentsAdvanceFilterFormType>();
  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();

  const [openDrawerPaymentOnAccount, setOpenDrawerPaymentOnAccount] = useState({
    isOpen: false,
  });

  const { filterItemsList } = useMyBranchInvoicesAndDocsDebtDocumentsAdvanceFilter();

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api ================================
  // list
  const [getList, { isFetching: getListLoading }] =
    useLazyGetMyBranchAccountingListTurnOverQuery();

  // statistics
  const [getStatistics, { isFetching: isGetStatisticsLoading }] =
    useLazyGeyMyBranchAccountingAmountTotalDiffQuery();

  //? ================================  Effects  ================================
  // statistics
  useEffect(() => {
    if (url?.tab !== "3" && url?.tab) return;
    if (!fromDate || !toDate) return;

    getStatistics({
      ...(url?.statusName && {
        settlementStatuses: url?.statusName,
      }),

      ...(url?.servicesName && { samimServices: url?.servicesName }),

      ...(url?.possibilitySettlementName && {
        accountingInvoiceSettleStatus: url?.possibilitySettlementName,
      }),

      documentType: "DEBIT",
      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      documentReasons: url?.debtReasonName ?? DocumentTypeList,
      // column search
      ...(url?.id && { id: url?.id }),
    })
      .unwrap()
      .then((res: GeyMyBranchAccountingAmountTotalDiffResponse) => {
        setStatisticsData(res);
      });
  }, [...advanceFilterItems.map((key) => url?.[key]), fromDate, toDate, url?.tab]);

  // range date
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

    const requestAdvanceFilterParams: GetMyBranchAccountingListTurnOverRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      documentType: "DEBIT",
      documentReasons: url?.debtReasonName ?? DocumentTypeList,

      // modal search
      ...(url?.servicesName && { samimServices: url?.servicesName }),
      ...(url?.possibilitySettlementName && {
        accountingInvoiceSettleStatus: url?.possibilitySettlementName,
      }),
      ...(url?.statusName && {
        settlementStatuses: url?.statusName,
      }),

      // برای علت بدهکاری کلیدی از سمت بک اند نداریم که ارسال کنیم

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

    getList(requestAdvanceFilterParams)
      .unwrap()
      .then((res: GetMyBranchAccountingListTurnOverResponse) => {
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

  //* ================================ Util Functions ================================
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

  // handler
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  const closeDetailDrawerHandler = () => {
    setOpenDrawerDetails({ isOpen: false, uuid: "" });
    const { uuid, ...restParams } = url || {};
    setSearchParams(restParams);
  };

  const openDetailDrawerHandler = (uuid: string) => {
    setOpenDrawerDetails({ isOpen: true, uuid: uuid });
    setSearchParams({ ...url, uuid: uuid, from: "myFactors" });
  };

  const closePaymentOnAccountDrawerHandler = () => {
    setOpenDrawerPaymentOnAccount({ isOpen: false });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
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

      {openDrawerDetails?.isOpen ? (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={openDrawerDetails?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AccountingDebitDrawerContent
              onClose={closeDetailDrawerHandler}
              uuid={url?.uuid}
            />
          }
        />
      ) : null}
      {openDrawerPaymentOnAccount?.isOpen ? (
        <CustomDrawer
          onClose={closePaymentOnAccountDrawerHandler}
          open={openDrawerPaymentOnAccount?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyBranchInvoicesAndDocsPaymentOnAccountDrawerContent
              closeDrawerHandler={closePaymentOnAccountDrawerHandler}
            />
          }
        />
      ) : null}
      <div className="flex flex-col gap-10">
        <ToolBox
          centerSide={
            <Form form={formRange}>
              <CustomRangePicker
                onChange={changeDateHandler}
                name="rangeDate"
                label="سال مالی (بازه تاریخ)"
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                presets={rangePresets}
                form={formRange}
              />
            </Form>
          }
        />
        <Div loading={isGetStatisticsLoading}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <AmountBox
              title="تعداد کل اسناد"
              price={statisticsData?.totalNumber ?? 0}
              hasTag={false}
              hasUnit={false}
            />
            <AmountBox
              title="غیر قابل پرداخت"
              price={statisticsData?.unSettledAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.unSettledAmount,
                statisticsData?.totalDebit
              )?.toString()}
            />

            <AmountBox
              title="قابل پرداخت"
              price={statisticsData?.settledAggregationAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.settledAggregationAmount,
                statisticsData?.totalDebit
              )?.toString()}
            />

            <AmountBox
              title="در صف پرداخت"
              price={statisticsData?.waitingForPaymentDocumentAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.waitingForPaymentDocumentAmount,
                statisticsData?.totalDebit
              )?.toString()}
            />

            <AmountBox
              title="پرداخت شده"
              price={statisticsData?.paidDocumentsAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.paidDocumentsAmount,
                statisticsData?.totalDebit
              )?.toString()}
            />
          </div>
        </Div>

        <div className="flex flex-col gap-6">
          <ToolBox
            className="mt-10"
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            }
          />
          <CustomTable<GetMyBranchAccountingListTurnOver>
            dataSource={tableData}
            loading={getListLoading}
            rowKey="id"
            columns={MyBranchInvoicesAndDocsDebtDocumentsTableModel({
              openDetailDrawerHandler,
            })}
            draggableColumns
            draggableId={ExcelCodes.FINANCE_MY_BRANCH_ACCOUNTANT_DEBIT_TAB}
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
          />
        </div>
      </div>
    </>
  );
};
export default MyBranchInvoicesAndDocsDebtDocuments;
