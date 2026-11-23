import { forwardRef } from "react";

import { QRCode } from "react-qr-code";

import StudentCardBackIcon from "../../../assets/icons/StudentCard/StudentCardBackIcon";
import StudentCardFrontIcon from "../../../assets/icons/StudentCard/StudentCardFrontIcon";
import "./_studentGroupCardToPrint.scss";
const StudentGroupCardToPrint = forwardRef<any, any>((props, ref) => {
  const { data } = props;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
      {data?.map((item: any) => (
        <div className="student-cart-container-group" dir="rtl" key={item?.key}>
          <div className="front-side" dir="rtl">
            <StudentCardFrontIcon />
            <div className="front-side-branch">{item?.unitName}</div>
            <div className="data-container">
              <div className="student-bar-code">
                <QRCode
                  size={60}
                  width={60}
                  height={60}
                  value={`${
                    import.meta.env.VITE_URL_PWA_MAIN
                  }base/profile/digital-card?QRSerialNumber=${item?.digitalCardSerialNumber}`}
                  bgColor="#0047FF"
                  fgColor="#fff"
                  className="qr-code"
                />
              </div>
              <div className="name">{item?.firstName + " " + item?.lastName}</div>
              <div className="field-name">{item?.levelName + " " + item?.fieldName}</div>
              <div className="student-number-container">
                <div className="student-number-label">شماره دانشجویی:</div>
                <div className="student-number">{item?.studentNumber}</div>
              </div>
              <div className="national-number-container">
                <div className="national-number-label">
                  {item?.nationality === "1" ? "کد فراگیر:" : "کد ملی:"}
                </div>
                <div className="national-number">{item?.nationalCode}</div>
              </div>
            </div>
          </div>
          <div className="back-side">
            <StudentCardBackIcon />
            <div className="back-side-branch">{item?.unitName}</div>
            <div className="list-data">
              <ul>
                <li>هرگونه جعل، تغییر یا استفاده غیر مجاز این کارت پیگرد قانونی دارد.</li>
                <li>در صورت مفقود شدن کارت به دانشگاه اطلاع داده شود.</li>
                <li>
                  از یابنده تقاضا می‌شود این کارت را به صندوق پستی {item?.collegeCode}{" "}
                  بیندازد.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
StudentGroupCardToPrint.displayName = "StudentCardToPrint";
export default StudentGroupCardToPrint;
