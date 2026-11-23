import { Tabs } from "antd";
import { PiFileText, PiFile } from "react-icons/pi";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import FactorsAndDocsDebtDocuments from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/FactorsAndDocsDebtDocuments";
import FactorsAndDocsSettledDocuments from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/FactorsAndDocsSettledDocuments";

import FactorsAndDocsDocumentsCreditor from "./helper/components/FactorsAndDocsDocumentsCreditor/FactorsAndDocsDocumentsCreditor";
import FactorsAndDocsFactors from "./helper/components/FactorsAndDocsFactors/FactorsAndDocsFactors";

import "./_factorsAndDocs.scss";

const FactorsAndDocs = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params.tab || "1";

  // ================================ breadCrumb  ================================
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">مالی</span>,
      },
      {
        title: <span className="management-breadcrumb-title">حسابداران</span>,
      },
      {
        title: "فاکتور و سند",
      },
    ],
  });

  // ================================ components ================================
  const tabsItems = [
    {
      label: (
        <div className="finance-accounting-custom-tab-text-container">
          <PiFile />
          <span>فاکتورها</span>
        </div>
      ),
      children: <FactorsAndDocsFactors />,
      key: "1",
    },
    {
      label: (
        <div className="finance-accounting-custom-tab-text-container">
          <PiFileText />
          <span>اسناد بستانکاری</span>
        </div>
      ),
      children: <FactorsAndDocsDocumentsCreditor />,
      key: "2",
    },
    {
      label: (
        <div className="finance-accounting-custom-tab-text-container">
          <PiFileText />
          <span>اسناد بدهکاری</span>
        </div>
      ),
      children: <FactorsAndDocsDebtDocuments />,
      key: "3",
    },
    {
      label: (
        <div className="finance-accounting-custom-tab-text-container">
          <PiFileText />
          <span>اسناد تسویه</span>
        </div>
      ),
      children: <FactorsAndDocsSettledDocuments />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="finance-accounting-container"
      onChange={(key) => {
        setSearchParams({ tab: key });
      }}
      activeKey={activeKey}
      destroyOnHidden
    />
  );
};
export default FactorsAndDocs;
