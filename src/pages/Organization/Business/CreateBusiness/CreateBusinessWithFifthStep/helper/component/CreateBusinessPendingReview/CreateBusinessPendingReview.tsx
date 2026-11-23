import { PiMegaphoneFill } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";
import "./_createBusinessPendingReview.scss";

const CreateBusinessPendingReview = () => {
  const navigate = useNavigate();

  const returnToBusinessListHandler = () => {
    navigate(MODIFY_BUSINESS_LIST_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="create-business-pending-review-container">
      <PiMegaphoneFill size={80} color="#1890FF" />
      <div className="text-wrapper">
        <h2>درخواست شما در صف بررسی قرار دارد.</h2>
        <p className="sub-text">{`درخواست ایجاد کسب و کار شما با شماره درخواست ${1} در دست بررسی قرار دارد.`}</p>
      </div>
      <div>
        <CustomButton type="primary" onClick={returnToBusinessListHandler}>
          بازگشت به لیست کسب و کار
        </CustomButton>
      </div>
    </div>
  );
};
export default CreateBusinessPendingReview;
