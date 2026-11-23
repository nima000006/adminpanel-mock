import { Col, Row } from "antd";
import { Link } from "react-router";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { WALLET_BASIC_INFO_PAGE_ROUTE } from "@infra/router/routes/wallet";

import SettingTransactionWalletCardInfo from "./helper/components/SettingTransactionWalletCardInfo/SettingTransactionWalletCardInfo";

const mockData = [
  {
    id: 1,
    title: "سقف تعداد تراکنش روزانه",
    date: "2025-10-04T11:25:19.650126971",
    countTransaction: 100,
    isAllocated: true,
    isMaxPrice: false,
    isStatus: false,
  },
  {
    id: 2,
    title: "سقف تعداد تراکنش ماهانه",
    date: "2025-10-04T11:25:19.650126971",
    countTransaction: 100,
    isAllocated: true,
    isMaxPrice: false,
    isStatus: false,
  },
  {
    id: 3,
    title: "نیازمند تأیید برای برداشت",
    status: true,
    maxPrice: "10000000",
    date: "2025-10-04T11:25:19.650126971",
    isAllocated: false,
    isMaxPrice: true,
    isStatus: true,
  },
  {
    id: 4,
    title: "امکان انتقال به کیف پول دیگر",
    status: true,
    date: "2025-10-04T11:25:19.650126971",
    isAllocated: false,
    isMaxPrice: false,
    isStatus: true,
  },
  {
    id: 5,
    title: "امکان شارژ کیف پول",
    status: false,
    date: "2025-10-04T11:25:19.650126971",
    isAllocated: false,
    isMaxPrice: false,
    isStatus: true,
  },
  {
    id: 6,
    title: "امکان برداشت از کیف پول",
    status: false,
    date: "2025-10-04T11:25:19.650126971",
    isAllocated: false,
    isMaxPrice: false,
    isStatus: true,
  },
  {
    id: 7,
    title: "امکان برداشت به حساب دیگر",
    status: true,
    date: "2025-10-04T11:25:19.650126971",
    isAllocated: false,
    isMaxPrice: false,
    isStatus: true,
  },
];
const SettingTransactionWallet = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: <Link to={WALLET_BASIC_INFO_PAGE_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "تنظیمات تراکنش‌های کیف پول",
      },
    ],
  });
  return (
    <div>
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
              <SettingTransactionWalletCardInfo
                id={item?.id}
                title={item.title}
                maxPrice={item.maxPrice}
                dateValue={item.date}
                statusValue={item?.status}
                countTransaction={item?.countTransaction}
                isAllocated={item?.isAllocated}
                isMaxPrice={item?.isMaxPrice}
                isStatus={item?.isStatus}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default SettingTransactionWallet;
