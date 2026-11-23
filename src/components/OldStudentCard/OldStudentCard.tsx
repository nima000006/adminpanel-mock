import AzadUniversityLogo from "../../assets/icons/AzadUniversityLogo";
import DaneshgaheAzadeEslamiLabel from "../../assets/icons/DaneshgaheAzadeEslamiLabel";
import StudentCardMask from "../../assets/icons/StudentCardMask";
const infoData = {
  fieldName: "کارشناسی",
  firstName: "احسان",
  image: "https://www.gstatic.com/webp/gallery3/1.sm.png",
  key: 156,
  lastName: "بافتی",
  link: null,
  nationalCode: null,
  nationalNumber: "0012165916",
  requestDate: "2023-07-07T10:27:20.000+00:00",
  requestStatusDescription: null,
  requestType: 0,
  status: null,
  studentNumber: "900848265",
  waitingTime: null,
  unitName: "نهران شمال",
  levelName: "کارشناسی",
};
const OldStudentCard = () => {
  return (
    <div className="student-card-image-section">
      <StudentCardMask />
      {/*//! CART SECTION */}
      <div className="on-card-data-container">
        {/* CART TOP SECTION */}
        <div className="top-section">
          <div className="label-logo-container">
            <div className="azad-uni-logo">
              <AzadUniversityLogo />
            </div>
            <div className="label-logo-texts">
              <DaneshgaheAzadeEslamiLabel />
              <div className="label-logo-unit-label">
                واحد
                {infoData?.unitName ? " " + infoData.unitName : "ثبت نشده"}
              </div>
            </div>
          </div>
          <div className="card-date-container">
            <div className="card-date-label-text">کارت دانشجویی</div>
            {/* <div className="card-date-label">شروع اعتبار :{modalData}</div> */}
          </div>
        </div>
        {/* CART BOTTOM SECTION */}
        <div className="bottom-section" dir="rtl">
          <div className="student-info">
            <div className="student-info-name">
              {infoData?.firstName && infoData?.lastName
                ? `${infoData.firstName + " " + infoData.lastName}`
                : "ثبت نشده"}
            </div>
            <div className="student-info-simple-text" dir="rtl">
              <div>شماره دانشجویی:</div>
              <div className="student-info-number">
                {infoData?.studentNumber ? infoData.studentNumber : "ثبت نشده"}
              </div>
            </div>
            <div className="student-info-simple-text">
              <div>کد ملی:</div>
              <div className="student-info-number">
                {infoData?.nationalCode ? infoData.nationalCode : "ثبت نشده"}
              </div>
            </div>
            <div className="student-info-simple-text">
              {infoData?.levelName ? infoData.levelName : "ثبت نشده"}-
              {infoData?.fieldName ? infoData.fieldName : "ثبت نشده"}
            </div>
          </div>
          <div className="student-image">
            {infoData?.image ? (
              <img src={infoData?.image} alt="alt-text" width="72" height="auto" />
            ) : (
              <img src={infoData?.image} alt="alt-text" width="72" height="auto" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldStudentCard;
