import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
  ZERO_RULE,
} from "@infra/validation/validationSchema";
import { genderType } from "@pages/Food/Selfs/helpers/utils/selfUtils";

import { FoodAllSelfsDetailsDrawersInfoProps } from "./@Types/FoodAllSelfsDetailsDrawersInfoProps";

const FoodAllSelfsDetailsDrawersInfo = ({
  universityData,
  isUniversityDataLoading,
  form,
}: FoodAllSelfsDetailsDrawersInfoProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="عنوان"
          name="selfTitle"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="واحد دانشگاهی"
          name="uniName"
          options={universityData ? universityData : []}
          form={form}
          loading={isUniversityDataLoading}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="ظرفیت (نفر)"
          name="capacity"
          rules={[REQUIRED_RULE, NUMBER_RULE, ZERO_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomSelect
          label="جنسیت"
          name="gender"
          options={genderType}
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>

      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="نام مسئول سلف"
          name="adminName"
          rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="نام خانوادگی مسئول سلف"
          name="adminFamily"
          rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="کد ملی مسئول سلف"
          name="adminPersonalityCode"
          rules={[NUMBER_RULE, POSTAL_CODE_RULE]}
        />
      </Col>
      <Col lg={8} md={12} sm={24} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن مسئول سلف"
          name="adminPhoneNumber"
          rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="توضیحات سلف"
          name="selfDescription"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={500}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="قوانین و مقررات سلف"
          name="selfRules"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={500}
        />
      </Col>
    </Row>
  );
};
export default FoodAllSelfsDetailsDrawersInfo;
