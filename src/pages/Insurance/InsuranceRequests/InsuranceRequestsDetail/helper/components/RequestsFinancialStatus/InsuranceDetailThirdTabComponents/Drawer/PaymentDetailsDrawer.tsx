import { useEffect } from "react";

import { Row, Tag } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetPaymentDetailsDrawerDataQuery } from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import { DataDrawerProps } from "./@types/@drawer";
import "./_paymentDetailsDrawer.scss";

const PaymentDetailsDrawer = ({ title, onClose, id }: DataDrawerProps) => {
  //? ================================  Api Calls ================================
  const [
    getPaymentDetailsDrawerData,
    { data: paymentDetailsDrawerData, isFetching: isPaymentDetailsDrawerLoading },
  ] = useLazyGetPaymentDetailsDrawerDataQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id >= 1) {
      getPaymentDetailsDrawerData(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isPaymentDetailsDrawerLoading}>
      <CustomDrawerHeader title="جزئیات پرداخت" closeDrawerHandler={onClose} />
      <div>
        <div className="drawer-container">
          <div className="payment-type-cash-child-wrapper">
            <h3 className="title">{title}</h3>
            <Tag color="green">پرداخت شده</Tag>
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="مبلغ (تومان)"
              value={paymentDetailsDrawerData?.data?.price}
              isPrice
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="تاریخ تسویه"
              value={paymentDetailsDrawerData?.data?.settlementDate}
              isDate
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="تاریخ سر رسید"
              value={paymentDetailsDrawerData?.data?.dueDate}
              isDate
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="جریمه دیرکرد"
              value={paymentDetailsDrawerData?.data?.penalty}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="روش پرداخت"
              value={paymentDetailsDrawerData?.data?.paymentMethod}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="شناسه درگاه"
              value={paymentDetailsDrawerData?.data?.portId}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="شماره پیگیری"
              value={paymentDetailsDrawerData?.data?.issueTracking}
            />

            <SingleVerticalWithCol
              xl={12}
              lg={12}
              md={12}
              sm={24}
              label="شماره فاکتور"
              value={paymentDetailsDrawerData?.data?.factorNum}
            />
          </Row>
        </div>
      </div>
    </Div>
  );
};

export default PaymentDetailsDrawer;
