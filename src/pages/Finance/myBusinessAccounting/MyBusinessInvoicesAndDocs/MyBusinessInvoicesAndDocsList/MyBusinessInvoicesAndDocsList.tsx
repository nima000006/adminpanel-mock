import { useEffect } from "react";

import { Tabs } from "antd";
import { PiFileText, PiFile } from "react-icons/pi";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import MyBusinessInvoicesAndDocsDebtDocuments from "./helper/components/MyBusinessInvoicesAndDocsDebtDocuments/MyBusinessInvoicesAndDocsDebtDocuments";
import MyBusinessInvoicesAndDocsFactors from "./helper/components/MyBusinessInvoicesAndDocsFactors/MyBusinessInvoicesAndDocsFactors";
import MyBusinessInvoicesAndDocsServiceDocuments from "./helper/components/MyBusinessInvoicesAndDocsServiceDocuments/MyBusinessInvoicesAndDocsServiceDocuments";
import MyBusinessInvoicesAndDocsSettlementDocuments from "./helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/MyBusinessInvoicesAndDocsSettlementDocuments";
import "./_myBusinessInvoicesAndDocsList.scss";

const MyBusinessInvoicesAndDocsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداری کسب و کار من",
      },
      {
        title: "فاکتورها و اسناد",
      },
    ],
  });
  //? ================================ Components ================================
  const tabsItems = [
    {
      label: "فاکتورهای فروش خدمات",
      children: <MyBusinessInvoicesAndDocsFactors />,
      key: "1",
      icon: <PiFile />,
    },
    {
      children: <MyBusinessInvoicesAndDocsServiceDocuments />,
      label: "اسناد بستانکاری",
      key: "2",
      icon: <PiFileText />,
    },
    {
      children: <MyBusinessInvoicesAndDocsDebtDocuments />,
      label: "اسناد بدهکاری",
      key: "3",
      icon: <PiFileText />,
    },

    {
      label: "اسناد تسویه",
      children: <MyBusinessInvoicesAndDocsSettlementDocuments />,
      key: "4",
      icon: <PiFileText />,
    },
  ];
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: "1" }); // set 1 for default tab
    }
  }, [params?.tab, setSearchParams]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="business-invoices-and-docs-container flex"
      activeKey={activeKey}
      destroyOnHidden
      onChange={(key) => setSearchParams({ tab: key })}
    />
  );
};

export default MyBusinessInvoicesAndDocsList;
