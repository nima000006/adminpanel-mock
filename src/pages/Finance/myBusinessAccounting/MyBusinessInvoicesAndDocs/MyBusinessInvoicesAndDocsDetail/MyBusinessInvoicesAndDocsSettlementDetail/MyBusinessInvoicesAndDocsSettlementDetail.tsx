import { Tabs, TabsProps } from "antd";
import { PiCardholder, PiFileText } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE } from "@infra/router/routes/finance";

import MyBusinessInvoicesAndDocsDetailAttachedDocument from "./helper/MyBusinessInvoicesAndDocsDetailAttachedDocument/MyBusinessInvoicesAndDocsDetailAttachedDocument";
import MyBusinessInvoicesAndDocsDetailDebtDocument from "./helper/MyBusinessInvoicesAndDocsDetailDebtDocument/MyBusinessInvoicesAndDocsDetailDebtDocument";
import MyBusinessInvoicesAndDocsDetailSettlementDocument from "./helper/MyBusinessInvoicesAndDocsDetailSettlementDocument/MyBusinessInvoicesAndDocsDetailSettlementDocument";
import "./_myBusinessInvoicesAndDocsSettlementDetail.scss";
const MyBusinessInvoicesAndDocsSettlementDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="overview-breadcrumb-title">مالی</span>,
      },
      {
        title: <span className="overview-breadcrumb-title">حسابداری من</span>,
      },
      {
        title: (
          <Link
            to={FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE}
            className="overview-breadcrumb-title"
          >
            فاکتورها و اسناد
          </Link>
        ),
      },
      {
        title: "کسب و کار",
      },
    ],
  });
  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "سند تسویه",
      children: <MyBusinessInvoicesAndDocsDetailSettlementDocument />,
      icon: <PiCardholder />,
    },
    {
      key: "1",
      label: "اسناد پیوست",
      children: <MyBusinessInvoicesAndDocsDetailAttachedDocument />,
      icon: <PiFileText />,
    },
    {
      key: "2",
      label: "اسناد بدهکاری",
      children: <MyBusinessInvoicesAndDocsDetailDebtDocument />,
      icon: <PiFileText />,
    },
  ];

  return (
    <div className="my-invoices-and-docs-detail-container">
      <Tabs className="tabs-container" centered items={items} destroyOnHidden={true} />
    </div>
  );
};

export default MyBusinessInvoicesAndDocsSettlementDetail;
