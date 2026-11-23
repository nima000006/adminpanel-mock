import { useEffect, useState } from "react";

import { Col, Row } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAccountingOperationPayableListQuery,
  useLazyGetAccountingOperationSettlementDocumentBannerQuery,
} from "@infra/states/redux/Apis/finance/financeApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  GetAccountingOperationPayableListItems,
  GetAccountingOperationPayableListRequest,
  GetAccountingOperationPayableListResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";
import AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import AccountingOperationSettlementDocumentSelectBeneficiaryTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/models/AccountingOperationSettlementDocumentSelectBeneficiaryTableModel";
import {
  GetAccountingOperationSettlementDocumentBannerResponse,
  SettlementDocumentFilters,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentSelectBeneficiary/@types/@accountingOperationSettlementDocumentSelectBeneficiary";

const AccountingOperationSettlementDocumentCheckSelectBeneficiary = ({
  onNext,
  onBack,
  filters,
}: {
  onNext: (filters: SettlementDocumentFilters, sortings?: string) => void;
  onBack?: () => void;
  filters?: SettlementDocumentFilters;
}) => {
  const [data, setData] = useState<GetAccountingOperationPayableListResponse>();
  const [isBeneficiaryDrawerOpen, setIsBeneficiaryDrawerOpen] = useState(false);

  const [isDocumentDrawerOpen, setIsDocumentDrawerOpen] = useState(false);

  const [documentUuid, setDocumentUuid] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState<GetAccountingOperationPayableListItems>();
  const [amount, setAmount] =
    useState<GetAccountingOperationSettlementDocumentBannerResponse>();
  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================

  const [getData, { isFetching: getDataLoading }] =
    useLazyGetAccountingOperationPayableListQuery();

  const [
    getAccountingOperationSettlementDocumentBanner,
    { isFetching: getAccountingOperationSettlementDocumentBannerLoading },
  ] = useLazyGetAccountingOperationSettlementDocumentBannerQuery();
  //? ================================ Effects ================================
  useEffect(() => {
    if (!filters) return;
    if (isBeneficiaryDrawerOpen || isDocumentDrawerOpen) return;

    const payload = {
      toDate: filters.toDate,
      samimService: filters.service,
      businessIds: filters.businessIds,
      provinceIds: filters.provinceIds,
      cityIds: filters.cityIds,
      branchIds: filters.allSelected ? undefined : filters.branchIds,
    } as const;

    const request: GetAccountingOperationPayableListRequest = {
      request: payload,
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
    };

    // sortings
    if (params?.sortings) {
      const sorting = JSON.parse(params?.sortings)?.[0];

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
    }

    getData(request)
      .unwrap()
      .then((res) => {
        setData(res);
      });

    getAccountingOperationSettlementDocumentBanner(payload)
      .unwrap()
      .then((res) => {
        setAmount(res);
      });
  }, [filters, getData, getAccountingOperationSettlementDocumentBanner]);

  const closeDrawer = () => {
    setIsBeneficiaryDrawerOpen(false);
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
              date={filters?.toDate}
              openDocumentDrawer={openDocumentDrawer}
            />
          }
        />
      )}
      {isDocumentDrawerOpen && (
        <CustomDrawer
          size="large"
          open={isDocumentDrawerOpen}
          onClose={() => setIsDocumentDrawerOpen(false)}
          content={
            <AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent
              uuid={documentUuid}
              onClose={() => setIsDocumentDrawerOpen(false)}
            />
          }
        />
      )}
      <CustomAlert
        title="راهنما!"
        type="info"
        showIcon
        description="در این مرحله، لیست ذینفعان انتخاب‌شده به‌همراه میزان بدهکاری سیستم، مطالبات سیستم در سرویس انتخابی تا تاریخ انتخابی و مبلغ قابل تسویه نمایش داده می‌شود."
      />
      <CustomAlert
        className="mt-10"
        title="توجه!"
        type="warning"
        showIcon
        description="تسویه اسناد به‌صورت گروهی ممکن است زمان‌بر باشد. نتیجه عملیات را می‌توانید در لیست صف‌های تسویه پیگیری کنید."
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="تا تاریخ"
          value={dataPlaceHolder({
            data: filters?.toDate,
            isDate: true,
            customDateFormat: "YYYY-MM-DD",
          })}
          xl={12}
          lg={12}
          md={12}
        />
        <SingleVerticalWithCol
          label="سرویس"
          value={
            serviceOptions.find(
              (item) => item.name === filters?.service || item.value === filters?.service
            )?.title ?? filters?.service
          }
          xl={12}
          lg={12}
          md={12}
        />
      </Row>
      <Div loading={getAccountingOperationSettlementDocumentBannerLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} xs={24}>
            <CustomCard>
              <p>مجموع مطالبات ذینفعان (بستانکاری)</p>
              <p className="mt-2! font-bold">
                {dataPlaceHolder({
                  data: amount?.totalCreditAmount,
                  isPrice: true,
                  isRial: true,
                })}{" "}
                تومان
              </p>
            </CustomCard>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <CustomCard>
              <p>مجموع تعهدات ذینفعان (بدهکاری)</p>
              <p className="mt-2! font-bold">
                {dataPlaceHolder({
                  data: amount?.totalDebitAmount,
                  isPrice: true,
                  isRial: true,
                })}{" "}
                تومان
              </p>
            </CustomCard>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <CustomCard>
              <p>مجموع قابل پرداخت</p>
              <p className="mt-2! font-bold">
                {dataPlaceHolder({
                  data: amount?.totalPayableAmount,
                  isPrice: true,
                  isRial: true,
                })}{" "}
                تومان
              </p>
            </CustomCard>
          </Col>
        </Row>
      </Div>
      <CustomDivider
        text="لیست انتخاب شده‌ها"
        extraContent={<span>تعداد: {data?.content.length || 0}</span>}
      />
      <CustomTable<GetAccountingOperationPayableListItems>
        className="mt-4"
        dataSource={data?.content}
        columns={AccountingOperationSettlementDocumentSelectBeneficiaryTableModel(
          openDrawer
        )}
        rowKey="branchId"
        loading={getDataLoading}
        draggableId={
          ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_PAYABLE_CHECK_SELECT_BENEFICIARY
        }
        pagination={manualPaginationConfig({
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
        })}
      />

      <div className="flex justify-end gap-2">
        <CustomButton type="default" onClick={onBack}>
          بازگشت
        </CustomButton>
        <CustomButton
          onClick={() => onNext(filters as SettlementDocumentFilters, params?.sortings)}
          type="primary"
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </>
  );
};

export default AccountingOperationSettlementDocumentCheckSelectBeneficiary;
