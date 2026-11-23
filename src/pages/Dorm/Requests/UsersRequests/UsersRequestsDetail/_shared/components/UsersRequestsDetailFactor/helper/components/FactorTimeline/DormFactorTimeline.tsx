import { Row } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GetDormRequestPaymentInvoicePaymentStatus } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";

const dormFactorPayedStatus = {
  paid: 1, //پرداخت شده
  notPayed: 2, // پرداخت نشده
  overdue: 3, // سررسید شده
  notDue: 4, // سررسید نشده
};

const DormFactorStatusGenerator = ({ status }: { status: number }) => {
  switch (status) {
    case (status = dormFactorPayedStatus.overdue):
      return <CustomTag color="red">سر رسید شده</CustomTag>;
    case (status = dormFactorPayedStatus.paid):
      return <CustomTag color="green">پرداخت شده</CustomTag>;
    case (status = dormFactorPayedStatus.notPayed):
      return <CustomTag color="default">قسط آتی</CustomTag>;
  }
};

const titleGenerator: Record<number, string> = {
  1: "قسط اول",
  2: "قسط دوم",
  3: "قسط سوم",
  4: "قسط چهارم",
  5: "قسط پنجم",
  6: "قسط ششم",
  7: "قسط هفتم",
  8: "قسط هشتم",
  9: "قسط نهم",
  10: "قسط دهم",
};

const DormFactorTimeline = ({
  paymentStatus,
  paymentDetailHandler,
}: {
  paymentStatus: GetDormRequestPaymentInvoicePaymentStatus[];
  paymentDetailHandler: (
    records: GetDormRequestPaymentInvoicePaymentStatus,
    title: string
  ) => void;
}) => {
  return paymentStatus.map((item, index) => {
    const title = titleGenerator[index + 1];
    return {
      className:
        item?.statusNumber === dormFactorPayedStatus.paid
          ? "paid-root-container"
          : item?.statusNumber === dormFactorPayedStatus.overdue
            ? "overdue-paid-root-container"
            : item?.statusNumber === dormFactorPayedStatus.notPayed
              ? "not-due-root-container"
              : "",
      children: (
        <div className="debtors-title-wrapper-payment-status-section-container">
          <div className="title-wrapper-payment-status-section" key={item.id}>
            <div className="flag-wrapper">
              <h4>{title}</h4>
              <DormFactorStatusGenerator status={item?.statusNumber} />
            </div>
            {item?.statusNumber === dormFactorPayedStatus.paid ? (
              <CustomButton
                type="link"
                className="detail-btn-link"
                onClick={() => paymentDetailHandler(item, title)}
                icon={<FaCaretLeft />}
                iconPlacement="end"
              >
                جزئیات پرداخت
              </CustomButton>
            ) : null}
          </div>

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="مبلغ(تومان)"
              value={item?.amount?.toString()}
              isPrice
            />
            <SingleVerticalWithCol label="تاریخ سررسید" value={item?.dueDate} isDate />
            <SingleVerticalWithCol label="تاریخ تسویه" value={item?.paymentDate} isDate />
            {/* //todo[Atefeh]: uncomment when api got ready */}
            {/* <SingleVerticalWithCol
                  label="جریمه دیرکرد(تومان)"
                  value={item?.penalty}
                  isPrice
                /> */}
          </Row>
        </div>
      ),
      dot:
        item?.statusNumber === dormFactorPayedStatus.notPayed ? (
          <AiOutlineClockCircle />
        ) : null,
      color:
        item?.statusNumber === dormFactorPayedStatus.paid
          ? "green"
          : item?.statusNumber === dormFactorPayedStatus.overdue
            ? "red"
            : item?.statusNumber === dormFactorPayedStatus.notPayed
              ? "gray"
              : "",
    };
  });
};

export default DormFactorTimeline;
