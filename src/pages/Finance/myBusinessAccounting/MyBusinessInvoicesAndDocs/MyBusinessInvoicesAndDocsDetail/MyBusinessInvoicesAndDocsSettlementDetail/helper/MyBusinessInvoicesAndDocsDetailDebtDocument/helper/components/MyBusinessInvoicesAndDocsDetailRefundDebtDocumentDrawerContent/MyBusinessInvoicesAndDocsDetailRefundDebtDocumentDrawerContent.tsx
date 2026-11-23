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
import { FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGeyMyBusinessAccountingRefundDetailQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { statusConfig } from "@pages/Finance/Accountants/_shared/utils";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { GeyMyBusinessAccountingRefundDetailResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsDebtDocuments/helper/components/MyBusinessInvoicesAndDocsDetailRefundDrawerContent/@types/@geyMyBusinessAccountingRefundDetail";

import { MyBusinessInvoicesAndDocsDetailRefundDebtDocumentDrawerContentProps } from "./@types/@myBusinessInvoicesAndDocsDetailRefundDebtDocumentDrawerContentProps";

const MyBusinessInvoicesAndDocsDetailRefundDebtDocumentDrawerContent = ({
  closeDrawerHandler,
}: MyBusinessInvoicesAndDocsDetailRefundDebtDocumentDrawerContentProps) => {
  const [refundDetailData, setRefundDetailData] =
    useState<GeyMyBusinessAccountingRefundDetailResponse>();
  const { params } = useQueryParams();

  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام ",
      children: refundDetailData?.firstname || "-",
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: refundDetailData?.lastname || "-",
    },
    {
      key: "3",
      label: "کد ملی / کد فراگیر",
      children: emptyString,
    },
    {
      key: "4",
      label: "شماره دانشجویی",
      children: refundDetailData?.personalCode || "-",
    },
    {
      key: "5",
      label: "شماره همراه",
      children: refundDetailData?.mobileNumber || "-",
    },
    {
      key: "6",
      label: "مقطع تحصیلی",
      children: refundDetailData?.degreeName || "-",
    },
    {
      key: "7",
      label: "رشته تحصیلی",
      children: refundDetailData?.fieldName || "-",
    },
    {
      key: "8",
      label: "کسب و کار",
      children: emptyString,
    },
    {
      key: "9",
      label: "واحد / شعبه",
      children: refundDetailData?.branchName || "-",
    },
    {
      key: "10",
      label: "نام دانشکده",
      children: refundDetailData?.vendorName || "-",
    },
  ];
  //? ================================  Api Calls ================================
  const [getMyBusinessRefundDetail, { isFetching: getMyBusinessRefundDetailLoading }] =
    useLazyGeyMyBusinessAccountingRefundDetailQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    if (params?.id) {
      getMyBusinessRefundDetail({ uuid: params?.debtUuid })
        .unwrap()
        .then((res) => {
          setRefundDetailData(res);
        });
    }
  }, [params?.debtUuid]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={getMyBusinessRefundDetailLoading}>
      <CustomDrawerHeader title="اطلاعات سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="text-primary-6! flex items-center justify-center gap-1"
            to={{
              pathname: FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: params?.id }),
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
            data: refundDetailData?.refundAmount?.amount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="شماره سند دانشجویار"
          value={refundDetailData?.invoiceNumber.toString()}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: refundDetailData?.createDateInvoice,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="نوع سند"
          value="بدهکاری" // in this drawer this field must be "بدهکاری"
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="علت بدهکاری"
          value="عودت وجه" //in this drawer this field must be "عودت وجه"
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="وضعیت تسویه"
          value={
            params?.refundStatus === statusConfig.settled ? "تسویه شده" : "تسویه نشده"
          }
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="سرویس"
          value={
            serviceOptions.find((s) => s.value === refundDetailData?.service)?.title ||
            refundDetailData?.service
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
        items={userInfoItems}
        labelStyle={{
          fontWeight: "bold",
          textAlign: "right",
          width: "180px",
        }}
      />
    </Div>
  );
};
export default MyBusinessInvoicesAndDocsDetailRefundDebtDocumentDrawerContent;
