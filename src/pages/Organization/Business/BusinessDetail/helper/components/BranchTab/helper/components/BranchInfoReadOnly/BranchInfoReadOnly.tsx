import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const BranchInfoReadOnly = () => {
  return (
    <div>
      <CustomDivider text={"اطلاعات شعبه"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="عنوان شعبه"
          value={"شعبه استان اذربایجان غربی"}
        />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع شعبه" value={"اصلی"} />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="والد شعبه"
          value={"هیات امناء"}
        />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="کد شعبه" value={"1020"} />
      </Row>
    </div>
  );
};
export default BranchInfoReadOnly;
