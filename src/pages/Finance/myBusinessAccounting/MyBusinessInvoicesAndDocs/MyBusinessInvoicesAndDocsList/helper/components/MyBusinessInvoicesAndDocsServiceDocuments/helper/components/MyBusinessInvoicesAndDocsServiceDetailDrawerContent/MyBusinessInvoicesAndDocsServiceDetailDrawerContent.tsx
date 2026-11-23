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
import { GetMyBusinessAccountingDetailServiceDocumentResponse } from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/helper/drawer/BusinessServiceDocumentDrawerContent/@types/@getMyBusinessAccountingDetailServiceDocument";

import { MyBusinessInvoicesAndDocsServiceDetailDrawerContentPropsTypes } from "./@types/@myBusinessInvoicesAndDocsServiceDetailDrawerContentPropsTypes";
import "./_myBusinessInvoicesAndDocsServiceDetailDrawerContent.scss";
const MyBusinessInvoicesAndDocsServiceDetailDrawerContent = ({
  closeDrawerHandler,
}: MyBusinessInvoicesAndDocsServiceDetailDrawerContentPropsTypes) => {
  const [serviceDocData, setServiceDocData] =
    useState<GetMyBusinessAccountingDetailServiceDocumentResponse>();
  const { params } = useQueryParams();
  //? ================================  Api Calls ================================
  const [
    getMyBusinessServiceDocument,
    { isFetching: getMyBusinessServiceDocumentLoading },
  ] = useLazyGetMyBusinessAccountingDetailServiceDocumentQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    if (params?.id) {
      getMyBusinessServiceDocument({ id: params.id })
        .unwrap()
        .then((res) => {
          setServiceDocData(res);
        });
    }
  }, [params?.id]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={getMyBusinessServiceDocumentLoading}
      className="my-business-invoices-and-docs-service-detail-drawer-content-container"
    >
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
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
          label="مبلغ"
          value={
            dataPlaceHolder({
              data: serviceDocData?.amount.toString(),
              isPrice: true,
              isRial: true,
            }) + " تومان"
          }
        />

        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="شماره سند دانشجویار"
          value={serviceDocData?.accountingInvoiceId.toString()}
        />

        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: serviceDocData?.createdDateTime,
            isDate: true,
            isTime: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        />
        <SingleVerticalWithCol
          span={24}
          label="شرح سند"
          value={serviceDocData?.description}
        />
      </Row>
      <CustomDivider text="اطلاعات ذینفع" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="کسب و کار"
          value={serviceDocData?.beneficiaryName}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="واحد / شعبه (ذینفع)"
          value={serviceDocData?.branchName}
        />
        <SingleVerticalWithCol
          lg={12}
          md={12}
          xl={12}
          label="سرویس"
          value={serviceDocData?.serviceName}
        />
      </Row>
    </Div>
  );
};
export default MyBusinessInvoicesAndDocsServiceDetailDrawerContent;
