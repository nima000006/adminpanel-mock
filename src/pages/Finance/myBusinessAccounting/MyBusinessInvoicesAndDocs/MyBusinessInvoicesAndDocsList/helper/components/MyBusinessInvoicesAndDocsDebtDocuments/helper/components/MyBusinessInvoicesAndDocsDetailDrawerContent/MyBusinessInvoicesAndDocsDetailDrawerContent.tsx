import { useEffect, useState } from "react";

import { Row } from "antd";
import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetMyBusinessAccountingDetailServiceDocumentQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  documentReasonConfig,
  documentTypeConfig,
  statusConfig,
} from "@pages/Finance/Accountants/_shared/utils";
import { GetMyBusinessAccountingDetailServiceDocumentResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/helper/drawer/BusinessServiceDocumentDrawerContent/@types/@getMyBusinessAccountingDetailServiceDocument";

import { MyBusinessInvoicesAndDocsDetailDrawerContentPropsType } from "./@types/@myBusinessInvoicesAndDocsDetailDrawerContentPropsType";
import "./_myBusinessInvoicesAndDocsDetailDrawerContent.scss";

const MyBusinessInvoicesAndDocsDetailDrawerContent = ({
  closeDrawerHandler,
}: MyBusinessInvoicesAndDocsDetailDrawerContentPropsType) => {
  const [debtDetailData, setDebtDetailData] =
    useState<GetMyBusinessAccountingDetailServiceDocumentResponse>();
  const { params } = useQueryParams();

  //we dont need this info
  // const userInfoItemsPaymentOnAccount: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "نام کسب و کار",
  //     children: debtDetailData?.businessName || "-",
  //   },
  //   {
  //     key: "2",
  //     label: " شعبه / واحد (ذینفع)",
  //     children: debtDetailData?.branchName || "-",
  //   },
  //   {
  //     key: "3",
  //     label: "کد شعبه",
  //     children: emptyString,
  //   },
  // ];
  //? ================================  Api Calls ================================
  const [getMyBusinessDebtDetail, { isFetching: getMyBusinessDebtDetailLoading }] =
    useLazyGetMyBusinessAccountingDetailServiceDocumentQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    if (!params?.id) return;
    getMyBusinessDebtDetail({ id: params?.id })
      .unwrap()
      .then((res) => {
        setDebtDetailData(res);
      });
  }, [params?.id]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      loading={getMyBusinessDebtDetailLoading}
      className="my-business-invoices-and-docs-detail-drawer-content-container"
    >
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={{
              pathname: FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: debtDetailData?.accountingInvoiceId }),
            }}
          >
            <PiReceipt />
            مشاهده فاکتور
          </Link>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="مبلغ (تومان)"
          value={dataPlaceHolder({
            data: debtDetailData?.amount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="شماره سند دانشجویار"
          value={debtDetailData?.uuid.toString()}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: debtDetailData?.createdDateTime,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="نوع سند"
          value={
            debtDetailData?.documentType === documentTypeConfig.debit
              ? "بدهکاری"
              : "بستانکاری"
          }
        />

        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="علت بدهکاری"
          value={
            debtDetailData?.documentReason
              ? (documentReasonConfig[debtDetailData.documentReason]?.title ?? "-")
              : "-"
          }
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="وضعیت تسویه"
          value={params?.status === statusConfig.settled ? "تسویه شده" : "تسویه نشده"}
        />
        <SingleVerticalWithCol
          span={24}
          label="سرویس"
          value={
            serviceOptions.find((s) => s.value === debtDetailData?.samimService)?.title ||
            debtDetailData?.serviceName
          }
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          value={debtDetailData?.description}
          label="شرح سند"
        />
      </Row>
      {/* //we dont need this info */}
      {/* <CustomDivider
        text="پرداخت شده به"
        extraContent={
          <Link className="custom-link" to="#">
            <PiReceipt />
            پروفایل کسب و کار
          </Link>
        }
      /> */}
      {/* //we dont need this info */}
      {/* <Descriptions
        className="custom-descriptions"
        column={1}
        items={userInfoItemsPaymentOnAccount}
        labelStyle={{
          fontWeight: "bold",
          textAlign: "right",
          width: "180px",
        }}
      /> */}
    </Div>
  );
};
export default MyBusinessInvoicesAndDocsDetailDrawerContent;
