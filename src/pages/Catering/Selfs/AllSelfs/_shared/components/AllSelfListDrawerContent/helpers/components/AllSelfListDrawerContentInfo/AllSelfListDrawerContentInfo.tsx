import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NATIONAL_CODE_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
  ZERO_RULE,
} from "@infra/validation/validationSchema";

import { AllSelfListDrawerContentInfoProps } from "./@types/AllSelfListDrawerContentInfoProps";

const AllSelfListDrawerContentInfo = ({
  universityData,
  isUniversityDataLoading,
  form,
  genderOptions,
}: AllSelfListDrawerContentInfoProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="عنوان"
          name="title"
          placeholder="عنوان"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomSelect
          name="unit"
          label="شعبه / واحد"
          options={universityData}
          placeholder="انتخاب کنید"
          isLoading={isUniversityDataLoading}
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="ظرفیت(نفر)"
          name="capacity"
          placeholder="ظرفیت(نفر)"
          rules={[REQUIRED_RULE, NUMBER_RULE, MAX_LENGTH_RULE(6), ZERO_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomSelect
          name="gender"
          label="جنسیت"
          options={genderOptions}
          placeholder="انتخاب کنید"
          form={form}
          rules={[REQUIRED_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="نام مسئول سلف"
          name="selfManagerName"
          placeholder="نام مسئول سلف"
          rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="نام خانوادگی مسئول سلف"
          name="selfManagerLastName"
          placeholder="نام خانوادگی مسئول سلف"
          rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="کد ملی مسئول سلف"
          name="nationalCode"
          placeholder="کد ملی مسئول سلف"
          rules={[NATIONAL_CODE_RULE]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن مسئول سلف"
          name="phoneManager"
          placeholder="02112345678"
          rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="توضیحات سلف"
          name="desc"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={100}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="قوانین و مقررات سلف"
          name="rule"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={100}
        />
      </Col>
    </Row>
  );
};
export default AllSelfListDrawerContentInfo;
