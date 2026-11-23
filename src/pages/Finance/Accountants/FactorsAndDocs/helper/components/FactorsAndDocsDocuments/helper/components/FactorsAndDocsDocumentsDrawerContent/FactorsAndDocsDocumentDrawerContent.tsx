import { useEffect } from "react";

import { Row } from "antd";
import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetDocumentsDetailsQuery } from "@infra/states/redux/Apis/finance/financeApi";

import { factorsAndDocsDocumentDrawerContentProps } from "./@types/@documentsDetailsTypes";
import "./_factorsAndDocsDocumentDrawerContent.scss";

const FactorsAndDocsDocumentDrawerContent = ({
  closeDrawerHandler,
  id,
}: factorsAndDocsDocumentDrawerContentProps) => {
  //? ================================  Api Calls ================================
  const [
    getDocumentDetails,
    { data: DocumentDetailsData, isLoading: isGetDocumentDetailsLoading },
  ] = useLazyGetDocumentsDetailsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDocumentDetails({ id });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetDocumentDetailsLoading}
      className="accounting-document-drawer-container"
    >
      <CustomDrawerHeader
        title="مشاهده سند"
        closeDrawerHandler={closeDrawerHandler}
        hasLeftSide={false}
      />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={{
              pathname: FINANCE_ACCOUNTING_PAGE_FACTORS_DETAILS_ROUTE,
              search: makeSearchParams({
                id: DocumentDetailsData?.accountingInvoiceId?.toString(),
              }),
            }}
          >
            <PiReceipt />
            مشاهده فاکتور{" "}
          </Link>
        }
      />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          value={`${dataPlaceHolder({ data: DocumentDetailsData?.amount?.toString(), isPrice: true, isRial: true })} تومان`}
          label="مبلغ"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="شماره سند دانشجویار"
          value={DocumentDetailsData?.accountingInvoiceId.toString()}
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={dataPlaceHolder({
            data: DocumentDetailsData?.createdDateTime,
            isDate: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
          label="تاریخ و زمان ثبت سند"
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          value={DocumentDetailsData?.description}
          label="شرح سند"
          span={24}
        />
      </Row>
      <CustomDivider text="اطلاعات ذینفع" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="کسب و کار"
          value={DocumentDetailsData?.businessName}
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="واحد / شعبه"
          value={DocumentDetailsData?.branchName}
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="سرویس"
          value={DocumentDetailsData?.serviceName}
          xs={12}
          xl={12}
          lg={12}
        />
        <SingleVerticalWithCol
          label="ذینفع"
          value={DocumentDetailsData?.beneficiaryName}
          xs={12}
          xl={12}
          lg={12}
        />
      </Row>
    </Div>
  );
};
export default FactorsAndDocsDocumentDrawerContent;
