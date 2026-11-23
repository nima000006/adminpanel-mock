import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyBranchAccountingDetailSettlementQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { GetMyBranchAccountingDetailSettlementResponse } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSettlementsDocuments/@types/@getMyBranchAccountingDetailSettlement";
import "./_myBranchInvoicesAndDocsDetailSettlementDocument.scss";
const MyBranchInvoicesAndDocsDetailSettlementDocument = () => {
  const { params } = useQueryParams();
  const [settlementDocData, setSettlementDocData] =
    useState<GetMyBranchAccountingDetailSettlementResponse>();
  //? ================================  Api Calls ================================
  const [
    getMyBranchSettlementDetail,
    { isFetching: getMyBranchSettlementDetailLoading },
  ] = useLazyGetMyBranchAccountingDetailSettlementQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    getMyBranchSettlementDetail({ id: params?.uuid })
      .unwrap()
      .then((res) => {
        setSettlementDocData(res);
      });
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={getMyBranchSettlementDetailLoading}
      className="my-branch-invoices-docs-detail-settlement-document-container"
    >
      <CustomDivider className="custom-divider" text="اطلاعات سند" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نوع سند" value={settlementDocData?.documentType} />
        <SingleVerticalWithCol
          label="مجموع مبالغ اسناد (تومان)"
          value={dataPlaceHolder({
            data: (
              (settlementDocData?.creditAmount ?? 0) +
              (settlementDocData?.paidAmount ?? 0)
            ).toString(),
            isPrice: true,
            isRial: true,
          })}
        />
        <SingleVerticalWithCol
          label="مجموع بدهکاری (تومان)"
          value={dataPlaceHolder({
            data: settlementDocData?.debitAmount.toString(),
            isPrice: true,
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
export default MyBranchInvoicesAndDocsDetailSettlementDocument;
