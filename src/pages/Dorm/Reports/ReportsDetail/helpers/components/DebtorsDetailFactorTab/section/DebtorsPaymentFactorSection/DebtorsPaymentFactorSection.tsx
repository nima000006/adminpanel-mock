import { useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import ReportsFactorPaymentTableModel from "../../../models/ReportsFactorPaymentTableModel/ReportsFactorPaymentTableModel";

import "./_debtorsPaymentFactorSection.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const DebtorsPaymentFactorSection = ({ data }: { data: any }) => {
  const [dataSource] = useState<any[]>([
    {
      id: 1,
      request: "درخواست رزرو اقامتگاه",
      requestType: "رزرو غیر قطعی اتاق",
      roomType: "دو تخته درجه دو",
      scheduleType: "ترمیک",
      tax: "0%",
      payTol: "0%",
      discountPercentage: "10%",
      staticPercentage: "0",
      price: "1400000",
    },
    {
      id: 1,
      request: "درخواست جابجایی",
      requestType: "رزرو غیر قطعی اتاق",
      roomType: "دو تخته درجه دو",
      scheduleType: "ترمیک",
      tax: "0%",
      payTol: "0%",
      discountPercentage: "10%",
      staticPercentage: "0",
      price: "1800000",
    },
  ]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="debtors-payment-factor-section-container">
      <CustomDivider text="فاکتور پرداخت" />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="تاریخ صدور فاکتور"
          value={data?.InvoiceIssuanceDate}
          isDate
        />
        <SingleVerticalWithCol label="شماره فاکتور" value={data?.factorNum} />
        <SingleVerticalWithCol label="نوع پرداخت" value={data?.paymentType} />
        <SingleVerticalWithCol label="امکان بدهی" value={data?.possibilityDebt} />

        {/* if payment type is installments */}
        {data?.data?.paymentType === "اقساطی" ? (
          <>
            <SingleVerticalWithCol
              label="سقف بدهی (ریال)"
              value={data?.maxDebt}
              isPrice
            />
            <SingleVerticalWithCol
              label="حداکثر تعداد اقساط جهت بدهی"
              value={data?.maxCountInstallments}
            />
          </>
        ) : null}
        <SingleVerticalWithCol label="شیوه پرداخت" value={data?.paymentMethod} />
      </Row>

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        columns={ReportsFactorPaymentTableModel}
        pagination={false}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};
export default DebtorsPaymentFactorSection;
