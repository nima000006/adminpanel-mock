import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetFinanceBusinessOwnerTransactionAdvanceFilterQuery } from "@infra/states/redux/Apis/finance/businessOwnerApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  FinanceBusinessOwnerTransactionDataType,
  GetFinanceBusinessOwnerTransactionAdvanceFilterRequest,
  GetFinanceBusinessOwnerTransactionAdvanceFilterResponse,
} from "./@types/@financeBusinessOwnersTransactionsTypes";
import useFinanceBusinessOwnersTransactionsAdvanceFilter from "./helpers/modal/AdvanceModal/FinanceBusinessOwnersTransactionsAdvanceFilter";
import TransactionsTableModel from "./helpers/models/TransactionsTableModel";
import "./_financeBusinessOwnersTransactions.scss";

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
  "dateDateStart",
  "dateDateEnd",
  "serviceNameId",
  "statusTitle",
  "nationalCodeTitle",
  "transactionMinAmount",
  "transactionMaxAmount",
];

const FinanceBusinessOwnersTransactions = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<FinanceBusinessOwnerTransactionDataType[]>(
    []
  );

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<GetFinanceBusinessOwnerTransactionAdvanceFilterRequest>();
  const [selectedRange, setSelectRange] = useState<string[] | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  const { filterItemsList } = useFinanceBusinessOwnersTransactionsAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getTransactionList, { isFetching: isTransactionListLoading }] =
    useLazyGetFinanceBusinessOwnerTransactionAdvanceFilterQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    const filters: GetFinanceBusinessOwnerTransactionAdvanceFilterRequest = {
      from: selectedRange ? jalaliToGregorianWithoutZ(selectedRange[0]) : undefined,
      to: selectedRange ? jalaliToGregorianWithoutZ(selectedRange[1]) : undefined,
      ...(url?.nationalCodeTitle && { username: url?.nationalCodeTitle }),
      ...(url?.statusTitle && { status: url?.statusTitle }),
      ...(url?.transactionMaxAmount && { maxAmount: +url.transactionMaxAmount * 10 }), // for changing to rial in payload
      ...(url?.transactionMinAmount && { minAmount: +url.transactionMinAmount * 10 }), // for changing to rial in payload
      ...(url?.serviceNameId && {
        service: serviceOptions.find((item) => item?.id === +url?.serviceNameId)?.value,
      }),
      ...(url?.refundId && { isRefunded: +url.refundId === 1 ? true : false }),
      pageNumber: url?.pageNo ? +url.pageNo - 1 : 0,
      pageSize: url?.pageSize ? +url.pageSize : 8,
    };

    getTransactionList({
      ...filters,
    })
      .unwrap()
      .then(getTransactionsListSuccess);
  }, [
    ...advanceFilterItems.map((item) => url?.[item]),
    selectedRange,
    url.pageNo,
    url.pageSize,
  ]);

  //  پاک کردن بج فیلتر پیشرفته بعد از هر رفرش
  useEffect(() => {
    const { tab } = url;
    setSearchParams(url ? { tab } : {});
    setBadgeCount("0");
  }, []);

  //* ================================ Util Functions ================================
  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      setSelectRange(null);
      setDataSource([]);
      setTotalElements(0);

      setBadgeCount("0");
      form.resetFields();
      const { tab } = url;
      setSearchParams(tab ? { tab } : {});

      return;
    }

    const now = dayjs();

    const start = dates[0]?.startOf("day").utc(true);

    let end = dates[1];

    const isToday =
      end?.year() === now.year() &&
      end?.month() === now.month() &&
      end?.date() === now.date();

    if (isToday) {
      // اگر تاریخ مربوط به امروز باشد تا همین لحظه سیستم
      end = now;
    } else {
      //   تا پایان روز 23:59:59
      end = end?.endOf("day") ?? null;
    }

    end = end?.utc(true) ?? null;

    setSelectRange([start ? start.toISOString() : "", end ? end.toISOString() : ""]);
  };

  const getTransactionsListSuccess = async (
    value: GetFinanceBusinessOwnerTransactionAdvanceFilterResponse
  ) => {
    setDataSource(value?.content);
    setTotalElements(value?.totalElements);
  };

  // drawer handler
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  const openAdvanceFilter = () => {
    setAdvanceModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}

      <div className="finance-business-owners-general-transaction-container">
        <ToolBox
          className="custom-toolbox"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                size="middle"
                onClick={openAdvanceFilter}
                disabled={selectedRange === null}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          centerSide={
            <CustomRangePicker
              className="custom-range-picker"
              name="date"
              picker="date"
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              onChange={changeDateHandler}
            />
          }
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled={true}>
                خروجی
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTable<FinanceBusinessOwnerTransactionDataType>
          dataSource={dataSource || []}
          rowKey="id"
          columns={TransactionsTableModel()}
          loading={isTransactionListLoading}
          pagination={manualPaginationConfig({
            total: totalElements,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                pageNo: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.pageNo ? Number(url?.pageNo) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          {...TABLE_PROPS(dataSource?.length)}
          className="finance-business-owners-general-transaction-table-container"
        />
      </div>
    </>
  );
};
export default FinanceBusinessOwnersTransactions;
