import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const ApplicantsEducationInfo = () => {
  return (
    <div>
      <CustomDivider text="اطلاعات تحصیلی پیشین متقاضی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="مقطع تحصیلی" value={"data?.degreeRequest"} />
        <SingleVerticalWithCol label="رشته تحصیلی" value={"data?.fieldRequest"} />
        <SingleVerticalWithCol label="کشور محل تحصیل" value={"data?.countryRequest"} />
        <SingleVerticalWithCol
          label="موسسه / دانشگاه صادر کننده"
          value={"data?.issuingInstitutionRequest"}
        />
        <SingleVerticalWithCol label="معدل کل" value={"data?.gpaRequest"} />
        <SingleVerticalWithCol label="معدل کتبی دیپلم" value={"data?.iranianGpa"} />
      </Row>
    </div>
  );
};
export default ApplicantsEducationInfo;
