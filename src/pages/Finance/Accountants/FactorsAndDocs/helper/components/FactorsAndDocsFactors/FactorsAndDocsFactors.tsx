import { useEffect, useMemo, useState } from "react";

import { MenuProps, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "jalali-moment";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDropdown from "@components/CustomInputs/CustomDropdown/CustomDropdown";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAccountingFactorsQuery } from "@infra/states/redux/Apis/finance/financeApi";
import { rangePresets } from "@pages/Finance/_shared/utils";

import {
  AccountingFactorsContent,
  AccountingGetAccountingFactorsRequest,
  AccountingGetAccountingFactorsResponse,
  FactorAndDocsFormType,
} from "./@types/@accountingFactors";
import FactorsAndDocsFactorsTableModel from "./helper/models/FactorsAndDocsFactorsTableModel";
import useFactorsAndDocsAdvanceFilter from "./hooks/useFactorsAndDocsAdvanceFilter";
import "./_factorsAndDocsFactors.scss";

const advanceFilterItems = [
  // modal search
  "servicesName",
  "factorTypeName",
  "branchId",
  "businessId",
  "cityId",
  "provinceId",
  "branchBuyerId",
  "businessBuyerId",
  "cityBuyerId",
  "provinceBuyerId",
  // column search
  "uuid",
];

const AccountingFactors = () => {
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [factorsData, setFactorData] = useState<AccountingFactorsContent[]>([]);

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<FactorAndDocsFormType>();

  const { filterItemsList } = useFactorsAndDocsAdvanceFilter({ advanceModalOpen, form });

  const exportMenu: MenuProps = {
    items: [
      { label: "خروجی Excel", key: "excel" },
      { label: "خروجی PDF", key: "pdf" },
    ],
  };

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);
  //? ================================ API ================================
  const [getFactors, { isFetching: isGetFactorsLoading }] =
    useLazyGetAccountingFactorsQuery();

  //? ================================  Effects ================================
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

  useEffect(() => {
    if (url?.tab !== "1" && url?.tab) return;
    if (!fromDate || !toDate) return;
    const requestAdvanceFilterParams: AccountingGetAccountingFactorsRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

      // modal search
      ...(url?.servicesName && { samimServices: url?.servicesName }),
      ...(url?.factorTypeName && { invoiceStatus: url?.factorTypeName }),
      ...(url?.branchId && { supplierBranchIds: url?.branchId }),
      ...(url?.businessId && { supplierBusinessIds: url?.businessId }),
      ...(url?.cityId && { supplierCityIds: url?.cityId }),
      ...(url?.provinceId && { supplierProvinceIds: url?.provinceId }),
      ...(url?.branchBuyerId && { consumerBranchIds: url?.branchBuyerId }),
      ...(url?.businessBuyerId && { consumerBusinessIds: url?.businessBuyerId }),
      ...(url?.cityBuyerId && { consumerCityIds: url?.cityBuyerId }),
      ...(url?.provinceBuyerId && { consumerProvinceIds: url?.provinceBuyerId }),

      // column search
      ...(url?.uuid && { uuid: url?.uuid }),
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

    getFactors(requestAdvanceFilterParams)
      .unwrap()
      .then((res: AccountingGetAccountingFactorsResponse) => {
        setFactorData(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setFactorData([]);
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
      ...url,
      page: "1", // Reset page when range changes
    });
  };

  // table column
  const column = FactorsAndDocsFactorsTableModel();

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
      <div className="finance-counting-factors-container">
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

        <CustomTable<AccountingFactorsContent>
          rowKey="id"
          loading={isGetFactorsLoading}
          dataSource={factorsData}
          columns={column}
          draggableColumns
          draggableId={ExcelCodes.FINANCE_ACCOUNTANTS_DOC_AND_FACTORS_FACTORS_TAB_TABLE}
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
export default AccountingFactors;
