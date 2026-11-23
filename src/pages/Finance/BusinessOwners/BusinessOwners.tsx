import { Tabs } from "antd";
import { PiArrowsLeftRight, PiCoins, PiPresentation } from "react-icons/pi";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import FinanceBusinessOwnersFinancialTurnover from "./helpers/components/FinanceBusinessOwnersFinancialTurnover/FinanceBusinessOwnersFinancialTurnover";
import FinanceBusinessOwnersGeneralInformation from "./helpers/components/FinanceBusinessOwnersGeneralInformation/FinanceBusinessOwnersGeneralInformation";
import FinanceBusinessOwnersTransactions from "./helpers/components/FinanceBusinessOwnersTransactions/FinanceBusinessOwnersTransactions";
import "./_businessOwners.scss";

const BusinessOwners = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeTab = params?.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      { title: "داشبورد مالکین کسب و کار" },
    ],
  });

  const tabsItems = [
    {
      label: (
        <>
          <PiPresentation /> نمایه کلی
        </>
      ),
      children: <FinanceBusinessOwnersGeneralInformation />,
      key: "1",
    },
    {
      label: (
        <>
          <PiCoins /> تراکنش‌ها
        </>
      ),
      children: <FinanceBusinessOwnersTransactions />,
      key: "2",
    },
    {
      label: (
        <>
          <PiArrowsLeftRight />
          گردش مالی
        </>
      ),
      children: <FinanceBusinessOwnersFinancialTurnover />,
      key: "3",
      disabled: true,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="business-owners-container"
      // onChange={changeTabHandler}
      onChange={(key) => {
        setSearchParams({ tab: key });
      }}
      activeKey={activeTab}
    />
  );
};
export default BusinessOwners;
