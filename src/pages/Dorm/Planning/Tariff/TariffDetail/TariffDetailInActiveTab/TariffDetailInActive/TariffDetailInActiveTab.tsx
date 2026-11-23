import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFFS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { TariffDetailInActiveTabsProps } from "./@types/@tariffDetailInActiveTab";
import { DORM_PRICING_READ_ONLY } from "../../../_shared/utils/TariffUtils";
import TariffInActiveAdmissionScheduleTab from "../helpers/TariffInActiveAdmissionScheduleTab/TariffInActiveAdmissionScheduleTab";
import TariffInActiveBasicInfoTab from "../helpers/TariffInActiveBasicInfoTab/TariffInActiveBasicInfoTab";
import TariffInActiveChangeHistoryTab from "../helpers/TariffInActiveChangeHistoryTab/TariffInActiveChangeHistoryTab";
import TariffInActivePricingTab from "../helpers/TariffInActivePricingTab/TariffInActivePricingTab";
import "./_tariffDetailInActiveTab.scss";

const TariffDetailInActiveTab = () => {
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
  const TariffDetailsTabs: TariffDetailInActiveTabsProps = () => {
    return [
      {
        label: "اطلاعات اولیه",
        children: <TariffInActiveBasicInfoTab />,
        key: "1",
      },
      {
        label: "قیمت گذاری",
        children: <TariffInActivePricingTab type={DORM_PRICING_READ_ONLY} />,
        key: "2",
      },
      {
        label: "برنامه پذیرش ها",
        children: <TariffInActiveAdmissionScheduleTab />,
        key: "3",
      },
      {
        label: "تاریخچه تغییرات",
        children: <TariffInActiveChangeHistoryTab />,
        key: "4",
        disabled: true,
      },
    ];
  };
  return (
    <div>
      <Tabs
        items={TariffDetailsTabs()}
        className="tariff-detail-inActive-tab-container"
        type="card"
      />
    </div>
  );
};

export default TariffDetailInActiveTab;
