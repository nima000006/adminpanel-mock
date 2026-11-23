import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetGenderTypeQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { IdentitiesPersonalInfoProps } from "./@types/@identitiesPersonalInfo";

const IdentitiesPersonalInfo = ({ form }: IdentitiesPersonalInfoProps) => {
  //? ================================  Api Calls ================================
  // get gender type
  const [
    getPersonalityTypes,
    { data: GetGenderTypeData, isLoading: getGenderTypeDataIsLoading },
  ] = useLazyGetGenderTypeQuery();

  useEffect(() => {
    getPersonalityTypes(null);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDivider text={"اطلاعات پرسنلی"} />
      <Row gutter={[12, 12]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام"
            name="firstName"
            placeholder="نام را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام خانوادگی"
            name="lastName"
            placeholder="نام خانوادگی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="genderType"
            label="جنسیت"
            placeholder="انتخاب کنید"
            options={GetGenderTypeData}
            form={form}
            isLoading={getGenderTypeDataIsLoading}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام پدر"
            name="fatherName"
            placeholder="نام پدر را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomDatePicker
            label="تاریخ تولد"
            placeholder="انتخاب کنید"
            name="birthdate"
            form={form}
            defaultValue={form.getFieldsValue().birthdate}
            key={form.getFieldsValue().birthdate}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="ملیت"
            name="nationality"
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد ملی / کد فراگیر"
            name="nationalCode"
            tooltip={"توضیحات ندارد"}
            placeholder="کد ملی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد پرسنلی"
            name="personalCode"
            placeholder="کد پرسنلی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default IdentitiesPersonalInfo;
