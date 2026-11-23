import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const EducationInfoSection = () => {
  return (
    <div>
      <CustomDivider text={"اطلاعات تحصیلی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="مقطع تحصیلی " value={"کارشناسی ارشد"} />
        <SingleVerticalWithCol label="رشته تحصیلی" value={"مدیریت دولتی"} />
      </Row>
    </div>
  );
};
export default EducationInfoSection;
