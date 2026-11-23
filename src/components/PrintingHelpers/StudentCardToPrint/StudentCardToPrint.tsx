import { forwardRef } from "react";

import { QRCode } from "react-qr-code";

import StudentCardBackIcon from "../../../assets/icons/StudentCard/StudentCardBackIcon";
import StudentCardFrontIcon from "../../../assets/icons/StudentCard/StudentCardFrontIcon";
import "./_studentCardToPrint.scss";

const StudentCardToPrint = forwardRef<any, any>((props, ref) => {
  const { data } = props;
  return (
    <div ref={ref} className="student-cart-container">
      <div className="front-side" dir="rtl">
        <StudentCardFrontIcon />
        <div className="front-side-branch">{data?.unitName}</div>
        <div className="data-container">
          <div className="student-bar-code">
            <QRCode
              size={60}
              width={60}
              height={60}
              value={`${
                import.meta.env.VITE_URL_PWA_MAIN
              }base/profile/digital-card?QRSerialNumber=${data?.digitalCardSerialNumber}`}
              bgColor="#0047FF"
              fgColor="#fff"
              className="qr-code"
            />
          </div>
          <div className="name">{data?.firstName + " " + data?.lastName}</div>
          <div className="field-name">{data?.levelName + " " + data?.fieldName}</div>
          <div className="student-number-container">
            <div className="student-number-label">شماره دانشجویی:</div>
            <div className="student-number">{data?.studentNumber}</div>
          </div>
          <div className="national-number-container">
            <div className="national-number-label">
              {data?.nationality === "1" ? "کد فراگیر:" : "کد ملی:"}
            </div>
            <div className="national-number">{data?.nationalCode}</div>
          </div>
        </div>
      </div>
      <div className="back-side">
        <StudentCardBackIcon />
        <div className="back-side-branch">{data?.unitName}</div>
        <div className="list-data">
          <ul>
            <li>هرگونه جعل، تغییر یا استفاده غیر مجاز این کارت پیگرد قانونی دارد.</li>
            <li>در صورت مفقود شدن کارت به دانشگاه اطلاع داده شود.</li>
            <li>
              از یابنده تقاضا می‌شود این کارت را به صندوق پستی {data?.collegeCode}{" "}
              بیندازد.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
StudentCardToPrint.displayName = "StudentCardToPrint";
export default StudentCardToPrint;
