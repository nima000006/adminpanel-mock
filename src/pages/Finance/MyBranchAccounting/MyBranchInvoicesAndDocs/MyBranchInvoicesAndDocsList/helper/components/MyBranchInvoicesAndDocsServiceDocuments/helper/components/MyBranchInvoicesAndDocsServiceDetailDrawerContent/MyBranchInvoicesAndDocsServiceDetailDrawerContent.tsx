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
import { FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetMyBranchAccountingDetailServiceDocumentQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { GetMyBranchAccountingDetailServiceDocumentResponse } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/helper/drawer/BranchServiceDocumentDrawerContent/@types/@getMyBranchAccountingDetailServiceDocumentTypes";

import { MyInvoicesAndDocsServiceDetailDrawerContentPropsTypes } from "./@types/@myBranchInvoicesAndDocsServiceDetailDrawerContentPropsTypes";
import "./_myBranchInvoicesAndDocsServiceDetailDrawerContent.scss";
const MyBranchInvoicesAndDocsServiceDetailDrawerContent = ({
  closeDrawerHandler,
}: MyInvoicesAndDocsServiceDetailDrawerContentPropsTypes) => {
  const [serviceDocData, setServiceDocData] =
    useState<GetMyBranchAccountingDetailServiceDocumentResponse>();
  const { params } = useQueryParams();
  //? ================================  Api Calls ================================
  const [getMyBranchServiceDocument, { isFetching: getMyBranchServiceDocumentLoading }] =
    useLazyGetMyBranchAccountingDetailServiceDocumentQuery();
  //? ================================  Effects  ================================
  useEffect(() => {
    if (params?.id) {
      getMyBranchServiceDocument({ id: params.id })
        .unwrap()
        .then((res) => {
          setServiceDocData(res);
        });
    }
  }, [params?.id]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={getMyBranchServiceDocumentLoading}
      className="my-branch-invoices-and-docs-service-detail-drawer-content-container"
    >
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={{
              pathname: FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
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
          xl={12}
          lg={12}
          md={12}
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
          xl={12}
          lg={12}
          md={12}
          label="شماره سند دانشجویار"
          value={serviceDocData?.accountingInvoiceId.toString()}
        />

        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: serviceDocData?.createdDateTime,
            isDate: true,
            isTime: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={24}
          md={24}
          label="شرح سند"
          value={serviceDocData?.description}
        />
      </Row>
      <CustomDivider text="اطلاعات ذینفع" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="کسب و کار"
          value={serviceDocData?.beneficiaryName}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="واحد / شعبه (ذینفع)"
          value={serviceDocData?.branchName}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="سرویس"
          value={serviceDocData?.serviceName}
        />
      </Row>
    </Div>
  );
};
export default MyBranchInvoicesAndDocsServiceDetailDrawerContent;
