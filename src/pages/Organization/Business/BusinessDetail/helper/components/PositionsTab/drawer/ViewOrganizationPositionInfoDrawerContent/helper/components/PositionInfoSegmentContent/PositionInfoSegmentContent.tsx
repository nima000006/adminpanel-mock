import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

const PositionInfoSegmentContent = () => {
  return (
    <div>
      <div>
        <CustomDivider text={"اطلاعات سمت سازمانی"} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع سمت" value={""} />
          <SingleVerticalWithCol xl={12} lg={12} md={12} label="عنوان سمت" value={""} />
          <SingleVerticalWithCol span={24} label="توضیحات" value={""} />
        </Row>
      </div>
      <div>
        <CustomDivider text={"ارائه داده شده به واحدهای سازمانی زیر"} />
        <h4>طرح مورد نظر از سمت دیزاین باید اصلاح شود به اقای سوجه اطلاع داده شد</h4>
      </div>
    </div>
  );
};
export default PositionInfoSegmentContent;
