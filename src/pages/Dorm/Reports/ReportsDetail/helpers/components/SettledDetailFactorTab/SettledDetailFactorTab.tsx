import ReportsPaymentFactorSection from "../ReportsPaymentFactorSection/ReportsPaymentFactorSection";
import ReportsPaymentStatusSection from "../ReportsPaymentStatusSection/ReportsPaymentStatusSection";
import "./_settledDetailFactorTab.scss";

const SettledDetailFactorTab = () => {
  const mockDataFactorPayment = {
    InvoiceIssuanceDate: "2024-07-12T08:00:41.977Z",
    factorNum: "12345678",
    paymentType: "اقساطی",
    possibilityDebt: "بله",
    maxDebt: "3000000",
    maxCountInstallments: "5",
    paymentMethod: "کیف پول",
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="report-settled-detail-factor-container">
      <ReportsPaymentFactorSection data={mockDataFactorPayment} />
      <ReportsPaymentStatusSection data={mockDataFactorPayment?.paymentType} />
    </div>
  );
};
export default SettledDetailFactorTab;
