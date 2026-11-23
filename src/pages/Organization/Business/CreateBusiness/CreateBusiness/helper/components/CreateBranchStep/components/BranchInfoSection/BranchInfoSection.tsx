import { Col, Form, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BranchInfoSectionProps } from "../../@types/@createBranchStepTypes";

const BranchInfoSection = ({ form }: BranchInfoSectionProps) => {
  return (
    <Form form={form}>
      <CustomDivider text={"اطلاعات شعبه"} />
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="عنوان شعبه"
            name="branchTitle"
            placeholder="برای مثال شعبه مرکزی"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد شعبه"
            name="branchCode"
            placeholder="کد شعبه را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="branchType"
            label="نوع شعبه"
            options={[]}
            placeholder="شعبه مرکزی"
            rules={[REQUIRED_RULE]}
            disabled={true}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default BranchInfoSection;
