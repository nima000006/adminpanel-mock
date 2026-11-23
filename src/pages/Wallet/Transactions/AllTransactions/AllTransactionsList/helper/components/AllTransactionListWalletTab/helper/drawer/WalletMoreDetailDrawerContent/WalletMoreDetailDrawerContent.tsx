import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft } from "react-icons/pi";
// TODO[nima]: sto told - hide user info for کیف پول واسط
// import { PiBriefcase, PiUserLight } from "react-icons/pi";
// import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
// TODO[nima]: sto told - hide user info for کیف پول واسط
// import { makeSearchParams } from "@infra/helpers/utils";
// import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetTransactionListDetailQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { getTransactionDetail } from "@pages/Wallet/_shared/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { MoreDetailDrawerContentProps } from "./@types/@walletMoreDetailDrawerContentTypes";
import { GetTransactionListDetailResponse } from "../../../../AllTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";
import "./_walletMoreDetailDrawerContent.scss";

const WalletMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionUuid,
}: MoreDetailDrawerContentProps) => {
  const [transactionDetail, setTransactionDetail] =
    useState<GetTransactionListDetailResponse | null>(null);

  //? ================================  Api Calls ================================
  const [gettransactionDetail, { isFetching: isTransactionDetailLoading }] =
    useLazyGetTransactionListDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (transactionUuid) {
      gettransactionDetail({ uuid: transactionUuid })
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
          label: "شناسه کیف پول مبدا و مقصد",
          children: (
            <div className="custom-value-container">
              <span className="font-bold">
                {dataPlaceHolder({ data: transactionDetail?.fromWallet })}{" "}
              </span>
              <PiArrowLeft />
              <span className="font-bold">
                {dataPlaceHolder({ data: transactionDetail?.toWallet })}
              </span>
            </div>
          ),
        },
        {
          key: "3",
          label: "تاریخ و زمان تراکنش",
          children: (
            <span className="font-bold">
              {" "}
              {dataPlaceHolder({
                data: transactionDetail?.createdDate,
                isDate: true,
                customDateFormat: " HH:mm, YYYY-MM-DD",
              })}
            </span>
          ),
        },
        {
          key: "4",
          label: "شناسه تراکنش",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.uuid })}
            </span>
          ),
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
      ]
    : [];

  // TODO[nima]: sto told - hide user info for کیف پول واسط
  // const items: DescriptionsProps["items"] = transactionDetail
  //   ? [
  //       {
  //         key: "1",
  //         label: "نام",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.walletFirstName })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "2",
  //         label: "نام خانوادگی",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.walletLastName })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "3",
  //         label: "کد ملی / کد فراگیر",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.walletUserName })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "4",
  //         label: "شماره دانشجویی",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.staffCode })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "5",
  //         label: "شماره همراه",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.mobileNumber })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "6",
  //         label: "مقطع تحصیلی",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.degree })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "7",
  //         label: "رشته تحصیلی",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.field })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "8",
  //         label: "واحد / شعبه",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.branchName })}
  //           </span>
  //         ),
  //       },
  //       {
  //         key: "9",
  //         label: "نام دانشکده",
  //         children: (
  //           <span className="font-bold">
  //             {dataPlaceHolder({ data: transactionDetail?.facultyName })}
  //           </span>
  //         ),
  //       },
  //     ]
  //   : [];

  // TODO[nima]: sto told - hide user info for کیف پول واسط
  // const userInfoItems: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "نام کسب و کار ",
  //     children: (
  //       <span className="font-bold">
  //         <SamimServiceTag isText service={transactionDetail?.service} />
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: "شعبه / واحد",
  //     children: (
  //       <span className="font-bold">
  //         {dataPlaceHolder({ data: transactionDetail?.branchName })}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "4",
  //     label: "کد شعبه",
  //     children: (
  //       <span className="font-bold">
  //         {dataPlaceHolder({ data: transactionDetail?.branchCode })}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "5",
  //     label: "استان",
  //     children: (
  //       <span className="font-bold">
  //         {dataPlaceHolder({ data: transactionDetail?.province })}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "6",
  //     label: "شهر",
  //     children: (
  //       <span className="font-bold">
  //         {dataPlaceHolder({ data: transactionDetail?.city })}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "7",
  //     label: "شماره همراه",
  //     children: (
  //       <span className="font-bold">
  //         {dataPlaceHolder({ data: transactionDetail?.mobileNumber })}
  //       </span>
  //     ),
  //   },
  // ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isTransactionDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="all-transaction-detail-wallet-container">
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

          {/* TODO[nima]: sto told - hide user info for کیف پول واسط */}
          {/* USER INFO */}
          {/* <CustomDivider
            text={
              transactionDetail?.transactionSource === "SHARING"
                ? "اطلاعات کسب  و کار"
                : "اطلاعات کاربر"
            }
            extraContent={
              <Link
                to={{
                  pathname: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
                  search: makeSearchParams({
                    id: transactionDetail?.userId,
                  }),
                }}
                className="divider-extra-content"
              >
                {transactionDetail?.transactionSource === "SHARING" ? (
                  <>
                    <PiBriefcase size={16} />
                    پروفایل کسب و کار
                  </>
                ) : (
                  <>
                    <PiUserLight size={16} />
                    پروفایل کاربر
                  </>
                )}
              </Link>
            }
          />
          <Descriptions
            className="all-transaction-detail-user-descriptions"
            column={1}
            items={
              transactionDetail?.transactionSource === "SHARING" ? userInfoItems : items
            }
            styles={{
              label: {
                fontWeight: "bold",
                textAlign: "right",
                width: "180px",
              },
            }}
          /> */}
        </div>
      )}
    </Div>
  );
};
export default WalletMoreDetailDrawerContent;
