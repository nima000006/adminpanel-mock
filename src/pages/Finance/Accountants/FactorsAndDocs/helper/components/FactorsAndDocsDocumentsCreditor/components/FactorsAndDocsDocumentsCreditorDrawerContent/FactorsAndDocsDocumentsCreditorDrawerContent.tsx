import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiBag, PiReceipt, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetDocumentsDetailsQuery } from "@infra/states/redux/Apis/finance/financeApi";
import {
  documentReasonConfig,
  documentReasonNameConfig,
  serviceOptions,
} from "@pages/Finance/Accountants/_shared/utils";
import { documentTypeConfig } from "@pages/Finance/Accountants/_shared/utils";

import { BusinessShare } from "./@types/@FactorsAndDocsDocumentsCreditorDrawerContent";
import FactorsAndDocsDocumentCreditorDrawerContentTableModel from "./models/FactorsAndDocsDocumentCreditorDrawerContentTableModel/FactorsAndDocsDocumentCreditorDrawerContentTableModel";
import { getDocumentsDetailsResponse } from "../../../FactorsAndDocsDocuments/helper/components/FactorsAndDocsDocumentsDrawerContent/@types/@documentsDetailsTypes";
import "./_factorsAndDocsDocumentCreditorDrawerContent.scss";

const dataSource: BusinessShare[] = [
  {
    id: 1,
    business: "صمیم رایانه",
    branch: "دانشجویار",
    shareOfReturn: 70000,
    sharePercentage: "66.6%",
    beneficial: "دانشجویار",
  },
  {
    id: 2,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 700000,
    sharePercentage: "6.6%",
    beneficial: "دانشگاه آزاد اسلامی",
  },
  {
    id: 3,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 788800000,
    sharePercentage: "5.6%",
    beneficial: "دانشگاه آزاد اسلامی",
  },
  {
    id: 4,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 800000,
    sharePercentage: "7.6%",
    beneficial: "دانشگاه آزاد اسلامی",
  },
];

const FactorsAndDocsDocumentsCreditorDrawerContent = ({
  closeDrawerHandler,
  id,
}: {
  closeDrawerHandler: () => void;
  id: string;
}) => {
  const [detailData, setDetailData] = useState<getDocumentsDetailsResponse>();
  const tableColumns = FactorsAndDocsDocumentCreditorDrawerContentTableModel();
  const itemsRefund: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام",
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
      key: "4",
      label: "شماره دانشجویی",
      children: emptyString,
    },
    {
      key: "5",
      label: "شماره همراه",
      children: emptyString,
    },
    {
      key: "6",
      label: "مقطع تحصیلی",
      children: emptyString,
    },
    {
      key: "7",
      label: "رشته تحصیلی",
      children: emptyString,
    },
    {
      key: "8",
      label: "کسب و کار",
      children: detailData?.businessName || emptyString,
    },
    {
      key: "9",
      label: "واحد / شعبه",
      children: detailData?.branchName || emptyString,
    },
    {
      key: "10",
      label: "نام دانشکده",
      children: emptyString,
    },
  ];
  const itemsOthers: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام کسب و کار ",
      children: detailData?.businessName || emptyString,
    },
    {
      key: "2",
      label: "شعبه / واحد",
      children: detailData?.branchName || emptyString,
    },
    {
      key: "3",
      label: "کد شعبه",
      children: emptyString,
    },
  ];

  //* ================================ api calls ================================

  const [getDetailData, { isFetching: isGetDetailDataLoading }] =
    useLazyGetDocumentsDetailsQuery();

  //* ================================ Effects ================================

  useEffect(() => {
    if (id) getDetailData({ id }).unwrap().then(getDetailDataSuccess);
  }, [getDetailData, id]);

  //* ================================ util functions ================================

  const getDetailDataSuccess = (res: getDocumentsDetailsResponse) => setDetailData(res);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetDetailDataLoading}
      className="accounting-document-creditor-container"
    >
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={{
              pathname: FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
              search: makeSearchParams({ id: detailData?.accountingInvoiceId }),
            }}
          >
            <PiReceipt />
            مشاهده فاکتور{" "}
          </Link>
        }
      />{" "}
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: detailData?.amount.toString(),
            isPrice: true,
            isRial: true,
          })}
          label="مبلغ"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="شماره سند دانشجویار"
          value={detailData?.uuid}
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: detailData?.createdDateTime,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
          label="تاریخ و زمان ثبت سند"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={
            detailData?.documentType?.name === documentTypeConfig.debit
              ? "بدهکاری"
              : "بستانکاری"
          }
          label="نوع سند"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="علت بستانکاری"
          value={
            detailData?.documentReason
              ? (documentReasonConfig[detailData?.documentReason?.name]?.title ?? "-")
              : "-"
          }
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          //value={detailData?.isPaid ? "تسویه شده" : "تسویه نشده"}
          label="وضعیت تسویه"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={
            serviceOptions.find((s) => s.value === detailData?.samimService?.name)
              ?.title || detailData?.serviceName
          }
          label="سرویس"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={detailData?.description}
          label="شرح سند"
          span={24}
        />
      </Row>
      {detailData?.documentReason.name === documentReasonNameConfig.refund ? (
        <>
          <CustomDivider text="سهم ذینفعان" />
          <CustomTable<BusinessShare>
            rowKey="id"
            dataSource={dataSource}
            className="accounting-document-creditor-drawer-table-container"
            columns={tableColumns}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource.length || 0)}
          />
          <CustomDivider
            text="کاربر دریافت کننده وجه عودت شده"
            extraContent={
              <Link className="custom-link" to="#">
                <PiUser />
                مشاهده پروفایل{" "}
              </Link>
            }
          />
          <Descriptions
            className="custom-description"
            items={itemsRefund}
            column={1}
            labelStyle={{ width: 165 }}
          />
        </>
      ) : (
        <>
          <CustomDivider
            text="پرداخت شده به"
            extraContent={
              <Link className="custom-link" to="#">
                <PiBag />
                پروفایل کسب و کار{" "}
              </Link>
            }
          />
          <Descriptions
            className="custom-description"
            items={itemsOthers}
            column={1}
            labelStyle={{ width: 165 }}
          />
        </>
      )}
    </Div>
  );
};
export default FactorsAndDocsDocumentsCreditorDrawerContent;
