import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiReceipt, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetMyBranchAccountingDetailServiceDocumentQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  documentReasonConfig,
  documentTypeConfig,
} from "@pages/Finance/Accountants/_shared/utils";
import { GetMyBranchAccountingDetailServiceDocumentResponse } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/helper/drawer/BranchServiceDocumentDrawerContent/@types/@getMyBranchAccountingDetailServiceDocumentTypes";

const BranchRefundDocumentDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const [refundDetailData, setRefundDetailData] =
    useState<GetMyBranchAccountingDetailServiceDocumentResponse>();
  const { params } = useQueryParams();
  const itemsTypeOne: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام ",
      children: emptyString,
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: emptyString,
    },
    {
      key: "3",
      label: "کد ملی / کد فراگیر",
      children: emptyString,
    },
    {
      key: "3",
      label: "شماره دانشجویی",
      children: emptyString,
    },
    {
      key: "4",
      label: "شماره همراه",
      children: emptyString,
    },
    {
      key: "5",
      label: "مقطع تحصیلی",
      children: emptyString,
    },
    {
      key: "6",
      label: "رشته تحصیلی",
      children: emptyString,
    },
    {
      key: "7",
      label: "کسب و کار",
      children: refundDetailData?.businessName || "-",
    },
    {
      key: "7",
      label: "واحد / شعبه",
      children: refundDetailData?.branchName || "-",
    },
    {
      key: "8",
      label: "نام دانشکده",
      children: emptyString,
    },
  ];
  //? ================================  Api Calls ================================
  const [getMyBranchRefundDetail, { isFetching: getMyBranchRefundDetailLoading }] =
    useLazyGetMyBranchAccountingDetailServiceDocumentQuery();

  //? ================================  Effects  ================================
  useEffect(() => {
    if (params?.id) {
      getMyBranchRefundDetail({ id: params?.id })
        .unwrap()
        .then((res) => {
          setRefundDetailData(res);
        });
    }
  }, [params?.uuid]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={getMyBranchRefundDetailLoading}>
      <CustomDrawerHeader title="اطلاعات سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="text-primary-6! flex items-center justify-center gap-1"
            to={{
              pathname: FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: refundDetailData?.accountingInvoiceId }),
            }}
          >
            <PiReceipt />
            مشاهده فاکتور
          </Link>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="مبلغ (تومان)"
          value={dataPlaceHolder({
            data: refundDetailData?.amount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره سند دانشجویار"
          value={refundDetailData?.uuid}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: refundDetailData?.createdDateTime,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نوع سند"
          value={
            refundDetailData?.documentType === documentTypeConfig.debit
              ? "بدهکاری"
              : "بستانکاری"
          }
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="علت بدهکاری"
          value={
            refundDetailData?.documentReason
              ? (documentReasonConfig[refundDetailData.documentReason]?.title ?? "-")
              : "-"
          }
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="وضعیت تسویه"
          value={refundDetailData?.isPaid ? "تسویه شده" : "تسویه نشده"}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="سرویس"
          value={
            serviceOptions.find((s) => s.value === refundDetailData?.samimService)
              ?.title || refundDetailData?.serviceName
          }
        />
        <SingleVerticalWithCol
          span={24}
          label="شرح سند"
          value={refundDetailData?.description}
        />
      </Row>
      <CustomDivider
        text="کاربر دریافت کننده وجه عودت شده"
        extraContent={
          <Link className="text-primary-6! flex items-center justify-center gap-1" to="#">
            <PiUser />
            پروفایل کاربر
          </Link>
        }
      />
      <Descriptions
        className="body-regular"
        column={1}
        items={itemsTypeOne}
        labelStyle={{
          fontWeight: "bold",
          textAlign: "right",
          width: "180px",
        }}
      />
    </Div>
  );
};
export default BranchRefundDocumentDrawerContent;
