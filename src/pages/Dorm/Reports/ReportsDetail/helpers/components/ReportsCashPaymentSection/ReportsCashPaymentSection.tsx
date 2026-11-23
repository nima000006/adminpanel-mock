import { Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { ReportsCashPaymentSectionProps } from "../@types/@reportDetailType";
import "./_reportsCashPaymentSection.scss";

const mockData = {
  title: "پرداخت نقدی",
  tag: 0, // پرداخت شده
  price: "2000000",
  settlementDate: "2024-07-11T08:00:41.977Z",
};

const ReportsCashPaymentSection = ({
  opener,
  setter,
}: ReportsCashPaymentSectionProps) => {
  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setter({ isOpen: true, id: id });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="reports-debtors-cash-payment-container">
      <div>
        <div className="title-wrapper-payment-cash">
          <div className="flag-wrapper">
            <h4>{mockData?.title}</h4>
            <CustomTag color={mockData?.tag === 0 ? "green" : "red"}>
              {mockData?.tag === 0 ? "پرداخت شده" : "پرداخت نشده"}
            </CustomTag>
          </div>
          {/* If it was paid, show detail payment button */}
          {mockData?.tag === 0 ? (
            <CustomButton
              type="link"
              className="detail-btn-link"
              onClick={() => paymentDetailHandler(opener?.id)}
              icon={<FaCaretLeft />}
              iconPlacement="end"
            >
              جزئیات پرداخت
            </CustomButton>
          ) : null}
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="مبلغ(تومان)" value={mockData?.price} isPrice />
          <SingleVerticalWithCol
            label="تاریخ تسویه"
            value={mockData?.settlementDate}
            isDate
          />
        </Row>
      </div>
    </div>
  );
};
export default ReportsCashPaymentSection;
