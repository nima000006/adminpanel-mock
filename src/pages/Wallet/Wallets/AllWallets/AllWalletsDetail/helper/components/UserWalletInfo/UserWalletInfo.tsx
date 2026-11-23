import { useEffect } from "react";

import { Col, Row } from "antd";
import {
  // PiArrowLineDown,
  // PiArrowLineUpRightLight,
  // PiArrowsLeftRight,
  // PiWaveformLight,
  PiWallet,
} from "react-icons/pi";
// import { CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router";

import Avatar from "@assets/images/Avatar.webp";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
  MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/management";
import { useLazyGetPersonalWalletsDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import {
  WALLET_STATUS_COLOR,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { staffTypeMap } from "./helpers/utils";

const UserWalletInfo = () => {
  const { params } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getUserWalletDetail, { data: userData, isFetching: isGetUserDataLoading }] =
    useLazyGetPersonalWalletsDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params.id) {
      getUserWalletDetail({ uuid: params.id });
    }
  }, [params.id]);
  // ================================ Utils function ================================
  const handleProfileClick = () => {
    const uniqueTypes = [...new Set(userData?.staffTypes || [])];
    let prevPath: string | undefined;

    if (uniqueTypes.length === 1) {
      const type = uniqueTypes[0];
      if (type === "STUDENT") prevPath = MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE;
      else if (type === "ADMIN") prevPath = MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE;
      else if (type === "EMPLOYEE") prevPath = MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE;
    }

    navigate(
      {
        pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
        search: makeSearchParams({ id: userData?.userId }),
      },
      { state: prevPath ? { prevPath } : undefined }
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetUserDataLoading} className="user-info-wrapper">
      <div className="user-wallet-info-container">
        <img src={Avatar} alt="user-image" className="user-img" />
        <div className="text-profile-button-container">
          <div className="text-container">
            <div className="text-user-name-container">
              <span className="user-name">
                {dataPlaceHolder({ data: userData?.firstName })}{" "}
                {dataPlaceHolder({ data: userData?.lastName })}
              </span>
              {[...new Set(userData?.staffTypes || [])].map((item) => {
                const { label, color, icon } = staffTypeMap[item] || staffTypeMap.ADMIN;
                return (
                  <CustomTag key={item} color={color} icon={icon} className="custom-tag">
                    {dataPlaceHolder({ data: label })}
                  </CustomTag>
                );
              })}
            </div>
            <div className="text-item-container">
              <span className="title">کد ملی</span>
              <span className="value">
                {dataPlaceHolder({ data: userData?.username })}
              </span>
            </div>
            <div className="text-item-container">
              <span className="title">شماره همراه</span>
              <span className="value">
                {dataPlaceHolder({ data: userData?.mobileNumber })}
              </span>
            </div>
          </div>
          <CustomButton onClick={handleProfileClick}>پروفایل کاربر</CustomButton>
        </div>
      </div>
      <Row gutter={[16, 16]} className="wallet-info-container">
        <Col span={24} className="wallet-id-container">
          <div className="wallet-id-items">
            <span>شناسه کیف پول</span>
            <span className="wallet-id">
              {dataPlaceHolder({ data: userData?.walletUuid })}
            </span>
            {userData?.walletStatus?.walletStatusId ? (
              <CustomTag
                color={WALLET_STATUS_COLOR[userData.walletStatus.walletStatusId]}
              >
                {WALLET_STATUS_TEXT[userData.walletStatus.walletStatusId]}
              </CustomTag>
            ) : (
              <CustomTag>-</CustomTag>
            )}
          </div>
          <div className="wallet-id-items">
            <CustomButton disabled>تنظیمات کیف پول</CustomButton>
            <CustomButton disabled danger>
              تغییر وضعیت
            </CustomButton>
          </div>
        </Col>
        <Col lg={8} md={12} xs={24}>
          <WalletDetailCards
            title="موجودی فعلی"
            price={dataPlaceHolder({
              data: userData?.money?.totalAmount?.toString(),
              isPrice: true,
              isRial: true,
            })}
            icon={<PiWallet color="#262626" size={16} />}
          />
        </Col>
        {/* //Todo[Atefeh]: uncomment when api got ready */}
        {/* <Col span={6}>
          <WalletDetailCards
            title="مجموع واریزی‌ها"
            price="525522"
            icon={<PiArrowLineDown color="#52C41A" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="مجموع برداشت‌ها"
            price="525522"
            icon={<PiArrowLineUpRightLight color="#F5222D" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="تعداد کل تراکنش‌ها"
            price="525522"
            icon={<PiArrowsLeftRight color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="میانگین موجودی ماهانه"
            price="525522"
            icon={<CiCalendar color="#262626" size={16} />}
          />
        </Col>
        <Col span={6}>
          <WalletDetailCards
            title="میانگین فرکانس تراکنش در ماه"
            price="525522"
            icon={<PiWaveformLight color="#262626" size={16} />}
          />
        </Col> */}
      </Row>
    </Div>
  );
};

export default UserWalletInfo;
