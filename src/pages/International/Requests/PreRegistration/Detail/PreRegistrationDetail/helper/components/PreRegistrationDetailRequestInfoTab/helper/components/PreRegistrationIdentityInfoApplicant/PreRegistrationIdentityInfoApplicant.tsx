import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const PreRegistrationIdentityInfoApplicant = () => {
  return (
    <div>
      <CustomDivider text="اطلاعات هویتی متقاضی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام" value={"data?.firstName"} />
        <SingleVerticalWithCol label="نام خانوادگی" value={"data?.lastName"} />
        <SingleVerticalWithCol label="جنسیت" value={"data?.gender"} />
        <SingleVerticalWithCol label="لقب" value={"data?.middleName"} />
        <SingleVerticalWithCol label="تاریخ تولد" value={"data?.birthDate"} isDate />
        <SingleVerticalWithCol label="ملیت" value={"data?.nationality"} />
        <SingleVerticalWithCol label="تابعیت" value={"data?.citizenshipRequest"} />
        <SingleVerticalWithCol label="اقامت" value={"data?.countryOfResidenceRequest"} />
        <SingleVerticalWithCol
          label="شماره پاسپورت"
          value={"data?.passportNumberRequest"}
        />
        <SingleVerticalWithCol label="شناسه هویتی" value={"data?.identificationNumber"} />
      </Row>
    </div>
  );
};
export default PreRegistrationIdentityInfoApplicant;
