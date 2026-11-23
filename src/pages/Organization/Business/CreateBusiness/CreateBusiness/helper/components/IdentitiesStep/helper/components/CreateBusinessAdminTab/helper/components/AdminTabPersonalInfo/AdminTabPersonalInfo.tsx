import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { useLazyGetGenderTypeQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { AdminTabPersonalInfoProps } from "./@types/@adminTabPersonalInfo";

const AdminTabPersonalInfo = ({ form }: AdminTabPersonalInfoProps) => {
  //? ================================  Api Calls ================================
  // get gender type
  const [
    getGenderTypes,
    { data: GetGenderTypeData, isLoading: getGenderTypeDataIsLoading },
  ] = useLazyGetGenderTypeQuery();

  useEffect(() => {
    getGenderTypes(null);
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
            name="adminFirstName"
            placeholder="نام را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام خانوادگی"
            name="adminLastName"
            placeholder="نام خانوادگی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="adminGenderType"
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
            name="adminFatherName"
            placeholder="نام پدر را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomDatePicker
            label="تاریخ تولد"
            placeholder="انتخاب کنید"
            name="adminBirthdate"
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
            name="adminNationality"
            placeholder="انتخاب کنید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد ملی / کد فراگیر"
            name="adminNationalCode"
            tooltip={"توضیحات ندارد"}
            placeholder="کد ملی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد پرسنلی"
            name="adminPersonalCode"
            placeholder="کد پرسنلی را وارد نمایید"
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default AdminTabPersonalInfo;
