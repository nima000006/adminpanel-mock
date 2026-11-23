import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router";

import FactorTables from "./helper/components/Factors/FactorTables";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  ALL_FINANCIAL,
  PAID_FINANCIAL,
  SETTLED_FINANCIAL,
} from "../utils/financialUtils";
import "./_financialMain.scss";

const FinancialMain = () => {
  useTitle({ text: "فاکتورها / تسویه" });

  const [, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "همه",
      children: <FactorTables type={ALL_FINANCIAL} />,
    },
    {
      key: "1",
      label: "پرداخت شده",
      children: <FactorTables type={PAID_FINANCIAL} />,
    },
    {
      key: "2",
      label: "تسویه شده",
      children: <FactorTables type={SETTLED_FINANCIAL} />,
    },
  ];

  return (
    <div className="financial-main-container">
      <Tabs
        items={items}
        destroyInactiveTabPane={true}
        onChange={() => setSearchParams({})}
      />
    </div>
  );
};

export default FinancialMain;
