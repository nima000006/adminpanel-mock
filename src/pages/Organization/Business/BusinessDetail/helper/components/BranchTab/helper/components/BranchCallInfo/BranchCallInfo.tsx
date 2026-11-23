import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const BranchCallInfo = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text={"اطلاعات تماس"} />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="شماره همراه"
            name="mobile"
            placeholder="09 00 000 000"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="ایمیل"
            name="branchCode"
            placeholder="به عنوان مثال Samim@samim.net"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن"
            name="branchCode"
            placeholder="021 000 0000"
          />
        </Col>
      </Row>
    </div>
  );
};
export default BranchCallInfo;
