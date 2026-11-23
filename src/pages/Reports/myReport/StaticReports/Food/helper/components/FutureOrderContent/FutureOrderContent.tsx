import { FutureOrderContentProps } from "./@types/@futureOrderContent";
import FutureFourteenDaysOrder from "./helper/components/FutureFourteenDaysOrder/FutureFourteenDaysOrder";
import FutureFourteenDaysSchedule from "./helper/components/FutureFourteenDaysSchedule/FutureFourteenDaysSchedule";

const FutureOrderContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: FutureOrderContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-2 gap-6 max-[1350px]:grid-cols-1">
      {/* future 14 days order */}
      <FutureFourteenDaysOrder
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
      {/* future 14 days food schedule */}
      <FutureFourteenDaysSchedule
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
    </div>
  );
};
export default FutureOrderContent;
