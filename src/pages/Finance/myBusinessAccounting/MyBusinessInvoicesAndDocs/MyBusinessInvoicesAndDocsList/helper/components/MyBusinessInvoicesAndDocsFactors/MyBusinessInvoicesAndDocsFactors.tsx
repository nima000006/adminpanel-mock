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
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetBusinessAccountingFactorListQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { rangePresets } from "@pages/Finance/_shared/utils";

import {
  GetBusinessAccountingFactorListItems,
  GetBusinessAccountingFactorListRequest,
  GetBusinessAccountingFactorListResponse,
} from "./@types/@getBusinessAccountingFactorList";
import { MyBusinessInvoicesAndDocsFactorsAdvanceFilterFormType } from "./@types/@myBusinessInvoicesAndDocsFactorsDataType";
import useMyBusinessInvoicesAndDocsFactorsAdvanceFilter from "./helper/hooks/useMyBusinessInvoicesAndDocsFactorsAdvanceFilter";
import MyBusinessInvoicesAndDocsFactorsTableModel from "./helper/models/MyBusinessInvoicesAndDocsFactorsTableModel/MyBusinessInvoicesAndDocsFactorsTableModel";

const advanceFilterItems = [
  "provinceId",
  "cityId",
  "branchId",
  "serviceName",
  "factorTypeName",
];

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
const MyBusinessInvoicesAndDocsFactors = () => {
  const { params, setSearchParams } = useQueryParams();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [factorListData, setFactorListData] =
    useState<GetBusinessAccountingFactorListResponse>();
  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<MyBusinessInvoicesAndDocsFactorsAdvanceFilterFormType>();
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();

  const { filterItemsList } = useMyBusinessInvoicesAndDocsFactorsAdvanceFilter({
    advanceModalOpen,
    form,
  });

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);
  //? ================================  Api ================================
  // list
  const [getMyFactorList, { isFetching: getMyFactorListLoading }] =
    useLazyGetBusinessAccountingFactorListQuery();

  //? ================================  Effects  ================================
  useEffect(() => {
    if (!fromDate || !toDate) return;
    // lists
    //check if tab 1 then send request
    if (params?.tab === "1") {
      const requestAdvanceFilterParams: GetBusinessAccountingFactorListRequest = {
        pageNumber: params?.page ? +params?.page - 1 : 0,
        pageSize: params?.pageSize ? +params?.pageSize : 8,
        from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
        to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
        // modal search
        ...(params?.provinceId && { supplierProvinceIds: params?.provinceId }),
        ...(params?.cityId && { supplierCityIds: params?.cityId }),
        ...(params?.branchId && { supplierBranchIds: params?.branchId }),
        ...(params?.serviceName && { samimServices: params?.serviceName }),
        ...(params?.factorTypeName && { invoiceStatus: params?.factorTypeName }),

        // column search
        ...(params?.uuid && { uuid: params?.uuid }),
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
      getMyFactorList(requestAdvanceFilterParams)
        .unwrap()
        .then(getMyBusinessFactorListSuccess);
    }
  }, [
    params?.page,
    params?.pageSize,
    fromDate,
    toDate,
    params?.tab,
    params?.uuid,
    params?.sortings,
    ...advanceFilterItems.map((key) => params?.[key]),
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
  const getMyBusinessFactorListSuccess = (
    res: GetBusinessAccountingFactorListResponse
  ) => {
    setFactorListData(res);
  };
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
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
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...params }}
        />
      )}
      <div className="mt-5">
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
          className="mt-5"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <Dropdown disabled menu={exportMenu} trigger={["click"]}>
              <CustomButton>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />
        <CustomTable<GetBusinessAccountingFactorListItems>
          dataSource={factorListData?.content || []}
          loading={getMyFactorListLoading}
          rowKey="id"
          className="mt-5"
          draggableId={ExcelCodes.FINANCE_MY_ACCOUNTING_BUSINESS_INVOICE_AND_DOC_INVOICES}
          draggableColumns
          columns={MyBusinessInvoicesAndDocsFactorsTableModel()}
          pagination={manualPaginationConfig({
            total: factorListData?.totalElements ?? 0,
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
export default MyBusinessInvoicesAndDocsFactors;
