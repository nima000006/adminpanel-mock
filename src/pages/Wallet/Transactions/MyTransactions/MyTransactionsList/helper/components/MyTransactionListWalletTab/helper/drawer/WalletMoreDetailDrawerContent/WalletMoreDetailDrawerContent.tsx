import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetMyTransactionListDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MoreDetailDrawerContentProps } from "./@types/@walletMoreDetailDrawerContentTypes";

import "./_walletMoreDetailDrawerContent.scss";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";

import { GetMyTransactionListDetailResponse } from "../../../../MyTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";

const WalletMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionUuid,
}: MoreDetailDrawerContentProps) => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetMyTransactionListDetailResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getTransactionDetails, { isFetching: isTransactionDetailLoading }] =
    useLazyGetMyTransactionListDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (transactionUuid) {
      getTransactionDetails({ uuid: transactionUuid })
        .unwrap()
        .then((value) => setTransactionDetail(value));
    }
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
                <span className="font-bold">{start}</span>
                <PiArrowLeft />
                <span className="font-bold">{end}</span>
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
          children: transactionDetail?.referenceNo,
        },
        {
          key: "4",
          label: "کد پیگیری",
          children: transactionDetail?.trackNo,
        },
        {
          key: "5",
          label: "شناسه تراکنش",
          children: transactionDetail?.uuid,
        },
        {
          key: "6",
          label: "هدف تراکنش",
          children: (() => {
            const { detail, color } = getTransactionDetail(transactionDetail);
            return <CustomTag color={color}>{detail}</CustomTag>;
          })(),
        },
        {
          key: "6",
          label: "پول نقد",
          children: (
            <CustomTag color="geekblue">
              {MONEY_TYPE_STATUS_TEXT[transactionDetail?.money?.moneyType]}
            </CustomTag>
          ),
        },
      ]
    : [];

  const items: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "نام",
          children: transactionDetail?.walletFirstName,
        },
        {
          key: "2",
          label: "نام خانوادگی",
          children: transactionDetail?.walletLastName,
        },
        {
          key: "3",
          label: "کد ملی / کد فراگیر",
          children: transactionDetail?.walletUserName,
        },
        // Todo[Atefeh]: uncomment when api got ready
        // {
        //   key: "4",
        //   label: "شماره دانشجویی",
        //   children: "4002144104099",
        // },
        // {
        //   key: "5",
        //   label: "شماره همراه",
        //   children: "09122455910",
        // },
        {
          key: "6",
          label: "مقطع تحصیلی",
          children: transactionDetail?.degree,
        },
        {
          key: "7",
          label: "رشته تحصیلی",
          children: transactionDetail?.field,
        },
        {
          key: "8",
          label: "واحد / شعبه",
          children: transactionDetail?.branchName,
        },
        {
          key: "9",
          label: "نام دانشکده",
          children: transactionDetail?.facultyName,
        },
      ]
    : [];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isTransactionDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="my-transaction-detail-wallet-container">
          <div className="my-transaction-detail-price-wrapper">
            <CustomTag
              color={TRANSACTION_TYPE_STATUS_COLOR[transactionDetail?.transactionType]}
              icon={TRANSACTION_TYPE_STATUS_ICON[transactionDetail?.transactionType]}
            >
              {TRANSACTION_TYPE_STATUS_TEXT[transactionDetail?.transactionType]}
            </CustomTag>

            <h3>
              {dataPlaceHolder({
                data: transactionDetail?.money?.totalAmount?.toString(),
                isPrice: true,
              })}{" "}
              تومان
            </h3>
          </div>

          {/* TRANSACTION DETAIL */}
          <CustomDivider text="جزئیات تراکنش" />
          <Descriptions
            className="my-transaction-detail-user-descriptions"
            column={1}
            items={transactionInfoItems}
            labelStyle={{
              fontWeight: "bold",
              textAlign: "right",
              width: "180px",
            }}
            contentStyle={{
              textAlign: "left",
            }}
          />

          {/* USER INFO */}
          <CustomDivider
            text="اطلاعات کاربر"
            extraContent={
              <Link
                to={{
                  pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: transactionDetail?.userId,
                  }),
                }}
                className="divider-extra-content"
              >
                <PiUserLight size={16} /> پروفایل کاربر
              </Link>
            }
          />
          <Descriptions
            className="my-transaction-detail-user-descriptions"
            column={1}
            items={items}
            labelStyle={{
              fontWeight: "bold",
              textAlign: "right",
              width: "180px",
            }}
          />
        </div>
      )}
    </Div>
  );
};
export default WalletMoreDetailDrawerContent;
