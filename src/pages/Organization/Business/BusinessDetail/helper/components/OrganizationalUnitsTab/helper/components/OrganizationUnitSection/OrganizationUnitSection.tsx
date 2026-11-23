import { Col, Row, Tooltip } from "antd";
import { PiInfoThin } from "react-icons/pi";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { OrganizationUnitSectionProps } from "./@type/@organizationUnitSectionType";

const OrganizationUnitSection = ({
  form,
  isModifyDrawerOpen,
  ModifyOrganizationMood,
  ModifyTopChartMood,
}: OrganizationUnitSectionProps) => {
  return (
    <div>
      <CustomDivider text={"واحد سازمانی"} />
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchType"
            label="شعبه"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            disabled={ModifyTopChartMood}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchType"
            label={
              <span className="parent-unit-label">
                والد واحد
                <Tooltip title="توضیح بیشتر">
                  <PiInfoThin style={{ color: "#BFBFBF" }} />
                </Tooltip>
              </span>
            }
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            disabled={
              (ModifyOrganizationMood && isModifyDrawerOpen?.id === -1) ||
              !ModifyTopChartMood
            }
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchType"
            label="نوع واحد"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <CustomSelect
            name="branchType"
            label="عنوان واحد"
            options={[]}
            placeholder="انتخاب کنید"
            form={form}
            rules={[REQUIRED_RULE]}
            disabled={ModifyOrganizationMood}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات (اختیاری)"
            name="desc"
            showCount
            maxLength={1024}
          />
        </Col>
      </Row>
    </div>
  );
};
export default OrganizationUnitSection;
