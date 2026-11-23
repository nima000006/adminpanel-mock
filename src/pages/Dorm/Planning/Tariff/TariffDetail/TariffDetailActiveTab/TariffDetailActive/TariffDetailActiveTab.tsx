import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { TariffDetailTabsProps } from "./@types/tariffDetail";
import { DORM_PRICING_READ_ONLY } from "../../../_shared/utils/TariffUtils";
import AdmissionScheduleTab from "../helpers/AdmissionScheduleTab/AdmissionScheduleTab";
import HistoryChangesTab from "../helpers/HistoryChangesTab/HistoryChangesTab";
import PricingTab from "../helpers/PricingTab/PricingTab";
import TariffBasicInfoTab from "../helpers/TariffBasicInfoTab/TariffBasicInfoTab";
import "./_tariffDetailActiveTab.scss";

const TariffDetailActiveTab = () => {
  const {
    params: { title },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_TARIFFS_LIST_PAGE_ROUTE}> تعرفه ها</Link>,
      },
      ...(title
        ? [
            {
              title: title,
            },
          ]
        : []),
    ],
  });
  const TariffDetailsTabs: TariffDetailTabsProps = () => {
    return [
      {
        label: "اطلاعات اولیه",
        children: <TariffBasicInfoTab />,
        key: "1",
      },
      {
        label: "قیمت گذاری",
        children: <PricingTab type={DORM_PRICING_READ_ONLY} />,
        key: "2",
      },
      {
        label: "برنامه پذیرش ها",
        children: <AdmissionScheduleTab />,
        key: "3",
      },
      {
        label: "تاریخچه تغییرات",
        children: <HistoryChangesTab />,
        key: "4",
        disabled: true,
      },
    ];
  };
  return (
    <div>
      <Tabs
        items={TariffDetailsTabs()}
        className="tariff-detail-tab-container"
        type="card"
      />
    </div>
  );
};

export default TariffDetailActiveTab;
