import { Col, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import {
  LENGTH_RULE,
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
  ZERO_RULE,
} from "@infra/validation/validationSchema";
import { genderType } from "@pages/Food/Selfs/helpers/utils/selfUtils";

import { MySelfListDrawerContentInfoProps } from "./@types/MySelfListDrawerContentInfoProps";

const MySelfListDrawerContentInfo = ({ form }: MySelfListDrawerContentInfoProps) => {
  return (
    <Row gutter={[16, 16]} className="food-my-self-list-drawer-content-info">
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="عنوان"
          name="title"
          placeholder="عنوان"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
        />
      </Col>
      {/* todo[saman]: In this section, an academic unit is not required, but it has not 
        been removed because it may be needed later.*/}
      {/* <Col lg={8} sm={12} xs={24}>
          <CustomSelect
            name="unit"
            label="واحد دانشگاهی"
            options={universityData?.data?.map((item) => {
              return {
                id: item.branchCode,
                title: item.branchName,
              };
            })}
            placeholder="انتخاب کنید"
            isLoading={isUniversityDataLoading}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col> */}
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
          options={genderType}
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
          rules={[NUMBER_RULE, LENGTH_RULE(10)]}
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <CustomInput
          type="text"
          label="شماره تلفن مسئول سلف"
          name="phoneManager"
          placeholder="شماره تلفن مسئول سلف"
          rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="توضیحات سلف"
          name="desc"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={500}
        />
      </Col>
      <Col span={24}>
        <CustomTextArea
          label="قوانین و مقررات سلف"
          name="rule"
          rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
          showCount
          maxLength={500}
        />
      </Col>
    </Row>
  );
};

export default MySelfListDrawerContentInfo;
