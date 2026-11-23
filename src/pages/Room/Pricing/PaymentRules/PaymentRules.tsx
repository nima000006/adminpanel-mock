import PaymentRulesTable from "../../../../components/RoomComponents/Pricing/PaymentRuls/PaymentRules";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const PaymentRules = () => {
  useTitle({ text: "قوانین پرداخت" });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div style={{ width: "100%" }}>
      <PaymentRulesTable />
    </div>
  );
};
export default PaymentRules;
