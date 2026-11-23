import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./_myFoodDeliverModalContent.scss";

export const MyFoodDeliverModalContent = () => {
  return (
    <div className="my-reservation-order-result-list-deliver-modal-container">
      <h3 className="food-deliver-modal-title">
        <AiOutlineExclamationCircle className="title-icon" />
        <span>تحویل غذا</span>
      </h3>
      <p>آیا از تحویل غذا اطمینان دارید؟</p>
    </div>
  );
};
