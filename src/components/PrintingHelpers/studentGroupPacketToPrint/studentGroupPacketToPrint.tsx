import { forwardRef } from "react";

import "./_studentGroupPacketToPrint.scss";
import StudentPacketIcon from "../../../assets/icons/StudentCard/StudentPacketIcon";

interface StudentGroupPacketToPrintProps {
  data: any[] | undefined; // userData[];
}

const StudentGroupPacketToPrint = forwardRef<any, StudentGroupPacketToPrintProps>(
  (props, ref) => {
    const { data } = props;

    return (
      <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
        {data?.map((item, index) => (
          <div className="student-packet-container-group" dir="rtl" key={index}>
            <div className="student-packet">
              <StudentPacketIcon />
              <div className="name-container">
                <span>{item?.firstName}</span>
                <span>{item?.lastName}</span>
              </div>
              <div className="field-container">
                <span>{item?.levelName}</span>
                <span>{item?.fieldName}</span>
              </div>
              <div className="student-number-label">شماره دانشجویی:</div>
              <div className="student-number-value">{item?.studentNumber}</div>
              <div className="national-number-label">شماره ملی:</div>
              <div className="national-number-value">{item?.nationalCode}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

StudentGroupPacketToPrint.displayName = "StudentGroupPacketToPrint";
export default StudentGroupPacketToPrint;
