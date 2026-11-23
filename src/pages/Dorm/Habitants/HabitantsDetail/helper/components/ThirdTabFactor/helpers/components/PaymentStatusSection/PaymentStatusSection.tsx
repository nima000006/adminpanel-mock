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

import { PaymentStatusSectionPropsType } from "../../../@types/@thirdTabFactorType";
import MoreDetailsDrawer from "../../drawer/MoreDetailsDrawer/MoreDetailsDrawer";
import CashPayment from "../CashPayment/CashPayment";
import "./_paymentStatusSection.scss";
const StatusGenerator = ({ status }: { status: string }) => {
  switch (status) {
    case (status = "PENDING_PAYMENT"):
      return <CustomTag color="orange">در انتظار پرداخت</CustomTag>;
    case (status = "PAYED"):
      return <CustomTag color="green">پرداخت شده</CustomTag>;
    case (status = "NOT_DUE"):
      return <CustomTag color="default">قسط آتی</CustomTag>;
  }
};

const PaymentStatusSection = ({
  data,
  opener,
  setter,
}: PaymentStatusSectionPropsType) => {
  //mock data
  const mockItem = [
    {
      id: 1,
      title: "قسط اول",
      status: "PAYED",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
    {
      id: 2,
      title: "قسط دوم",
      status: "PAYED",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
    {
      id: 3,
      title: "قسط سوم",
      status: "PAYED",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
    {
      id: 4,
      title: "مابه التفاوت جابجایی",
      status: "PENDING_PAYMENT",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
    {
      id: 5,
      title: "قسط چهارم",
      status: "NOT_DUE",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
    {
      id: 5,
      title: "قسط چهارم",
      status: "NOT_DUE",
      price: "300000",
      dueDate: "1403 / 05 / 05",
      settlementDate: "1403 / 05 / 08",
      penalty: "0",
    },
  ];

  //* ================================ Util Functions ================================
  const paymentDetailHandler = (id: number) => {
    setter({ isOpen: true, id: id });
  };

  const closeDrawerHandler = () => {
    setter({ isOpen: false, id: -1 });
  };

  const ItemsGenerator = (mockItem: any) => {
    return mockItem.map((item: any) => ({
      className:
        item?.status === "PAYED"
          ? "paid-root-container"
          : item?.status === "PENDING_PAYMENT"
            ? "pending-paid-root-container"
            : item?.status === "NOT_DUE"
              ? "not-due-root-container"
              : "",
      children: (
        <div className="flex flex-col gap-6">
          <div
            className="title-wrapper-payment-status-section flex justify-between"
            key={item.id}
          >
            <div className="flag-wrapper flex gap-4">
              <h4>{item?.title}</h4>
              <StatusGenerator status={item?.status} />
            </div>
            {item?.status === "PAYED" ? (
              <CustomButton
                type="link"
                className="detail-btn-link"
                onClick={() => paymentDetailHandler(item?.id)}
              >
                جزئیات پرداخت <FaCaretLeft />
              </CustomButton>
            ) : null}
          </div>

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="مبلغ(تومان)" value={mockItem?.price} isPrice />

            {item?.status !== "PENDING_PAYMENT" ? (
              <SingleVerticalWithCol
                label="تاریخ سررسید"
                value={mockItem?.dueDate}
                isDate
              />
            ) : null}

            <SingleVerticalWithCol
              label="تاریخ تسویه"
              value={mockItem?.settlementDate}
              isDate
            />

            {item?.status !== "PENDING_PAYMENT" ? (
              <SingleVerticalWithCol
                label="جریمه دیرکرد(تومان)"
                value={mockItem?.penalty}
                isPrice
              />
            ) : null}
          </Row>
        </div>
      ),
      dot: item?.status === "NOT_DUE" ? <AiOutlineClockCircle /> : null,
      color:
        item?.status === "PAYED"
          ? "green"
          : item?.status === "PENDING_PAYMENT"
            ? "orange"
            : item?.status === "NOT_DUE"
              ? "gray"
              : "",
    }));
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* payment detail drawer in factor */}
      {opener?.isOpen && (
        <CustomDrawer
          title="جزئیات پرداخت"
          open={opener?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={<MoreDetailsDrawer onClose={closeDrawerHandler} id={opener?.id} />}
        />
      )}

      <div className="flex flex-col gap-4">
        <CustomDivider text="وضعیت پرداخت" />
        {data === "اقساطی" ? (
          <CustomTimeline items={ItemsGenerator(mockItem)} />
        ) : (
          <CashPayment opener={opener} setter={setter} />
        )}
      </div>
    </>
  );
};
export default PaymentStatusSection;
