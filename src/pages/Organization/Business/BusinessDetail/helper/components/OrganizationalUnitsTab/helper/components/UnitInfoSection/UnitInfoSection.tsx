import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const UnitInfoSection = () => {
  return (
    <div>
      <CustomDivider text={"واحد سازمانی"} />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="شعبه" value={""} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="والد واحد" value={""} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع واحد" value={""} />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="عنوان واحد" value={""} />
        <SingleVerticalWithCol span={24} label="توضیحات" value={""} />
      </Row>
    </div>
  );
};
export default UnitInfoSection;
