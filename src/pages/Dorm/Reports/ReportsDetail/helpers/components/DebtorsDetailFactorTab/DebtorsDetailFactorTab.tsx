import ReportsPaymentStatusSection from "../ReportsPaymentStatusSection/ReportsPaymentStatusSection";
import DebtorsPaymentFactorSection from "./section/DebtorsPaymentFactorSection/DebtorsPaymentFactorSection";
import "./_debtorsDetailFactorTab.scss";

const DebtorsDetailFactorTab = () => {
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
    <div className="report-debtors-detail-factor-container">
      <DebtorsPaymentFactorSection data={mockDataFactorPayment} />
      <ReportsPaymentStatusSection data={mockDataFactorPayment?.paymentType} />
    </div>
  );
};
export default DebtorsDetailFactorTab;
