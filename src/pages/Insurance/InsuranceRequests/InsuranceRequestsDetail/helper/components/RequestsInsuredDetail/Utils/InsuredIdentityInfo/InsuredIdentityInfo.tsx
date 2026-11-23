import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InsuredIdentityInfoProps } from "./@types/@insuredIdentityInfo";
import "./_insuredIdentityInfo.scss";

const InsuredIdentityInfo = ({
  name,
  family,
  fatherName,
  gender,
  baseInsurance,
  nationalCode,
  birthDate,
  studentNumber,
  university,
  relation,
  role,
}: InsuredIdentityInfoProps) => {
  return (
    <div className="insured-identify-info-container">
      <CustomDivider text="اطلاعات هویتی بیمه‌شده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol md={12} sm={24} label="نام" value={name} />

        <SingleVerticalWithCol md={12} sm={24} label="نام خانوادگی" value={family} />

        <SingleVerticalWithCol md={12} sm={24} label="نام پدر" value={fatherName} />

        <SingleVerticalWithCol md={12} sm={24} label="جنسیت" value={gender} />

        <SingleVerticalWithCol md={12} sm={24} label="بیمه پایه" value={baseInsurance} />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="کد ملی / اتباع"
          value={nationalCode}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ تولد"
          value={birthDate}
          isDate
        />

        {role === "main" && (
          <>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="شماره دانشجویی"
              value={studentNumber}
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="واحد دانشگاهی"
              value={university}
            />
          </>
        )}
        {role !== "main" && (
          <SingleVerticalWithCol md={12} sm={24} label="نسبت" value={relation} />
        )}
      </Row>
    </div>
  );
};

export default InsuredIdentityInfo;
