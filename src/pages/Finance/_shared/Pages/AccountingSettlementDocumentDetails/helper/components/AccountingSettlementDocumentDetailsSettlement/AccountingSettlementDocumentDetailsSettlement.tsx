import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAdminSettlementByIdQuery } from "@infra/states/redux/Apis/finance/financeApi";
import {
  useLazyGetBranchSettlementByIdQuery,
  useLazyGetBusinessSettlementByIdQuery,
} from "@infra/states/redux/Apis/finance/myAccountingApi";
import {
  PaymentSupplierStatusColorConfig,
  PaymentSupplierStatusToEnum,
} from "@pages/Finance/_shared/utils";
import { GetAdminSettlementByIdResponse } from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";
import { GetBranchSettlementByIdResponse } from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/@types/@getMyBranchAccountingSettlementListTypes";
import { GetBusinessSettlementByIdResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";

const AccountingSettlementDocumentDetailsSettlement = () => {
  const [data, setData] = useState<
    | GetAdminSettlementByIdResponse
    | GetBranchSettlementByIdResponse
    | GetBusinessSettlementByIdResponse
  >();

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getSettlementDetails, { isFetching: isGetSettlementDetailsLoading }] =
    useLazyGetAdminSettlementByIdQuery();

  const [
    getBranchSettlementDetails,
    { isFetching: isGetBranchSettlementDetailsLoading },
  ] = useLazyGetBranchSettlementByIdQuery();

  const [
    getBusinessSettlementDetails,
    { isFetching: isGetBusinessSettlementDetailsLoading },
  ] = useLazyGetBusinessSettlementByIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.uuid) return;

    switch (params?.from) {
      case "myFactors":
        getBranchSettlementDetails(params.uuid)
          .unwrap()
          .then((res) => setData(res));
        break;

      case "myFactorsBusiness":
        getBusinessSettlementDetails(params.uuid)
          .unwrap()
          .then((res) => setData(res));
        break;

      default:
        getSettlementDetails(params.uuid)
          .unwrap()
          .then((res) => setData(res));
        break;
    }
  }, [params?.uuid, params?.from]);

  //* ================================ Util Functions ================================
  const status =
    PaymentSupplierStatusToEnum[
      data?.settlementStatus?.name as keyof typeof PaymentSupplierStatusToEnum
    ];
  const config = PaymentSupplierStatusColorConfig[status];

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={
        isGetSettlementDetailsLoading ||
        isGetBranchSettlementDetailsLoading ||
        isGetBusinessSettlementDetailsLoading
      }
    >
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <div className="flex items-center gap-2">
            وضعیت پرداخت:
            {config ? (
              <CustomTag className="w-fit gap-1" color={config.color}>
                {config.text}
              </CustomTag>
            ) : (
              "-"
            )}
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نوع سند" value="سند تسویه" />
        <SingleVerticalWithCol
          label={
            params?.from === "myFactors" || params?.from === "myFactorsBusiness"
              ? "مطالبات (بستانکاری)"
              : "مجموع مطالبات ذینفع (بستانکاری)"
          }
          value={
            dataPlaceHolder({
              data: data?.creditAmount?.toString(),
              isPrice: true,
              isRial: true,
            }) + " تومان"
          }
        />
        <SingleVerticalWithCol
          label={
            params?.from === "myFactors" || params?.from === "myFactorsBusiness"
              ? "تعهدات (بدهکاری)"
              : "مجموع تعهدات ذینفع (بدهکاری)"
          }
          value={
            dataPlaceHolder({
              data: data?.debitAmount?.toString(),
              isPrice: true,
              isRial: true,
            }) + " تومان"
          }
        />
        <SingleVerticalWithCol
          label="تسویه شده"
          value={
            dataPlaceHolder({
              data: data?.paidAmount?.toString(),
              isPrice: true,
              isRial: true,
            }) + " تومان"
          }
        />
        <SingleVerticalWithCol label="شماره سند تسویه" value={data?.uuid} />
        <SingleVerticalWithCol
          isDate
          customDateFormat="HH:mm, YYYY/MM/DD"
          label="تاریخ و زمان ایجاد سند"
          value={data?.createdAt}
        />
        <SingleVerticalWithCol
          label="تعداد اسناد پیوست سند"
          value={data?.attachedDocumentCount?.toString()}
        />
        <SingleVerticalWithCol label="سرویس" value={data?.samimService?.title} />
        <SingleVerticalWithCol label="ایجاد کننده سند" value={data?.createdByName} />
      </Row>
      <CustomDivider text="اطلاعات ذینفع" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="کسب و کار" value={data?.businessName} />
        <SingleVerticalWithCol label="شعبه / واحد (ذینفع)" value={data?.branchName} />
      </Row>
      <CustomDivider text="شرح سند" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol span={24} value={data?.description} />
      </Row>
    </Div>
  );
};
export default AccountingSettlementDocumentDetailsSettlement;
