import ReportsPaymentFactorSection from "../ReportsPaymentFactorSection/ReportsPaymentFactorSection";
import ReportsPaymentStatusSection from "../ReportsPaymentStatusSection/ReportsPaymentStatusSection";
import AccountInfo from "./section/AccountInfo/AccountInfo";
import "./_creatorsDetailFactorTab.scss";

const CreatorsDetailFactorTab = () => {
  const mockDataFactorPayment = {
    InvoiceIssuanceDate: "2024-07-12T08:00:41.977Z",
    factorNum: "12345678",
    paymentType: "اقساطی",
    possibilityDebt: "بله",
    maxDebt: "3000000",
    maxCountInstallments: "5",
    // account info
    accountNum: "1234567890",
    cardNum: "1234 5678 9012 3456",
    iban: "12345678901234567890123",
  };

  return (
    <div className="report-creators-detail-factor-container">
      {/* ---------------------------------- فاکتور پرداخت ---------------------------------- */}
      <ReportsPaymentFactorSection data={mockDataFactorPayment} />

      {/* ----------------------------------  account info ---------------------------------- */}
      <AccountInfo data={mockDataFactorPayment} />

      {/* ---------------------------------- وضعیت پرداخت  ---------------------------------- */}
      <ReportsPaymentStatusSection data={mockDataFactorPayment?.paymentType} />
    </div>
  );
};
export default CreatorsDetailFactorTab;
