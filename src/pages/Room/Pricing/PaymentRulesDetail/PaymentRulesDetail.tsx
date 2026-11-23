import PaymentRulesDetailContent from "../../../../components/RoomComponents/Pricing/PaymentRulesDetail/PaymentRulesDetail";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const PaymentRulesDetail = () => {
  useTitle({ text: "قوانین پرداخت" });
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div style={{ width: "100%" }}>
      <PaymentRulesDetailContent />
    </div>
  );
};
export default PaymentRulesDetail;
