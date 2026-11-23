import { useEffect, useState } from "react";

import { Row } from "antd";
import { PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_BUYERS_PAGE_ROUTE } from "@infra/router/routes/finance";
import { useLazyGetFinanceBuyersDetailQuery } from "@infra/states/redux/Apis/finance/buyersApi";
import BuyersDetailsBuyTable from "@pages/Finance/Buyers/BuyersDetails/helpers/components/BuyersDetailsBuyTable/BuyersDetailsBuyTable";
import BuyersDetailsReturnTable from "@pages/Finance/Buyers/BuyersDetails/helpers/components/BuyersDetailsReturnTable/BuyersDetailsReturnTable";

import { GetFinanceBuyersDetailResponse } from "./@types/@buyersDetails";
import BuyerProfile from "./helpers/components/BuyerProfile/BuyerProfile";

const BuyersDetails = () => {
  const [detailData, setDetailData] = useState<GetFinanceBuyersDetailResponse>();

  const [view, setView] = useState("0"); //default on buy mode

  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={FINANCE_BUYERS_PAGE_ROUTE}>مالی / خریداران</Link>,
      },
      {
        title: "مشاهده جزئیات خریدار",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getBuyersDetailData, { isFetching: isBuyerDetailDataLoading }] =
    useLazyGetFinanceBuyersDetailQuery();

  //? ================================ Effects ================================
  // detail
  useEffect(() => {
    getBuyersDetailData(params?.username)
      .unwrap()
      .then((res: GetFinanceBuyersDetailResponse) => setDetailData(res));
  }, [params?.username]);

  //* ================================ Util Functions ================================

  const segmentItems = [
    {
      id: "1",
      children: <BuyersDetailsBuyTable />,
    },
    {
      id: "2",
      children: <BuyersDetailsReturnTable />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Div loading={isBuyerDetailDataLoading}>
        <BuyerProfile detailData={detailData} />

        <CustomDivider
          text="اطلاعات هویتی"
          extraContent={
            <Link
              to=""
              className="text-neutral-6! pointer-events-none flex cursor-not-allowed! items-center gap-1 opacity-50"
              aria-disabled="true"
            >
              <PiUserLight size={16} /> پروفایل کاربر
            </Link>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام" value={detailData?.firstname} />
          <SingleVerticalWithCol label="نام خانوادگی" value={detailData?.lastname} />
          <SingleVerticalWithCol label="کد ملی / فراگیر" value={detailData?.username} />
          <SingleVerticalWithCol label="شماره همراه" value={detailData?.phoneNumber} />
        </Row>
        <CustomDivider text="اطلاعات مالی" className="mt-10!" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="تعداد تراکنش‌ها"
            value={detailData?.transactionCounts?.toString()}
          />
          <SingleVerticalWithCol
            label="مبلغ کل تراکنش‌ها (تومان)"
            value={detailData?.allTransactionsAmount?.toString()}
            isPrice
            isRial
          />
          <SingleVerticalWithCol
            label="تعداد تراکنش‌های عودت شده"
            value={detailData?.refundedCounts?.toString()}
          />
          <SingleVerticalWithCol
            label="مبلغ کل تراکنش‌های عودت شده (تومان)"
            value={detailData?.allRefundedAmount?.toString()}
            isPrice
            isRial
          />

          <SingleVerticalWithCol
            label="آخرین تراکنش"
            value={detailData?.lastTransactionDate}
            isDate
          />
        </Row>
      </Div>
      <CustomDivider
        text="لیست تراکنش‌ها"
        className="mt-10!"
        extraContent={
          <CustomSegmented
            options={[
              { value: "0", label: "خرید" },
              { value: "1", label: "عودت وجه" },
            ]}
            onChange={(value) => {
              setView(value as "0" | "1");

              if (params?.username) {
                setSearchParams({
                  username: params?.username,
                });
              } else {
                setSearchParams({});
              }
            }}
            value={view}
          />
        }
      />

      {segmentItems[+view]?.children}
    </div>
  );
};

export default BuyersDetails;
