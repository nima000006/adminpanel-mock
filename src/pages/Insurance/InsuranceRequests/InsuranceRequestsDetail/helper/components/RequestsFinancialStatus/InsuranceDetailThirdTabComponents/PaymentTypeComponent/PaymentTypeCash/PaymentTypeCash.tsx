import { useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import "./_paymentTypeCash.scss";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { PriceSeparatorWithExtraNumbers } from "@infra/helpers/utils";

import { PaymentCashListType } from "./@types/@paymentTypeCash";
import PaymentDetailsDrawer from "../../Drawer/PaymentDetailsDrawer";

const PaymentTypeCash = ({ paymentTypeCashData }: PaymentCashListType) => {
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, id: -1 });

  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setOpenDrawer({ isOpen: true, id: id });
  };

  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="insurance-detail-payment-type-cash-container">
        <CustomDivider text="وضعیت پرداخت" />
        <div className="payment-type-cash-wrapper">
          <div className="payment-type-cash-child-wrapper">
            <h3 className="title">{paymentTypeCashData?.title}</h3>
            <div>
              <CustomTag color={"green"} className="status">
                پرداخت شده
              </CustomTag>
            </div>
          </div>
          <CustomButton
            type="link"
            className="detail-btn-link"
            onClick={() => {
              if (paymentTypeCashData?.id) {
                paymentDetailHandler(paymentTypeCashData?.id);
              }
            }}
            disabled={!paymentTypeCashData?.id}
          >
            جزئیات پرداخت <FaCaretLeft />
          </CustomButton>
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="مبلغ (تومان)"
            value={PriceSeparatorWithExtraNumbers(paymentTypeCashData?.amount ?? "-")}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ تسویه"
            value={paymentTypeCashData?.settlementDate}
            isDate
          />
        </Row>
      </div>
      {openDrawer?.isOpen && (
        <CustomDrawer
          title="جزئیات پرداخت"
          open={openDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <PaymentDetailsDrawer
              title="جزئیات پرداخت"
              onClose={closeDrawerHandler}
              id={openDrawer?.id}
            />
          }
        />
      )}
    </>
  );
};
export default PaymentTypeCash;
