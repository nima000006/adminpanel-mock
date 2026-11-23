import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router";

import {
  ALL_FINANCIAL,
  PAID_FINANCIAL,
  SETTLED_FINANCIAL,
} from "@pages/Financial/utils/financialUtils";

import FactorReportTables from "./Factors/FactorTables";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_financialMain.scss";

const FinancialMain = () => {
  useTitle({ text: "فاکتورها / تسویه" });
  const [, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "همه",
      children: <FactorReportTables type={ALL_FINANCIAL} />,
    },
    {
      key: "1",
      label: "پرداخت شده",
      children: <FactorReportTables type={PAID_FINANCIAL} />,
    },
    {
      key: "2",
      label: "تسویه شده",
      children: <FactorReportTables type={SETTLED_FINANCIAL} />,
    },
  ];

  return (
    <div className="financial-main-container">
      <Tabs items={items} onChange={() => setSearchParams({})} />
    </div>
  );
};

export default FinancialMain;
