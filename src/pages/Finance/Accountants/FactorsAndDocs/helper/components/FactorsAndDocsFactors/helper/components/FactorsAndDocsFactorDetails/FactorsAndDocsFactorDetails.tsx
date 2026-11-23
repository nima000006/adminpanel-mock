import { useEffect, useState } from "react";

import { Row } from "antd";
import { PiPrinter, PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { ExcelCodes } from "@infra/config/excel-codes";
import { emptyString } from "@infra/config/global.vars";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FINANCE_ACCOUNTING_PAGE_ROUTE,
  FINANCE_TRANSACTIONS_LIST_PAGE_ROUTE,
  FINANCE_TURNOVER_PAGE_ROUTE,
} from "@infra/router/routes/finance";
import { useLazyGetAllFactorsDetailsQuery } from "@infra/states/redux/Apis/finance/financeApi";
import { useLazyGetInvoiceDetailsInfoQuery } from "@infra/states/redux/Apis/invoice/invoicesApi";
import { InvoiceStatusColorConfig } from "@pages/Finance/_shared/utils";
import { AccountingGetAllFactorsDetailsResponse } from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import ShowDataComponent from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/helper/components/FactorsAndDocsFactorDetails/helper/component/ShowDataComponent/ShowDataComponent";

import FactorsAndDocsFactorDetailsTableModel from "./models/FactorsAndDocsFactorDetailsTableModel/FactorsAndDocsFactorDetailsTableModel";
import {
  GetInvoiceDetailsResponse,
  ProductResponse,
} from "../../../../FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";

import "./_factorsAndDocsFactorDetails.scss";

