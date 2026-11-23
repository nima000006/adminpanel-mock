import { Col, Row } from "antd";
import { Link } from "react-router";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { WALLET_BASIC_INFO_PAGE_ROUTE } from "@infra/router/routes/wallet";

import FinancialSettingCardInfo from "./helper/component/FinancialSettingCardInfo/FinancialSettingCardInfo";
import "./_walletFinancialSettings.scss";

const mockData = [
  {
    id: 1,
    title: "حداقل موجودی",
    allocatedCount: "5000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 2,
    title: "حداکثر موجودی",
    allocatedCount: "5000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 3,
    title: "حداقل شارژ",
    allocatedCount: "10000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 4,
    title: "حداقل برداشت",
    allocatedCount: "10000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 5,
    title: "سقف شارژ روزانه",
    allocatedCount: "4000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 6,
    title: "سقف شارژ ماهانه",
    allocatedCount: "4000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 7,
    title: "سقف برداشت روزانه",
    allocatedCount: "4000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 8,
    title: "سقف برداشت ماهانه",
    allocatedCount: "4000000",
    date: "2025-10-04T11:25:19.650126971",
  },
  {
    id: 9,
    title: "محدودیت تراکنش‌های مشکوک",
    allocatedCount: "4000000",
    date: "2025-10-04T11:25:19.650126971",
  },
];
const WalletFinancialSettings = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: <Link to={WALLET_BASIC_INFO_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "تنظیمات مالی کیف پول",
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
        {mockData?.map((item) => {
          return (
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <FinancialSettingCardInfo
                title={item?.title}
                allocatedValue={item?.allocatedCount}
                dateValue={item?.date}
                id={item?.id}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default WalletFinancialSettings;
