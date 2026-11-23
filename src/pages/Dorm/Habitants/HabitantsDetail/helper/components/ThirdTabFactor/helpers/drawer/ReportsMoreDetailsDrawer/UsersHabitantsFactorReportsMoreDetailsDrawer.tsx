import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { payedStatus } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";

import { HabitantsFactorReportsMoreDetailsDrawerProps } from "../../../@types/@thirdTabFactorType";

const HabitantsFactorReportsMoreDetailsDrawer = ({
  onClose,
  data,
}: HabitantsFactorReportsMoreDetailsDrawerProps) => {
  return (
    <Div>
      <CustomDrawerHeader title="جزئیات پرداخت" closeDrawerHandler={onClose} />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <h3 className="title">{data?.title}</h3>
          <CustomTag
            color={`${data?.statusNumber === payedStatus.payed ? "green" : "gold"}`}
          >
            {data?.statusNumber === payedStatus.payed ? "پرداخت شده" : "در انتظار پرداخت"}
          </CustomTag>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="مبلغ (تومان)"
            value={data?.amount?.toString()}
            isPrice
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="تاریخ تسویه"
            value={data?.paymentDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="تاریخ سر رسید"
            value={data?.dueDate}
            isDate
          />

          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="جریمه دیرکرد"
            value={""}
            isPrice
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="روش پرداخت"
            value={data?.paymentType === 1 ? "آنلاین" : ""}
          />
          <SingleVerticalWithCol xl={8} lg={8} md={12} label="شناسه درگاه" value={""} />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="شماره فاکتور"
            value={data?.invoiceId}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="شماره پیگیری"
            value={data?.trackNumber?.toString()}
          />
        </Row>
      </div>
    </Div>
  );
};
export default HabitantsFactorReportsMoreDetailsDrawer;
