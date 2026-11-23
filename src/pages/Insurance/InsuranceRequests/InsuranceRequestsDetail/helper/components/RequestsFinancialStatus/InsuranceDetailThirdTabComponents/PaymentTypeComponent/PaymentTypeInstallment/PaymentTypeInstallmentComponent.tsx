import { useState } from "react";

import { Row, TimelineItemProps } from "antd";
import { AiFillFlag, AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTimeline from "@components/Renderers/CustomTimeline/CustomTimeline";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { PriceSeparatorWithExtraNumbers } from "@infra/helpers/utils";

import { PaymentTypeStepsDataListType } from "./@types/@paymentTypeInstallmentComponent";
import { PaymentTypeStepsDataType } from "../../../@types/requestsFinancialStatus";
import PaymentDetailsDrawer from "../../Drawer/PaymentDetailsDrawer";
import "./_paymentTypeInstallmentComponent.scss";

const StatusGenerator = ({ status }: { status: string }) => {
  switch (status) {
    case (status = "PENDING_PAYMENT"):
      return <CustomTag color="orange">در انتظار پرداخت</CustomTag>;
    case (status = "PAYED"):
      return <CustomTag color="green">پرداخت شده</CustomTag>;
    case (status = "OVERDUE"):
      return <CustomTag color="magenta">سر رسید شده</CustomTag>;
    case (status = "NOT_DUE"):
      return <CustomTag color="default">قسط آتی</CustomTag>;
    case (status = "SUSPENDED"):
      return <CustomTag color="red">ابطال شده</CustomTag>;
  }
};

const PaymentTypeInstallmentComponent = ({
  paymentTypeStepsData,
}: PaymentTypeStepsDataListType) => {
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, id: -1 });

  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setOpenDrawer({ isOpen: true, id: id });
  };

  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: -1 });
  };

  const timelineItem: (item: PaymentTypeStepsDataType) => TimelineItemProps = (
    item: any
  ) => {
    if (!item?.id) {
      return {
        children: <div>{item?.children}</div>,
        dot: item?.icon,
      };
    }
    return {
      className:
        item?.status === "PAYED"
          ? "paid-root-container"
          : item?.status === "PENDING_PAYMENT"
            ? "pending-paid-root-container"
            : item?.status === "OVERDUE"
              ? "over-due-root-container"
              : item?.status === "SUSPENDED"
                ? "suspended-root-container"
                : "",
      children: (
        <>
          <div className={`insurance-payment-type-timeline-title ${item?.status}`}>
            <div className="title">
              <h3>{item?.title}</h3>
              <div className="flag-wrapper">
                <StatusGenerator status={item?.status} />
              </div>
            </div>
            {item?.status === "PAYED" ? (
              <CustomButton
                type="link"
                className="detail-btn-link"
                onClick={() => paymentDetailHandler(item?.id)}
              >
                جزئیات پرداخت <FaCaretLeft />
              </CustomButton>
            ) : (
              <CustomButton
                type="link"
                className="detail-btn-link"
                onClick={() => paymentDetailHandler(item?.id)}
                disabled={true}
              >
                جزئیات پرداخت <FaCaretLeft />
              </CustomButton>
            )}
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="مبلغ (تومان)"
              value={PriceSeparatorWithExtraNumbers(item?.amount)}
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ تسویه"
              value={item?.settlementDate}
              isDate
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ سر رسید"
              value={item?.dueDate}
              isDate
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="جریمه دیرکرد"
              value={item?.lateFees}
            />
          </Row>
        </>
      ),

      dot: item?.status === "NOT_DUE" ? <AiOutlineClockCircle /> : null,
      color:
        item?.status === "PAYED"
          ? "green"
          : item?.status === "PENDING_PAYMENT"
            ? "orange"
            : item?.status === "OVERDUE"
              ? "#ff4d4f"
              : item?.status === "NOT_DUE"
                ? "gray"
                : item?.status === "SUSPENDED"
                  ? "red"
                  : "",
    };
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="insurance-detail-payment-type-installment-component-container">
      <CustomDivider text="وضعیت پرداخت" />
      <CustomTimeline
        className={`payment-type-installment-component-container`}
        items={[
          ...paymentTypeStepsData,
          {
            children: "پایان اقساط",
            icon: <AiFillFlag className="flag-icon" />,
          } as PaymentTypeStepsDataType,
        ]?.map((item: PaymentTypeStepsDataType) => timelineItem(item))}
      />

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
    </div>
  );
};
export default PaymentTypeInstallmentComponent;
