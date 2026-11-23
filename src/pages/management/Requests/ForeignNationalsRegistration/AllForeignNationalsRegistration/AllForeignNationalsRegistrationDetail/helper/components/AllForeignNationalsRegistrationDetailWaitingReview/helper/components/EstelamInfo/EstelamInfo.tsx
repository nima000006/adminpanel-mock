import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ESTELAM_TYPE } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { EstelamInfoProps } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/@types/@allForeignNationalsRegistrationDetailWaitingReviewTypes";

const EstelamInfo = ({ tab, data }: EstelamInfoProps) => {
  const tabContent = {
    [ESTELAM_TYPE.IDENTITY_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام" value={data?.firstName} />
        <SingleVerticalWithCol label="نام خانوادگی" value={data?.lastName} />
        <SingleVerticalWithCol label="کد ملی" value={data?.nationalCode} />
        <SingleVerticalWithCol label="نام پدر" value={data?.fatherName} />
        <SingleVerticalWithCol label="تاریخ تولد" value={data?.birthDate} />
        <SingleVerticalWithCol label="جنسیت" value={data?.genderName} />
      </Row>
    ),

    [ESTELAM_TYPE.EDUCATIONAL_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره دانشجویی" value={data?.studentNumber} />
        <SingleVerticalWithCol label="واحد دانشگاهی" value={data?.branchName} />
        <SingleVerticalWithCol label="مقطع تحصیلی" value={data?.levelName} />
        <SingleVerticalWithCol label="رشته تحصیلی" value={data?.fieldName} />
        <SingleVerticalWithCol label="سال ورود" value={data?.eduStartDate} />
        <SingleVerticalWithCol
          label="نیمسال ورود"
          value={
            "-"
            // data?.eduStartCode?.toString()?.slice(-1) === "1" // با صحبت با اقای جماعتی و با توجه به تغییر api از سمت اموزشیار، این قسمت به صورت خط تیره نمایش داده می شود
            //   ? "نیمسال اول"
            //   : "نیمسال دوم"
          }
        />
      </Row>
    ),

    [ESTELAM_TYPE.CONTACT_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره همراه" value={data?.mobile} />
        <SingleVerticalWithCol label="ایمیل" value={data?.email} />
      </Row>
    ),

    [ESTELAM_TYPE.ACADEMIC_PERFORMANCE]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="معدل کل" value={data?.totalAverage} />
        <SingleVerticalWithCol
          label="تعداد واحدهای پاس‌شده"
          value={data?.totalPassedUnits}
        />
      </Row>
    ),
  };

  return <>{tabContent[tab]}</>;
};
export default EstelamInfo;
