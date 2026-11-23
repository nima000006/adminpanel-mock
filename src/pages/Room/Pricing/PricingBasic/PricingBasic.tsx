import PricingBasicTable from "../../../../components/RoomComponents/Pricing/PricingBasic/PricingBasic";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const PaymentRules = () => {
  useTitle({ text: "قیمت گذاری" });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div style={{ width: "100%" }}>
      <PricingBasicTable />
    </div>
  );
};
export default PaymentRules;
