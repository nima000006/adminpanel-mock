import { Col, Row, Timeline } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { PiArrowLineDown, PiArrowLineUpRightLight } from "react-icons/pi";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_allWalletDetailsTransactionSegmentTimeLine.scss";

const userData = {
  name: "سینا سوجه",
  group: "کارمند",
  nationalNo: "0021116090",
  mobilNo: "0912 245 5910",
  id: 14435536,
  active: "فعال",
  walletId: 12,
  accountBalance: 12,
  totalDeposits: 2143,
  totalWithdrawal: 324,
  totalNumberOfTransactions: 234,
  averageMonthlyBalance: 23,
  averageMonthlyTransactionFrequency: 45,
  createDate: "2025-12-12T15:30:00Z",
};

const MyWalletTransactionSegmentTimeLine = () => {
  return (
    <div className="all-wallet-timeline-container">
      <Row>
        <Col span={12}>
          <CustomRangePicker name="date" />
        </Col>
      </Row>
      <Timeline
        items={[
          {
            dot: <PiArrowLineDown color="#389E0D" size={16} />,
            children: (
              <div className="timeline-item-container">
                <div className="item-container">
                  <div className="info-container">
                    <CustomTag color="green">
                      <PiArrowLineDown color="#52C41A" size={14} />
                      واریز
                    </CustomTag>
                    <span className="info-price-value">1,200,000 تومان</span>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">هدف تراکنش</span>
                    <CustomTag color="blue">شارژ کیف پول</CustomTag>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">نوع پول</span>
                    <CustomTag color="#ADC6FF">پول نقد</CustomTag>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">درگاه بانک پاسارگاد</span>
                    <GoArrowLeft color="#8C8C8C" size={16} />
                    <span className="info-text-value">کیف پول دانشجو</span>
                  </div>
                </div>
                <span>
                  {dataPlaceHolder({ data: userData?.createDate, isDate: true })}
                </span>
              </div>
            ),
          },
          {
            dot: <PiArrowLineUpRightLight color="#F5222D" size={16} />,
            children: (
              <div className="timeline-item-container">
                <div className="item-container">
                  <div className="info-container">
                    <CustomTag color="red">
                      <PiArrowLineUpRightLight color="#F5222D" size={14} />
                      برداشت
                    </CustomTag>
                    <span className="info-price-value">1,200,000 تومان</span>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">هدف تراکنش</span>
                    <CustomTag color="blue">شارژ کیف پول</CustomTag>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">نوع پول</span>
                    <CustomTag color="#ADC6FF">پول نقد</CustomTag>
                  </div>
                  <div className="info-container">
                    <span className="info-text-value">درگاه بانک پاسارگاد</span>
                    <GoArrowLeft color="#8C8C8C" size={16} />
                    <span className="info-text-value">کیف پول دانشجو</span>
                  </div>
                </div>
                <span>
                  {dataPlaceHolder({ data: userData?.createDate, isDate: true })}
                </span>
              </div>
            ),
          },
          {
            children: (
              <div className="create-step">
                <span>ایجاد کیف پول</span>
                <span>
                  {dataPlaceHolder({ data: userData?.createDate, isDate: true })}
                </span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MyWalletTransactionSegmentTimeLine;
