import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { BranchInfoProps } from "../@types/@branchTabComponentsType";

const BranchInfo = ({ form }: BranchInfoProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text={"اطلاعات شعبه"} />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="عنوان شعبه"
            name="branchTitle"
            placeholder="برای مثال شعبه مرکزی"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchType"
            label="نوع شعبه"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchParent"
            label="والد شعبه"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="کد شعبه"
            name="branchCode"
            placeholder="کد شعبه را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </div>
  );
};
export default BranchInfo;
