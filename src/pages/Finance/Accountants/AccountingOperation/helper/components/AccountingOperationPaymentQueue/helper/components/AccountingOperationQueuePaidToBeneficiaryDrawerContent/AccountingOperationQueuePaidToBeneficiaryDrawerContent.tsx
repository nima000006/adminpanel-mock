import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAccountingOperationQueueBannerQuery,
  useLazyGetAccountingSettledQuery,
  useSendAccountingOperationQueuePaidToBeneficiaryMutation,
  useSendAccountingOperationQueuePaidToBeneficiaryOtpMutation,
} from "@infra/states/redux/Apis/finance/financeApi";
import {
  getAccountingOperationQueueBannerRequest,
  getAccountingOperationQueueBannerResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/@types/@accountingOperationPaymentQueue";
import {
  AccountingOperationQueuePaidToBeneficiaryDrawerContentTypeProps,
  SendAccountingOperationQueuePaidToBeneficiaryRequest,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/components/AccountingOperationQueuePaidToBeneficiaryDrawerContent/@types/@accountingOperationQueuePaidToBeneficiaryDrawerContent";
import AccountingOperationPaymentQueueOtpModalContent from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/modals/AccountingOperationPaymentQueueOtp/AccountingOperationPaymentQueueOtpModalContent";
import AccountingOperationQueueListTableModel from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/models/AccountingOperationQueuePaidListTableModel";
import {
  AccountingSettledContent,
  AccountingSettledRequest,
  AccountingSettledResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

const AccountingOperationQueuePaidToBeneficiaryDrawerContent = ({
  onClose,
  isAllSelected,
  uuids,
  selectedRows,
  filters,
  onSuccess,
}: AccountingOperationQueuePaidToBeneficiaryDrawerContentTypeProps) => {
  const [data, setData] = useState<AccountingSettledResponse>();
  const [tableData, setTableData] = useState<AccountingSettledContent[]>([]);
  const [bannerData, setBannerData] =
    useState<getAccountingOperationQueueBannerResponse>();

  const { params: url, setSearchParams } = useQueryParams();
  const [otpModal, setOtpModal] = useState({
    isOpen: false,
    mobileNo: "",
  });

  const [otpForm] = Form.useForm<{ otp: string }>();

  const appliedServiceFilter = url?.servicesName ?? filters.service;
  const appliedBusinessIdsFilter = url?.businessId ?? filters.businessIds;
  const appliedBranchIdsFilter = url?.branchId ?? filters.branchIds;

  // ================================ Api ================================

  const [
    getAccountingOperationQueuePaid,
    { isFetching: getAccountingOperationQueuePaidLoading },
  ] = useLazyGetAccountingSettledQuery();

  const [
    getAccountingOperationQueueBanner,
    { isFetching: GetAccountingOperationQueueBannerLoading },
  ] = useLazyGetAccountingOperationQueueBannerQuery();

  const [
    sentAccountingOperationQueuePaidToBeneficiary,
    { isLoading: sentAccountingOperationQueuePaidToBeneficiaryLoading },
  ] = useSendAccountingOperationQueuePaidToBeneficiaryMutation();

  const [sentOtp, { isLoading: sentOtpLoading }] =
    useSendAccountingOperationQueuePaidToBeneficiaryOtpMutation();

  // ================================ Effects ================================

  useEffect(() => {
    const request: AccountingSettledRequest = {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      settlementStatus: "PENDING_FOR_PAYMENT",
      ...(appliedServiceFilter ? { services: appliedServiceFilter } : {}),
      ...(appliedBusinessIdsFilter ? { businessIds: appliedBusinessIdsFilter } : {}),
      ...(appliedBranchIdsFilter ? { branchIds: appliedBranchIdsFilter } : {}),
      ...(!isAllSelected &&
        uuids?.length && {
          uuids: uuids,
        }),
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

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

    getAccountingOperationQueuePaid(request)
      .unwrap()
      .then((res) => {
        setData(res);
        setTableData(res.content);
      });
  }, [
    isAllSelected,
    url.page,
    url.pageSize,
    url?.servicesName,
    url?.businessId,
    url?.branchId,
    url?.sortings,
    appliedServiceFilter,
    appliedBusinessIdsFilter,
    appliedBranchIdsFilter,
    filters.sortBy,
    filters.sortDirection,
    getAccountingOperationQueuePaid,
    selectedRows,
  ]);

  useEffect(() => {
    const request: getAccountingOperationQueueBannerRequest = {
      ...(appliedServiceFilter ? { services: appliedServiceFilter } : {}),
      ...(appliedBusinessIdsFilter ? { businessIds: appliedBusinessIdsFilter } : {}),
      ...(appliedBranchIdsFilter ? { branchIds: appliedBranchIdsFilter } : {}),
      ...(!isAllSelected &&
        uuids?.length && {
          uuids: uuids,
        }),
    };
    getAccountingOperationQueueBanner(request)
      .unwrap()
      .then((res) => setBannerData(res));
  }, [
    url?.branchId,
    url?.businessId,
    url?.servicesName,
    appliedServiceFilter,
    appliedBusinessIdsFilter,
    appliedBranchIdsFilter,
    getAccountingOperationQueueBanner,
  ]);

  //* ================================ Util Functions ================================

  const sentPaidToBeneficiary = async () => {
    const postRequest: SendAccountingOperationQueuePaidToBeneficiaryRequest = {
      businessIds: appliedBusinessIdsFilter
        ? (Array.isArray(appliedBusinessIdsFilter)
            ? appliedBusinessIdsFilter
            : [appliedBusinessIdsFilter]
          ).map(Number)
        : undefined,

      branchIds: appliedBranchIdsFilter
        ? (Array.isArray(appliedBranchIdsFilter)
            ? appliedBranchIdsFilter
            : [appliedBranchIdsFilter]
          ).map(Number)
        : undefined,

      service: appliedServiceFilter
        ? (Array.isArray(appliedServiceFilter)
            ? appliedServiceFilter
            : [appliedServiceFilter]
          ).map(String)
        : undefined,

      ...(!isAllSelected && {
        uuids: uuids,
      }),
      requestUuid: crypto.randomUUID(),
    };

    await sentAccountingOperationQueuePaidToBeneficiary(postRequest)
      .unwrap()
      .then((res) => {
        setOtpModal({
          isOpen: true,
          mobileNo: res?.maskedMobileNumber,
        });
      });
  };

  const selectedPendingForPaymentBalance = bannerData?.pendingForPaymentBalance ?? 0;

  const handleResend = async () => {
    const postRequest: SendAccountingOperationQueuePaidToBeneficiaryRequest = {
      businessIds: appliedBusinessIdsFilter
        ? (Array.isArray(appliedBusinessIdsFilter)
            ? appliedBusinessIdsFilter
            : [appliedBusinessIdsFilter]
          ).map(Number)
        : undefined,

      branchIds: appliedBranchIdsFilter
        ? (Array.isArray(appliedBranchIdsFilter)
            ? appliedBranchIdsFilter
            : [appliedBranchIdsFilter]
          ).map(Number)
        : undefined,

      service: appliedServiceFilter
        ? (Array.isArray(appliedServiceFilter)
            ? appliedServiceFilter
            : [appliedServiceFilter]
          ).map(String)
        : undefined,

      ...(!isAllSelected && {
        uuids: uuids,
      }),
      requestUuid: crypto.randomUUID(),
    };

    await sentAccountingOperationQueuePaidToBeneficiary(postRequest);
  };

  const onConfirmClickHandler = async () => {
    const otp = otpForm.getFieldsValue(true)?.otp;
    await sentOtp({ otpCode: otp })
      .unwrap()
      .then(() => {
        onSuccess();
      });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {otpModal?.isOpen && (
        <ConfirmationModalWithContent
          title="کد تایید تسویه حساب"
          isModalOpen={otpModal?.isOpen}
          confirmBtnText="تایید و پرداخت"
          backBtnText="انصراف"
          closeModalHandler={() => setOtpModal({ isOpen: false, mobileNo: "" })}
          onConfirmClickHandler={onConfirmClickHandler}
          isConfirmButtonLoading={sentOtpLoading}
          content={
            <AccountingOperationPaymentQueueOtpModalContent
              otpForm={otpForm}
              onResend={handleResend}
              mobileNo={otpModal?.mobileNo}
              isResetLoading={sentAccountingOperationQueuePaidToBeneficiaryLoading}
            />
          }
        />
      )}
      <CustomDrawerHeader
        closeDrawerHandler={onClose}
        title="پرداخت به کیف پول ذینفعان"
        leftSideContent={
          <div className="flex gap-2">
            <CustomButton onClick={onClose}>انصراف</CustomButton>

            <CustomButton
              onClick={sentPaidToBeneficiary}
              type="primary"
              loading={sentAccountingOperationQueuePaidToBeneficiaryLoading}
            >
              تایید و پرداخت
            </CustomButton>
          </div>
        }
      />

      {/* table */}
      <CustomDivider text={`انتخاب شده ها (${tableData?.length})`} />
      <Div loading={GetAccountingOperationQueueBannerLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} xs={24}>
            <CustomCard>
              <p className="text-neutral-9">موجودی کیف پول سیستم</p>
              <p className="mt-2! font-bold">
                {dataPlaceHolder({
                  data: bannerData?.mainSystemWalletBalance,
                  isPrice: true,
                  isRial: true,
                })}
              </p>
            </CustomCard>
          </Col>
          <Col lg={12} md={12} xs={24}>
            <CustomCard>
              <p className="text-neutral-9">مجموع مبلغ در صف پرداخت انتخاب‌شده</p>
              <p className="mt-2! font-bold">
                {dataPlaceHolder({
                  data: selectedPendingForPaymentBalance,
                  isPrice: true,
                  isRial: true,
                })}
              </p>
            </CustomCard>
          </Col>
        </Row>
      </Div>
      <CustomTable<AccountingSettledContent>
        className="mt-4"
        dataSource={tableData}
        columns={AccountingOperationQueueListTableModel("isDrawer")}
        rowKey="uuid"
        loading={getAccountingOperationQueuePaidLoading}
        draggableColumns
        draggableId={ExcelCodes.FINANCE_ACCOUNTANT_OPERATING_QUEUE_PAID_DRAWER}
        pagination={
          isAllSelected
            ? manualPaginationConfig({
                total: data?.totalElements,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...url,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: url?.page ? Number(url?.page) : 1,
                defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
              })
            : false
        }
      />
    </div>
  );
};

export default AccountingOperationQueuePaidToBeneficiaryDrawerContent;
