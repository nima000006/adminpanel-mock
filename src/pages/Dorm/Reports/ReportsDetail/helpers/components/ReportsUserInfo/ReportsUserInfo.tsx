import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import "./_reportsUserInfo.scss";

const ReportsUserInfo = () => {
  const UserInfoMockData = {
    id: 1,
    firstName: "مجید",
    lastName: "سیانکی",
    userId: "123654879",
    nationalCode: "0012565987",
    gender: "اقا",
    nationality: "اقا",
    barthDay: "2024-07-11T08:00:41.977Z",
    mobilNum: "091212345678",
    userGroup: "دانشجو",
    unit: "تهران شمال",
    degree: "دکترا",
    field: "مهندسی کامپیوتر",
    yearsOfEntry: "1402",
    entrySemester: "نیمسال اول",
    term: "4",
    residence: "خوابگاه شهید چمران",
    building: "ساختمان شماره یک",
    flor: "طبقه دوم",
    room: "اتاق 102",
    reserveType: "رزرو غیر قطعی اتاق",
    typeSchedule: "ماهانه",
    startResidence: "2024-07-11T08:00:41.977Z",
    endResidence: "2024-06-11T08:00:41.977Z",
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="reports-user-info-tab-container">
      {/* ---------------------------------- مشخصات کاربر ---------------------------------- */}
      <div className="user-info-section-wrapper">
        <CustomDivider text="مشخصات کاربر" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام" value={UserInfoMockData?.firstName} />
          <SingleVerticalWithCol
            label="نام خانوادگی"
            value={UserInfoMockData?.lastName}
          />
          <SingleVerticalWithCol
            label="شماره دانشجویی / شماره پرسنلی"
            value={UserInfoMockData?.userId}
          />
          <SingleVerticalWithCol
            label="کد ملی / اتباع"
            value={UserInfoMockData?.nationalCode}
          />
          <SingleVerticalWithCol label="جنسیت" value={UserInfoMockData?.gender} />
          <SingleVerticalWithCol label="ملیت" value={UserInfoMockData?.nationality} />
          <SingleVerticalWithCol
            label="تاریخ تولد"
            value={UserInfoMockData?.barthDay}
            isDate
          />
          <SingleVerticalWithCol
            label="شماره موبایل"
            value={UserInfoMockData?.mobilNum}
          />
          <SingleVerticalWithCol
            label="گروه کاربری"
            value={UserInfoMockData?.userGroup}
          />
          <SingleVerticalWithCol label="واحد دانشگاهی" value={UserInfoMockData?.unit} />
          <SingleVerticalWithCol label="مقطع تحصیلی" value={UserInfoMockData?.degree} />
          <SingleVerticalWithCol label="رشته تحصیلی" value={UserInfoMockData?.field} />
          <SingleVerticalWithCol
            label="سال ورود"
            value={UserInfoMockData?.yearsOfEntry}
          />
          <SingleVerticalWithCol
            label="نیمسال ورود"
            value={UserInfoMockData?.entrySemester}
          />
          <SingleVerticalWithCol label="ترم تحصیلی" value={UserInfoMockData?.term} />
        </Row>
      </div>

      {/* ----------------------------------  مشخصات سکونت ---------------------------------- */}
      <div className="residence-info-section-wrapper">
        <CustomDivider text="مشخصات سکونت" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="اقامتگاه" value={UserInfoMockData?.residence} />
          <SingleVerticalWithCol label="ساختمان" value={UserInfoMockData?.building} />
          <SingleVerticalWithCol label="طبقه" value={UserInfoMockData?.flor} />
          <SingleVerticalWithCol label="اتاق" value={UserInfoMockData?.room} />
          <SingleVerticalWithCol label="نوع رزرو" value={UserInfoMockData?.reserveType} />
          <SingleVerticalWithCol
            label="نوع زمان‌بندی"
            value={UserInfoMockData?.typeSchedule}
          />
          <SingleVerticalWithCol
            label="شروع اسکان"
            value={UserInfoMockData?.startResidence}
            isDate
          />
          <SingleVerticalWithCol
            label="پایان اسکان"
            value={UserInfoMockData?.endResidence}
            isDate
          />
        </Row>
      </div>
    </div>
  );
};
export default ReportsUserInfo;
