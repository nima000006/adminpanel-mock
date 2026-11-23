import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyBusinessAccountingDetailSettlementQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { GetMyBusinessAccountingDetailSettlementResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverSettlementsDocuments/@types/@getMyBusinessAccountingDetailSettlement";
import "./_myBusinessInvoicesAndDocsDetailSettlementDocument.scss";
const MyBusinessInvoicesAndDocsDetailSettlementDocument = () => {
  const { params } = useQueryParams();
  const [settlementDocData, setSettlementDocData] =
    useState<GetMyBusinessAccountingDetailSettlementResponse>();
  //? ================================  Api Calls ================================
  const [
    getMyBusinessSettlementDetail,
    { isFetching: getMyBusinessSettlementDetailLoading },
  ] = useLazyGetMyBusinessAccountingDetailSettlementQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    getMyBusinessSettlementDetail({ id: params?.uuid })
      .unwrap()
      .then((res) => {
        setSettlementDocData(res);
      });
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={getMyBusinessSettlementDetailLoading}
      className="my-invoices-docs-detail-settlement-document-container"
    >
      <CustomDivider className="custom-divider" text="اطلاعات سند" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نوع سند" value={settlementDocData?.documentType} />
        <SingleVerticalWithCol
          label="مجموع مبالغ اسناد (تومان)"
          value={dataPlaceHolder({
            data: settlementDocData?.creditAmount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          label="مجموع بدهکاری (تومان)"
          value={dataPlaceHolder({
            data: settlementDocData?.debitAmount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          label="پرداخت شده (تومان)"
          value={dataPlaceHolder({
            data: settlementDocData?.paidAmount.toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          label="شماره سند تسویه دانشجویار"
          value={settlementDocData?.settlementDocumentId.toString()}
        />
        <SingleVerticalWithCol
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: settlementDocData?.createdAt,
            isDate: true,
            isTime: true,
            customDateFormat: "HH:mm, YYYY/MM/DD",
          })}
        />
        <SingleVerticalWithCol
          label="تعداد اسناد پیوست سند"
          value={settlementDocData?.attachedDocumentCount.toString()}
        />
        <SingleVerticalWithCol
          label="ایجاد کننده سند"
          value={settlementDocData?.createdByName}
        />
      </Row>
      <CustomDivider className="custom-divider" text="اطلاعات ذینفع" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="کسب و کار"
          value={settlementDocData?.businessName}
        />
        <SingleVerticalWithCol
          label="واحد / شعبه (ذینفع)"
          value={settlementDocData?.branchName}
        />
        <SingleVerticalWithCol label="سرویس" value={settlementDocData?.serviceName} />
      </Row>
      <CustomDivider className="custom-divider" text="شرح سند" />
      <SingleVerticalWithCol value={settlementDocData?.description} />
    </Div>
  );
};
export default MyBusinessInvoicesAndDocsDetailSettlementDocument;
