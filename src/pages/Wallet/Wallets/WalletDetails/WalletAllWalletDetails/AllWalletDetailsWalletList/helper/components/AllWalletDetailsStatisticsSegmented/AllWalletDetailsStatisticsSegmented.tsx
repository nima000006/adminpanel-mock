import { Col, Row } from "antd";
import { CiCalendar } from "react-icons/ci";
import {
  PiArrowLineDown,
  PiArrowLineUpRightLight,
  PiArrowsLeftRight,
  PiWaveformLight,
} from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import "./_allWalletDetailsStatisticsSegmented.scss";
const AllWalletDetailsStatisticsSegmented = () => {
  return (
    <div>
      <CustomDivider text="نمودار" />
      <CustomDivider text="آمارهای کلی" />
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <WalletDetailCards
            title="مجموع واریزی‌ها"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowLineDown color="#52C41A" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="مجموع برداشت‌ها"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowLineUpRightLight color="#F5222D" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="تعداد کل تراکنش‌ها"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowsLeftRight color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="میانگین موجودی ماهانه"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<CiCalendar color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="میانگین فرکانس تراکنش در ماه"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiWaveformLight color="#262626" size={16} />}
          />
        </Col>
      </Row>

      <CustomDivider text="واریزی ها" />
      <Row>
        <Col span={6}>
          <WalletDetailCards
            title="برداشت از کیف پول"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowLineUpRightLight color="#F5222D" size={16} />}
          />
        </Col>
      </Row>
      <CustomDivider text="تراکنش‌ها" />
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <WalletDetailCards
            title="تراکنش‌های شارژ کیف پول"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowsLeftRight color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="تراکنش های برداشت از کیف پول"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowsLeftRight color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="تراکنش‌های تسهیم درآمد"
            price={dataPlaceHolder({ data: "525522", isPrice: true })}
            icon={<PiArrowsLeftRight color="#262626" size={16} />}
          />
        </Col>
      </Row>
    </div>
  );
};
export default AllWalletDetailsStatisticsSegmented;
