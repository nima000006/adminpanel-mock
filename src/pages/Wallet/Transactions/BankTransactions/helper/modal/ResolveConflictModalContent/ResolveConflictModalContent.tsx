import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetBankTransactionDetailsQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { GetBankTransactionDetailsResponse } from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/@types/@bankMoreDetailDrawerContent";
import { ResolveConflictModalContentProps } from "@pages/Wallet/Transactions/BankTransactions/helper/modal/ResolveConflictModalContent/@type/@resolveConflictModalContentType";

const ResolveConflictModalContent = ({ id }: ResolveConflictModalContentProps) => {
  const [detailData, setDetailData] = useState<GetBankTransactionDetailsResponse>();

  //? ================================  Api Calls ================================
  // get description data
  const [getBankTransactionDetails, { isFetching: isGetBankTransactionDetailsLoading }] =
    useLazyGetBankTransactionDetailsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id > 0) {
      getBankTransactionDetails({ id })
        .unwrap()
        .then((res) => setDetailData(res));
    }
  }, [getBankTransactionDetails, id]);
  //* ================================ Util Functions ================================
  const transactionDetailDescriptionItems: DescriptionsProps["items"] = [
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
      label: "شماره تراکنش",
      children: emptyString,
    },
    {
      key: "4",
      label: "سرویس",
      children: (
        <SamimServiceTag
          service={detailData?.transactionDetailResponseDto.service?.name}
        />
      ),
    },
    {
      key: "5",
      label: "نام و نام خانوادگی",
      children: dataPlaceHolder({
        data: `${detailData?.student?.firstname}  ${detailData?.student?.lastname}`,
      }),
    },
    {
      key: "6",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: detailData?.student?.mobileNumber }),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isGetBankTransactionDetailsLoading} className="flex flex-col gap-5">
      <div>
        <CustomDivider text="جزئیات تراکنش و کاربر انتخاب شده" />
        <Descriptions
          column={1}
          items={transactionDetailDescriptionItems}
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

      <CustomAlert
        showIcon
        title="رفع مغایرت"
        description="برای رفع مغایرت تراکنش، بر روی دکمه “استعلام از بانک و رفع مغایرت” کلیک نمایید."
        type="info"
        className="body-regular"
      />
    </Div>
  );
};
export default ResolveConflictModalContent;
