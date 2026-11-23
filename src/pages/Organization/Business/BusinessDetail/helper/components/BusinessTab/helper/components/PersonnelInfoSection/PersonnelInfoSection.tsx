import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const PersonnelInfoSection = () => {
  return (
    <div>
      <CustomDivider text={"اطلاعات پرسنلی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام " value={"محمد"} />
        <SingleVerticalWithCol label="نام خانوادگی" value={"خیالی"} />
        <SingleVerticalWithCol label="جنسیت" value={"آقا"} />
        <SingleVerticalWithCol label="نام پدر" value={"امین"} />
        <SingleVerticalWithCol label="تاریخ تولد" value={"1377-03-09"} />
        <SingleVerticalWithCol label="ملیت" value={"ایرانی"} />
        <SingleVerticalWithCol label="کد ملی / کد فراگیر" value={"0021116190"} />
        <SingleVerticalWithCol label="کد پرسنلی" value={"100"} />
      </Row>
    </div>
  );
};
export default PersonnelInfoSection;
