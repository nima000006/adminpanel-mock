import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const BranchCallInfoReadOnly = () => {
  return (
    <div>
      <CustomDivider text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره همراه"
          value={"0912000000"}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="ایمیل"
          value={"Azaduni@azaduni.net"}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره تلفن"
          value={"0215550415"}
        />
      </Row>
    </div>
  );
};
export default BranchCallInfoReadOnly;
