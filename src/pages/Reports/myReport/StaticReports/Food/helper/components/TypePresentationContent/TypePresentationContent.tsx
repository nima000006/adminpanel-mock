import { TypePresentationContentProps } from "./@types/@typePresentationContent";
import BestSellingFood from "./helper/components/BestSellingFood/BestSellingFood";
import OrderBasedDeliverType from "./helper/components/OrderBasedDeliverType/OrderBasedDeliverType";
import OrderBasedMeal from "./helper/components/OrderBasedMeal/OrderBasedMeal";

const TypePresentationContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: TypePresentationContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-3 gap-6 max-[1500px]:grid-cols-2 max-[1100px]:grid-cols-1">
      {/* order based meal */}
      <OrderBasedMeal
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />

      {/* order based deliver type */}
      <OrderBasedDeliverType
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />

      {/* best selling food */}
      <BestSellingFood
        isFormValid={isFormValid}
        createBodyParams={createBodyParams}
        triggerItems={triggerItems}
        validateData={validateData}
      />
    </div>
  );
};
export default TypePresentationContent;
