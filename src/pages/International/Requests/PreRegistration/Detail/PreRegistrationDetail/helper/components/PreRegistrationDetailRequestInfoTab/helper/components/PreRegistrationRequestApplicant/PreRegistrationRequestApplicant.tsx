import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const PreRegistrationRequestApplicant = () => {
  return (
    <div>
      <CustomDivider text="درخواست متقاضی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="مقطع درخواستی"
          value={"data?.degreeCourseRequest"}
        />
        <SingleVerticalWithCol label="رشته درخواستی" value={"data?.fieldCourseRequest"} />
        <SingleVerticalWithCol
          label="واحد درخواستی"
          value={"data?.branchCourseRequest"}
        />
        <SingleVerticalWithCol
          label="ترم تحصیلی درخواستی"
          value={"data?.semesterCourseRequest"}
        />
      </Row>
    </div>
  );
};
export default PreRegistrationRequestApplicant;
