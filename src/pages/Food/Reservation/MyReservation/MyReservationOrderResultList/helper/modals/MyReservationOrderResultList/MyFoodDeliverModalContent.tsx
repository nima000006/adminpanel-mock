import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./_myFoodDeliverModalContent.scss";

export const MyFoodDeliverModalContent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="my-reservation-order-result-list-deliver-modal-container">
      <h3 className="food-deliver-modal-title">
        <AiOutlineExclamationCircle className="title-icon" />
        <span>{title}</span>
      </h3>
      <p>{subTitle}</p>
    </div>
  );
};
