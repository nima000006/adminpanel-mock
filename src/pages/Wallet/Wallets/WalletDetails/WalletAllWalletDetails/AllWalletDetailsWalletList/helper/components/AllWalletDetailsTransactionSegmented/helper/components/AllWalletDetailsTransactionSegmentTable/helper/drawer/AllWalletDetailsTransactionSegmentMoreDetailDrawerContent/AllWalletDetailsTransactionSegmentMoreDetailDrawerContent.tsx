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
import { useLazyGetWalletTransactionDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { GetWalletTransactionDetailResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/SegmentTable/@types/@segmentTable";
import "./_allWalletDetailsTransactionSegmentMoreDetailDrawerContent.scss";

const TransactionSegmentMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionUuid,
}: {
  closeDrawerHandler: () => void;
  transactionUuid: string;
}) => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetWalletTransactionDetailResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getTransactionDetails, { isFetching: isTransactionDetailLoading }] =
    useLazyGetWalletTransactionDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getTransactionDetails(transactionUuid)
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
          label: "تاریخ و زمان تراکنش",
          children: dataPlaceHolder({
            data: transactionDetail?.createdDate,
            isDate: true,
            customDateFormat: "HH:mm, YYYY-MM-DD",
          }),
        },
        {
          key: "3",
          label: "شماره مرجع درگاه",
          children: dataPlaceHolder({ data: transactionDetail?.referenceNo }),
        },
        {
          key: "4",
          label: "کد پیگیری",
          children: dataPlaceHolder({ data: transactionDetail?.trackNo }),
        },
        {
          key: "5",
          label: "شناسه تراکنش",
          children: dataPlaceHolder({ data: transactionDetail?.uuid }),
        },
        {
          key: "6",
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
          key: "6",
          label: "کیف پول سرویس",
          children: <SamimServiceTag service={transactionDetail?.service} />,
        },
      ]
    : [];

  const optionalAccountItems: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "بانک",
          children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.bankName }),
        },
        {
          key: "2",
          label: "شماره کارت",
          children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.cardNumber }),
        },
        {
          key: "3",
          label: "شماره شبا",
          children: dataPlaceHolder({ data: transactionDetail?.bankAccount?.iban }),
        },
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
    // Todo[Atefeh]: uncomment when api got ready
    // {
    //   key: "3",
    //   label: "شعبه / واحد",
    //   children: "تهران جنوب",
    // },
    {
      key: "4",
      label: "کد شعبه",
      children: dataPlaceHolder({ data: transactionDetail?.branchCode }),
    },
    // Todo[Atefeh]: uncomment when api got ready
    // {
    //   key: "5",
    //   label: "استان",
    //   children: "تهران",
    // },
    // {
    //   key: "6",
    //   label: "شهر",
    //   children: "تهران",
    // },
    // {
    //   key: "7",
    //   label: "شماره همراه",
    //   children: "۰۹۱۲ ۲۴۵ ۵۹۱۰",
    // },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isTransactionDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="transaction-segment-more-detail-drawer-content-container">
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
                isRial: true,
                isPrice: true,
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

export default TransactionSegmentMoreDetailDrawerContent;
