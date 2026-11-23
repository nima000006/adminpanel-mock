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
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import { GetMyBranchAccountingDetailServiceDocumentResponse } from "./@types/@getMyBranchAccountingDetailServiceDocumentTypes";
import "./_branchServiceDocumentDrawerContent.scss";
const BranchServiceDocumentDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const [serviceDocData, setServiceDocData] =
    useState<GetMyBranchAccountingDetailServiceDocumentResponse>();
  const { params } = useQueryParams();
  //? ================================  Api Calls ================================
  const [getMyBranchServiceDocument, { isFetching: serviceLoading }] =
    useLazyGetMyBranchAccountingDetailServiceDocumentQuery();

  //? ================================  Effects  ================================
  useEffect(() => {
    if (params?.id) {
      getMyBranchServiceDocument({ id: params?.id })
        .unwrap()
        .then((res) => {
          setServiceDocData(res);
        });
    }
  }, [params?.id]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={serviceLoading} className="my-branch-turn-over-service-list-drawer">
      <CustomDrawerHeader
        title="مشاهده سند"
        leftSideContent={<div className="drawer-action-btn"></div>}
        closeDrawerHandler={closeDrawerHandler}
      />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={{
              pathname: FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: serviceDocData?.accountingInvoiceId }),
            }}
          >
            <PiReceipt />
            مشاهده فاکتور
          </Link>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          lg={12}
          xl={12}
          value={
            dataPlaceHolder({
              data: serviceDocData?.amount.toString(),
              isRial: true,
              isPrice: true,
            }) + " تومان"
          }
          label="مبلغ"
        />
        <SingleVerticalWithCol
          md={12}
          lg={12}
          xl={12}
          value={serviceDocData?.accountingInvoiceId.toString()}
          label="شماره سند دانشجویار"
        />
        <SingleVerticalWithCol
          md={12}
          lg={12}
          xl={12}
          value={dataPlaceHolder({
            data: serviceDocData?.createdDateTime,
            isDate: true,
            isTime: true,
            customDateFormat: "HH:mm، YYYY-MM-DD",
          })}
          label="تاریخ و زمان ثبت سند"
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
          md={12}
          lg={12}
          xl={12}
          value={serviceDocData?.businessName}
          label="کسب و کار"
        />
        <SingleVerticalWithCol
          md={12}
          lg={12}
          xl={12}
          value={serviceDocData?.branchName}
          label="واحد / شعبه"
        />
        <SingleVerticalWithCol
          md={12}
          lg={12}
          xl={12}
          value={
            serviceOptions.find((s) => s.value === serviceDocData?.samimService)?.title ||
            serviceDocData?.serviceName
          }
          label="سرویس"
        />
      </Row>
    </Div>
  );
};

export default BranchServiceDocumentDrawerContent;
