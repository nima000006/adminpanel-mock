import { useEffect, useMemo, useState } from "react";

import { Dropdown, Form } from "antd";
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
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetFinanceTransactionBuyerAdvanceFilterListQuery } from "@infra/states/redux/Apis/finance/transactionsApi";
import { rangePresets } from "@pages/Finance/_shared/utils";
import { FinanceTransactionFormType } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";
import {
  GetFinanceTransactionBuyerAdvanceFilterListItem,
  GetFinanceTransactionBuyerAdvanceFilterListRequest,
  GetFinanceTransactionBuyerAdvanceFilterListResponse,
} from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/@types/@buyersStepTypes";
import BuyersTransactionDetailDrawerContent from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/helper/drawer/BuyersTransactionDetailDrawerContent/BuyersTransactionDetailDrawerContent";

import RefundTransactionDetailDrawerContent from "./helper/drawer/RefundTransactionDetailDrawerContent/RefundTransactionDetailDrawerContent";
import TransactionsRefundStepListTableModel from "./helper/models/TransactionsRefundStepListTableModel/TransactionsRefundStepListTableModel";
import { exportMenu } from "../../../utils/transactionUtils";
import useFinanceTransactionAdvanceFilter from "../../model/AdvanceFilter/AdvanceFilter";

const advanceFilterItems = [
  // modal search
  "servicesName",
  "branchId",
  "businessId",
  "cityId",
  "provinceId",

  // column search
  "uuid",
  "nationalCode",
  "personalCode",
  "mobileNumber",
];

const RefundStep = () => {
  const [dataSource, setDataSource] = useState<
    GetFinanceTransactionBuyerAdvanceFilterListItem[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const { params: url, setSearchParams } = useQueryParams();
  const [openDetailDrawer, setIsOpenDetailDrawer] = useState<{
    isOpen: boolean;
    id: string;
  }>({ isOpen: false, id: "-1" });

  const [isOpenMainTransactionDetailDrawer, setIsOpenMainTransactionDetailDrawer] =
    useState<{
      isOpen: boolean;
      id: string | undefined;
    }>({ isOpen: false, id: "-1" });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<FinanceTransactionFormType>();

  const { filterItemsList } = useFinanceTransactionAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api Calls ================================
  const [getTransactionsList, { isLoading }] =
    useLazyGetFinanceTransactionBuyerAdvanceFilterListQuery();

  //? ================================ Effects ================================
  // date range
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

  // list
  useEffect(() => {
    if (url?.tab !== "2" && url?.tab) return;
    if (!fromDate || !toDate) return;
    const requestAdvanceFilterParams: GetFinanceTransactionBuyerAdvanceFilterListRequest =
      {
        pageNumber: url?.page ? +url?.page - 1 : 0,
        pageSize: url?.pageSize ? +url?.pageSize : 8,

        fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
        toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

        isRefunded: true,

        // modal search
        ...(url?.servicesName && { samimServices: url?.servicesName }),
        ...(url?.branchId && { branchIds: url?.branchId }),
        ...(url?.businessId && { businessIds: url?.businessId }),
        ...(url?.cityId && { cityIds: url?.cityId }),
        ...(url?.provinceId && { provinceIds: url?.provinceId }),

        // column search
        ...(url?.uuid && { transactionUuid: url?.uuid }),
        ...(url?.nationalCode && { nationalCode: url?.nationalCode }),
        ...(url?.personalCode && { employeeCode: url?.personalCode }),
        ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber }),
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
    }

    getTransactionsList(requestAdvanceFilterParams)
      .unwrap()
      .then((res: GetFinanceTransactionBuyerAdvanceFilterListResponse) => {
        setDataSource(res?.content);
        setTotalElements(res?.totalElements);
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

  // ================================utils function ================================
  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      // Clear date range from state and reset page
      setFromDate(undefined);
      setToDate(undefined);
      setSearchParams({
        ...url,
        page: "1",
      });
      setDataSource([]);
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

  // btn handler
  const viewBtnHandler = (id: string) => {
    setIsOpenDetailDrawer({ isOpen: true, id });
  };

  // drawer handler
  const closeDrawerHandler = () => {
    setIsOpenDetailDrawer({ isOpen: false, id: "-1" });
  };

  // advance modal handler
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };
  const advanceFilterBtnHandler = () => {
    setIsAdvanceModalOpen(true);
  };

  const columns = TransactionsRefundStepListTableModel({
    viewBtnHandler: viewBtnHandler,
  });

  // drawer handler
  const closeMainTransactionDrawerHandler = () => {
    setIsOpenMainTransactionDetailDrawer({ isOpen: false, id: "-1" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}

      {openDetailDrawer?.isOpen && (
        <CustomDrawer
          open={openDetailDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <RefundTransactionDetailDrawerContent
              closeDrawer={closeDrawerHandler}
              uuid={openDetailDrawer?.id}
              setIsOpenMainTransactionDetailDrawer={setIsOpenMainTransactionDetailDrawer}
              setIsOpenDetailDrawer={setIsOpenDetailDrawer}
            />
          }
        />
      )}
      {/* MAIN TRANSACTION DRAWER */}
      {isOpenMainTransactionDetailDrawer?.isOpen && (
        <CustomDrawer
          open={isOpenMainTransactionDetailDrawer?.isOpen}
          onClose={closeMainTransactionDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <BuyersTransactionDetailDrawerContent
              closeDrawer={closeMainTransactionDrawerHandler}
              uuid={isOpenMainTransactionDetailDrawer?.id}
              hasRefundedTab={true}
            />
          }
        />
      )}

      <div className="m-6 flex flex-col gap-6">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={advanceFilterBtnHandler} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          centerSide={
            <Form form={formRange}>
              <CustomRangePicker
                onChange={changeDateHandler}
                name="rangeDate"
                label=""
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                presets={rangePresets}
                form={formRange}
              />
            </Form>
          }
          leftSide={
            <Dropdown menu={exportMenu} disabled trigger={["click"]}>
              <CustomButton>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTable<GetFinanceTransactionBuyerAdvanceFilterListItem>
          dataSource={dataSource}
          columns={columns}
          draggableColumns
          draggableId={ExcelCodes.FINANCE_TRANSACTION_REFUND_TAB_TABLE}
          pagination={manualPaginationConfig({
            total: totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.pageNo ? Number(url?.pageNo) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          loading={isLoading}
          className="financial-transaction-refund-step-Table"
          rowKey="id"
          key={`table-${url?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};
export default RefundStep;
