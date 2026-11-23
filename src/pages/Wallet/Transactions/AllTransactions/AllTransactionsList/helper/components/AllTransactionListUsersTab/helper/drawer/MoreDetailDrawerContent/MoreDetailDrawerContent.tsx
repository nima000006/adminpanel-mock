import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { emptyString } from "@infra/config/global.vars";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/wallet";
import { useLazyGetTransactionListDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import {
  GetTransactionListDetailResponse,
  MoreDetailDrawerContentProps,
} from "./@types/@moreDetailDrawerContentTypes";
import "./_moreDetailDrawerContent.scss";

const MoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionUuid,
}: MoreDetailDrawerContentProps) => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetTransactionListDetailResponse | null>(null);

  //? ================================  Api Calls ================================
  const [getTransactionDetails, { isFetching: isTransactionDetailLoading }] =
    useLazyGetTransactionListDetailQuery();

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
          label: "شناسه کیف پول مبدا و مقصد",
          children: (
            <div className="custom-value-container">
              {transactionDetail?.transactionSource === "WALLET_TO_WALLET" ? (
                <Link
                  className="text-primary-5! font-bold"
                  to={{
                    pathname: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({ id: transactionDetail?.fromWallet }),
                  }}
                >
                  {dataPlaceHolder({ data: transactionDetail?.fromWallet })}{" "}
                </Link>
              ) : (
                <span className="font-bold">
                  {dataPlaceHolder({ data: transactionDetail?.fromWallet })}{" "}
                </span>
              )}
              <PiArrowLeft />
              {transactionDetail?.transactionSource === "REVERT" ? (
                <Link
                  className="text-primary-5! font-bold"
                  to={{
                    pathname: WALLET_ALL_WALLETS_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({ id: transactionDetail?.toWallet }),
                  }}
                >
                  {dataPlaceHolder({ data: transactionDetail?.fromWallet })}{" "}
                </Link>
              ) : (
                <span className="font-bold">
                  {dataPlaceHolder({ data: transactionDetail?.toWallet })}
                </span>
              )}
            </div>
          ),
        },
        {
          key: "3",
          label: "تاریخ و زمان تراکنش",
          children: dataPlaceHolder({
            data: transactionDetail?.createdDate,
            isDate: true,
            customDateFormat: "HH:mm, YYYY-MM-DD ",
          }),
        },
        {
          key: "4",
          label: "شماره مرجع درگاه",
          children: dataPlaceHolder({ data: transactionDetail?.referenceNo }),
        },
        {
          key: "5",
          label: "کد پیگیری",
          children: dataPlaceHolder({ data: transactionDetail?.trackNo }),
        },
        {
          key: "6",
          label: "شناسه تراکنش",
          children: dataPlaceHolder({ data: transactionDetail?.uuid }),
        },
        {
          key: "7",
          label: "هدف تراکنش",
          children: (() => {
            const { detail, color } = getTransactionDetail(transactionDetail);
            return (
              <CustomTag color={color}>{dataPlaceHolder({ data: detail })}</CustomTag>
            );
          })(),
        },
        {
          key: "8",
          label: "پول نقد",
          children: (
            <CustomTag color="geekblue">
              {MONEY_TYPE_STATUS_TEXT[transactionDetail?.money?.moneyType]}
            </CustomTag>
          ),
        },
      ]
    : [];

  const optionalAccountItems: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "بانک",
          children: emptyString,
        },
        {
          key: "2",
          label: "شماره کارت",
          children: emptyString,
        },
        {
          key: "3",
          label: "شماره شبا",
          children: emptyString,
        },
        {
          key: "4",
          label: "شماره حساب",
          children: emptyString,
        },
      ]
    : [];

  const items: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "نام",
          children: dataPlaceHolder({ data: transactionDetail?.walletFirstName }),
        },
        {
          key: "2",
          label: "نام خانوادگی",
          children: dataPlaceHolder({ data: transactionDetail?.walletLastName }),
        },
        {
          key: "3",
          label: "کد ملی / کد فراگیر",
          children: dataPlaceHolder({ data: transactionDetail?.walletUserName }),
        },
        {
          key: "4",
          label: "شماره دانشجویی",
          children: dataPlaceHolder({ data: transactionDetail?.staffCode }),
        },
        {
          key: "5",
          label: "شماره همراه",
          children: dataPlaceHolder({ data: transactionDetail?.mobileNumber }),
        },
        {
          key: "6",
          label: "مقطع تحصیلی",
          children: dataPlaceHolder({ data: transactionDetail?.degree }),
        },
        {
          key: "7",
          label: "رشته تحصیلی",
          children: dataPlaceHolder({ data: transactionDetail?.field }),
        },
        {
          key: "8",
          label: "واحد / شعبه",
          children: dataPlaceHolder({ data: transactionDetail?.branchName }),
        },
        {
          key: "9",
          label: "نام دانشکده",
          children: dataPlaceHolder({ data: transactionDetail?.facultyName }),
        },
      ]
    : [];

  const employeeItems: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "نام",
          children: dataPlaceHolder({ data: transactionDetail?.walletFirstName }),
        },
        {
          key: "2",
          label: "نام خانوادگی",
          children: dataPlaceHolder({ data: transactionDetail?.walletLastName }),
        },
        {
          key: "3",
          label: "کد ملی ",
          children: dataPlaceHolder({ data: transactionDetail?.walletUserName }),
        },
        {
          key: "4",
          label: " شماره پرسنلی",
          children: dataPlaceHolder({ data: transactionDetail?.staffCode }),
        },
        {
          key: "5",
          label: " شماره همراه",
          children: dataPlaceHolder({ data: transactionDetail?.mobileNumber }),
        },
        {
          key: "6",
          label: " سمت",
          children: emptyString,
        },
      ]
    : [];

  const renderItems = transactionDetail?.userGroup === "EMPLOYEE" ? employeeItems : items;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isTransactionDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="all-transaction-detail-user-container">
          <div className="all-transaction-detail-price-wrapper">
            <CustomTag
              color={TRANSACTION_TYPE_STATUS_COLOR[transactionDetail?.transactionType]}
              icon={TRANSACTION_TYPE_STATUS_ICON[transactionDetail?.transactionType]}
            >
              {TRANSACTION_TYPE_STATUS_TEXT[transactionDetail?.transactionType]}
            </CustomTag>

            <h3 className="text-xl! font-bold">
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
            className="all-transaction-detail-user-descriptions body-regular"
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
                className="all-transaction-detail-user-descriptions body-regular"
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
              <CustomButton disabled type="text">
                <Link
                  to={{
                    pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: transactionDetail?.userId,
                    }),
                  }}
                  className="divider-extra-content"
                >
                  <PiUserLight size={16} /> پروفایل کاربر
                </Link>
              </CustomButton>
            }
          />
          <Descriptions
            className="all-transaction-detail-user-descriptions body-regular"
            column={1}
            items={renderItems}
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
export default MoreDetailDrawerContent;
