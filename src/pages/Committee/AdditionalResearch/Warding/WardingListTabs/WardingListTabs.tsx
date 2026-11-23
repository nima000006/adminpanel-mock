import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_ALL,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_DRAFT,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CONFIRMATION,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_RECEIPT,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED,
} from "./@types/@wardingListTabs";
import WardingListTableAccused from "../../../../../components/Committee/Committee/AdditionalResearch/Warding/WardingListTableAccused/WardingListTableAccused";
import WardingListTableReporter from "../../../../../components/Committee/Committee/AdditionalResearch/Warding/WardingListTableReporter/WardingListTableReporter";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_wardingListTabs.scss";

const WardingListTabs = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "لیست پرونده ها" });
  const tabsItems = [
    {
      label: "همه",
      children: (
        <WardingListTableAccused type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_ALL} />
      ),
      key: "1",
    },
    {
      label: "پیش نویس",
      children: (
        <WardingListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_DRAFT}
        />
      ),
      key: "2",
    },
    {
      label: "انتظار تایید",
      children: (
        <WardingListTableReporter
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CONFIRMATION}
        />
      ),
      key: "3",
    },
    {
      label: "ثبت شده",
      children: (
        <WardingListTableReporter
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REGISTERED}
        />
      ),
      key: "4",
    },
    {
      label: "دریافتی",
      children: (
        <WardingListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_RECEIPT}
        />
      ),
      key: "5",
    },
    {
      label: "ارجاع شده",
      children: (
        <WardingListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED}
        />
      ),
      key: "6",
    },
    {
      label: "بسته شده",
      children: (
        <WardingListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED}
        />
      ),
      key: "7",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        type="line"
        // activeKey={"1"}
        items={tabsItems}
        className="committee-additional-research-warding-list-tabs-container"
        onChange={() => setSearchParams({})}
      />
    </CustomCard>
  );
};
export default WardingListTabs;
