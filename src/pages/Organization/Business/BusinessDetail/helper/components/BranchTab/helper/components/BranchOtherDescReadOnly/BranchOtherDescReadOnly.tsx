import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const BranchOtherDescReadOnly = () => {
  return (
    <div>
      <CustomDivider text={"سایر توضیحات"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          span={24}
          label="آدرس"
          value={"استان آذربایجان غربی، شهر ارومیه، خیابان مهدی سوم مجتمع دانشگاه آزاد"}
        />
      </Row>
    </div>
  );
};
export default BranchOtherDescReadOnly;
