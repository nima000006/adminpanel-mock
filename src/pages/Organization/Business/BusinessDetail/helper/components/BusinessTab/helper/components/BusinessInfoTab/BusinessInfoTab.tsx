import BusinessInfoGenuineDetail from "./helper/components/BusinessInfoGenuineDetail/BusinessInfoGenuineDetail";
import BusinessInfoLegalDetail from "./helper/components/BusinessInfoLegalDetail/BusinessInfoLegalDetail";
import "./_businessInfoTab.scss";

const BusinessInfoTab = () => {
  const characterType = {
    genuine: 1, // شخصیت حقیقی
    legal: 2, // شخصیت حقوقی
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {characterType?.genuine === 5 ? (
        <BusinessInfoGenuineDetail />
      ) : characterType?.legal === 2 ? (
        <BusinessInfoLegalDetail />
      ) : null}
    </div>
  );
};
export default BusinessInfoTab;
