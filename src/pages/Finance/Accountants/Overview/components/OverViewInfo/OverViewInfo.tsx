import { Card, Col, Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import "./_overViewInfo.scss";
import AmountBox from "@pages/Finance/Accountants/_shared/components/AmountBox/AmountBox";

export const mockDataAmount: any = {
  totalBusiness: "15",
  totalStakeHolders: "40",
  totalServices: "7",
  endOfBalance: "100000000000",
  accountsPayable: "99000000000",
  debit: "1000000000",
  openingBalance: "1000000000",
  percentage: "25",
};
const OverViewInfo = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="overview-info-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="custom-card" title="تعداد کل کسب و کارها">
            {mockDataAmount.totalBusiness}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="custom-card" title="تعداد کل ذینفعان">
            {mockDataAmount.totalStakeHolders}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="custom-card" title="تعداد کل سرویس‌ها">
            {mockDataAmount.totalServices}
          </Card>
        </Col>
      </Row>

      <div>
        <CustomDivider
          className="custom-divider"
          text="گردش مالی"
          titlePlacement="center"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AmountBox
            title="مانده انتهای دوره"
            price={mockDataAmount?.endOfBalance}
            hasTag={mockDataAmount?.endOfBalance > 0 ? true : false}
            tagDetail="بستانکار"
            color="green"
          />
          <AmountBox
            title="مطالبات ذینفعان (‌بستانکاری)"
            price={mockDataAmount?.accountsPayable}
            hasTag={false}
          />
          <AmountBox
            title="تعهدات ذینفعان (بدهکاری)"
            price={mockDataAmount?.debit}
            hasTag={false}
          />
          <AmountBox
            title="مانده ابتدای دوره"
            price={mockDataAmount?.openingBalance}
            hasTag={mockDataAmount?.openingBalance > 0 ? true : false}
            tagDetail="بدهکار"
            color="red"
          />
        </div>
      </div>

      <div>
        <CustomDivider
          className="custom-divider"
          text="وضعیت پرداخت اسناد"
          titlePlacement="center"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <AmountBox
            title="غیر قابل پرداخت"
            price={mockDataAmount?.openingBalance}
            hasPercentage={true}
            percentage={mockDataAmount?.percentage}
          />
          <AmountBox
            title="قابل پرداخت"
            price={mockDataAmount?.openingBalance}
            hasPercentage={true}
            percentage={mockDataAmount?.percentage}
          />
          <AmountBox
            title="در صف پرداخت"
            price={mockDataAmount?.openingBalance}
            hasPercentage={true}
            percentage={mockDataAmount?.percentage}
          />
          <AmountBox
            title="پرداخت شده"
            price={mockDataAmount?.openingBalance}
            hasPercentage={true}
            percentage={mockDataAmount?.percentage}
          />
        </div>
      </div>
    </div>
  );
};
export default OverViewInfo;
