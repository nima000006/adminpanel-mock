import { useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";

import PaymentToUserContentDrawer from "../../../drawer/PaymentToUserContentDrawer/PaymentToUserContentDrawer";
import "./_accountInfo.scss";

const AccountInfo = ({ data }: any) => {
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, id: -1 });
  const [form] = Form.useForm();
  //* ================================ Util Functions ================================
  const payedBtnHandler = (id: number) => {
    setOpenDrawer({ isOpen: true, id });
  };

  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: -1 });
  };

  form.setFieldsValue({
    accountNum: data?.accountNum,
    cardNum: data?.cardNum,
    iban: data?.iban,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openDrawer?.isOpen && (
        <CustomDrawer
          open={openDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <PaymentToUserContentDrawer
              closeDrawer={closeDrawerHandler}
              id={openDrawer?.id}
            />
          }
        />
      )}

      <Form form={form} className="creators-account-info-container">
        <Row gutter={[16, 16]}>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره حساب"
              name="accountNum"
              placeholder="شماره حساب"
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="شماره کارت"
              name="cardNum"
              placeholder="شماره کارت"
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CustomInput
              suffix={<span>IR</span>}
              type="text"
              label="شماره شبا"
              name="iban"
              placeholder="شماره شبا"
            />
          </Col>
          <Col lg={6} md={12} sm={12} xs={24}>
            <CustomButton type="primary" onClick={() => payedBtnHandler(openDrawer?.id)}>
              پرداخت شد
            </CustomButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default AccountInfo;
