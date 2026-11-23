import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  ACCUSATION_LIST_ADDITIONAL_RESEARCH,
  ACCUSATION_LIST_ALL,
  ACCUSATION_LIST_APPEALS_COMMITTEE,
  ACCUSATION_LIST_CENTRAL_COMMITTEE,
  ACCUSATION_LIST_DEFINITIVE_VOTES,
  ACCUSATION_LIST_PERFORMED,
  ACCUSATION_LIST_PRIMARY_COMMITTEE,
  ACCUSATION_LIST_READY_MEETING,
  ACCUSATION_LIST_REGISTERED,
  ACCUSATION_LIST_UNDERSTANDING,
} from "./@types/@typesAccusationsList";
import AccusationsListTable from "../../../../../components/Committee/HandleProcessing/Accusations/AccusationsListTable/AccusationsListTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_accusationsList.scss";

const AccusationsList = () => {
  const [_, setSearchParams] = useSearchParams();
  useTitle({ text: "لیست اتهامات" });
  const items = [
    {
      label: "همه",
      children: <AccusationsListTable accusationType={ACCUSATION_LIST_ALL} />,
      key: "1",
    },
    {
      label: "ثبت شده",
      children: <AccusationsListTable accusationType={ACCUSATION_LIST_REGISTERED} />,
      key: "2",
    },
    {
      label: "تحقیقات تکمیلی",
      children: (
        <AccusationsListTable accusationType={ACCUSATION_LIST_ADDITIONAL_RESEARCH} />
      ),
      key: "3",
    },
    {
      label: "تفهیم",
      children: <AccusationsListTable accusationType={ACCUSATION_LIST_UNDERSTANDING} />,
      key: "4",
    },
    {
      label: "آماده جلسه",
      children: <AccusationsListTable accusationType={ACCUSATION_LIST_READY_MEETING} />,
      key: "5",
    },
    {
      label: "کمیته بدوی",
      children: (
        <AccusationsListTable accusationType={ACCUSATION_LIST_PRIMARY_COMMITTEE} />
      ),
      key: "6",
    },
    {
      label: "کمیته تجدید نظر",
      children: (
        <AccusationsListTable accusationType={ACCUSATION_LIST_APPEALS_COMMITTEE} />
      ),
      key: "7",
    },
    {
      label: "کمیته مرکزی",
      children: (
        <AccusationsListTable accusationType={ACCUSATION_LIST_CENTRAL_COMMITTEE} />
      ),
      key: "8",
    },
    {
      label: "آرای قطعی",
      children: (
        <AccusationsListTable accusationType={ACCUSATION_LIST_DEFINITIVE_VOTES} />
      ),
      key: "9",
    },
    {
      label: "اجرا شده",
      children: <AccusationsListTable accusationType={ACCUSATION_LIST_PERFORMED} />,
      key: "10",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="accusation-list-tabs-container">
      <Tabs
        items={items}
        dir="rtl"
        destroyInactiveTabPane={true}
        onChange={() => setSearchParams({})}
      />
    </div>
  );
};
export default AccusationsList;
