import { useEffect, useMemo, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useLazyGetMyBranchAccountingSettlementSearchListQuery,
  useLazyGetStatisticsSettledMyBranchDataQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import { calculateTotalPercentage, rangePresets } from "@pages/Finance/_shared/utils";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";
import MyBranchInvoicesAndDocsSettlementDocumentsTableModel from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/models/MyBranchInvoicesAndDocsSettlementDocumentsTableModel/MyBranchInvoicesAndDocsSettlementDocumentsTableModel";

import {
  GetMyBranchAccountingSettlementSearchListItem,
  GetMyBranchAccountingSettlementSearchListRequest,
  statisticsSettledMyBranchDataResponse,
} from "./helper/@types/@getMyBranchAccountingSettlementListTypes";
import useMyBranchInvoicesAndDocsSettlementAdvanceFilter from "./helper/hooks/useMyBranchInvoicesAndDocsSettlementAdvanceFilter";

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
  "statusName",
  // column search
  "uuid",
];
const MyBranchInvoicesAndDocsSettlementDocuments = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const [statisticsData, setStatisticsData] =
    useState<statisticsSettledMyBranchDataResponse>();
  const [tableData, setTableData] = useState<
    GetMyBranchAccountingSettlementSearchListItem[]
  >([]);

  const [totalElements, setTotalElements] = useState(0);

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm();

  const { filterItemsList } = useMyBranchInvoicesAndDocsSettlementAdvanceFilter();

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api ================================
  // list and advance filter
  const [getDataList, { isFetching: isGetDataListLoading }] =
    useLazyGetMyBranchAccountingSettlementSearchListQuery();

  // statistics
  const [getStatistics, { isFetching: isGetStatisticsLoading }] =
    useLazyGetStatisticsSettledMyBranchDataQuery();

  //? ================================  Effects  ================================
  // statistics
  useEffect(() => {
    if (url?.tab !== "4" && url?.tab) return;
    if (!fromDate || !toDate) return;

    getStatistics({
      fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.statusName && { settlementStatus: url?.statusName }),
      ...(url?.uuid && { uuids: url?.uuid }),
    })
      .unwrap()
      .then((res: statisticsSettledMyBranchDataResponse) => {
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
    if (url?.tab !== "4" && url?.tab) return;
    if (!fromDate || !toDate) return;
    const requestAdvanceFilterParams: GetMyBranchAccountingSettlementSearchListRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

      // modal search
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.statusName && { settlementStatus: url?.statusName }),

      // column search
      ...(url?.uuid && { uuids: url?.uuid }),
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

    getDataList(requestAdvanceFilterParams)
      .unwrap()
      .then((res) => {
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
  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      // Clear date range from state and reset page
      setFromDate(undefined);
      setToDate(undefined);
      setSearchParams({
        ...url,
        page: "1",
      });
      // setFactorData([]);
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
  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            <AmountBox
              title="تعداد کل اسناد"
              price={statisticsData?.allSettlementCounts ?? 0}
              hasTag={false}
              hasUnit={false}
            />

            <AmountBox
              title="در صف پرداخت"
              price={statisticsData?.pendingSettlementAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.pendingSettlementAmount,
                Number(statisticsData?.pendingSettlementAmount || 0) +
                  Number(statisticsData?.paidSettlementAmount || 0)
              )?.toString()}
            />

            <AmountBox
              title="پرداخت شده"
              price={statisticsData?.paidSettlementAmount ?? 0}
              hasPercentage={true}
              percentage={calculateTotalPercentage(
                statisticsData?.paidSettlementAmount,
                Number(statisticsData?.pendingSettlementAmount || 0) +
                  Number(statisticsData?.paidSettlementAmount || 0)
              )?.toString()}
            />
          </div>
        </Div>
        <div className="flex flex-col gap-6">
          <ToolBox
            className="custom-toolbox"
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
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
          <CustomTable<GetMyBranchAccountingSettlementSearchListItem>
            dataSource={tableData}
            loading={isGetDataListLoading}
            rowKey="id"
            columns={MyBranchInvoicesAndDocsSettlementDocumentsTableModel()}
            draggableColumns
            draggableId={ExcelCodes.FINANCE_MY_BRANCH_ACCOUNTANT_SETTLEMENT_TAB}
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
export default MyBranchInvoicesAndDocsSettlementDocuments;
