import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft, PiBriefcase } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { MODIFY_BUSINESS_LIST_PAGE_ROUTE } from "@infra/router/routes/organization";
import { useLazyGetMyTransactionListDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MoreDetailDrawerContentProps } from "./@types/@moreDetailDrawerContentTypes";
import { GetMyTransactionListDetailResponse } from "../../../../MyTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";

import "./_branchTabMoreDetailDrawerContent.scss";

const BranchTabMoreDetailDrawerContent = ({
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
          children: (
            <span className="font-bold">
              {dataPlaceHolder({
                data: transactionDetail?.createdDate,
                isDate: true,
                customDateFormat: " HH:mm, YYYY-MM-DD ",
              })}
            </span>
          ),
        },
        {
          key: "3",
          label: "شماره مرجع درگاه",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.referenceNo })}
            </span>
          ),
        },
        {
          key: "4",
          label: "کد پیگیری",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.trackNo })}
            </span>
          ),
        },
        {
          key: "5",
          label: "شناسه تراکنش",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.uuid })}
            </span>
          ),
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

  const optionalAccountItems: DescriptionsProps["items"] = [
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
  ];

  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام کسب و کار ",
      children: dataPlaceHolder({ data: transactionDetail?.businessName }),
    },
    {
      key: "3",
      label: "شعبه / واحد",
      children: dataPlaceHolder({ data: transactionDetail?.walletBranchName }),
    },
    {
      key: "4",
      label: "کد شعبه",
      children: dataPlaceHolder({ data: transactionDetail?.walletBranchCode }),
    },
    {
      key: "5",
      label: "استان",
      children: (
        <span className="font-bold">
          {dataPlaceHolder({ data: transactionDetail?.province })}
        </span>
      ),
    },
    {
      key: "6",
      label: "شهر",
      children: (
        <span className="font-bold">
          {dataPlaceHolder({ data: transactionDetail?.city })}
        </span>
      ),
    },
    // todo[Nima]: cto told
    // {
    //   key: "7",
    //   label: "شماره همراه",
    //   children: (
    //     <span className="font-bold">
    //       {dataPlaceHolder({ data: transactionDetail?.mobileNumber })}
    //     </span>
    //   ),
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
        <div className="my-transaction-branch-detail-user-container">
          <div className="my-transaction-detail-price-wrapper">
            <CustomTag
              color={TRANSACTION_TYPE_STATUS_COLOR[transactionDetail?.transactionType]}
              icon={TRANSACTION_TYPE_STATUS_ICON[transactionDetail?.transactionType]}
            >
              {TRANSACTION_TYPE_STATUS_TEXT[transactionDetail?.transactionType]}
            </CustomTag>

            <h3 className="text-2xl font-bold">
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
              <CustomButton type="text" disabled>
                <Link
                  to={{
                    pathname: MODIFY_BUSINESS_LIST_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: transactionDetail?.userId,
                    }),
                  }}
                  className="divider-extra-content"
                >
                  <PiBriefcase size={16} /> پروفایل کسب و کار
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
export default BranchTabMoreDetailDrawerContent;
