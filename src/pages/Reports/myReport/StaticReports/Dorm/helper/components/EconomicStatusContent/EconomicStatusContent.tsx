import { EconomicStatusContentProps } from "./@types/@economicStatusContent";
import EconomicStatusFinancialStatus from "./helper/components/FinancialStatus/EconomicStatusFinancialStatus";
import EconomicStatusReservationRoomCost from "./helper/components/RoomCost/EconomicStatusReservationRoomCost";

const EconomicStatusContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: EconomicStatusContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-2 gap-6 max-[1300px]:grid-cols-1">
      {/*  Reservation rooms cost */}
      <EconomicStatusReservationRoomCost
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
      />
      {/* Financial status  */}
      <EconomicStatusFinancialStatus
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        isFormValid={isFormValid}
        validateData={validateData}
      />
    </div>
  );
};
export default EconomicStatusContent;
