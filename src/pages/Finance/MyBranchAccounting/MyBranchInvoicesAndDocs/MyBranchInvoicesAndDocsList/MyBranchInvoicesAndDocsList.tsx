import { useEffect } from "react";

import { Tabs } from "antd";
import { PiFileText, PiFile } from "react-icons/pi";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import MyBranchInvoicesAndDocsDebtDocuments from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsDebtDocuments/MyBranchInvoicesAndDocsDebtDocuments";
import MyBranchInvoicesAndDocsFactors from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsFactors/MyBranchInvoicesAndDocsFactors";
import MyBranchInvoicesAndDocsServiceDocuments from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsServiceDocuments/MyBranchInvoicesAndDocsServiceDocuments";
import MyBranchInvoicesAndDocsSettlementDocuments from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/MyBranchInvoicesAndDocsSettlementDocuments";
import "./_myBranchInvoicesAndDocsList.scss";

const MyBranchInvoicesAndDocsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداری واحد من",
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
      children: <MyBranchInvoicesAndDocsFactors />,
      key: "1",
      icon: <PiFile />,
    },
    {
      children: <MyBranchInvoicesAndDocsServiceDocuments />,
      label: "اسناد بستانکاری",
      key: "2",
      icon: <PiFileText />,
    },
    {
      children: <MyBranchInvoicesAndDocsDebtDocuments />,
      label: "اسناد بدهکاری",
      key: "3",
      icon: <PiFileText />,
    },

    {
      label: "اسناد تسویه",
      children: <MyBranchInvoicesAndDocsSettlementDocuments />,
      key: "4",
      icon: <PiFileText />,
    },
  ];
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: "1" }); // set 1 for default tab
    }
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="branch-invoices-and-docs-container flex"
      activeKey={activeKey}
      destroyOnHidden
      onChange={(key) => setSearchParams({ tab: key })}
    />
  );
};

export default MyBranchInvoicesAndDocsList;
