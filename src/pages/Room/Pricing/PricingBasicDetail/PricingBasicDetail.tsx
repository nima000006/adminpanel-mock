import PricingBasicDetailContent from "../../../../components/RoomComponents/Pricing/PricingBasicDetail/PricingBasicDetail";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const PricingBasicDetail = () => {
  useTitle({ text: "قیمت گذاری" });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div style={{ width: "100%" }}>
      <PricingBasicDetailContent />
    </div>
  );
};
export default PricingBasicDetail;
