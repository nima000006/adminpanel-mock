import { forwardRef } from "react";

import "./_studentSinglePacketToPrint.scss";
import StudentPacketIcon from "../../../assets/icons/StudentCard/StudentPacketIcon";
// type StudentSinglePacketToPrintProps = {
//   firstName: string;
//   lastName: string;
//   levelName: string;
//   fieldName: string;
//   studentNumber: string;
//   nationalCode: string;
// };
const StudentSinglePacketToPrint = forwardRef<any, any>((props, ref) => {
  const { fieldName, firstName, lastName, levelName, nationalCode, studentNumber }: any =
    props;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
      <div className="student-single-packet-container" dir="rtl">
        <div className="student-packet">
          <StudentPacketIcon />
          <div className="name-container">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </div>
          <div className="field-container">
            <span>{levelName}</span>
            <span>{fieldName}</span>
          </div>
          <div className="student-number-label">شماره دانشجویی:</div>
          <div className="student-number-value">{studentNumber}</div>
          <div className="national-number-label">شماره ملی:</div>
          <div className="national-number-value">{nationalCode}</div>
        </div>
      </div>
    </div>
  );
});
StudentSinglePacketToPrint.displayName = "StudentSinglePacketToPrint";
export default StudentSinglePacketToPrint;
