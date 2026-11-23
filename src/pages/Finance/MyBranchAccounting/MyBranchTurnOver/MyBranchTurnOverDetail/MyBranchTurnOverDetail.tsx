import { Tabs } from "antd";
import { PiCardholder, PiFileText } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { FINANCE_MY_TURN_OVER_PAGE_ROUTE } from "@infra/router/routes/finance";
import MyBranchTurnOverDebitDocument from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverDebitDocument/MyBranchTurnOverDebitDocument";
import MyBranchTurnOverSettlementsDocuments from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSettlementsDocuments/MyBranchTurnOverSettlementsDocuments";
import MyBranchTurnOverSystemDocuments from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSystemDocuments/MyBranchTurnOverSystemDocuments";

import "./_myBranchTurnOverDetail.scss";

const MyBranchTurnOverDetail = () => {
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
      children: <MyBranchTurnOverSettlementsDocuments />,
      key: "1",
    },
    {
      label: "اسناد بستانکاری",
      icon: <PiFileText />,
      children: <MyBranchTurnOverSystemDocuments />,
      key: "3",
    },
    {
      label: "اسناد بدهکاری",
      icon: <PiFileText />,
      children: <MyBranchTurnOverDebitDocument />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="financial-my-branch-turn-over-detail-container">
      <Tabs className="custom-tabs" items={tabsItems} type="line" centered />
    </div>
  );
};

export default MyBranchTurnOverDetail;
