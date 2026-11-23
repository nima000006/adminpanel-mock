import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./_allFoodDeliverModalContent.scss";

export const AllFoodDeliverModalContent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="all-reservation-order-result-list-deliver-modal-container">
      <h3 className="food-deliver-modal-title">
        <AiOutlineExclamationCircle className="title-icon" />
        <span>{title}</span>
      </h3>
      <p>{subTitle}</p>
    </div>
  );
};
