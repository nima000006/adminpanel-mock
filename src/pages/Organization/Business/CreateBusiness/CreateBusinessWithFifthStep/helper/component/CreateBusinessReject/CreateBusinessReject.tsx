import { GoXCircleFill } from "react-icons/go";
import "./_createBusinessReject.scss";

const CreateBusinessReject = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="create-business-reject-container">
      <GoXCircleFill size={80} color="#FF4D4F" />
      <div className="text-wrapper">
        <h2>درخواست شما رد شده است!</h2>
        <p className="sub-text">دلیل رد شدن درخواست شما به شرح زیر است:</p>
      </div>
      <div className="alert-box">
        <p>
          درخواست شما به دلیل عدم ارائه اطلاعات کافی در خصوص کسب کارتان رد شد! در خصوص
          دلایل رد درخواست با بخش پشتیبانی تماس حاصل فرمایید.
        </p>
      </div>
    </div>
  );
};
export default CreateBusinessReject;
