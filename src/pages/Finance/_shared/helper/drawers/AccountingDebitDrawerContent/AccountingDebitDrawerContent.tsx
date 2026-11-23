import { useEffect, useState } from "react";

import { Row } from "antd";
import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
  FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
  FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/finance";
import { useLazyGetDocumentsDetailsQuery } from "@infra/states/redux/Apis/finance/financeApi";
import {
  useLazyGetMyAccountantBranchDocumentsDetailsQuery,
  useLazyGetMyAccountantBusinessDocumentsDetailsQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import {
  accountingInvoiceSettleStatusMap,
  serviceOptions,
  settlementAggregationStatusMap,
} from "@pages/Finance/Accountants/_shared/utils";
import { getDocumentsDetailsResponse } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/helper/components/FactorsAndDocsDocumentsDrawerContent/@types/@documentsDetailsTypes";
import {
  GetMyAccountantBranchDocumentsDetailsResponse,
  GetMyAccountantBusinessDocumentsDetailsResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsServiceDocuments/@types/@myBranchInvoicesAndDocsServiceDataType";

const AccountingDebitDrawerContent = ({
  onClose,
  uuid,
}: {
  onClose: () => void;
  uuid: string;
}) => {
  const [data, setData] = useState<
    | getDocumentsDetailsResponse
    | GetMyAccountantBranchDocumentsDetailsResponse
    | GetMyAccountantBusinessDocumentsDetailsResponse
  >();
  const { params } = useQueryParams();

  //? ================================  Api Calls ================================

  const [getDocumentDetails, { isLoading: isGetDocumentDetailsLoading }] =
    useLazyGetDocumentsDetailsQuery();

  const [getDocumentDetailsBranch, { isFetching: isGetDocumentDetailsBranchLoading }] =
    useLazyGetMyAccountantBranchDocumentsDetailsQuery();

  const [
    getDocumentDetailsBusiness,
    { isFetching: isGetDocumentDetailsBusinessLoading },
  ] = useLazyGetMyAccountantBusinessDocumentsDetailsQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!uuid) return;

    let request;

    switch (params?.from) {
      case "myFactors":
        request = getDocumentDetailsBranch({ id: uuid });
        break;

      case "myTurnOver":
        request = getDocumentDetailsBranch({ id: uuid });
        break;

      case "myFactorsBusiness":
        request = getDocumentDetailsBusiness({ id: uuid });
        break;

      case "myBusinessTurnOver":
        request = getDocumentDetailsBusiness({ id: uuid });
        break;

      case "turnOver":
        request = getDocumentDetails({ id: uuid });
        break;

      case "factor":
        request = getDocumentDetails({ id: uuid });
        break;

      default:
        request = getDocumentDetails({ id: uuid });
        break;
    }

    request.unwrap().then(setData).catch(console.error);
  }, [uuid, params?.from]);

  //* ================================ Util Functions ================================
  const invoiceSettleStatus =
    accountingInvoiceSettleStatusMap[
      data?.accountingInvoiceSettleStatus
        ?.name as keyof typeof accountingInvoiceSettleStatusMap
    ] ?? accountingInvoiceSettleStatusMap.DEFAULT;

  const aggregationStatus =
    settlementAggregationStatusMap[
      data?.settlementAggregationStatus
        ?.name as keyof typeof settlementAggregationStatusMap
    ] ?? settlementAggregationStatusMap.DEFAULT;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={onClose} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <div className="flex gap-2">
            <CustomTag
              className="w-fit gap-2"
              color={aggregationStatus.color}
              icon={aggregationStatus.icon}
            >
              {aggregationStatus.text}
            </CustomTag>

            <CustomTag
              className="w-fit gap-2"
              color={invoiceSettleStatus.color}
              icon={invoiceSettleStatus.icon}
            >
              {invoiceSettleStatus.text}
            </CustomTag>
            <Link
              className="text-primary-6! flex items-center justify-center gap-2"
              to={{
                pathname:
                  params?.from === "myFactors" || params?.from === "myTurnOver"
                    ? FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE
                    : params?.from === "myFactorsBusiness" ||
                        params?.from === "myBusinessTurnOver"
                      ? FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE
                      : FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
                search: makeSearchParams({
                  id: data?.accountingInvoiceId,
                  from: params?.from,
                }),
              }}
            >
              <PiReceipt />
              مشاهده فاکتور
            </Link>
          </div>
        }
      />

      <Div
        loading={
          isGetDocumentDetailsLoading ||
          isGetDocumentDetailsBranchLoading ||
          isGetDocumentDetailsBusinessLoading
        }
      >
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={data?.amount?.toString()}
            isPrice
            label="مبلغ"
            currency={{ type: "تومان", isAvailable: true }}
            isRial
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={data?.uuid}
            label="شماره سند سیستمی"
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={data?.createdDateTime}
            label="تاریخ و زمان ایجاد سند"
            isDate
            customDateFormat="HH:mm, YYYY/MM/DD"
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={data?.documentType?.title}
            label="ماهیت حسابداری"
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={data?.documentReason?.title}
            label="علت بستانکاری / بدهکاری"
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            value={
              serviceOptions.find((service) => service.name === data?.samimService?.name)
                ?.title ?? data?.samimService?.name
            }
            label="سرویس"
          />
          <SingleVerticalWithCol span={24} value={data?.description} label="شرح سند" />
        </Row>
        <CustomDivider text="اطلاعات ذینفع" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            value={data?.businessName}
            label="کسب و کار"
            xl={12}
            lg={12}
            md={12}
          />
          <SingleVerticalWithCol
            label="شعبه/ واحد (ذینفع)"
            value={data?.branchName}
            xl={12}
            lg={12}
            md={12}
          />
        </Row>
      </Div>
    </div>
  );
};
export default AccountingDebitDrawerContent;
