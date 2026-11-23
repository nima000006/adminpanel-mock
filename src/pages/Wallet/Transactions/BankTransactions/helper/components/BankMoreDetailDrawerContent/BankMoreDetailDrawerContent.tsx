import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Modal } from "antd";
import { PiCheck, PiHourglassSimpleHigh, PiProhibit } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  useLazyGetBankTransactionDetailsQuery,
  useLazyTransactionInquiryQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import {
  BankMoreDetailDrawerContentProps,
  GetBankTransactionDetailsResponse,
} from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/@types/@bankMoreDetailDrawerContent";
import { statusOption } from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/helper/utils";

const BankMoreDetailDrawerContent = ({
  closeDrawerHandler,
  transaction,
  setIsResolveConflict,
}: BankMoreDetailDrawerContentProps) => {
  const { paymentRequestId } = transaction ?? {};

  const [detailData, setDetailData] = useState<GetBankTransactionDetailsResponse>();

  const [estelamModalOpen, setEstelamModalOpen] = useState(false);

  //? ================================  Api Calls ================================
  const [getBankTransactionDetails, { isFetching: isGetBankTransactionDetailsLoading }] =
    useLazyGetBankTransactionDetailsQuery();

  const [
    getTransactionInquiry,
    { data: transactionInquiryData, isFetching: isGetTransactionInquiryLoading },
  ] = useLazyTransactionInquiryQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getBankTransactionDetails({ id: paymentRequestId })
      .unwrap()
      .then((res) => setDetailData(res));
  }, [getBankTransactionDetails, paymentRequestId]);

  //* ================================ column of descriptions  ================================

  const showUnSuccess =
    detailData?.transactionDetailResponseDto?.status?.name !== "REQUESTED";

  const infoTransactions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "درگاه بانکی",
      children: dataPlaceHolder({
        data: detailData?.transactionDetailResponseDto?.bank?.title,
      }),
    },
    {
      key: "2",
      label: "تاریخ و زمان تراکنش",
      children: dataPlaceHolder({
        data: detailData?.transactionDetailResponseDto?.createdDateTime,
        isDate: true,
        customDateFormat: "HH:mm, YYYY-MM-DD",
      }),
    },
    {
      key: "3",
      label: "شناسه تراکنش داخلی",
      children: paymentRequestId,
    },
    ...(showUnSuccess
      ? [
          {
            key: "4",
            label: "کد پیگیری",
            children: dataPlaceHolder({
              data: detailData?.transactionDetailResponseDto?.trackNumber,
            }),
          },
        ]
      : []),
    ...(showUnSuccess
      ? [
          {
            key: "5",
            label: "شماره مرجع درگاه",
            children: dataPlaceHolder({
              data: detailData?.transactionDetailResponseDto?.referenceNumber,
            }),
          },
        ]
      : []),

    {
      key: "6",
      label: "سرویس",
      children: (
        <SamimServiceTag
          service={detailData?.transactionDetailResponseDto.service?.name}
        />
      ),
    },
  ];

  const infoStudentTransactions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام",
      children: dataPlaceHolder({ data: detailData?.student?.firstname }),
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: dataPlaceHolder({
        data: detailData?.student?.lastname,
      }),
    },
    {
      key: "3",
      label: "کد ملی / کد فراگیر",
      children: dataPlaceHolder({ data: detailData?.student?.nationalCode }),
    },
    {
      key: "4",
      label: "شماره دانشجویی",
      children: dataPlaceHolder({ data: detailData?.student?.studentNumber }),
    },
    {
      key: "5",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: detailData?.student?.mobileNumber }),
    },
    {
      key: "6",
      label: "مقطع تحصیلی",
      children: dataPlaceHolder({ data: detailData?.student?.degree }),
    },
    {
      key: "7",
      label: "رشته تحصیلی",
      children: dataPlaceHolder({ data: detailData?.student?.studyField }),
    },
    {
      key: "8",
      label: "واحد / شعبه",
      children: dataPlaceHolder({ data: detailData?.student?.branchName }),
    },
    {
      key: "9",
      label: "نام دانشکده",
      children: emptyString,
    },
  ];
  const resolveConflictBtn = () => {
    if (paymentRequestId) {
      setIsResolveConflict({ isOpen: true, id: paymentRequestId });
    }
  };

  const statusTag = statusOption.find(
    (item) => item.name === detailData?.transactionDetailResponseDto?.status?.name
  );

  const estelamHandler = () => {
    if (paymentRequestId) {
      setEstelamModalOpen(true);
      getTransactionInquiry(paymentRequestId);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {estelamModalOpen && (
        <Modal
          open={estelamModalOpen}
          onCancel={() => setEstelamModalOpen(false)}
          title="استعلام از درگاه"
          centered
          footer={null}
        >
          <Div loading={isGetTransactionInquiryLoading}>
            <CustomDivider
              text="نتیجه استعلام"
              extraContent={
                <CustomTag
                  color={
                    transactionInquiryData?.status?.name === "FAILED" ? "red" : "green"
                  }
                >
                  {transactionInquiryData?.status?.title}
                </CustomTag>
              }
            />
            <div className="bg-neutral-2 h3-medium mb-2 rounded-lg p-4 text-center">
              {dataPlaceHolder({
                data: transactionInquiryData?.amount,
                isPrice: true,
                isRial: true,
              })}{" "}
              تومان
            </div>
            <Descriptions
              column={1}
              items={[
                {
                  key: "1",
                  label: "تاریخ و زمان تراکنش",
                  children: dataPlaceHolder({
                    data: transactionInquiryData?.transactionDateTime,
                    isDate: true,
                    customDateFormat: "HH:mm, YYYY-MM-DD",
                  }),
                },
                {
                  key: "2",
                  label: "شناسه تراکنش داخلی",
                  children: dataPlaceHolder({ data: paymentRequestId }),
                },
                {
                  key: "3",
                  label: "کد پیگیری",
                  children: dataPlaceHolder({
                    data: transactionInquiryData?.systemTraceNo,
                  }),
                },
                {
                  key: "4",
                  label: "شماره مرجع درگاه",
                  children: dataPlaceHolder({
                    data: transactionInquiryData?.retrievalRefNo,
                  }),
                },
                {
                  key: "5",
                  label: "شماره کارت درگاه",
                  children: dataPlaceHolder({ data: transactionInquiryData?.cardNo }),
                },
              ]}
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
            {transactionInquiryData?.message && (
              <div className="mt-5">
                <CustomAlert description={transactionInquiryData?.message} />
              </div>
            )}
          </Div>
        </Modal>
      )}
      <Div loading={isGetBankTransactionDetailsLoading}>
        <CustomDrawerHeader
          title="جزئیات بیشتر تراکنش"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="flex items-center gap-2">
              <CustomButton type="primary" onClick={estelamHandler}>
                استعلام از درگاه
              </CustomButton>
              {detailData?.transactionDetailResponseDto?.status?.name === "REVERTED" ? (
                <CustomButton type="primary" onClick={resolveConflictBtn}>
                  رفع مغایرت
                </CustomButton>
              ) : null}
            </div>
          }
        />
        <div className="flex flex-col gap-10">
          <div className="bg-neutral-2 flex flex-col items-center justify-center gap-3 rounded-md p-4!">
            <CustomTag
              className="flex w-fit gap-1"
              color={statusTag?.color}
              icon={
                statusTag?.name === "COMPLETED" ||
                statusTag?.name === "AVAILABLE_IN_WALLET" ||
                statusTag?.name === "REVERT_TO_WALLET" ? (
                  <PiCheck />
                ) : statusTag?.name === "VERIFIED" ? (
                  <PiHourglassSimpleHigh />
                ) : (
                  <PiProhibit />
                )
              }
            >
              {statusTag?.title}
            </CustomTag>

            <p className="text-2xl">
              {dataPlaceHolder({
                data: detailData?.transactionDetailResponseDto?.amount,
                isRial: true,
                isPrice: true,
              })}{" "}
              تومان
            </p>
          </div>

          {detailData?.transactionDetailResponseDto?.status?.name === "REVERTED" ? (
            <div>
              <CustomAlert
                showIcon
                title="چرا وضعیت تراکنش “مغایرت بانکی” است؟"
                description="این تراکنش در وضعیت «مغایرت بانکی» قرار دارد چون شارژ کیف پول کاربر انجام نشده است. برای بررسی و اصلاح وضعیت، روی «رفع مغایرت» کلیک کنید و استعلام بانک را دریافت نمایید."
                type="warning"
                className="body-regular"
              />
            </div>
          ) : null}

          {/* TRANSACTION DETAIL */}
          <CustomDivider text="جزئیات تراکنش" />
          <Descriptions
            column={1}
            items={infoTransactions}
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
          {/* USER INFO */}
          <CustomDivider
            text="اطلاعات کاربر"
            // extraContent={
            //   <Link
            //     to={{
            //       pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
            //       search: makeSearchParams({
            //         id: detailData?.,
            //       }),
            //     }}
            //     className="text-primary-6! flex items-center gap-2"
            //   >
            //     <PiUserLight size={16} /> پروفایل کاربر
            //   </Link>
            // }
          />
          <Descriptions
            column={1}
            items={infoStudentTransactions}
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
        </div>
      </Div>
    </>
  );
};

export default BankMoreDetailDrawerContent;
