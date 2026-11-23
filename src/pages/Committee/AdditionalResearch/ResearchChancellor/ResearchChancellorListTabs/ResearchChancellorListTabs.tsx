import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_ALL,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_CLOSED,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_DRAFT,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_RECEIPT,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_REFERRED,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_REGISTERED,
  COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_WAITING_CONFIRMATION,
} from "./@types/@researchChancellorListTabs";
import ResearchChancellorListTableAccused from "../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableAccused/ResearchChancellorListTableAccused";
import ResearchChancellorListTableReporter from "../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableReporter/ResearchChancellorListTableReporter";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_researchChancellorListTabs.scss";

const ResearchChancellorListTabs = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "لیست پرونده ها" });
  const tabsItems = [
    {
      label: "همه",
      children: (
        <ResearchChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_ALL}
        />
      ),
      key: "1",
    },
    {
      label: "پیش نویس",
      children: (
        <ResearchChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_DRAFT}
        />
      ),
      key: "2",
    },
    {
      label: "انتظار تایید",
      children: (
        <ResearchChancellorListTableReporter
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_WAITING_CONFIRMATION}
        />
      ),
      key: "3",
    },
    {
      label: "ثبت شده",
      children: (
        <ResearchChancellorListTableReporter
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_REGISTERED}
        />
      ),
      key: "4",
    },
    {
      label: "دریافتی",
      children: (
        <ResearchChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_RECEIPT}
        />
      ),
      key: "5",
    },
    {
      label: "ارجاع شده",
      children: (
        <ResearchChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_REFERRED}
        />
      ),
      key: "6",
    },
    {
      label: "بسته شده",
      children: (
        <ResearchChancellorListTableAccused
          type={COMMITTEE_ADDITIONAL_RESEARCH_CHANCELLOR_LIST_CLOSED}
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
        className="committee-research-chancellor-list-tabs-container"
        onChange={() => setSearchParams({})}
      />
    </CustomCard>
  );
};
export default ResearchChancellorListTabs;
