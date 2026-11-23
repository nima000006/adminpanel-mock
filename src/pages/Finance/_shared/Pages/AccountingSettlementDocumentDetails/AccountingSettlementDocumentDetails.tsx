import { useEffect } from "react";

import { Tabs } from "antd";
import { PiCardholder, PiFileText } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE,
  FINANCE_ACCOUNTING_PAGE_ROUTE,
  FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE,
  FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE,
} from "@infra/router/routes/finance";
import AccountingSettlementDocumentDetailsCreditor from "@pages/Finance/_shared/Pages/AccountingSettlementDocumentDetails/helper/components/AccountingSettlementDocumentDetailsCreditor/AccountingSettlementDocumentDetailsCreditor";
import AccountingSettlementDocumentDetailsDebit from "@pages/Finance/_shared/Pages/AccountingSettlementDocumentDetails/helper/components/AccountingSettlementDocumentDetailsDebit/AccountingSettlementDocumentDetailsDebit";
import AccountingSettlementDocumentDetailsSettlement from "@pages/Finance/_shared/Pages/AccountingSettlementDocumentDetails/helper/components/AccountingSettlementDocumentDetailsSettlement/AccountingSettlementDocumentDetailsSettlement";
import "./_accountingSettlementDocumentDetails.scss";

const AccountingSettlementDocumentDetails = () => {
  const { params, setSearchParams } = useQueryParams();

  // dynamic breadcrumb

  const backLinkMap: Record<string, { title: string; link: string }> = {
    factor: {
      title: "فاکتور و اسناد",
      link: `${FINANCE_ACCOUNTING_PAGE_ROUTE}?tab=4`,
    },
    operation: {
      title: "عملیات حسابداری",
      link: `${FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE}?tab=${params?.sourceTab ?? "2"}`,
    },
    myFactors: {
      title: "فاکتورها و اسناد من",
      link: `${FINANCE_MY_INVOICES_AND_DOCS_PAGE_ROUTE}?tab=4`,
    },
    myFactorsBusiness: {
      title: "فاکتور و اسناد کسب و کار من",
      link: `${FINANCE_MY_BUSINESS_INVOICES_AND_DOCS_PAGE_ROUTE}?tab=4`,
    },
  };

  const currentBack =
    backLinkMap[params?.from as keyof typeof backLinkMap] ?? backLinkMap.factor;
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      {
        title: <Link to={currentBack?.link}>{currentBack.title}</Link>,
      },
      {
        title: "سند تسویه",
      },
    ],
  });
  //? ================================ Effects ================================

  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({
        ...params,
        tab: "1",
      });
    }
  }, [params?.tab]);

  //* ================================ Util Functions ================================
  const tabsItems = [
    {
      label: "سند تسویه",
      icon: <PiCardholder />,
      children: <AccountingSettlementDocumentDetailsSettlement />,
      key: "1",
    },
    {
      label: "اسناد بستانکاری",
      icon: <PiFileText />,
      children: <AccountingSettlementDocumentDetailsCreditor />,
      key: "2",
    },
    {
      label: "اسناد بدهکاری",
      icon: <PiFileText />,
      children: <AccountingSettlementDocumentDetailsDebit />,
      key: "3",
    },
  ];
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      className="accounting-settlement-document-details-tabs-container"
      items={tabsItems}
      centered
      activeKey={params?.tab ?? "1"}
      destroyOnHidden
      onChange={(key) =>
        setSearchParams({
          ...params,
          tab: key,
        })
      }
    />
  );
};
export default AccountingSettlementDocumentDetails;
