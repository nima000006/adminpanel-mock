import { PiPlusLight } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CREATE_BUSINESS_PAGE_ROUTE } from "@infra/router/routes/organization";

import img from "../../../../../../../assets/images/business/img.svg";
import "./_emptyList.scss";

const EmptyList = () => {
  const navigate = useNavigate();

  const createBusinessHandler = () => {
    navigate(CREATE_BUSINESS_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="empty-list-container">
      <img src={img} alt="empty-place-holder" width="97" height="59" />

      <p className="empty-text">هنوز هیچ کسب و کاری ایجاد نکرده‌اید</p>
      <div>
        <CustomButton
          type="primary"
          onClick={createBusinessHandler}
          icon={<PiPlusLight size={16} />}
          iconPlacement="end"
        >
          ایجاد کسب و کار
        </CustomButton>
      </div>
    </div>
  );
};
export default EmptyList;
