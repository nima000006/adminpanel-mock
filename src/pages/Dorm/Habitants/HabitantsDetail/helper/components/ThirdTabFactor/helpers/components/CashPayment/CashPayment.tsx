import { Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { CashPaymentPropsType } from "../../../@types/@thirdTabFactorType";
import "./_cashPayment.scss";
const CashPayment = ({ opener, setter }: CashPaymentPropsType) => {
  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setter({ isOpen: true, id: id });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-payment-cash-container body-regular!">
      <div>
        <div className="title-wrapper-payment-cash">
          <div className="flag-wrapper mb-6! flex gap-2!">
            <h4>پرداخت نقدی</h4>
            <CustomTag color="green">پرداخت شده</CustomTag>
          </div>
          <CustomButton
            type="link"
            className="detail-btn-link"
            onClick={() => paymentDetailHandler(opener?.id)}
          >
            جزئیات پرداخت <FaCaretLeft />
          </CustomButton>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="مبلغ(تومان)" value={"1400000"} isPrice />
          <SingleVerticalWithCol label="تاریخ تسویه" value={"1403 / 03 /01"} />
        </Row>
      </div>

      <div className="mt-8!">
        <div className="flex justify-between">
          <div className="flag-wrapper">
            <h4>مابه التفاوت جابجایی</h4>
            <CustomTag color="gold">در انتظار پرداخت</CustomTag>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="مبلغ(تومان)" value={"1400000"} isPrice />
          <SingleVerticalWithCol label="تاریخ تسویه" value={"1403 / 03 /01"} />
        </Row>
      </div>
    </div>
  );
};
export default CashPayment;
