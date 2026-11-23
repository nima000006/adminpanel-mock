import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { DORM_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import CancelRulesAndRegulation from "./helper/components/CancelRulesAndRegulation/CancelRulesAndRegulation";
import DisciplinaryRulesAndRegulation from "./helper/components/DisciplinaryRulesAndRegulation/DisciplinaryRulesAndRegulation";
import FinanceRulesAndRegulation from "./helper/components/FinanceRulesAndRegulation/FinanceRulesAndRegulation";
import GeneralRulesAndRegulation from "./helper/components/GeneralRulesAndRegulation/GeneralRulesAndRegulation";
import InstallmentsRulesAndRegulation from "./helper/components/InstallmentsRulesAndRegulation/InstallmentsRulesAndRegulation";
import "./_dormSubsetsRulesAndRegulations.scss";

const DormSubsetsRulesAndRegulations = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_BASIC_INFO_LIST_PAGE_ROUTE}>اطلاعات پایه اقامتگاه</Link>,
      },
      {
        title: "زیر مجموعه‌های قوانین و مقررات",
      },
    ],
  });

  const tabsItems = [
    {
      label: "قوانین و مقررات مالی",
      children: <FinanceRulesAndRegulation />,
      key: "1",
    },
    {
      label: "قوانین و مقررات انضباطی",
      children: <DisciplinaryRulesAndRegulation />,
      key: "2",
    },
    {
      label: "قوانین و مقررات عمومی",
      children: <GeneralRulesAndRegulation />,
      key: "3",
    },
    {
      label: "قوانین و مقررات کنسلی",
      children: <CancelRulesAndRegulation />,
      key: "4",
    },
    {
      label: "قوانین و مقررات اقساط",
      children: <InstallmentsRulesAndRegulation />,
      key: "5",
    },
  ];

  return (
    <div>
      <Tabs
        type="card"
        items={tabsItems}
        className="dorm-subsets-rules-regulations-tabs-container"
      />
    </div>
  );
};
export default DormSubsetsRulesAndRegulations;
