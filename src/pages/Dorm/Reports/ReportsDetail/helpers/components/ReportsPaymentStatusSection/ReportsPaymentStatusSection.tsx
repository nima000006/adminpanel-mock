import { useState } from "react";

import { Row } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTimeline from "@components/Renderers/CustomTimeline/CustomTimeline";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import ReportsMoreDetailsDrawer from "../drawer/ReportsMoreDetailsDrawer/ReportsMoreDetailsDrawer";
import ReportsCashPaymentSection from "../ReportsCashPaymentSection/ReportsCashPaymentSection";
import "./_reportsPaymentStatusSection.scss";

const StatusGenerator = ({ status }: { status: string }) => {
  switch (status) {
    case (status = "OVERDUE"):
      return <CustomTag color="red">سر رسید شده</CustomTag>;
    case (status = "PAID"):
      return <CustomTag color="green">پرداخت شده</CustomTag>;
    case (status = "NOT_DUE"):
      return <CustomTag color="default">قسط آتی</CustomTag>;
  }
};

const ReportsPaymentStatusSection = ({ data }: { data: any }) => {
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, id: -1 });
  //mock data
  const mockItem = [
    {
      id: 1,
      title: "قسط اول",
      status: "PAID",
      price: "300000",
      dueDate: "2024-07-11T08:00:41.977Z",
      settlementDate: "2024-07-11T08:00:41.977Z",
      penalty: "0",
    },
    {
      id: 2,
      title: "قسط دوم",
      status: "OVERDUE",
      price: "300000",
      dueDate: "2024-07-11T08:00:41.977Z",
      settlementDate: "2024-07-11T08:00:41.977Z",
      penalty: "0",
    },
    {
      id: 3,
      title: "قسط سوم",
      status: "PAID",
      price: "300000",
      dueDate: "2024-07-11T08:00:41.977Z",
      settlementDate: "2024-07-11T08:00:41.977Z",
      penalty: "0",
    },
    {
      id: 4,
      title: "قسط چهارم",
      status: "NOT_DUE",
      price: "300000",
      dueDate: "2024-07-11T08:00:41.977Z",
      settlementDate: "2024-07-11T08:00:41.977Z",
      penalty: "10000",
    },
    {
      id: 5,
      title: "قسط چهارم",
      status: "NOT_DUE",
      price: "300000",
      dueDate: "2024-07-11T08:00:41.977Z",
      settlementDate: "2024-07-11T08:00:41.977Z",
      penalty: "0",
    },
  ];

  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setOpenDrawer({ isOpen: true, id: id });
  };

  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: -1 });
  };

  const ItemsGenerator = (mockItem: any) => {
    return mockItem.map((item: any) => ({
      className:
        item?.status === "PAID"
          ? "paid-root-container"
          : item?.status === "OVERDUE"
            ? "overdue-paid-root-container"
            : item?.status === "NOT_DUE"
              ? "not-due-root-container"
              : "",
      children: (
        <div className="debtors-title-wrapper-payment-status-section-container">
          <div className="title-wrapper-payment-status-section" key={item.id}>
            <div className="flag-wrapper">
              <h4>{item?.title}</h4>
              <StatusGenerator status={item?.status} />
            </div>
            {item?.status === "PAID" ? (
              <CustomButton
                type="link"
                className="detail-btn-link"
                onClick={() => paymentDetailHandler(item?.id)}
                icon={<FaCaretLeft />}
                iconPlacement="end"
              >
                جزئیات پرداخت
              </CustomButton>
            ) : null}
          </div>

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="مبلغ(تومان)" value={item?.price} isPrice />
            <SingleVerticalWithCol label="تاریخ سررسید" value={item?.dueDate} isDate />

            <SingleVerticalWithCol
              label="تاریخ تسویه"
              value={item?.settlementDate}
              isDate
            />
            <SingleVerticalWithCol
              label="جریمه دیرکرد(تومان)"
              value={item?.penalty}
              isPrice
            />
          </Row>
        </div>
      ),
      dot: item?.status === "NOT_DUE" ? <AiOutlineClockCircle /> : null,
      color:
        item?.status === "PAID"
          ? "green"
          : item?.status === "OVERDUE"
            ? "red"
            : item?.status === "NOT_DUE"
              ? "gray"
              : "",
    }));
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* payment detail drawer in factor */}
      <CustomDrawer
        title="جزئیات پرداخت"
        open={openDrawer?.isOpen}
        onClose={closeDrawerHandler}
        closeIcon={<AiOutlineClose />}
        content={
          <ReportsMoreDetailsDrawer onClose={closeDrawerHandler} id={openDrawer?.id} />
        }
      />

      <div className="debtors-payment-status-section-container">
        <CustomDivider text="وضعیت پرداخت" />
        {data === "اقساطی" ? (
          <CustomTimeline items={ItemsGenerator(mockItem)} />
        ) : (
          <ReportsCashPaymentSection opener={openDrawer} setter={setOpenDrawer} />
        )}
      </div>
    </>
  );
};
export default ReportsPaymentStatusSection;
