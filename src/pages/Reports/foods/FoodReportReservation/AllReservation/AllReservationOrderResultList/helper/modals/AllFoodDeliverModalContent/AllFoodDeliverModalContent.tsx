import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./_allFoodDeliverModalContent.scss";

export const AllFoodDeliverModalContent = () => {
  return (
    <div className="all-reservation-order-result-list-deliver-modal-container">
      <h3 className="food-deliver-modal-title">
        <AiOutlineExclamationCircle className="title-icon" />
        <span>تحویل غذا</span>
      </h3>
      <p>آیا از تحویل غذا اطمینان دارید؟</p>
    </div>
  );
};
