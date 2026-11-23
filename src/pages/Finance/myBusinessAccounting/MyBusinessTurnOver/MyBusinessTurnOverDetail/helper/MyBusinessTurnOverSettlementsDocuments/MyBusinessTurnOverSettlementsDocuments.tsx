import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyBusinessAccountingDetailSettlementQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";

import { GetMyBusinessAccountingDetailSettlementResponse } from "./@types/@getMyBusinessAccountingDetailSettlement";
import "./_myBusinessTurnOverSettlementsDocuments.scss";
const MyBusinessTurnOverSettlementsDocuments = () => {
  const { params } = useQueryParams();
  const [settlementDocData, setSettlementDocData] =
    useState<GetMyBusinessAccountingDetailSettlementResponse>();
  //? ================================  Api Calls ================================
  const [getMyBranchSettlement, { isFetching: settlementLoading }] =
    useLazyGetMyBusinessAccountingDetailSettlementQuery();

  //? ================================  Effects  ================================
  useEffect(() => {
    getMyBranchSettlement({ id: params?.uuid })
      .unwrap()
      .then((res) => {
        setSettlementDocData(res);
      });
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={settlementLoading}
      className="my-business-turn-over-settlement-documents-container"
    >
      <div>
        <CustomDivider text="اطلاعات سند" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نوع سند"
            value={settlementDocData?.documentType}
          />
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
            label="مجموع بستانکاری (تومان)"
            value={dataPlaceHolder({
              data: settlementDocData?.creditAmount.toString(),
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
      </div>

      <div>
        <CustomDivider text="اطلاعات ذینفع" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="کسب و کار"
            value={settlementDocData?.businessName}
          />
          <SingleVerticalWithCol
            label="واحد / شعبه (ذینفع)"
            value={settlementDocData?.branchName}
          />
          <SingleVerticalWithCol label="سرویس" value={settlementDocData?.samimService} />
        </Row>
      </div>

      <div>
        <CustomDivider text="شرح سند" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label=""
            value={settlementDocData?.description}
          />
        </Row>
      </div>
    </Div>
  );
};
export default MyBusinessTurnOverSettlementsDocuments;
