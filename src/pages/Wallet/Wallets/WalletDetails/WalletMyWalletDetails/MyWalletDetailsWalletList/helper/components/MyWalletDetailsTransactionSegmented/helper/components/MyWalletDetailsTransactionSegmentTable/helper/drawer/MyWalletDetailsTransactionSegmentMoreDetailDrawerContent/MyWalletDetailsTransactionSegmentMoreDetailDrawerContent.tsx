import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetMyTransactionListDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import { GetMyTransactionListDetailResponse } from "@pages/Wallet/Transactions/MyTransactions/MyTransactionsList/helper/components/MyTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import "./_MyWalletDetailsTransactionSegmentMoreDetailDrawerContent.scss";
import { emptyString } from "@infra/config/global.vars";

const MyWalletDetailsTransactionSegmentMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionUuid,
}: {
  closeDrawerHandler: () => void;
  transactionUuid: string;
}) => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetMyTransactionListDetailResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getTransactionDetails, { isFetching: isTransactionDetailLoading }] =
    useLazyGetMyTransactionListDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getTransactionDetails({ uuid: transactionUuid })
      .unwrap()
      .then((value) => setTransactionDetail(value));
  }, [transactionUuid]);

  const transactionInfoItems: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "مبدأ و مقصد",
          children: (() => {
            const { start, end } = getTransactionDetail(transactionDetail);
            return (
              <div className="custom-value-container">
                <span className="font-bold">{dataPlaceHolder({ data: start })}</span>
                <PiArrowLeft />
                <span className="font-bold">{dataPlaceHolder({ data: end })}</span>
              </div>
            );
          })(),
        },
        {
          key: "2",
          label: "شناسه کیف پول مبدا و مقصد",
          children: (
            <div className="custom-value-container">
              <span className="text-center font-bold">
                {dataPlaceHolder({ data: transactionDetail?.fromWallet })}
              </span>
              <PiArrowLeft />
              <span className="text-center font-bold">
                {dataPlaceHolder({ data: transactionDetail?.toWallet })}
              </span>
            </div>
          ),
        },
        {
          key: "3",
          label: "تاریخ و زمان تراکنش",
          children: dataPlaceHolder({
            data: transactionDetail?.createdDate,
            isDate: true,
            customDateFormat: "HH:mm, YYYY-MM-DD",
          }),
        },
        {
          key: "4",
          label: "شناسه تراکنش",
          children: dataPlaceHolder({ data: transactionDetail?.uuid }),
        },
        {
          key: "5",
          label: "هدف تراکنش",
          children: (() => {
            const { detail, color } = getTransactionDetail(transactionDetail);
            return (
              <CustomTag color={color}>{dataPlaceHolder({ data: detail })}</CustomTag>
            );
          })(),
        },
        {
          key: "6",
          label: "نوع پول",
          children: (
            <CustomTag color="geekblue">
              {MONEY_TYPE_STATUS_TEXT[transactionDetail?.money?.moneyType]}
            </CustomTag>
          ),
        },
        {
          key: "7",
          label: "کیف پول سرویس",
          children: <SamimServiceTag service={transactionDetail?.service} />,
        },
        {
          key: "8",
          label: "مبلغ تراکنش اصلی",
          children: dataPlaceHolder({
            data: transactionDetail?.money?.totalAmount,
            isPrice: true,
            isRial: true,
            currency: {
              type: "تومان",
              isAvailable: true,
            },
          }),
        },
        {
          key: "9",
          label: "سهم از تراکنش اصلی",
          children: emptyString,
        },
      ]
    : [];

  const optionalAccountItems: DescriptionsProps["items"] = transactionDetail
    ? [
        // {
        //   key: "1",
        //   label: "بانک",
        //   children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.bankName }),
        // },
        // {
        //   key: "2",
        //   label: "شماره کارت",
        //   children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.cardNumber }),
        // },
        // {
        //   key: "3",
        //   label: "شماره شبا",
        //   children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.iban }),
        // },
        // Todo[Atefeh]: uncomment when api got ready
        // {
        //   key: "4",
        //   label: "شماره حساب",
        //   children: transactionDetail?.bankAccount?.iban,
        // },
      ]
    : [];

  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام کسب و کار ",
      children: dataPlaceHolder({ data: transactionDetail?.businessName }),
    },
    {
      key: "3",
      label: "شعبه / واحد",
      children: dataPlaceHolder({ data: transactionDetail?.branchName }),
    },
    {
      key: "4",
      label: "کد شعبه",
      children: dataPlaceHolder({ data: transactionDetail?.branchCode }),
    },
    {
      key: "5",
      label: "استان",
      children: dataPlaceHolder({ data: transactionDetail?.province }),
    },
    {
      key: "6",
      label: "شهر",
      children: dataPlaceHolder({ data: transactionDetail?.city }),
    },
    {
      key: "7",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: transactionDetail?.mobileNumber }),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isTransactionDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="my-wallet-details-transaction-segment-more-detail-drawer-content-container">
          <div className="all-transaction-detail-price-wrapper">
            <CustomTag
              color={TRANSACTION_TYPE_STATUS_COLOR[transactionDetail?.transactionType]}
              icon={TRANSACTION_TYPE_STATUS_ICON[transactionDetail?.transactionType]}
            >
              {TRANSACTION_TYPE_STATUS_TEXT[transactionDetail?.transactionType]}
            </CustomTag>

            <h3 className="text-2xl! font-bold">
              {dataPlaceHolder({
                data: transactionDetail?.money?.totalAmount?.toString(),
                isPrice: true,
                isRial: true,
              })}{" "}
              تومان
            </h3>
          </div>

          {/* TRANSACTION DETAIL */}
          <CustomDivider text="جزئیات تراکنش" />
          <Descriptions
            className="all-transaction-detail-user-descriptions"
            column={1}
            items={transactionInfoItems}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              },
              content: {
                textAlign: "left",
              },
            }}
          />
          {/* OPTIONAL ACCOUNT */}
          {transactionDetail?.transactionSource ===
            TRANSACTION_SOURCE_STATUS.walletBank && (
            <>
              <CustomDivider text="حساب انتخابی" />
              <Descriptions
                className="all-transaction-detail-user-descriptions"
                column={1}
                items={optionalAccountItems}
                styles={{
                  label: {
                    fontWeight: "bold",
                    textAlign: "right",
                    width: "180px",
                  },
                }}
              />
            </>
          )}

          {/* USER INFO */}
          <CustomDivider
            text="اطلاعات کاربر"
            extraContent={
              <CustomButton type="link" disabled>
                <Link to={""} className="divider-extra-content">
                  <PiUserLight size={16} /> پروفایل کاربر
                </Link>
              </CustomButton>
            }
          />
          <Descriptions
            className="all-transaction-detail-user-descriptions"
            column={1}
            items={userInfoItems}
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              },
            }}
          />
        </div>
      )}
    </Div>
  );
};

export default MyWalletDetailsTransactionSegmentMoreDetailDrawerContent;
