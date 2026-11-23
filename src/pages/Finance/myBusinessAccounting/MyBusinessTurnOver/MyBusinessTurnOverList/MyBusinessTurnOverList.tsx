import { useEffect, useMemo, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomSelect } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { NoUndefinedRangeValueType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetMyBusinessAccountingBranchQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import {
  useLazyGetMyBusinessAccountingListTurnOverQuery,
  useLazyGetMyBusinessAccountingTurnOverBannerQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AccountingCreditorDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingCreditorDrawerContent/AccountingCreditorDrawerContent";
import AccountingDebitDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingDebitDrawerContent/AccountingDebitDrawerContent";
import { rangePresets } from "@pages/Finance/_shared/utils";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import {
  GetMyBusinessAccountingListTurnOver,
  GetMyBusinessAccountingListTurnOverRequest,
  GetMyBusinessAccountingListTurnOverResponse,
  GetMyBusinessAccountingTurnOverBannerResponse,
  MyBusinessTurnOverFormType,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/@types/@myBusinessTurnOverList";
import MyBusinessTurnOverTableModel from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/helper/model/MyBusinessTurnOverTableModel";

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

const MyBusinessTurnOverList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداری کسب و کار من",
      },
      {
        title: "گردش مالی کسب و کار من",
      },
    ],
  });
  const { params: url, setSearchParams } = useQueryParams();

  const [totalElements, setTotalElements] = useState(0);

  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [statisticsData, setStatisticsData] =
    useState<GetMyBusinessAccountingTurnOverBannerResponse>();
  const [tableData, setTableData] = useState<GetMyBusinessAccountingListTurnOver[]>([]);

  const [isOpenCreditDrawer, setIsOpenCreditDrawer] = useState(false);
  const [isOpenDebitDrawer, setIsOpenDebitDrawer] = useState(false);

  const [form] = Form.useForm<MyBusinessTurnOverFormType>();

  const branch = Form.useWatch("branch", form);

  const service = Form.useWatch("service", form);

  const defaultRange = useMemo(() => {
    const now = moment();

    return {
      start: now.clone().subtract(7, "days").startOf("day"),
      end: now.clone(),
    };
  }, []);

  //? ================================  Api Calls ================================
  // branches
  const [getAllBranch, { data: branchData, isLoading: isBranchDataLoading }] =
    useLazyGetMyBusinessAccountingBranchQuery();

  // service
  const [
    getAllSamimService,
    { data: serviceData, isFetching: isGetAllSamimServiceLoading },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  // statistics
  const [getStatistics, { isFetching: isGetStatisticsLoading }] =
    useLazyGetMyBusinessAccountingTurnOverBannerQuery();

  // list
  const [getMyBranchTurnOverList, { isFetching: myBranchTurnOverListLoading }] =
    useLazyGetMyBusinessAccountingListTurnOverQuery();

  //? ================================ Effects ================================
  // range date
  useEffect(() => {
    const now = dayjs();

    const start = dayjs(defaultRange.start.toDate()).startOf("day").utc();

    const end = now.utc();

    setFromDate(start.toISOString());
    setToDate(end.toISOString());

    form.setFieldsValue({
      rangeDate: [
        moment(defaultRange.start).locale("fa"),
        moment(defaultRange.end).locale("fa"),
      ],
    });
  }, []);

  // branch and service
  useEffect(() => {
    getAllBranch();
    getAllSamimService();
  }, []);

  // statistics
  useEffect(() => {
    if (!fromDate || !toDate || !service || !branch) return;

    getStatistics({
      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      samimServices: service?.item?.name,
      branchIds: branch?.code,
    })
      .unwrap()
      .then((res: GetMyBusinessAccountingTurnOverBannerResponse) => {
        setStatisticsData(res);
      });
  }, [fromDate, toDate, service, branch]);

  // list
  useEffect(() => {
    if (!fromDate || !toDate || !service || !branch) return;

    const request: GetMyBusinessAccountingListTurnOverRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,

      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      samimServices: service?.item?.name,
      branchIds: branch?.code?.toString(),
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        request.sortBy = sorting.sortBy;
      } else {
        delete request.sortBy;
      }

      if (sorting?.sortOrder) {
        request.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete request.sortDirection;
      }
    } else {
      request.sortBy = "createdDate";
      request.sortDirection = "DESC";
    }
    getMyBranchTurnOverList(request)
      .unwrap()
      .then((res: GetMyBusinessAccountingListTurnOverResponse) => {
        setTableData(res?.content);
        setTotalElements(res?.totalElements);
      })
      .catch(() => {
        setTableData([]);
        setTotalElements(0);
      });
  }, [url?.page, url?.pageSize, url?.sortings, fromDate, toDate, service, branch]);

  //* ================================ Util Functions ================================
  const allRequiredFilled = branch && service;

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

  const viewClickHandler = (records: GetMyBusinessAccountingListTurnOver) => {
    if (records?.documentType?.name === documentTypeConfig.credit) {
      setIsOpenCreditDrawer(true);
    }
    if (records?.documentType?.name === documentTypeConfig.debit) {
      setIsOpenDebitDrawer(true);
    }
    setSearchParams({ ...url, uuid: records?.uuid, from: "myBusinessTurnOver" });
  };

  const onCloseCreditDrawerHandler = () => {
    setIsOpenCreditDrawer(false);
    const { uuid, from, ...restParams } = url || {};
    setSearchParams(restParams);
  };
  const onCloseDebitDrawerHandler = () => {
    setIsOpenDebitDrawer(false);
    const { uuid, from, ...restParams } = url || {};
    setSearchParams(restParams);
  };

  const column = MyBusinessTurnOverTableModel({
    viewClickHandler: viewClickHandler,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenCreditDrawer && (
        <CustomDrawer
          open={isOpenCreditDrawer}
          onClose={onCloseCreditDrawerHandler}
          closeIcon={<AiOutlineClose />}
          title="مشاهده سند"
          content={
            <AccountingCreditorDrawerContent
              onClose={onCloseCreditDrawerHandler}
              uuid={url?.uuid}
            />
          }
        />
      )}

      {isOpenDebitDrawer && (
        <CustomDrawer
          open={isOpenDebitDrawer}
          onClose={onCloseDebitDrawerHandler}
          closeIcon={<AiOutlineClose />}
          title="مشاهده سند"
          content={
            <AccountingDebitDrawerContent
              onClose={onCloseDebitDrawerHandler}
              uuid={url?.uuid}
            />
          }
        />
      )}
      <div className="flex flex-col gap-10">
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <CustomRangePicker
                onChange={changeDateHandler}
                name="rangeDate"
                label="سال مالی (بازه تاریخ)"
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                presets={rangePresets}
                form={form}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="branch"
                label="شعبه / واحد (ذینفع)"
                options={branchData ? branchData : []}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={isBranchDataLoading}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="service"
                label="سرویس"
                options={serviceData}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={isGetAllSamimServiceLoading}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>
        </Form>
        {allRequiredFilled ? (
          <>
            <Div loading={isGetStatisticsLoading}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                <AmountBox
                  title="مانده ابتدای دوره"
                  price={statisticsData?.balanceBeforeFrom ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="مطالبات ذینفع (بستانکاری)"
                  price={statisticsData?.totalCredits ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="تعهدات ذینفع (بدهکاری)"
                  price={statisticsData?.totalDebits ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="مانده انتهای دوره"
                  price={Math.abs(statisticsData?.balanceInPeriodTime ?? 0)}
                  hasTag={
                    (statisticsData?.balanceInPeriodTime ?? 0) > 0 ||
                    (statisticsData?.balanceInPeriodTime ?? 0) < 0
                      ? true
                      : false
                  }
                  tagDetail={
                    (statisticsData?.balanceInPeriodTime ?? 0) > 0 ? "بستانکار" : "بدهکار"
                  }
                  color={(statisticsData?.balanceInPeriodTime ?? 0) > 0 ? "green" : "red"}
                />
              </div>
            </Div>
            <div className="flex flex-col gap-4">
              <CustomDivider text="لیست گردش مالی" />
              <ToolBox
                leftSide={
                  <Dropdown menu={exportMenu} disabled trigger={["click"]}>
                    <CustomButton>
                      خروجی <IoIosArrowDown />
                    </CustomButton>
                  </Dropdown>
                }
              />
              <CustomTable<GetMyBusinessAccountingListTurnOver>
                dataSource={tableData ? tableData : []}
                rowKey="id"
                loading={myBranchTurnOverListLoading}
                columns={column}
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
          </>
        ) : (
          <CustomEmpty
            description="برای مشاهده گردش مالی، ابتدا بازه زمانی، سپس شعبه / واحد(ذینفع) و در نهایت سرویس موردنظر را انتخاب نمایید."
            loading={false}
          />
        )}
      </div>
    </>
  );
};

export default MyBusinessTurnOverList;
