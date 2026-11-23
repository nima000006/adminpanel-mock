import { useEffect, useState } from "react";

import { Row } from "antd";
import { PiPrinter, PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE,
  FINANCE_MY_TURN_OVER_PAGE_ROUTE,
} from "@infra/router/routes/finance";
import { useLazyGeyMyBranchAccountingFactorsDetailQuery } from "@infra/states/redux/Apis/finance/myAccountingApi";
import { useLazyGetInvoiceDetailsInfoQuery } from "@infra/states/redux/Apis/invoice/invoicesApi";
import { InvoiceStatusColorConfig } from "@pages/Finance/_shared/utils";
import InfoBoxGroup from "@pages/Finance/Accountants/_shared/InfoBoxGroup/InfoBoxGroup";
import {
  GetInvoiceDetailsResponse,
  ProductResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";
import ShowDataComponent from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/helper/components/FactorsAndDocsFactorDetails/helper/component/ShowDataComponent/ShowDataComponent";
import MyBranchInvoicesAndDocsFactorsDetailTableModel from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsFactorsDetail/helper/models/MyBranchInvoicesAndDocsFactorsDetailTableModel";

import { GeyMyBranchAccountingFactorsDetailResponse } from "./@types/@geyMyBranchAccountingFactorsDetailTypes";

const MyBranchInvoicesAndDocsFactorsDetail = () => {
  const { params } = useQueryParams();

  const backLinkMap: Record<string, { title: string; link: string }> = {
    myFactors: {
      title: "فاکتور و سند",
      link: FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE,
    },
    myTurnOver: {
      title: "گردش مالی من",
      link: FINANCE_MY_TURN_OVER_PAGE_ROUTE,
    },
  };

  const currentBack =
    backLinkMap[params?.from as keyof typeof backLinkMap] ?? backLinkMap.myFactors;
  useTitle({
    breadcrumbItems: [
      { title: "مالی" },
      { title: "حسابداری واحد من" },
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

  const [factorsDetailData, setFactorsDetailData] =
    useState<GeyMyBranchAccountingFactorsDetailResponse>();
  const [dataSource, setDataSource] = useState<GetInvoiceDetailsResponse>();
  //? ================================  Api ================================
  // detail data
  const [getMyFactorDetail, { isFetching: getMyFactorDetailLoading }] =
    useLazyGeyMyBranchAccountingFactorsDetailQuery();

  // table data
  const [getProducts, { isFetching: isProductsLoading }] =
    useLazyGetInvoiceDetailsInfoQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    if (params?.id) {
      getMyFactorDetail({ id: params?.id })
        .unwrap()
        .then((res) => {
          setFactorsDetailData(res);

          getProducts({ invoiceId: res?.invoiceUuid })
            .unwrap()
            .then((res: GetInvoiceDetailsResponse) => {
              setDataSource(res);
            });
        });
    }
  }, [params?.id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div
      loading={getMyFactorDetailLoading}
      className="flex flex-col gap-10 text-base font-normal"
    >
      <div className="mb-2 flex flex-col items-center justify-center">
        <h1 className="mb-5! text-2xl"> جزئیات فاکتور رسمی</h1>
        {factorsDetailData?.invoiceStatus && (
          <div className="flex justify-center">
            <CustomTag
              className="w-fit gap-1"
              icon={<PiReceipt />}
              color={
                InvoiceStatusColorConfig[factorsDetailData?.invoiceStatus?.id || 0]?.color
              }
            >
              {InvoiceStatusColorConfig[factorsDetailData?.invoiceStatus?.id || 0]?.text}
            </CustomTag>
          </div>
        )}
      </div>

      {/* Info Boxes */}
      <div>
        <InfoBoxGroup
          items={[
            {
              title: "شماره فاکتور",
              value: dataPlaceHolder({ data: factorsDetailData?.uuid }),
            },
            {
              title: "شماره منحصر به فرد مالیاتی",
              value: dataPlaceHolder({ data: factorsDetailData?.supplierNationalCode }),
            },
            {
              title: "شماره منحصر به فرد مالیاتی فاکتور مرجع",
              value: dataPlaceHolder({ data: factorsDetailData?.supplierNationalCode }),
            },
            {
              title: "تاریخ و زمان صدور / ایجاد فاکتور",
              value: dataPlaceHolder({
                data: factorsDetailData?.createdDate,
                isDate: true,
                customDateFormat: "HH:mm، YYYY/M/D",
              }),
            },
          ]}
        />
      </div>

      {/* Supplier Info */}
      <CustomDivider className="mt-10" text="مشخصات فروشنده / تامین کننده" />
      <Row gutter={[16, 16]} className="supplier-info-container">
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نام"
          data={factorsDetailData?.supplierFullName}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نوع شخص"
          data={factorsDetailData?.supplierPersonalityType?.title}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره اقتصادی"
          data={factorsDetailData?.supplierEconomicCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شناسه ملی/ کد ملی/ کد فراگیر"
          data={factorsDetailData?.supplierNationalCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد شعبه"
          data={factorsDetailData?.supplierBranchId}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره تماس"
          data={factorsDetailData?.supplierTelephone}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد پستی"
          data={factorsDetailData?.supplierPostalCode}
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
        <ShowDataComponent
          span={24}
          title="آدرس"
          data={factorsDetailData?.supplierAddress}
        />
      </Row>

      {/* Customer Info */}
      <CustomDivider className="mt-10" text="مشخصات خریدار" />
      <Row gutter={[16, 16]}>
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نام"
          data={factorsDetailData?.customerFullName}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="نوع شخص"
          data={factorsDetailData?.customerPersonalityType?.title}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره اقتصادی"
          data={factorsDetailData?.customerEconomicCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شناسه ملی/ کد ملی/ کد فراگیر"
          data={factorsDetailData?.customerNationalCode}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد شعبه"
          data={factorsDetailData?.customerBranchId}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="شماره تماس"
          data={factorsDetailData?.customerTelephone}
        />
        <ShowDataComponent
          lg={8}
          md={12}
          xs={24}
          title="کد پستی"
          data={factorsDetailData?.customerPostalCode}
        />
        <ShowDataComponent
          span={24}
          title="آدرس"
          data={factorsDetailData?.customerAddress}
        />
      </Row>

      {/* Products Table */}
      <CustomDivider className="mt-10" text="مشخصات کالا یا خدمات معامله‌شده" />
      <CustomTable<ProductResponse>
        rowKey="id"
        loading={isProductsLoading}
        dataSource={dataSource?.data.productResponses ?? []}
        columns={MyBranchInvoicesAndDocsFactorsDetailTableModel()}
        pagination={paginationConfig}
        key={`table-${params?.pageSize || "8"}`}
      />

      {/* Payment Info */}
      <div className="mt-10">
        <InfoBoxGroup
          items={[
            {
              title: "روش تسویه",
              value: "نقدی",
            },
            {
              title: "روش پرداخت",
              value: dataPlaceHolder({ data: factorsDetailData?.paymentType?.title }),
            },
            {
              title: "شماره پیگیری/شماره مرجع",
              value: dataPlaceHolder({ data: factorsDetailData?.trackNumber }),
            },
            {
              title: "تاریخ و زمان پرداخت",
              value: dataPlaceHolder({
                data: factorsDetailData?.paymentDate,
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
export default MyBranchInvoicesAndDocsFactorsDetail;
