import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { MoreDetailsDrawerPropsType } from "../../../@types/@thirdTabFactorType";

const mockData = {
  price: "4200000",
  settlementDate: "2024-07-11T08:00:41.977Z",
  dueDate: "2024-07-11T08:00:41.977Z",
  penalty: "0",
  paymentType: "درگاه بانکی",
  portId: "12345678",
  factorNum: "12345",
  trackingNum: "123456789012",
};

const MoreDetailsDrawer = ({ onClose }: MoreDetailsDrawerPropsType) => {
  return (
    <Div>
      <CustomDrawerHeader title="جزئیات پرداخت" closeDrawerHandler={onClose} />
      <div>
        <div className="mb-1 flex gap-2">
          <h3 className="title">قسط اول</h3>
          <CustomTag color="green">پرداخت شده</CustomTag>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="مبلغ (تومان)"
            value={mockData?.price}
            isPrice
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="تاریخ تسویه"
            value={mockData?.settlementDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="تاریخ سر رسید"
            value={mockData?.dueDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="جریمه دیرکرد"
            value={mockData?.penalty}
            isPrice
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="روش پرداخت"
            value={mockData?.paymentType}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="شناسه درگاه"
            value={mockData?.portId}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="شماره فاکتور"
            value={mockData?.factorNum}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="شماره پیگیری"
            value={mockData?.trackingNum}
          />
        </Row>
      </div>
    </Div>
  );
};
export default MoreDetailsDrawer;
