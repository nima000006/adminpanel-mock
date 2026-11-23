import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_ALL,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_AWAITED_MEETING,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_CANCELED,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_HELD,
} from "./ConsultingCenterSessionListTabsUtil";
import ConsultingCenterSessionListTable from "./helper/components/ConsultingCenterSessionListTable/ConsultingCenterSessionListTable";
import CustomCard from "../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_consultingCenterSessionListTabs.scss";

const ConsultingCenterSessionListTab = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "لیست جلسات" });
  const tabsItems = [
    {
      label: "همه",
      children: (
        <ConsultingCenterSessionListTable
          type={COMMITTEE_CONSULTING_CENTER_SESSION_LIST_ALL}
        />
      ),
      key: "1",
    },
    {
      label: "انتظار برگزاری",
      children: (
        <ConsultingCenterSessionListTable
          type={COMMITTEE_CONSULTING_CENTER_SESSION_LIST_AWAITED_MEETING}
        />
      ),
      key: "2",
    },
    {
      label: "برگزار شده",
      children: (
        <ConsultingCenterSessionListTable
          type={COMMITTEE_CONSULTING_CENTER_SESSION_LIST_HELD}
        />
      ),
      key: "3",
    },
    {
      label: "لغو شده",
      children: (
        <ConsultingCenterSessionListTable
          type={COMMITTEE_CONSULTING_CENTER_SESSION_LIST_CANCELED}
        />
      ),
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        type="line"
        // activeKey={"1"}
        items={tabsItems}
        className="committee-consulting-center-session-list-tabs-container"
        onChange={() => setSearchParams({})}
      />
    </CustomCard>
  );
};
export default ConsultingCenterSessionListTab;
