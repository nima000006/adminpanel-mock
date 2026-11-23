import { Col, Row } from "antd";
import { Link } from "react-router";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { WALLET_BASIC_INFO_PAGE_ROUTE } from "@infra/router/routes/wallet";

import WalletTimeSettingCardInfo from "./helper/component/WaletTimeSettingCardInfo/WalletTimeSettingCardInfo";
import WalletTimeSettingSchedulingCardInfo from "./helper/component/WalletTimeSettingSchedulingCardInfo/WalletTimeSettingSchedulingCardInfo";

const WalletTimeSetting = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: <Link to={WALLET_BASIC_INFO_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "تنظیمات زمانی کیف پول",
      },
    ],
  });
  return (
    <div className="wallet-financial-setting-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <CustomSelect
            options={[]}
            // loading={}
            name="businessId"
            label="کسب و کار"
            placeholder="انتخاب کسب و کار"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <CustomSelect
            options={[]}
            // loading={}
            name="wallet"
            label="کیف پول"
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <WalletTimeSettingCardInfo />
        </Col>
        <Col span={24}>
          <WalletTimeSettingSchedulingCardInfo />
        </Col>
      </Row>
    </div>
  );
};
export default WalletTimeSetting;
