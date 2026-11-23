import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

export const PositionInfoSegmentContentReadOnly = () => {
  return (
    <div>
      <CustomDivider text={" سمت سازمانی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع سمت" value={""} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="عنوان سمت" value={""} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="سمت والد" value={""} />
        <SingleVerticalWithCol span={24} label="(اختیاری) توضیحات" value={""} />
      </Row>
    </div>
  );
};
export default PositionInfoSegmentContentReadOnly;
