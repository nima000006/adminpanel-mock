import { Descriptions, DescriptionsProps } from "antd";
import { PiUserLight } from "react-icons/pi";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { getTransactionDetail } from "../../utils";
import { UsersTransactionMoreDetailDrawerContentProps } from "./@types/@usersTransactionMoreDetailDrawerContent";
import "./_usersTransactionMoreDetailDrawerContent.scss";

const UsersTransactionMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionDetail,
  loading,
}: UsersTransactionMoreDetailDrawerContentProps) => {
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
                customDateFormat: "YYYY-MM-DD , HH:mm",
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
      ]
    : [];

  const optionalAccountItems: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "بانک",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.bankAccount?.bankName })}
            </span>
          ),
        },
        {
          key: "2",
          label: "شماره کارت",
          children: (
            <span className="font-bold">
              ${dataPlaceHolder({ data: transactionDetail?.bankAccount?.cardNumber })}
            </span>
          ),
        },
        {
          key: "3",
          label: "شماره شبا",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.bankAccount?.iban })}
            </span>
          ),
        },
        // Todo[Atefeh]: uncomment when api got ready
        // {
        //   key: "4",
        //   label: "شماره حساب",
        //   children: "0106090032002",
        // },
      ]
    : [];

  const userInfo: DescriptionsProps["items"] = transactionDetail
    ? [
        {
          key: "1",
          label: "نام",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.walletFirstName })}
            </span>
          ),
        },
        {
          key: "2",
          label: "نام خانوادگی",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.walletLastName })}
            </span>
          ),
        },
        {
          key: "3",
          label: "کد ملی / کد فراگیر",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.walletUserName })}
            </span>
          ),
        },
        {
          key: "4",
          label: "شماره دانشجویی",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.staffCode })}
            </span>
          ),
        },
        {
          key: "5",
          label: "شماره همراه",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.mobileNumber })}
            </span>
          ),
        },
        {
          key: "6",
          label: "مقطع تحصیلی",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.degree })}
            </span>
          ),
        },
        {
          key: "7",
          label: "رشته تحصیلی",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.field })}
            </span>
          ),
        },

        {
          key: "8",
          label: "واحد / شعبه",
          children: (
            <span className="font-bold">
              {dataPlaceHolder({ data: transactionDetail?.branchName })}
            </span>
          ),
        },
      ]
    : [];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="users-transaction-more-detail-drawer-content-container">
          <div className="all-transaction-detail-price-wrapper">
            <CustomTag
              color={TRANSACTION_TYPE_STATUS_COLOR[transactionDetail?.transactionType]}
              icon={TRANSACTION_TYPE_STATUS_ICON[transactionDetail?.transactionType]}
            >
              {TRANSACTION_TYPE_STATUS_TEXT[transactionDetail?.transactionType]}
            </CustomTag>

            <h3 className="font-bold">
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
              <CustomButton type="link">
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
            className="all-transaction-detail-user-descriptions"
            column={1}
            items={userInfo}
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

export default UsersTransactionMoreDetailDrawerContent;
