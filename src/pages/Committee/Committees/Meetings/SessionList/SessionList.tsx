import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import SessionLIstTable from "../../../../../components/Committee/Committee/Meetings/SessionLIstTable/SessionLIstTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  ALL,
  CANCELED,
  DRAFT,
  FINALIZED,
  HELD,
  REGISTERED,
} from "../../../../../infrastructure/models/sessionListStatus";
import "./_sessionList.scss";

const SessionsList = () => {
  const [_, setSearchParams] = useSearchParams();
  useTitle({ text: "لیست جلسات" });
  const items = [
    {
      label: "همه",
      children: <SessionLIstTable type={ALL} />,
      key: "1",
    },
    {
      label: "پیش نویس",
      children: <SessionLIstTable type={DRAFT} />,
      key: "2",
    },
    {
      label: "ثبت شده",
      children: <SessionLIstTable type={REGISTERED} />,
      key: "3",
    },
    {
      label: "نهایی شده",
      children: <SessionLIstTable type={FINALIZED} />,
      key: "4",
    },
    {
      label: "لغو شده",
      children: <SessionLIstTable type={CANCELED} />,
      key: "5",
    },
    {
      label: "برگزار شده",
      children: <SessionLIstTable type={HELD} />,
      key: "6",
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-list-tabs-container">
      <Tabs
        items={items}
        dir="rtl"
        destroyInactiveTabPane={true}
        onChange={() => setSearchParams({})}
      />
    </div>
  );
};
export default SessionsList;
