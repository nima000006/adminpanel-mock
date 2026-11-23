import { Tabs, TabsProps } from "antd";
import { PiGitBranch, PiGlobeHemisphereWest } from "react-icons/pi";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { INTERNATIONAL_BASIC_INFO_ROUTE } from "@infra/router/routes/international";

import InternationalBranchesInternational from "./helper/components/InternationalBranchesInternational/InternationalBranchesInternational";
import InternationalTotalBranches from "./helper/components/InternationalTotalBranches/InternationalTotalBranches";
import "./_branches.scss";

const Branches = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: "واحد‌های دانشگاهی",
      },
    ],
  });
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: (
        <div className="tab-title-container">
          <PiGitBranch />
          کلیه واحد‌ها
        </div>
      ),
      children: <InternationalTotalBranches />,
    },
    {
      key: "1",
      label: (
        <div className="tab-title-container">
          <PiGlobeHemisphereWest />
          واحد‌های بین‌الملل
        </div>
      ),
      children: <InternationalBranchesInternational />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="international-branch-container">
      <div className="tabs-container">
        <Tabs centered items={items} destroyOnHidden={true} />
      </div>
    </div>
  );
};

export default Branches;
