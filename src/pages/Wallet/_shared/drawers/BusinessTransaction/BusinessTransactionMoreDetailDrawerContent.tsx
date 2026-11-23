import { Descriptions, DescriptionsProps } from "antd";
import { PiArrowLeft } from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  MONEY_TYPE_STATUS_TEXT,
  TRANSACTION_SOURCE_STATUS,
  TRANSACTION_TYPE_STATUS_COLOR,
  TRANSACTION_TYPE_STATUS_ICON,
  TRANSACTION_TYPE_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { getTransactionDetail } from "../../utils";
import { BusinessTransactionMoreDetailDrawerContentProps } from "./@types/@businessTransactionMoreDetailDrawerContent";
import "./_businessTransactionMoreDetailDrawerContent.scss";

const BusinessTransactionMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transactionDetail,
  loading,
}: BusinessTransactionMoreDetailDrawerContentProps) => {
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
            return <CustomTag color={color}>{detail}</CustomTag>;
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
              {dataPlaceHolder({ data: transactionDetail?.bankAccount?.cardNumber })}
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

  // const userInfoItems: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "نام کسب و کار ",
  //     children:
  //       serviceOptions?.find((item) => item?.value === transactionDetail?.service)
  //         ?.title || "-",
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
  //         {" "}
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
    <Div loading={loading}>
      <CustomDrawerHeader
        title="جزئیات بیشتر تراکنش"
        closeDrawerHandler={closeDrawerHandler}
      />
      {transactionDetail && (
        <div className="business-transaction-more-detail-drawer-content-container">
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
            TRANSACTION_SOURCE_STATUS.walletBank && ( // برداشت از گیف پول
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
          {/*  <CustomDivider
            text="اطلاعات کاربر"
            extraContent={
              <CustomButton disabled type="link">
                <Link to={""} className="divider-extra-content">
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
          /> */}
        </div>
      )}
    </Div>
  );
};

export default BusinessTransactionMoreDetailDrawerContent;
