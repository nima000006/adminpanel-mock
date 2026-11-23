import { useState } from "react";

import { Col, Form, Row } from "antd";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { BusinessInfoGenuineProps } from "./@types/@businessInfoGenuineProps";
import {
  BRAND_NAME,
  IBAN_CODE_TOOLTIP,
  TAX_FILE_CODE,
  userGender,
  userNationality,
} from "../../../../../../utils/createBusinessUtils";
import "./_businessInfoGenuine.scss";

const BusinessInfoGenuine = ({
  form,
  taxTypeData,
  loading,
}: BusinessInfoGenuineProps) => {
  const [view, setView] = useState("0");
  const { user } = useAuth();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="business-info-genuine-container">
      <div>
        <CustomSegmented
          options={[
            { value: "0", label: "خودم" },
            { value: "1", label: "دیگری", disabled: false },
          ]}
          className="segmented-container"
          onChange={(value) => setView(value as "0" | "1")}
          value={view}
        />
      </div>

      {/* PERSONAL INFO */}
      <div>
        <CustomDivider text="اطلاعات شخصی" />
        <Row gutter={[12, 12]}>
          <SingleVerticalWithCol label="نام" value={user?.firstName} />
          <SingleVerticalWithCol md={12} label="نام خانوادگی" value={user?.lastName} />
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
          <SingleVerticalWithCol
            md={12}
            label="کد ملی / فراگیر"
            value={user?.nationalCode}
          />
          <SingleVerticalWithCol
            md={12}
            label="ملیت"
            value={
              user?.regionId?.toString() === userNationality?.iranian ? "ایرانی" : "-"
            }
          />
          <SingleVerticalWithCol
            md={12}
            label="جنسیت"
            value={user?.genderId?.toString() === userGender?.woman ? "خانم" : "آقا"}
          />
        </Row>
      </div>

      {/* CALL INFO */}
      <div>
        <CustomDivider text="اطلاعات تماس" />
        <Row gutter={[12, 12]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره همراه"
              name="mobile"
              placeholder="09 00 000 0000"
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      </div>

      {/* BUSINESS INFO */}
      <div>
        <CustomDivider text="اطلاعات کسب و کار" />
        <Row gutter={[12, 12]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام کسب و کار"
              name="businessGenuineName"
              placeholder="به عنوان مثال شرکت مهندسی صمیم"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomTooltip>
              <CustomInput
                type="text"
                label="شماره اقتصادی"
                name="genuineIbanCode"
                tooltip={IBAN_CODE_TOOLTIP}
                placeholder="شماره اقتصادی را وارد کنید"
                rules={[REQUIRED_RULE]}
              />
            </CustomTooltip>
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomTooltip>
              <CustomInput
                type="text"
                name="genuineTaxTracking"
                tooltip={TAX_FILE_CODE}
                label={"کد رهگیری پرونده مالیاتی"}
                placeholder="کد رهگیری پرونده مالیاتی را وارد کنید"
                rules={[REQUIRED_RULE, LENGTH_RULE(15), NUMBER_RULE]}
              />
            </CustomTooltip>
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="genuineTaxType"
              label="نوع مالیات"
              form={form}
              placeholder="انتخاب کنید"
              options={taxTypeData}
              isLoading={loading}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              name="licenseCode"
              label={"شماره مجوز"}
              placeholder="شماره مجوز را وارد کنید"
              rules={[REQUIRED_RULE, LENGTH_RULE(15), NUMBER_RULE]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomTooltip>
              <CustomInput
                type="text"
                name="genuineBrandName"
                tooltip={BRAND_NAME}
                label={"نام تجاری"}
                placeholder="به عنوان مثال صمیم"
              />
            </CustomTooltip>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
export default BusinessInfoGenuine;
