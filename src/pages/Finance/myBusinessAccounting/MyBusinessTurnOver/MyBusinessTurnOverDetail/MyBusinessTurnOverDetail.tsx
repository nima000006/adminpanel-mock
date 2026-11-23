import { Tabs } from "antd";
import { PiCardholder, PiFileText } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { FINANCE_MY_TURN_OVER_PAGE_ROUTE } from "@infra/router/routes/finance";

import MyBusinessTurnOverCreditDocument from "./helper/MyBusinessTurnOverCreditDocument/MyBusinessTurnOverCreditDocument";
import MyBusinessTurnOverSettlementsDocuments from "./helper/MyBusinessTurnOverSettlementsDocuments/MyBusinessTurnOverSettlementsDocuments";
import MyBusinessTurnOverSystemDocuments from "./helper/MyBusinessTurnOverSystemDocuments/MyBusinessTurnOverSystemDocuments";
import "./_myBusinessTurnOverDetail.scss";

const MyBusinessTurnOverDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="custom-bread-crumb">مالی</span>,
      },
      {
        title: <span className="custom-bread-crumb">حسابداری من</span>,
      },
      {
        title: (
          <Link className="custom-bread-crumb" to={FINANCE_MY_TURN_OVER_PAGE_ROUTE}>
            گردش مالی
          </Link>
        ),
      },
      { title: `جزئیات سند` },
    ],
  });

  const tabsItems = [
    {
      label: "سند تسویه",
      icon: <PiCardholder />,
      children: <MyBusinessTurnOverSettlementsDocuments />,
      key: "1",
    },
    {
      label: "اسناد بستانکاری",
      icon: <PiFileText />,
      children: <MyBusinessTurnOverSystemDocuments />,
      key: "3",
    },
    {
      label: "اسناد بدهکاری",
      icon: <PiFileText />,
      children: <MyBusinessTurnOverCreditDocument />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="financial-my-business-turn-over-detail-container">
      <Tabs className="custom-tabs" items={tabsItems} type="line" centered />
    </div>
  );
};

export default MyBusinessTurnOverDetail;