const FactorsAndDocsFactorDetails = () => {
  const { params } = useQueryParams();

  const backLinkMap: Record<string, { title: string; link: string }> = {
    factor: {
      title: "فاکتور و سند",
      link: FINANCE_ACCOUNTING_PAGE_ROUTE,
    },
    transactions: {
      title: "تراکنش ها",
      link: FINANCE_TRANSACTIONS_LIST_PAGE_ROUTE,
    },
    turnOver: {
      title: "گردش مالی",
      link: FINANCE_TURNOVER_PAGE_ROUTE,
    },
  };
  const currentBack =
    backLinkMap[params?.from as keyof typeof backLinkMap] ?? backLinkMap.factor;
  useTitle({
    breadcrumbItems: [
      { title: <span className="management-breadcrumb-title">مالی</span> },
      { title: <span className="management-breadcrumb-title">حسابداران</span> },
      {
        title: (
          <Link className="management-breadcrumb_title" to={currentBack?.link}>
            {currentBack.title}
          </Link>
        ),
      },
      { title: "فاکتور" },
    ],
  });

  const { params: url } = useQueryParams();

  const [detailData, setDetailData] = useState<AccountingGetAllFactorsDetailsResponse>();
  const [dataSource, setDataSource] = useState<GetInvoiceDetailsResponse>();

  //? ================================  Api Calls ================================
  // detail data
  const [getFactorDetails, { isLoading: isFactorLoading }] =
    useLazyGetAllFactorsDetailsQuery();

  // table data
  const [getProducts, { isFetching: isProductsLoading }] =
    useLazyGetInvoiceDetailsInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.id) {
      getFactorDetails({ id: url?.id })
        .unwrap()
        .then((res: AccountingGetAllFactorsDetailsResponse) => {
          setDetailData(res);

          getProducts({ invoiceId: res?.invoiceUuid })
            .unwrap()
            .then((res: GetInvoiceDetailsResponse) => {
              setDataSource(res);
            });
        });
    }
  }, [url?.id]);

  //* ================================ Util Functions ================================

  const columns = FactorsAndDocsFactorDetailsTableModel();
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={isFactorLoading}
      className="accounting-factor-details flex flex-col gap-10"
    >
      <div className="mb-2 flex flex-col items-center justify-center">
        <h1> جزئیات فاکتور رسمی</h1>
        {detailData?.invoiceStatus && (
          <div className="flex justify-center">
            <CustomTag
              className="w-fit gap-1"
              icon={<PiReceipt />}
              color={InvoiceStatusColorConfig[detailData?.invoiceStatus?.id || 0]?.color}
            >
              {InvoiceStatusColorConfig[detailData?.invoiceStatus?.id || 0]?.text}
            </CustomTag>
          </div>
        )}
      </div>

      {/* Info Boxes */}
      <div>
        <InfoBoxGroup
          items={[
            { title: "شماره فاکتور", value: dataPlaceHolder({ data: detailData?.uuid }) },
            {
              title: "شماره منحصر به فرد مالیاتی",
              value: dataPlaceHolder({ data: detailData?.supplierNationalCode }),
            },
            {
              title: "شماره منحصر به فرد مالیاتی فاکتور مرجع",
              value: dataPlaceHolder({ data: detailData?.supplierNationalCode }),
            },
            {
              title: "تاریخ و زمان صدور / ایجاد فاکتور",
              value: dataPlaceHolder({
                data: detailData?.createdDate,
                isDate: true,
                customDateFormat: "HH:mm، YYYY/M/D",
              }),
            },
          ]}
        />
      </div>

      {/* Supplier Info */}
      <CustomDivider className="custom-divider" text="مشخصات فروشنده / تامین کننده" />
      <Row gutter={[16, 16]} className="supplier-info-container">
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نام"
          data={detailData?.supplierFullName}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نوع شخص"
          data={detailData?.supplierPersonalityType?.title}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره اقتصادی"
          data={detailData?.supplierEconomicCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شناسه ملی/ کد ملی/ کد فراگیر"
          data={detailData?.supplierNationalCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد شعبه"
          data={detailData?.supplierBranchId}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره تماس"
          data={detailData?.supplierTelephone}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد پستی"
          data={detailData?.supplierPostalCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره سند سیستمی"
          data={emptyString}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره سند تسویه"
          data={emptyString}
        />
        <ShowDataComponent span={24} title="آدرس" data={detailData?.supplierAddress} />
      </Row>

      {/* Customer Info */}
      <CustomDivider className="custom-divider" text="مشخصات خریدار" />
      <Row gutter={[16, 16]} className="supplier-info-container">
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نام"
          data={detailData?.customerFullName}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نوع شخص"
          data={detailData?.customerPersonalityType?.title}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره اقتصادی"
          data={detailData?.customerEconomicCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شناسه ملی/ کد ملی/ کد فراگیر"
          data={detailData?.customerNationalCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد شعبه"
          data={detailData?.customerBranchId}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره تماس"
          data={detailData?.customerTelephone}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد پستی"
          data={detailData?.customerPostalCode}
        />
        <ShowDataComponent span={24} title="آدرس" data={detailData?.customerAddress} />
      </Row>

      {/* Products Table */}
      <CustomDivider className="custom-divider" text="مشخصات کالا یا خدمات معامله‌شده" />
      <CustomTable<ProductResponse>
        rowKey="id"
        loading={isProductsLoading}
        dataSource={dataSource?.data.productResponses ?? []}
        columns={columns}
        draggableColumns
        draggableId={
          ExcelCodes.FINANCE_ACCOUNTANTS_DOC_AND_FACTORS_FACTOR_TAB_DETAIL_TABLE
        }
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />

      {/* Payment Info */}
      <div className="accounting-factor-details-info-box">
        <InfoBoxGroup
          items={[
            {
              title: "روش تسویه",
              value: "نقدی",
            },
            {
              title: "روش پرداخت",
              value: dataPlaceHolder({ data: detailData?.paymentType?.title }),
            },
            {
              title: "شماره پیگیری/شماره مرجع",
              value: dataPlaceHolder({ data: detailData?.trackNumber }),
            },
            {
              title: "تاریخ و زمان پرداخت",
              value: dataPlaceHolder({
                data: detailData?.paymentDate,
                isDate: true,
                customDateFormat: "HH:mm، YYYY/M/D",
              }),
            },
          ]}
        />
      </div>

      {/* Print Button */}
      <div className="flex items-center justify-center">
        <CustomButton disabled icon={<PiPrinter />}>
          چاپ فاکتور
        </CustomButton>
      </div>
    </Div>
  );
};

export default FactorsAndDocsFactorDetails;
