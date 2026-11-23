import { Tabs } from "antd";

import BillingDetailFactorContent from "./helper/components/BillingDetailFactorContent/BillingDetailFactorContent";
import BillingInstallmentsContent from "./helper/components/BillingInstallmentsContent/BillingInstallmentsContent";
import BillingProductContent from "./helper/components/BillingProductContent/BillingProductContent";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_billingDetail.scss";

const BillingDetail = () => {
  const billingNum = new URLSearchParams(location.search).get("id");
  useTitle({ text: ` صورتحساب ${billingNum}` });

  const onTabChange = () => {};
  const onTabEdit = () => {};

  const tabsItems = [
    {
      label: "فاکتور",
      children: <>{<BillingDetailFactorContent />}</>,
      key: "1",
    },
    {
      label: "اقساط",
      children: <>{<BillingInstallmentsContent />}</>,
      key: "2",
    },
    {
      label: "محصولات",
      children: <BillingProductContent />,
      key: "3",
    },
  ];
  return (
    <div className="billing-detail-container">
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="bulling-detail-tabs-container"
      />
    </div>
  );
};

export default BillingDetail;
