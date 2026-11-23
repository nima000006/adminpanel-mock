import { useEffect, useMemo, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton, CustomRangePicker } from "@components/CustomInputs";
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
import { BuyersDetailsTransActionListAdvanceFilterFormType } from "@pages/Finance/Buyers/BuyersDetails/@types/@buyersDetails";
import BuyersAndReturnDetailsBuyTableModel from "@pages/Finance/Buyers/BuyersDetails/helpers/components/_shared/models/BuyersDetailsBuyTableModel/BuyersDetailsBuyTableModel";
import useBuyersDetailsTransActionListAdvanceFilter from "@pages/Finance/Buyers/BuyersDetails/helpers/modal/advanceFilter/useBuyersDetailsTransActionList";
import {
  GetFinanceTransactionBuyerAdvanceFilterListItem,
  GetFinanceTransactionBuyerAdvanceFilterListRequest,
  GetFinanceTransactionBuyerAdvanceFilterListResponse,
} from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/@types/@buyersStepTypes";
import BuyersTransactionDetailDrawerContent from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/helper/drawer/BuyersTransactionDetailDrawerContent/BuyersTransactionDetailDrawerContent";
import RefundTransactionDetailDrawerContent from "@pages/Finance/Transactions/TransactionsList/helper/components/RefundStep/helper/drawer/RefundTransactionDetailDrawerContent/RefundTransactionDetailDrawerContent";

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
  "servicesName",
  "branchId",
  "businessId",
  "staffTypeName",
  // column search
  "uuid",
  "personalCode",
];

const BuyersDetailsReturnTable = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<
    GetFinanceTransactionBuyerAdvanceFilterListItem[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

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

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<BuyersDetailsTransActionListAdvanceFilterFormType>();

  const { filterItemsList } = useBuyersDetailsTransActionListAdvanceFilter({
    form,
    advanceModalOpen: isAdvanceModalOpen,
  });

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api Calls ================================
  // list
  const [getBuyersDetailList, { isFetching: BuyersDetailListLoading }] =
    useLazyGetFinanceTransactionBuyerAdvanceFilterListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

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

  // list
  useEffect(() => {
    if (!fromDate || !toDate) return;

    const requestAdvanceFilterParams: GetFinanceTransactionBuyerAdvanceFilterListRequest =
      {
        pageNumber: url?.page ? +url?.page - 1 : 0,
        pageSize: url?.pageSize ? +url?.pageSize : 8,

        fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
        toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

        isRefunded: true,
        nationalCode: url?.username,

        // modal search
        ...(url?.servicesName && { samimServices: url?.servicesName }),
        ...(url?.branchId && { branchIds: url?.branchId }),
        ...(url?.businessId && { businessIds: url?.businessId }),
        ...(url?.staffTypeName && { staffType: url?.staffTypeName }),

        // column search
        ...(url?.uuid && { transactionUuid: url?.uuid }),
        ...(url?.personalCode && { employeeCode: url?.personalCode }),
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

    getBuyersDetailList(requestAdvanceFilterParams)
      .unwrap()
      .then((res: GetFinanceTransactionBuyerAdvanceFilterListResponse) => {
        setDataSource(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setDataSource([]);
        setTotalElements(0);
      });
  }, [
    url?.page,
    url?.pageSize,
    fromDate,
    toDate,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
  ]);

  //* ================================ Util Functions ================================
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

  // handler
  const viewClickHandler = (id: string) => {
    setIsOpenDetailDrawer({ isOpen: true, id });
  };
  const closeDrawerHandler = () => {
    setIsOpenDetailDrawer({ isOpen: false, id: "-1" });
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  const closeMainTransactionDrawerHandler = () => {
    setIsOpenMainTransactionDetailDrawer({ isOpen: false, id: "-1" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ ▲▲▲ ▲ ▲ ▲ */

  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
          form={form}
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

      <div className="flex flex-col gap-6">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="default"
                icon={<AiOutlineFilter />}
                onClick={openAdvanceFilter}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
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
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]} disabled={true}>
              <CustomButton>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTable<GetFinanceTransactionBuyerAdvanceFilterListItem>
          dataSource={dataSource}
          draggableColumns
          draggableId={ExcelCodes.FINANCE_ACCOUNTANT_BUYER_DETAIL_RETURN}
          columns={BuyersAndReturnDetailsBuyTableModel({
            viewClickHandler,
          })}
          className="mt-5"
          pagination={manualPaginationConfig({
            total: totalElements,
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
          loading={BuyersDetailListLoading}
          key={`table-${url?.pageSize || "8"}`}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default BuyersDetailsReturnTable;
