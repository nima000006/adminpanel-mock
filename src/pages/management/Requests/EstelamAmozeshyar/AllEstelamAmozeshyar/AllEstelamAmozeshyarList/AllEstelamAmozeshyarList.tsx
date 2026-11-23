import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import { EstelamAmozeshyarListTabsKeys } from "../../_shared/utils/estelamAmozeshyarUtil";
import EstelamAmozeshyarConfirmedListTab from "./helper/components/EstelamAmozeshyarConfirmedList/EstelamAmozeshyarConfirmedListTab";
import EstelamAmozeshyarRejectedListTab from "./helper/components/EstelamAmozeshyarRejectedList/EstelamAmozeshyarRejectedListTab";
import EstelamAmozeshyarWaitingReviewListTab from "./helper/components/EstelamAmozeshyarWaitingReviewList/EstelamAmozeshyarWaitingReviewListTab";
import "./_allEstelamAmozeshyarList.scss";

const AllEstelamAmozeshyarListTabs = () => {
  const { params, setSearchParams } = useQueryParams<{ tab: string }>();
  const activeTab = params?.tab || "1";

  useTitle({ text: "درخواست‌ها / استعلام آموزشیار" });

  const EstelamAmozeshyarListTabs = [
    {
      label: "در انتظار بررسی",
      children: <EstelamAmozeshyarWaitingReviewListTab />,
      key: EstelamAmozeshyarListTabsKeys.waitingReview,
    },
    {
      label: "تایید شده",
      children: <EstelamAmozeshyarConfirmedListTab />,
      key: EstelamAmozeshyarListTabsKeys.confirmed,
    },
    {
      label: "رد شده",
      children: <EstelamAmozeshyarRejectedListTab />,
      key: EstelamAmozeshyarListTabsKeys.rejected,
    },
  ];

  //? ================================ Effects ================================

  return (
    <div className="management-requests-estelam-amozeshyar-list-container">
      <Tabs
        activeKey={activeTab}
        items={EstelamAmozeshyarListTabs}
        className="estelam-amozeshyar-table-container"
        type="card"
        onChange={(key) => {
          setSearchParams({ tab: key });
        }}
        destroyOnHidden
      />
    </div>
  );
};

export default AllEstelamAmozeshyarListTabs;
