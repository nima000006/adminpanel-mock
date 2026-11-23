import { useEffect, useMemo, useState } from "react";

import { Col, Form, MenuProps, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import {
  CustomButton,
  CustomDropdown,
  CustomRangePicker,
} from "@components/CustomInputs";
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
  useLazyGetAccountingSettledQuery,
  useLazyGetStatisticsSettledDataQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import { calculateTotalPercentage, rangePresets } from "@pages/Finance/_shared/utils";
import {
  AccountingSettledContent,
  AccountingSettledRequest,
  AccountingSettledResponse,
  FactorsAndDocsSettledDocumentsFormType,
  statisticsSettledDataResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";
import FactorsAndDocsSettledTableModel from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/helper/model/FactorsAndDocsSettledTableModel";
import useFactorsAndDocsSettledAdvanceFilter from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/hooks/useFactorsAndDocsSettledAdvanceFilter";
import PaymentBox from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/PaymentBox/PaymentBox";

const exportMenu: MenuProps = {
  items: [
    { label: "خروجی Excel", key: "excel" },
    { label: "خروجی PDF", key: "pdf" },
  ],
};

const advanceFilterItems = [
  // modal search
  "businessId",
  "branchId",
  "servicesName",
  "statusName",
  "cityId",
  "provinceId",

  // column search
  "uuid",
];

const FactorsAndDocsSettledDocuments = () => {
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [settledData, setSettledData] = useState<AccountingSettledContent[]>([]);
  const [statisticsData, setStatisticsData] = useState<statisticsSettledDataResponse>();
  const [totalElements, setTotalElements] = useState(0);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<FactorsAndDocsSettledDocumentsFormType>();

  const { filterItemsList } = useFactorsAndDocsSettledAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================ API ================================
  // list and advance filter
  const [getDataList, { isFetching: isGetDataListLoading }] =
    useLazyGetAccountingSettledQuery();

  // statistics
  const [getStatistics, { isFetching: isGetStatisticsLoading }] =
    useLazyGetStatisticsSettledDataQuery();

  //? ================================  Effects ================================
  // statistics
  useEffect(() => {
    if (url?.tab !== "4" && url?.tab) return;
    if (!fromDate || !toDate) return;

    getStatistics({
      fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.statusName && { settlementStatus: url?.statusName }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.provinceId && { provinceIds: url?.provinceId }),
      // column search
      ...(url?.uuid && { uuids: url?.uuid }),
    })
      .unwrap()
      .then((res: statisticsSettledDataResponse) => {
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
    if (url?.tab !== "4" && url?.tab) return;
    if (!fromDate || !toDate) return;
    const requestAdvanceFilterParams: AccountingSettledRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      fromDate: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      toDate: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

      // modal search
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.servicesName && { service: url?.servicesName }),
      ...(url?.statusName && { settlementStatus: url?.statusName }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.provinceId && { provinceIds: url?.provinceId }),

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
      .then((res: AccountingSettledResponse) => {
        setSettledData(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setSettledData([]);
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

  // ================================  Utils function ================================

  const changeDateHandler = (dates: NoUndefinedRangeValueType<Dayjs> | null) => {
    if (!dates) {
      // Clear date range from state and reset page
      setFromDate(undefined);
      setToDate(undefined);
      setSearchParams({
        ...url,
        page: "1",
      });
      setSettledData([]);
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
  const column = FactorsAndDocsSettledTableModel();

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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={8}>
              <PaymentBox
                title={"تعداد کل اسناد"}
                amount={statisticsData?.allSettlementCounts?.toString() ?? "0"}
                hasUnit={false}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <PaymentBox
                title={"در صف پرداخت "}
                amount={statisticsData?.pendingSettlementAmount?.toString() ?? "0"}
                percentage={calculateTotalPercentage(
                  statisticsData?.pendingSettlementAmount,
                  Number(statisticsData?.pendingSettlementAmount || 0) +
                    Number(statisticsData?.paidSettlementAmount || 0)
                )}
                hasPercentage={true}
                hasTag={true}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <PaymentBox
                title={"پرداخت شده"}
                amount={statisticsData?.paidSettlementAmount?.toString() ?? "0"}
                percentage={calculateTotalPercentage(
                  statisticsData?.paidSettlementAmount,
                  Number(statisticsData?.pendingSettlementAmount || 0) +
                    Number(statisticsData?.paidSettlementAmount || 0)
                )}
                hasPercentage={true}
                hasTag={true}
              />
            </Col>
          </Row>
        </Div>

        <ToolBox
          className="accounting-toolBox-container"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
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

        <CustomTable
          rowKey="id"
          loading={isGetDataListLoading}
          dataSource={settledData}
          columns={column}
          draggableColumns
          draggableId={ExcelCodes.FINANCE_ACCOUNTANTS_DOC_AND_FACTORS_SETTLED_TAB_TABLE}
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
          key={`table-${url?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};
export default FactorsAndDocsSettledDocuments;
