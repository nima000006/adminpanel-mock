import { useEffect } from "react";

import { Descriptions, DescriptionsProps, Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTagWithHorizontalDiffDays from "@components/Renderers/CustomTagWithHorizontalDiffDays/CustomTagWithHorizontalDiffDays";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetWalletBankAccountDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import {
  WALLET_REQUEST_STATUS,
  WALLET_REQUEST_STATUS_TITLE,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { AllWalletDetailsBankAccountDrawerContentProps } from "./@types/@allWalletDetailsbankAccountDrawerContent";
import "./_allWalletDetailsBankAccountDrawerContent.scss";

const AllWalletDetailsBankAccountDrawerContent = ({
  closeDrawerHandler,
  accountId,
}: AllWalletDetailsBankAccountDrawerContentProps) => {
  //? ================================  Api Calls ================================
  const [
    getWalletBankAccountDetail,
    { data: bankAccountData, isFetching: isGetBankAccountDetailLoading },
  ] = useLazyGetWalletBankAccountDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (accountId) {
      getWalletBankAccountDetail({ accountId });
    }
  }, []);

  const optionalAccountItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شماره کارت",
      children: dataPlaceHolder({ data: bankAccountData?.cardNumber }),
    },
    {
      key: "2",
      label: "شماره شبا",
      children: dataPlaceHolder({ data: bankAccountData?.iban }),
    },
    // Todo[Atefeh]: uncomment when api got ready
    // {
    //   key: "3",
    //   label: "شماره حساب",
    //   children: "0106090032002",
    // },
  ];

  // Todo[Atefeh]: uncomment when api got ready
  // const bankLogo: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "",
  //     children: <img src={keshavarziBank} alt="empty" />,
  //   },
  // ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      loading={isGetBankAccountDetailLoading}
      className="bank-account-drawer-content-container"
    >
      <CustomDrawerHeader
        title="جزییات کیف پول من"
        closeDrawerHandler={closeDrawerHandler}
      />
      <div className="bank-account-drawer-content-wrapper">
        {bankAccountData?.status === WALLET_REQUEST_STATUS.REQUESTED ? (
          <CustomAlert
            showIcon
            title="درخواست شما در انتظار بررسی می‌باشد!"
            type="warning"
            className="custom-alert"
          />
        ) : bankAccountData?.status === WALLET_REQUEST_STATUS.REJECTED ? (
          <div className="rejected-alert">
            <CustomAlert
              showIcon
              title="درخواست شما رد شده است!"
              type="error"
              className="custom-alert"
            />
            <CustomAlert
              showIcon
              title={bankAccountData?.rejectReason?.title}
              description={bankAccountData?.rejectDescription}
              type="error"
              className="custom-alert"
            />
          </div>
        ) : bankAccountData?.status === WALLET_REQUEST_STATUS.ACCEPTED ? (
          <CustomAlert
            showIcon
            title="درخواست شما مورد تأیید قرار گرفت!"
            type="success"
            className="custom-alert"
          />
        ) : null}

        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              bankAccountData?.status === WALLET_REQUEST_STATUS.REQUESTED ? (
                <CustomTagWithHorizontalDiffDays value={bankAccountData?.createdDate} />
              ) : null
            }
          />
          <Row gutter={[12, 12]}>
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="شماره درخواست"
              value={bankAccountData?.id?.toString()}
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="ثبت درخواست"
              value={bankAccountData?.createdDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="بررسی درخواست"
              value={bankAccountData?.modifiedDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="مسئول بررسی"
              value={
                bankAccountData?.modifierFirstname && bankAccountData?.modifierLastname
                  ? `${bankAccountData.modifierFirstname} ${bankAccountData.modifierLastname}`
                  : undefined
              }
            />
            <SingleVerticalWithCol
              xl={12}
              lg={12}
              label="سرویس"
              value={bankAccountData?.services
                ?.map((item) => {
                  const temp = serviceOptions.find((service) => service?.value === item);
                  return temp?.title;
                })
                ?.join(" - ")}
            />
          </Row>
        </div>
        {/* //Todo[Atefeh]: uncomment when api got ready */}
        {/* <div>
          <CustomDivider text="اطلاعات درخواست دهنده" />
          <Row gutter={[12, 12]}>
            <SingleVerticalWithCol lg={12} label="ثبت کننده درخواست" value={""} />
            <SingleVerticalWithCol
              lg={12}
              label="شماره همراه ثبت کننده درخواست"
              value={""}
            />
          </Row>
        </div> */}

        <div>
          <CustomDivider
            text={
              bankAccountData?.status
                ? WALLET_REQUEST_STATUS_TITLE[bankAccountData?.status]
                : "مشخصات حساب"
            }
          />

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
export default AllWalletDetailsBankAccountDrawerContent;
