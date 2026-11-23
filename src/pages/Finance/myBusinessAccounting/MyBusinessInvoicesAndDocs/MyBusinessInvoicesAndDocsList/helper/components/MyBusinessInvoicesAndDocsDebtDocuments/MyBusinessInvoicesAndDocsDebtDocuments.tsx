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
  useLazyGetMyBusinessAccountingListTurnOverQuery,
  useLazyGeyMyBusinessAccountingAmountTotalDiffQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import AccountingDebitDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingDebitDrawerContent/AccountingDebitDrawerContent";
import { calculateTotalPercentage, rangePresets } from "@pages/Finance/_shared/utils";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";
import { DocumentTypeList } from "@pages/Finance/Accountants/_shared/enums/@enumDocumentReason";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import {
  GeyMyBusinessAccountingAmountTotalDiffRequest,
  GeyMyBusinessAccountingAmountTotalDiffResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/_shared/@types/@geyMyBusinessAccountingAmountTotalDiffTypes";
import {
  GetMyBusinessAccountingListTurnOver,
  GetMyBusinessAccountingListTurnOverRequest,
  GetMyBusinessAccountingListTurnOverResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/@types/@myBusinessTurnOverList";

import useMyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilter from "./helper/hooks/useMyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilter";
import { MyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilterFormType } from "./helper/models/MyBusinessInvoicesAndDocsDebtDocumentsTableModel/@types/@myBusinessInvoicesAndDocsDebtDocumentsTableModelPropsType";
import MyBusinessInvoicesAndDocsDebtDocumentsTableModel from "./helper/models/MyBusinessInvoicesAndDocsDebtDocumentsTableModel/MyBusinessInvoicesAndDocsDebtDocumentsTableModel";

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
const MyBusinessInvoicesAndDocsServiceDocuments = () => {
  const { params, setSearchParams } = useQueryParams();
  const [openDrawerDetails, setOpenDrawerDetails] = useState({
    isOpen: false,
    uuid: "",
  });
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [bannerData, setBannerData] =
    useState<GeyMyBusinessAccountingAmountTotalDiffResponse>();
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [totalElements, setTotalElements] = useState(0);
  const [factorsData, setFactorData] = useState<GetMyBusinessAccountingListTurnOver[]>(
    []
  );

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [form] =
    Form.useForm<MyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilterFormType>();
  const { filterItemsList } = useMyBusinessInvoicesAndDocsDebtDocumentsAdvanceFilter({
    form,
    advanceModalOpen,
  });

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api ================================
  // list
  const [getMyTableList, { isFetching: getMyTableListLoading }] =
    useLazyGetMyBusinessAccountingListTurnOverQuery();

  //banner

  const [getBanner, { isFetching: getBannerLoading }] =
    useLazyGeyMyBusinessAccountingAmountTotalDiffQuery();

  //? ================================  Effects  ================================

  useEffect(() => {
    // lists
    if (!fromDate || !toDate) return;
    //check if tab 3 then send request
    if (params?.tab === "3") {
      const requestAdvanceFilterParams: GetMyBusinessAccountingListTurnOverRequest = {
        pageNumber: params?.page ? +params?.page - 1 : 0,
        pageSize: params?.pageSize ? +params?.pageSize : 8,
        documentType: documentTypeConfig.debit, // we need send debit to get data
        from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
        to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
        documentReasons: params?.debtReasonName ?? DocumentTypeList,

        // modal search
        ...(params?.provinceId && { provinceIds: params?.provinceId }),
        ...(params?.cityId && { cityIds: params?.cityId }),
        ...(params?.branchId && { branchIds: params?.branchId }),
        ...(params?.serviceName && { samimServices: params?.serviceName }),
        ...(params?.possibilitySettlementName && {
          accountingInvoiceSettleStatus: params?.possibilitySettlementName,
        }),
        ...(params?.statusName && { settlementStatuses: params?.statusName }),

        // column search
        ...(params?.id && { id: params?.id }),
      };
      // sortings
      if (params?.sortings) {
        const sorting = JSON.parse(params?.sortings)?.[0];

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
      getMyTableList(requestAdvanceFilterParams)
        .unwrap()
        .then(getMyBusinessServiceListSuccess);
    }
  }, [
    fromDate,
    toDate,
    params?.page,
    params?.pageSize,
    params?.tab,
    params?.sortings,
    params?.id,
    params?.provinceId,
    params?.cityId,
    params?.branchId,
    params?.serviceName,
    params?.possibilitySettlementName,
    params?.statusName,
    params?.debtReasonName,
  ]);

  useEffect(() => {
    // lists
    if (!fromDate || !toDate) return;
    //check if tab 3 then send request
    if (params?.tab === "3") {
      const requestAdvanceFilterParams: GeyMyBusinessAccountingAmountTotalDiffRequest = {
        documentType: documentTypeConfig.debit, // we need send debit to get data
        from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
        to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
        documentReasons: params?.debtReasonName ?? DocumentTypeList,

        // modal search
        ...(params?.provinceId && { provinceIds: params?.provinceId }),
        ...(params?.cityId && { cityIds: params?.cityId }),
        ...(params?.branchId && { branchIds: params?.branchId }),
        ...(params?.serviceName && { samimServices: params?.serviceName }),
        ...(params?.possibilitySettlementName && {
          accountingInvoiceSettleStatus: params?.possibilitySettlementName,
        }),
        ...(params?.statusName && { settlementStatuses: params?.statusName }),

        // column search
        ...(params?.id && { id: params?.id }),
      };

      getBanner(requestAdvanceFilterParams)
        .unwrap()
        .then((res) => setBannerData(res));
    }
  }, [
    fromDate,
    toDate,
    params.page,
    params.pageSize,
    params?.tab,
    params?.id,
    params?.provinceId,
    params?.cityId,
    params?.branchId,
    params?.serviceName,
    params?.possibilitySettlementName,
    params?.statusName,
    params?.debtReasonName,
  ]);

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

  //* ================================ Util Functions ================================

  const getMyBusinessServiceListSuccess = (
    res: GetMyBusinessAccountingListTurnOverResponse
  ) => {
    setFactorData(res?.content);
    setTotalElements(res?.totalElements);
  };
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };
  const closeDetailDrawerHandler = () => {
    setOpenDrawerDetails({ isOpen: false, uuid: "" });
    const { uuid, ...restParams } = params || {};
    setSearchParams(restParams);
  };

  const openDetailDrawerHandler = (uuid: string) => {
    setOpenDrawerDetails({ isOpen: true, uuid: uuid });
    setSearchParams({ ...params, uuid: uuid, from: "myFactorsBusiness" });
  };

  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      // Clear date range from state and reset page
      setFromDate(undefined);
      setToDate(undefined);
      setSearchParams({
        ...params,
        page: "1",
      });
      setFactorData([]);
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
      ...params,
      page: "1", // Reset page when range changes
    });
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
          defaultParams={{ ...params }}
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
              uuid={params?.uuid}
            />
          }
        />
      ) : null}
      <div className="mt-5">
        <ToolBox
          className="custom-toolbox"
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
        <Div loading={getBannerLoading}>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <AmountBox
              title="تعداد کل اسناد"
              price={bannerData?.totalNumber ?? 0}
              hasTag={false}
              hasUnit={false}
            />
            <AmountBox
              title="غیر قابل پرداخت"
              price={bannerData?.unSettledAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                bannerData?.unSettledAmount,
                bannerData?.totalDebit
              )?.toString()}
            />
            <AmountBox
              title="قابل پرداخت"
              price={bannerData?.settledAggregationAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                bannerData?.settledAggregationAmount,
                bannerData?.totalDebit
              )?.toString()}
            />
            <AmountBox
              title="در صف پرداخت"
              price={bannerData?.waitingForPaymentDocumentAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                bannerData?.waitingForPaymentDocumentAmount,
                bannerData?.totalDebit
              )?.toString()}
            />
            <AmountBox
              title="پرداخت شده"
              price={bannerData?.paidDocumentsAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                bannerData?.paidDocumentsAmount,
                bannerData?.totalDebit
              )?.toString()}
            />
          </div>
        </Div>
        <ToolBox
          className="mt-5"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
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
        <CustomTable<GetMyBusinessAccountingListTurnOver>
          className="mt-5"
          dataSource={factorsData || []}
          loading={getMyTableListLoading}
          draggableColumns
          draggableId={ExcelCodes.FINANCE_MY_ACCOUNTING_BUSINESS_INVOICE_AND_DOC_DEBT}
          rowKey="uuid"
          columns={MyBusinessInvoicesAndDocsDebtDocumentsTableModel({
            openDetailDrawerHandler: openDetailDrawerHandler,
          })}
          pagination={manualPaginationConfig({
            total: totalElements ?? 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: params?.page ? Number(params.page) : 1,
            defaultPageSize: params?.pageSize ? Number(params.pageSize) : 8,
          })}
        />
      </div>
    </>
  );
};
export default MyBusinessInvoicesAndDocsServiceDocuments;
