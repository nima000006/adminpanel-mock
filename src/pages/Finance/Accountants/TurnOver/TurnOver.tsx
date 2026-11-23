import { useEffect, useMemo, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton, CustomRangePicker, CustomSelect } from "@components/CustomInputs";
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
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import {
  useLazyGetAccountingDebtDocumentQuery,
  useLazyGetAccountingTurnOverBannerQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AccountingCreditorDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingCreditorDrawerContent/AccountingCreditorDrawerContent";
import AccountingDebitDrawerContent from "@pages/Finance/_shared/helper/drawers/AccountingDebitDrawerContent/AccountingDebitDrawerContent";
import { rangePresets } from "@pages/Finance/_shared/utils";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";
import {
  AccountingDebtDocumentContent,
  AccountingDebtDocumentRequest,
  AccountingDebtDocumentResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";
import {
  GetAccountingTurnOverBannerResponse,
  TurnOverFormType,
} from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";
import TurnOverTableModel from "@pages/Finance/Accountants/TurnOver/helper/model/TurnOverTableModel";

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
const TurnOver = () => {
  const [form] = Form.useForm<TurnOverFormType>();
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداران",
      },
      {
        title: "گردش مالی",
      },
    ],
  });

  const [isBranchDisabled, setIsBranchDisabled] = useState(true);
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<AccountingDebtDocumentContent[]>();
  const [totalElements, setTotalElements] = useState(0);
  const [bannerData, setBannerData] = useState<GetAccountingTurnOverBannerResponse>();
  const [isOpenCreditDrawer, setIsOpenCreditDrawer] = useState(false);
  const [isOpenDebitDrawer, setIsOpenDebitDrawer] = useState(false);

  const business = Form.useWatch("business", form);
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
  // list
  const [getTableData, { isFetching: isGetTableDataLoading }] =
    useLazyGetAccountingDebtDocumentQuery();

  // service
  const [
    getAllSamimService,
    { data: serviceData, isFetching: isGetAllSamimServiceLoading },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //business
  const [getBusinessData, { data: businessData, isFetching: businessLoading }] =
    useLazyGetActiveBusinessListQuery();

  // branches
  const [getBranchData, { data: branchData, isFetching: branchLoading }] =
    useLazyGetBranchByBusinessQuery();

  //amount
  const [getBannerData, { isFetching: isGetBannerData }] =
    useLazyGetAccountingTurnOverBannerQuery();

  //? ================================ Effects ================================

  // business and service
  useEffect(() => {
    getBusinessData();
    getAllSamimService();
  }, []);

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

  // list
  useEffect(() => {
    if (!fromDate || !toDate || !service || !branch) return;

    const request: AccountingDebtDocumentRequest = {
      pageNumber: url?.page ? +url?.page - 1 : 0,
      pageSize: url?.pageSize ? +url?.pageSize : 8,
      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      samimServices: service?.item?.name,
      branchIds: branch?.code.toString(),
      businessIds: business?.code.toString(),
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
    getTableData(request)
      .unwrap()
      .then((res: AccountingDebtDocumentResponse) => {
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
    url?.sortings,
    fromDate,
    toDate,
    service,
    branch,
    business?.code,
  ]);

  // banners
  useEffect(() => {
    if (!fromDate || !toDate || !service || !branch) return;

    getBannerData({
      from: fromDate ? jalaliToGregorianWithoutZ(fromDate) : undefined,
      to: toDate ? jalaliToGregorianWithoutZ(toDate) : undefined,
      samimServices: service?.item?.name,
      branchIds: branch?.code.toString(),
    })
      .unwrap()
      .then((res: GetAccountingTurnOverBannerResponse) => {
        setBannerData(res);
      });
  }, [fromDate, toDate, service, branch]);

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

  const changeBusinessHandler = (businessId: number) => {
    if (businessId) {
      form.setFieldsValue({ branch: undefined });
      setIsBranchDisabled(false);

      getBranchData({ businessIds: [businessId] });
    } else {
      setIsBranchDisabled(true);
      form.setFieldsValue({ branch: undefined });
    }
  };

  const allRequiredFilled = business && branch && service && fromDate && toDate;

  const viewClickHandler = (records: AccountingDebtDocumentContent) => {
    if (records?.documentType?.name === documentTypeConfig.credit) {
      setIsOpenCreditDrawer(true);
    }
    if (records?.documentType?.name === documentTypeConfig.debit) {
      setIsOpenDebitDrawer(true);
    }
    setSearchParams({ ...url, uuid: records?.uuid, from: "turnOver" });
  };

  const onCloseCreditDrawerHandler = () => {
    setIsOpenCreditDrawer(false);
    const { uuid, ...restParams } = url || {};
    setSearchParams(restParams);
  };
  const onCloseDebitDrawerHandler = () => {
    setIsOpenDebitDrawer(false);
    const { uuid, ...restParams } = url || {};
    setSearchParams(restParams);
  };

  const column = TurnOverTableModel({ viewClickHandler });
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
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
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
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="business"
                label="کسب و کار"
                options={businessData?.map((item) => {
                  return { title: item.title, id: item.id };
                })}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={businessLoading}
                onChange={(e) => changeBusinessHandler(e as number)}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="branch"
                label="واحد / شعبه"
                options={branchData?.map((item) => {
                  return { title: item.title, id: item.id };
                })}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={branchLoading}
                disabled={isBranchDisabled}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
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
            <Div loading={isGetBannerData}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AmountBox
                  title="مانده ابتدای دوره"
                  price={bannerData?.balanceBeforeFrom ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="مطالبات ذینفع (بستانکاری)"
                  price={bannerData?.totalCredits ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="تعهدات ذینفع (بدهکاری)"
                  price={bannerData?.totalDebits ?? 0}
                  hasTag={false}
                />
                <AmountBox
                  title="مانده انتهای دوره"
                  price={Math.abs(bannerData?.balanceInPeriodTime ?? 0)}
                  hasTag={
                    (bannerData?.balanceInPeriodTime ?? 0) > 0 ||
                    (bannerData?.balanceInPeriodTime ?? 0) < 0
                      ? true
                      : false
                  }
                  tagDetail={
                    (bannerData?.balanceInPeriodTime ?? 0) > 0 ? "بستانکار" : "بدهکار"
                  }
                  color={(bannerData?.balanceInPeriodTime ?? 0) > 0 ? "green" : "red"}
                />
              </div>
            </Div>
            <div className="flex flex-col gap-6">
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
              <CustomTable<AccountingDebtDocumentContent>
                dataSource={dataSource}
                columns={column}
                loading={isGetTableDataLoading}
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
                rowKey="uuid"
              />
            </div>
          </>
        ) : (
          <CustomEmpty
            description="برای مشاهده گردش مالی، ابتدا بازه زمانی، سپس کسب‌وکار، شعبه / واحد (ذینفع) و در نهایت سرویس موردنظر را انتخاب نمایید."
            loading={false}
          />
        )}
      </div>
    </>
  );
};
export default TurnOver;
