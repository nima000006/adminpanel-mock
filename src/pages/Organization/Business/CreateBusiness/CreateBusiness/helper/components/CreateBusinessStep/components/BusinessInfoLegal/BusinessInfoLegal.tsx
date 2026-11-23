import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { useLazyGetPersonalityTypeQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import {
  LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";

import { BusinessInfoLegalProps } from "./@types/@businessInfoLegalTypes";
import {
  BRAND_NAME,
  IBAN_CODE_TOOLTIP,
  NATIONAL_ID_TOOLTIP,
  REGISTER_ID_TOOLTIP,
  TAX_FILE_CODE,
} from "../../../../../../utils/createBusinessUtils";

const BusinessInfoLegal = ({ form, taxTypeData, loading }: BusinessInfoLegalProps) => {
  //? ================================  Api Calls ================================
  // get personality type
  const [
    getPersonalityTypes,
    { data: personalityTypeData, isLoading: personalityTypeDataIsLoading },
  ] = useLazyGetPersonalityTypeQuery();

  useEffect(() => {
    getPersonalityTypes(null);
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="business-info-legal-container">
      <CustomDivider text="اطلاعات کسب و کار" />

      <Row gutter={[12, 12]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام کسب و کار"
            name="businessLegalName"
            placeholder="به عنوان مثال شرکت مهندسی صمیم"
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="personalityGroupType"
            label="نوع گروه شخصیتی حقوقی"
            form={form}
            placeholder="انتخاب کنید"
            options={personalityTypeData}
            isLoading={personalityTypeDataIsLoading}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomTooltip>
            <CustomInput
              type="text"
              name="registerId"
              tooltip={REGISTER_ID_TOOLTIP}
              label={"شناسه ثبت "}
              placeholder="شناسه ثبت را وارد کنید"
              rules={[REQUIRED_RULE, LENGTH_RULE(6), NUMBER_RULE]}
            />
          </CustomTooltip>
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomTooltip>
            <CustomInput
              type="text"
              name="nationalId"
              tooltip={NATIONAL_ID_TOOLTIP}
              label={"شناسه ملی"}
              placeholder="شناسه ملی را وارد کنید"
              rules={[REQUIRED_RULE, LENGTH_RULE(11), NUMBER_RULE]}
            />
          </CustomTooltip>
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomTooltip>
            <CustomInput
              type="text"
              name="ibanCodeLegal"
              tooltip={IBAN_CODE_TOOLTIP}
              label={"شماره اقتصادی"}
              placeholder="شماره اقتصادی را وارد کنید"
              rules={[REQUIRED_RULE, LENGTH_RULE(11), NUMBER_RULE]}
            />
          </CustomTooltip>
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomTooltip title={"tooltipTitle"}>
            <CustomInput
              type="text"
              name="taxTrackingCode"
              tooltip={TAX_FILE_CODE}
              label={"کد رهگیری پرونده مالیاتی"}
              placeholder="کد رهگیری پرونده مالیاتی را وارد کنید"
              rules={[REQUIRED_RULE, LENGTH_RULE(10), NUMBER_RULE]}
            />
          </CustomTooltip>
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            name="legalTaxType"
            label="نوع مالیات"
            form={form}
            placeholder="انتخاب کنید"
            options={taxTypeData}
            isLoading={loading}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomTooltip title={"tooltipTitle"}>
            <CustomInput
              type="text"
              name="legalBrandName"
              tooltip={BRAND_NAME}
              label={"نام تجاری"}
              placeholder="به عنوان مثال صمیم"
            />
          </CustomTooltip>
        </Col>
      </Row>
    </Form>
  );
};
export default BusinessInfoLegal;
