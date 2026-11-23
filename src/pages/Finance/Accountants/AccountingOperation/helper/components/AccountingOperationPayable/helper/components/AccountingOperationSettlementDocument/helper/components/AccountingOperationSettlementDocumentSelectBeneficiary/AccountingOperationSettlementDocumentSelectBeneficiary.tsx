import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Col, Form, Row } from "antd";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { Link } from "react-router";

import { CustomButton, CustomDatePicker, CustomSelect } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE } from "@infra/router/routes/finance";
import {
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
} from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import {
  useLazyGetAccountingOperationPayableListQuery,
  useLazyGetAccountingOperationSettlementDocumentBannerQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  GetAccountingOperationPayableListItems,
  GetAccountingOperationPayableListRequest,
  GetAccountingOperationPayableListResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";
import AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryTableModel";
import { getToDate } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/utils";
import {
  AccountingOperationSettlementDocumentSelectBeneficiaryFormType,
  GetAccountingOperationSettlementDocumentBannerRequest,
  GetAccountingOperationSettlementDocumentBannerResponse,
  SettlementDocumentFilters,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentSelectBeneficiary/@types/@accountingOperationSettlementDocumentSelectBeneficiary";
import { GetAccountingAllSamimServiceResponse } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
const AccountingOperationSettlementDocumentSelectBeneficiary = ({
  onNext,
  initialFilters,
}: {
  onNext: (filters: SettlementDocumentFilters) => void;
  initialFilters?: SettlementDocumentFilters;
}) => {
  const [isBeneficiaryDrawerOpen, setIsBeneficiaryDrawerOpen] = useState(false);

  const [isDocumentDrawerOpen, setIsDocumentDrawerOpen] = useState(false);

  const [documentUuid, setDocumentUuid] = useState("");

  const [serviceLoaded, setServiceLoaded] = useState(false);
  const [businessLoaded, setBusinessLoaded] = useState(false);
  const [provinceData, setProvinceData] = useState<IdTitle[]>([]);
  const [cityData, setCityData] = useState<IdTitle[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isSelectAllMode, setIsSelectAllMode] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<GetAccountingOperationPayableListItems>();
  const [amount, setAmount] =
    useState<GetAccountingOperationSettlementDocumentBannerResponse>();

  const [data, setData] = useState<GetAccountingOperationPayableListResponse>();

  const [service, setService] = useState<GetAccountingAllSamimServiceResponse>();
  const [business, setBusiness] = useState<IdTitle[]>();
  const { params, setSearchParams } = useQueryParams();
  const [form] =
    Form.useForm<AccountingOperationSettlementDocumentSelectBeneficiaryFormType>();

  const selectedProvince = useWatch("province", form);
  const selectedCity = useWatch("city", form);

  const selectedDate = useWatch("date", form);
  const selectedService = useWatch("service", form);
  const selectedBusiness = useWatch("business", form);

  const selectedServiceName = service?.find(
    (item) => item.id === Number(selectedService)
  )?.name;

  const isProvinceDisabled =
    !selectedDate || !selectedBusiness?.length || !selectedService;

  const isSubmitDisabled =
    isProvinceDisabled ||
    !data?.content?.length ||
    (!isSelectAllMode && selectedRowKeys.length === 0);

  //? ================================  Api Calls ================================

  const [
    getAccountingOperationSettlementDocumentBanner,
    { isFetching: getAccountingOperationSettlementDocumentBannerLoading },
  ] = useLazyGetAccountingOperationSettlementDocumentBannerQuery();

  // services
  const [getAllSamimService, { isFetching: isGetAllSamimServiceLoading }] =
    useLazyGetAccountingAllSamimServiceQuery();

  //business
  const [getAllBusiness, { isFetching: isGetAllBusinessLoading }] =
    useLazyGetActiveBusinessListQuery();

  // get province
  const [
    getProvinceData,
    { isLoading: isProvinceDataLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  // get city
  const [getCityData, { isLoading: isCityDataLoading }] =
    useLazyGetBasicInfoCityBasedMultipleProvinceQuery();

  //table data
  const [getData, { isFetching: getDataLoading }] =
    useLazyGetAccountingOperationPayableListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    fetchData();
  }, [
    selectedDate,
    selectedServiceName,
    selectedBusiness,
    selectedProvince,
    selectedCity,
    params?.page,
    params?.sortings,
  ]);

  useEffect(() => {
    if (isProvinceDisabled) {
      form.setFieldsValue({
        province: undefined,
        city: undefined,
      });
    }
  }, [isProvinceDisabled]);

  useEffect(() => {
    if (!initialFilters) return;

    setSelectedRowKeys(initialFilters.branchIds ?? []);
    setIsSelectAllMode(initialFilters.allSelected ?? false);

    getServiceHandler();
    getBusinessHandler();

    form.setFieldsValue({
      date: initialFilters.toDate,
    });
  }, [initialFilters]);

  useEffect(() => {
    if (!initialFilters) return;

    const selectedServiceOption = service?.find(
      (item) => item.name === initialFilters.service
    );

    const selectedBusinessValues = initialFilters.businessIds?.map(String);
    const selectedProvinceValues = initialFilters.provinceIds?.map(String);
    const selectedCityValues = initialFilters.cityIds?.map(String);

    form.setFieldsValue({
      service: selectedServiceOption ? String(selectedServiceOption.id) : undefined,
      business: selectedBusinessValues,
      province: selectedProvinceValues,
      city: selectedCityValues,
    });
  }, [initialFilters, service]);

  useEffect(() => {
    if (!selectedProvince?.length) return;

    getCityData({
      ids: selectedProvince.join(","),
    })
      .unwrap()
      .then((value) => {
        setCityData(
          value.map((item) => ({
            id: item.id,
            title: item.name,
          }))
        );
      });
  }, [selectedProvince]);
  //* ================================ Util Functions ================================

  const fetchData = () => {
    if (isProvinceDisabled) return;
    if (isBeneficiaryDrawerOpen) return;
    if (isDocumentDrawerOpen) return;

    const payload: GetAccountingOperationSettlementDocumentBannerRequest = {
      toDate: getToDate(selectedDate),
      samimService: selectedServiceName,
      businessIds: selectedBusiness?.map(Number),
      provinceIds: selectedProvince?.map(Number),
      cityIds: selectedCity?.map(Number),
    };

    const request: GetAccountingOperationPayableListRequest = {
      request: payload,
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
    };

    if (params?.sortings) {
      const sorting = JSON.parse(params.sortings)?.[0];

      request.sortBy = sorting?.sortBy;
      request.sortDirection = sorting?.sortOrder?.toUpperCase();
    }

    Promise.all([
      getData(request).unwrap(),
      getAccountingOperationSettlementDocumentBanner(payload).unwrap(),
    ]).then(([tableRes, bannerRes]) => {
      setData(tableRes);
      setAmount(bannerRes);
    });
  };
  const getProvinceHandler = () => {
    if (!isProvinceSuccess) {
      getProvinceData(103) // 103 Iran code
        .unwrap()
        .then((value) => {
          const provinceList = value?.map((item) => {
            return {
              id: item?.id,
              title: item?.name,
            };
          });
          setProvinceData(provinceList);
        });
    }
  };

  // when province selected
  const onProvinceChangeHandler = () => {
    form.setFieldsValue({
      city: undefined,
    });
  };

  const onSelectedRowKeysChange = (newSelectedKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedKeys);
    if (isSelectAllMode && newSelectedKeys.length !== (data?.content?.length || 0)) {
      setIsSelectAllMode(false);
    }
  };

  const rowSelection = isSelectAllMode
    ? undefined
    : {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange,
        hideSelectAll: true,
      };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsSelectAllMode(true);
      onSelectedRowKeysChange(
        data?.content?.map(
          (item: GetAccountingOperationPayableListItems) => item.branchId
        ) || []
      );
    } else {
      setIsSelectAllMode(false);
      onSelectedRowKeysChange([]);
    }
  };
  // CHECK ALL
  const allSelected = isSelectAllMode;

  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < (data?.content?.length || 0);

  const getServiceHandler = () => {
    if (serviceLoaded) return;

    setServiceLoaded(true);

    getAllSamimService().unwrap().then(setService);
  };

  const getBusinessHandler = () => {
    if (businessLoaded) return;

    setBusinessLoaded(true);

    getAllBusiness().unwrap().then(setBusiness);
  };

  const onFinishHandler = async () => {
    const values = await form.validateFields();

    onNext({
      toDate: getToDate(values.date),
      service: selectedServiceName || "",
      businessIds: selectedBusiness?.map(Number),
      provinceIds: selectedProvince?.map(Number),
      cityIds: selectedCity?.map(Number),
      branchIds: isSelectAllMode ? undefined : (selectedRowKeys as number[]),
      allSelected: isSelectAllMode,
    });
  };

  const closeDrawer = () => {
    setIsBeneficiaryDrawerOpen(false);
    setSearchParams({});
  };
  const onCloseDocumentDrawer = () => {
    setSearchParams({});
    setIsDocumentDrawerOpen(false);
  };
  const openDrawer = (records: GetAccountingOperationPayableListItems) => {
    setSelectedRecord(records);
    setIsBeneficiaryDrawerOpen(true);
  };

  const openDocumentDrawer = (uuid: string) => {
    setDocumentUuid(uuid);

    setIsBeneficiaryDrawerOpen(false);

    setIsDocumentDrawerOpen(true);
  };
  const columns =
    AccountingOperationSettlementDocumentSelectBeneficiaryTableModel(openDrawer);
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isBeneficiaryDrawerOpen && selectedRecord && (
        <CustomDrawer
          size="large"
          onClose={closeDrawer}
          open={isBeneficiaryDrawerOpen}
          content={
            <AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent
              onClose={closeDrawer}
              record={selectedRecord}
              date={selectedDate}
              openDocumentDrawer={openDocumentDrawer}
            />
          }
        />
      )}
      {isDocumentDrawerOpen && (
        <CustomDrawer
          size="large"
          open={isDocumentDrawerOpen}
          onClose={onCloseDocumentDrawer}
          content={
            <AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent
              uuid={documentUuid}
              onClose={onCloseDocumentDrawer}
            />
          }
        />
      )}
      <CustomAlert
        showIcon
        type="info"
        title="راهنما!"
        description="در این مرحله، مشخص کنید تسویه تا چه تاریخی و برای کدام سرویس‌، کسب‌وکارها و شعبه / واحدها انجام شود."
      />
      <Form form={form} className="mt-10" onFinish={onFinishHandler}>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} xs={24}>
            <CustomDatePicker
              rules={[REQUIRED_RULE]}
              name="date"
              label="تاریخ"
              disabledDate={
                (current) =>
                  !!current && current.isAfter(dayjs().subtract(2, "day"), "day") // we need to disable 2 days ago from now
              }
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <CustomSelect
              rules={[REQUIRED_RULE]}
              label="سرویس"
              name="service"
              loading={isGetAllSamimServiceLoading}
              options={service}
              allowClear
              onOpenChange={(open) => {
                if (open) getServiceHandler();
              }}
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <CustomSelect
              rules={[REQUIRED_RULE]}
              label="کسب وکار"
              name="business"
              mode="multiple"
              loading={isGetAllBusinessLoading}
              options={business}
              allowClear
              onOpenChange={(open) => {
                if (open) getBusinessHandler();
              }}
            />
          </Col>
        </Row>

        <CustomDivider
          text="لیست ذینفعان"
          extraContent={
            <div className="flex gap-2">
              <span>
                تعداد کل: {!isProvinceDisabled ? (data?.totalElements ?? 0) : 0}
              </span>
              <span>
                انتخاب شده ها:{" "}
                {!isProvinceDisabled
                  ? allSelected
                    ? (data?.totalElements ?? 0)
                    : selectedRowKeys.length
                  : 0}
              </span>
              <Checkbox
                indeterminate={isIndeterminate}
                onChange={onCheckAllChange}
                checked={!isProvinceDisabled && allSelected}
                disabled={isProvinceDisabled || !data?.content?.length}
              >
                انتخاب همه
              </Checkbox>
            </div>
          }
        />
        <Div loading={getAccountingOperationSettlementDocumentBannerLoading}>
          <Row gutter={[16, 16]}>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p>مجموع مطالبات ذینفعان (بستانکاری)</p>
                <p className="mt-2! font-bold">
                  {!isProvinceDisabled ? (
                    <>
                      {" "}
                      {dataPlaceHolder({
                        data: amount?.totalCreditAmount,
                        isPrice: true,
                        isRial: true,
                      })}{" "}
                    </>
                  ) : (
                    0
                  )}
                  تومان
                </p>
              </CustomCard>
            </Col>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p>مجموع تعهدات ذینفعان (بدهکاری)</p>
                <p className="mt-2! font-bold">
                  {!isProvinceDisabled ? (
                    <>
                      {" "}
                      {dataPlaceHolder({
                        data: amount?.totalDebitAmount,
                        isPrice: true,
                        isRial: true,
                      })}{" "}
                    </>
                  ) : (
                    0
                  )}
                  تومان
                </p>
              </CustomCard>
            </Col>
            <Col lg={8} md={12} xs={24}>
              <CustomCard>
                <p>مجموع قابل پرداخت</p>
                <p className="mt-2! font-bold">
                  {!isProvinceDisabled ? (
                    <>
                      {" "}
                      {dataPlaceHolder({
                        data: amount?.totalPayableAmount,
                        isPrice: true,
                        isRial: true,
                      })}{" "}
                    </>
                  ) : (
                    0
                  )}
                  تومان
                </p>
              </CustomCard>
            </Col>
          </Row>
        </Div>
        <Row gutter={[16, 16]} className="mt-10">
          <Col lg={8} md={12} xs={24}>
            <CustomSelect
              label="استان"
              onClick={getProvinceHandler}
              onChange={onProvinceChangeHandler}
              name="province"
              mode="multiple"
              disabled={isProvinceDisabled}
              options={provinceData}
              loading={isProvinceDataLoading}
              allowClear
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <CustomSelect
              label="شهر"
              disabled={selectedProvince?.length > 0 ? false : true}
              name="city"
              mode="multiple"
              options={cityData}
              loading={isCityDataLoading}
              allowClear
            />
          </Col>
        </Row>

        {!isProvinceDisabled ? (
          <CustomTable<GetAccountingOperationPayableListItems>
            className="mt-4"
            dataSource={data?.content}
            columns={columns}
            rowKey="branchId"
            loading={getDataLoading}
            draggableColumns
            draggableId={
              ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE_SELECT_BENEFICIARY
            }
            pagination={
              isSelectAllMode
                ? false
                : manualPaginationConfig({
                    total: data?.totalElements,
                    onChange: (page, pageSize) => {
                      setSearchParams({
                        ...params,
                        page: page?.toString(),
                        pageSize: pageSize?.toString(),
                      });
                    },
                    pageNumber: params?.page ? Number(params?.page) : 1,
                    defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
                    showSizeChanger: false,
                  })
            }
            rowSelection={
              isSelectAllMode
                ? undefined
                : {
                    type: "checkbox",
                    ...rowSelection,
                  }
            }
          />
        ) : (
          <CustomEmpty description="موردی برای نمایش وجود ندارد." />
        )}

        <div className="mt-10 flex justify-end gap-3">
          <Link to={FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE}>
            <CustomButton danger>انصراف</CustomButton>
          </Link>
          <CustomButton disabled={isSubmitDisabled} type="primary" htmlType="submit">
            ثبت و ادامه
          </CustomButton>
        </div>
      </Form>
    </>
  );
};

export default AccountingOperationSettlementDocumentSelectBeneficiary;
