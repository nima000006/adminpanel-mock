import { QRCode } from "react-qr-code";

import { StudentCardProps } from "./@types/@studentCard";
import StudentCardPanelIcon from "../../assets/icons/StudentCard/StudentCardPanelIcon";
import "./_studentCard.scss";

const StudentCard = ({
  unitName,
  firstName,
  lastName,
  field,
  studentNumber,
  nationalNumber,
  level,
  serialNumber,
  nationality,
}: StudentCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="student-card-container" dir="rtl">
      <StudentCardPanelIcon />
      <div className="uni-location">
        <span>{unitName}</span>
      </div>
      {/* {data?.image ? (
        <img
          src={data.image}
          alt="عکس"
          className="front-side-student-image"
          width={200}
          height={200}
        />
      ) : (
        <img
          src={photoPlaceHolder}
          alt="عکس"
          className="front-side-student-image"
          width={200}
          height={200}
        />
      )} */}
      <div className="card-data">
        <div className="student-bar-code">
          {serialNumber && (
            <QRCode
              size={100}
              width={100}
              height={100}
              value={`${
                import.meta.env.VITE_URL_PWA_MAIN
              }base/profile/digital-card?QRSerialNumber=${serialNumber}`}
              bgColor="#0047ff"
              fgColor="#fff"
            />
          )}
        </div>
        <div className="student-name">
          {firstName && lastName ? `${firstName} ${lastName}` : "ثبت نشده"}
        </div>
        <div className="student-field-name">
          {level && field ? `${level} ${field}` : "ثبت نشده"}
        </div>
        <div className="student-number-container">
          <div className="student-number-label">شماره دانشجویی:</div>
          <div className="student-number">
            {studentNumber ? studentNumber : "ثبت نشده"}
          </div>
        </div>
        <div className="student-national-number-container">
          <div className="national-number-label">
            {nationality === "1" ? "کد فراگیر:" : "کد ملی:"}
          </div>
          <div className="national-number">
            {nationalNumber ? nationalNumber : "ثبت نشده"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
