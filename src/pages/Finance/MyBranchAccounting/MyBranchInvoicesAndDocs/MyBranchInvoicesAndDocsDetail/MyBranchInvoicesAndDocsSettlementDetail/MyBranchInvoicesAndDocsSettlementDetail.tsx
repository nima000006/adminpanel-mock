import { Tabs, TabsProps } from "antd";
import { PiCardholder, PiFileText } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE } from "@infra/router/routes/finance";
import MyBranchInvoicesAndDocsDetailAttachedDocument from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailAttachedDocument/MyBranchInvoicesAndDocsDetailAttachedDocument";
import MyBranchInvoicesAndDocsDetailDebtDocument from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailDebtDocument/MyBranchInvoicesAndDocsDetailDebtDocument";
import MyBranchInvoicesAndDocsDetailSettlementDocument from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsSettlementDetail/helper/MyBranchInvoicesAndDocsDetailSettlementDocument/MyBranchInvoicesAndDocsDetailSettlementDocument";
import "./_myBranchInvoicesAndDocsSettlementDetail.scss";
const MyBranchInvoicesAndDocsSettlementDetail = () => {
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
            to={FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE}
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
      children: <MyBranchInvoicesAndDocsDetailSettlementDocument />,
      icon: <PiCardholder />,
    },
    {
      key: "1",
      label: "اسناد پیوست",
      children: <MyBranchInvoicesAndDocsDetailAttachedDocument />,
      icon: <PiFileText />,
    },
    {
      key: "2",
      label: "اسناد بدهکاری",
      children: <MyBranchInvoicesAndDocsDetailDebtDocument />,
      icon: <PiFileText />,
    },
  ];

  return (
    <div className="my-branch-invoices-and-docs-detail-container">
      <Tabs className="tabs-container" centered items={items} destroyOnHidden={true} />
    </div>
  );
};

export default MyBranchInvoicesAndDocsSettlementDetail;
