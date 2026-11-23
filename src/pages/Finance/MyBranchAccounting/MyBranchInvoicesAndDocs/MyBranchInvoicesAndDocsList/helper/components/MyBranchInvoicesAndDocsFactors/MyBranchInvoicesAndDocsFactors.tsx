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
import { useLazyGetBranchAccountingFactorListQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { rangePresets } from "@pages/Finance/_shared/utils";

import {
  GetBranchAccountingFactorListItems,
  GetBranchAccountingFactorListRequest,
  GetBranchAccountingFactorListResponse,
} from "./@types/@getBranchAccountingFactorList";
import { MyInvoicesAndDocsFactorsAdvanceFilterFormType } from "./@types/@myBranchInvoicesAndDocsFactorsDataType";
import useMyBranchInvoicesAndDocsFactorsAdvanceFilter from "./helper/hooks/useMyBranchInvoicesAndDocsFactorsAdvanceFilter";
import MyBranchInvoicesAndDocsFactorsTableModel from "./helper/models/MyBranchInvoicesAndDocsFactorsTableModel/MyBranchInvoicesAndDocsFactorsTableModel";

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
  "factorTypeName",
  // column search
  "uuid",
];
const MyBranchInvoicesAndDocsFactors = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [factorListData, setFactorListData] = useState<
    GetBranchAccountingFactorListItems[]
  >([]);

  const [totalElements, setTotalElements] = useState(0);

  const [formRange] = Form.useForm<{ rangeDate: [Moment, Moment] }>();
  const [form] = Form.useForm<MyInvoicesAndDocsFactorsAdvanceFilterFormType>();

  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const { filterItemsList } = useMyBranchInvoicesAndDocsFactorsAdvanceFilter();

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
    useLazyGetBranchAccountingFactorListQuery();

  //? ================================  Effects  ================================
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
    if (url?.tab !== "1" && url?.tab) return;
    if (!fromDate || !toDate) return;

    const requestAdvanceFilterParams: GetBranchAccountingFactorListRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,

      // modal search
      ...(url?.servicesName && { samimServices: url?.servicesName }),
      ...(url?.factorTypeName && {
        invoiceStatus: url?.factorTypeName,
      }),

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

    getMyFactorList(requestAdvanceFilterParams)
      .unwrap()
      .then((res: GetBranchAccountingFactorListResponse) => {
        setFactorListData(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setFactorListData([]);
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
      setFactorListData([]);
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
      // اگر تاریخ مربوط به امروز باشد تا همین لحظه سیستم
      end = now;
    } else {
      //   تا پایان روز 23:59:59
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

  // const getMyBranchFactorListSuccess = (res: GetBranchAccountingFactorListResponse) => {
  //   setFactorListData(res);
  // };

  // handler
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };
  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
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
      <div className="flex flex-col gap-10">
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

        <div className="flex flex-col gap-6">
          <ToolBox
            className="custom-toolbox"
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
          <CustomTable<GetBranchAccountingFactorListItems>
            className="my-branch-invoices-docs-factors-table-container"
            dataSource={factorListData || []}
            loading={getMyFactorListLoading}
            rowKey="id"
            columns={MyBranchInvoicesAndDocsFactorsTableModel()}
            draggableColumns
            draggableId={
              ExcelCodes.FINANCE_MY_BRANCH_ACCOUNTANT_SERVICE_SALES_INVOICE_TAB
            }
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
              defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
            })}
          />
        </div>
      </div>
    </>
  );
};
export default MyBranchInvoicesAndDocsFactors;
