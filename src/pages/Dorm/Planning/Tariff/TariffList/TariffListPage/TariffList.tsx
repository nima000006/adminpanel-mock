import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  DORM_TARIFF_LIST_ACTIVE,
  DORM_TARIFF_LIST_AWAITING_REVIEW,
  DORM_TARIFF_LIST_INACTIVE,
  DORM_TARIFF_LIST_REJECTED,
  DORM_TARIFF_LIST_RETURNED,
} from "../../_shared/utils/TariffUtils";
import ActiveTab from "../helper/components/ActiveTab/ActiveTab";
import AwaitingReviewTab from "../helper/components/AwaitingReviewTab/AwaitingReviewTab";
import InactiveTab from "../helper/components/InactiveTab/InativeTab";
import RejectedTab from "../helper/components/RejectedTab/RejectedTab";
import ReturnedTab from "../helper/components/ReturnedTab/ReturnedTab";
import "./_tariffList.scss";

const TariffListTabs = [
  {
    label: "فعال",
    children: <ActiveTab type={DORM_TARIFF_LIST_ACTIVE} />,
    key: "1",
  },
  {
    label: "غیر فعال",
    children: <InactiveTab type={DORM_TARIFF_LIST_INACTIVE} />,
    key: "2",
  },
  {
    label: "در انتظار بررسی",
    children: <AwaitingReviewTab type={DORM_TARIFF_LIST_AWAITING_REVIEW} />,
    key: "3",
  },
  {
    label: "عودت داده شده",
    children: <ReturnedTab type={DORM_TARIFF_LIST_RETURNED} />,
    key: "4",
  },
  {
    label: "رد شده",
    children: <RejectedTab type={DORM_TARIFF_LIST_REJECTED} />,
    key: "5",
  },
];

const TariffList = () => {
  const { params, setSearchParams } = useQueryParams();

  const activeTab = params?.tab || "1";

  useTitle({ text: "تعرفه ها" });

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        items={TariffListTabs}
        className="tariff-list-tab-container"
        type="card"
        onChange={(key) => {
          setSearchParams({ tab: key });
        }}
        destroyOnHidden
      />
    </div>
  );
};

export default TariffList;
