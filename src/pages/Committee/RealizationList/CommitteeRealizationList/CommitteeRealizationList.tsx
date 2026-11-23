import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import RealizationListTable from "./helper/components/RealizationListTable/RealizationListTable";
import {
  ALL_COMMITTEE_REALIZATION_COMMITTEE,
  APPOINTMENT_WAITING_COMMITTEE_REALIZATION_COMMITTEE,
  FINISHED_COMMITTEE_REALIZATION_COMMITTEE,
  MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE,
} from "./realizationListStatus";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_committeeRealizationList.scss";

const items = [
  {
    label: "همه",
    children: <RealizationListTable type={ALL_COMMITTEE_REALIZATION_COMMITTEE} />,
    key: "1",
  },
  {
    label: "انتظار تعیین وقت",
    children: (
      <RealizationListTable type={APPOINTMENT_WAITING_COMMITTEE_REALIZATION_COMMITTEE} />
    ),
    key: "2",
  },
  {
    label: "انتظار برگزاری جلسه",
    children: (
      <RealizationListTable type={MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE} />
    ),
    key: "3",
  },
  {
    label: "اتمام یافته",
    children: <RealizationListTable type={FINISHED_COMMITTEE_REALIZATION_COMMITTEE} />,
    key: "4",
  },
];

const CommitteeRealizationList = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "پرونده ها" });
  return (
    <div className="committee-realization-list-page-container">
      <Tabs items={items} dir="rtl" onChange={() => setSearchParams({})} />
    </div>
  );
};

export default CommitteeRealizationList;
