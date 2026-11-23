import { useEffect } from "react";

import { Col, Descriptions, DescriptionsProps, Row } from "antd";
import { BiSolidWalletAlt } from "react-icons/bi";
import { PiArrowLineUpRightLight } from "react-icons/pi";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTagWithHorizontalDiffDays from "@components/Renderers/CustomTagWithHorizontalDiffDays/CustomTagWithHorizontalDiffDays";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder, formatByGroups } from "@infra/helpers/utils";
import { useLazyGetMyWalletWithdrawalDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { samimServiceNameConvertor } from "@pages/Finance/_shared/utils";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import { WALLET_REQUEST_STATUS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MyWalletDetailsWithdrawWalletDrawerContentProps } from "./@types/@myWalletDetailswithdrawWalletDrawerContentTypes";

import "./_myWalletDetailsWithdrawWalletDrawerContent.scss";

const MyWalletDetailsWithdrawWalletDrawerContent = ({
  closeDrawerHandler,
  id,
}: MyWalletDetailsWithdrawWalletDrawerContentProps) => {
  //? ================================  Api Calls ================================
  const [
    getWithdrawalDetail,
    { data: withdrawalData, isFetching: isWithdrawalDetailLoading },
  ] = useLazyGetMyWalletWithdrawalDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getWithdrawalDetail({ withdrawalId: id });
    }
  }, [id]);

  const optionalAccountItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شماره کارت",
      children: dataPlaceHolder({
        data: formatByGroups(withdrawalData?.userStaffDetail?.bankAccount?.cardNumber),
      }),
    },
    {
      key: "2",
      label: "شماره شبا",
      children: dataPlaceHolder({
        data: withdrawalData?.userStaffDetail?.bankAccount?.iban,
      }),
    },
    {
      key: "3",
      label: "شماره حساب",
      children: withdrawalData?.userStaffDetail?.bankAccount?.accountNumber,
    },
    {
      key: "4",
      label: "نام بانک",
      children: withdrawalData?.userStaffDetail?.bankAccount?.bankName,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isWithdrawalDetailLoading}
      className="my-wallet-detail-withdraw-wallet-drawer-content-container"
    >
      <CustomDrawerHeader
        title="جزئیات بیشتر درخواست"
        closeDrawerHandler={closeDrawerHandler}
      />
      <div className="withdraw-wallet-drawer-content-wrapper">
        {withdrawalData?.status === WALLET_REQUEST_STATUS.REQUESTED ? (
          <CustomAlert
            showIcon
            title="درخواست شما در انتظار بررسی می‌باشد!"
            type="warning"
            className="custom-alert"
          />
        ) : withdrawalData?.status === WALLET_REQUEST_STATUS.REJECTED ? (
          <div className="rejected-alert">
            <CustomAlert
              showIcon
              title="درخواست شما رد شده است!"
              type="error"
              className="custom-alert"
            />
            <CustomAlert
              showIcon
              title="علت رد درخواست"
              description={withdrawalData?.description}
              type="error"
              className="custom-alert"
            />
          </div>
        ) : withdrawalData?.status === WALLET_REQUEST_STATUS.ACCEPTED ? (
          <CustomAlert
            showIcon
            title="درخواست شما مورد تأیید قرار گرفت!"
            type="success"
            className="custom-alert"
          />
        ) : null}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <WalletDetailCards
              title="مبلغ درخواست"
              price={dataPlaceHolder({
                data: withdrawalData?.requestAmount?.toString(),
                isPrice: true,
                isRial: true,
              })}
              icon={<PiArrowLineUpRightLight color="#F5222D" size={16} />}
            />
          </Col>
          <Col span={12}>
            <WalletDetailCards
              title="موجودی در زمان ثبت درخواست"
              price={dataPlaceHolder({
                data: withdrawalData?.currentBalance?.toString(),
                isPrice: true,
                isRial: true,
              })}
              icon={<BiSolidWalletAlt color="var(--app-text)" size={16} />}
            />
          </Col>
        </Row>
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              withdrawalData?.status === WALLET_REQUEST_STATUS.REQUESTED ? (
                <CustomTagWithHorizontalDiffDays value={withdrawalData?.requestDate} />
              ) : null
            }
          />
          <Row gutter={[12, 12]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="شماره درخواست"
              value={withdrawalData?.id?.toString()}
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="ثبت درخواست"
              value={withdrawalData?.createdDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="بررسی درخواست"
              value={withdrawalData?.userStaffDetail?.modifiedDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="مسئول بررسی"
              value={
                withdrawalData?.adminFirstname && withdrawalData?.adminLastname
                  ? `${withdrawalData.adminFirstname} ${withdrawalData.adminLastname}`
                  : undefined
              }
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="سرویس"
              // value={withdrawalData?.userStaffDetail?.serviceNames
              //   ?.map((item) => {
              //     const temp = serviceOptions.find((service) => service?.value === item);
              //     return temp?.title;
              //   })
              //   ?.join(" - ")}
              value={samimServiceNameConvertor(
                withdrawalData?.userStaffDetail?.serviceName
              )}
            />
          </Row>
        </div>
        {withdrawalData?.status === WALLET_REQUEST_STATUS.REQUESTED ? (
          <div>
            <CustomDivider text="اطلاعات درخواست دهنده" />
            <Row gutter={[12, 12]}>
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label="ثبت کننده درخواست"
                value={
                  withdrawalData?.requesterFirstName && withdrawalData?.requesterLastName
                    ? `${withdrawalData.requesterFirstName} ${withdrawalData.requesterLastName}`
                    : undefined
                }
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label="شماره همراه ثبت کننده درخواست"
                value={withdrawalData?.requesterMobile}
              />
            </Row>
          </div>
        ) : null}
        <div>
          <CustomDivider text="حساب انتخابی" />
          <div className="description-wrapper">
            {/* // Todo[Atefeh]: uncomment when api got ready */}
            {/* <Descriptions
              column={1}
              items={bankLogo}
              layout="vertical"
              labelStyle={{
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              }}
            /> */}
            <Descriptions
              className="description-img"
              column={1}
              items={optionalAccountItems}
              layout="vertical"
              styles={{
                label: {
                  fontWeight: "bold",
                  textAlign: "right",
                  width: "180px",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Div>
  );
};
export default MyWalletDetailsWithdrawWalletDrawerContent;
