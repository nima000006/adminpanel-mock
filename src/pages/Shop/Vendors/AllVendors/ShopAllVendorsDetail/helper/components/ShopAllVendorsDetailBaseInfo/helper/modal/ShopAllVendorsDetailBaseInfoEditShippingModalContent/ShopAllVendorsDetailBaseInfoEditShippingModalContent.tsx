import { Col, Form, Row } from "antd";

import { CustomInputNumber } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ShopAllVendorsDetailBaseInfoEditShippingModalContentProps } from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailBaseInfo/helper/modal/ShopAllVendorsDetailBaseInfoEditShippingModalContent/@types/@shopAllVendorsDetailBaseInfoEditShippingModalContent";

const ShopAllVendorsDetailBaseInfoEditShippingModalContent = ({
  form,
}: ShopAllVendorsDetailBaseInfoEditShippingModalContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-5" layout="vertical">
      <CustomDivider text="ارسال به تهران" />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="tehranShippingCost"
            label="هزینه ارسال"
            placeholder="وارد نمایید"
            addonAfter="تومان"
            isPrice
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="tehranMinShippingDays"
            label="حداقل زمان ارسال"
            placeholder="وارد نمایید"
            addonAfter="روز کاری"
            min={1}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="tehranMaxShippingDays"
            label="حداکثر زمان ارسال"
            placeholder="وارد نمایید"
            addonAfter="روز کاری"
            min={1}
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>

      <CustomDivider text="ارسال به شهرستان" />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="otherCitiesShippingCost"
            label="هزینه ارسال"
            placeholder="وارد نمایید"
            addonAfter="تومان"
            isPrice
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="otherCitiesMinShippingDays"
            label="حداقل زمان ارسال"
            placeholder="وارد نمایید"
            addonAfter="روز کاری"
            min={1}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col xs={24} md={8}>
          <CustomInputNumber
            name="otherCitiesMaxShippingDays"
            label="حداکثر زمان ارسال"
            placeholder="وارد نمایید"
            addonAfter="روز کاری"
            min={1}
            rules={[REQUIRED_RULE]}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ShopAllVendorsDetailBaseInfoEditShippingModalContent;
