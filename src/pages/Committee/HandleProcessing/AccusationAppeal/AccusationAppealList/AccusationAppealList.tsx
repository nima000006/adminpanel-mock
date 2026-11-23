import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  ACCUSATION_APPEAL_LIST_ALL,
  ACCUSATION_APPEAL_LIST_ALL_CODE,
  ACCUSATION_APPEAL_LIST_APPEALS_COMMITTEE,
  ACCUSATION_APPEAL_LIST_APPEALS_COMMITTEE_CODE,
  ACCUSATION_APPEAL_LIST_CENTRAL_COMMITTEE,
  ACCUSATION_APPEAL_LIST_CENTRAL_COMMITTEE_CODE,
  ACCUSATION_APPEAL_LIST_DEFINITIVE_VOTES,
  ACCUSATION_APPEAL_LIST_DEFINITIVE_VOTES_CODE,
  ACCUSATION_APPEAL_LIST_NEW,
  ACCUSATION_APPEAL_LIST_NEW_CODE,
  ACCUSATION_APPEAL_LIST_PERFORMED,
  ACCUSATION_APPEAL_LIST_PERFORMED_CODE,
  ACCUSATION_APPEAL_LIST_READY,
  ACCUSATION_APPEAL_LIST_READY_CODE,
  ACCUSATION_APPEAL_LIST_RECEIVED,
  ACCUSATION_APPEAL_LIST_RECEIVED_CODE,
  ACCUSATION_APPEAL_LIST_REFERRED,
  ACCUSATION_APPEAL_LIST_REFERRED_CODE,
  ACCUSATION_APPEAL_LIST_UNDERSTANDING,
  ACCUSATION_APPEAL_LIST_UNDERSTANDING_CODE,
} from "./@types/@accusationAppealList";
import AccusationsAppealListTable from "../../../../../components/Committee/HandleProcessing/AppealAccusation/AccusationsAppealListTable/AccusationsAppealListTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const AccusationAppealList = () => {
  const [_, setSearchParams] = useSearchParams();
  useTitle({ text: "لیست اتهامات" });
  const items = [
    {
      label: ACCUSATION_APPEAL_LIST_ALL,
      children: (
        <AccusationsAppealListTable accusationType={ACCUSATION_APPEAL_LIST_ALL_CODE} />
      ),
      key: ACCUSATION_APPEAL_LIST_ALL,
    },
    {
      label: ACCUSATION_APPEAL_LIST_NEW,
      children: (
        <AccusationsAppealListTable accusationType={ACCUSATION_APPEAL_LIST_NEW_CODE} />
      ),
      key: ACCUSATION_APPEAL_LIST_NEW,
    },
    {
      label: ACCUSATION_APPEAL_LIST_REFERRED,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_REFERRED_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_REFERRED,
    },
    {
      label: ACCUSATION_APPEAL_LIST_UNDERSTANDING,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_UNDERSTANDING_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_UNDERSTANDING,
    },
    {
      label: ACCUSATION_APPEAL_LIST_RECEIVED,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_RECEIVED_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_RECEIVED,
    },
    {
      label: ACCUSATION_APPEAL_LIST_READY,
      children: (
        <AccusationsAppealListTable accusationType={ACCUSATION_APPEAL_LIST_READY_CODE} />
      ),
      key: ACCUSATION_APPEAL_LIST_READY,
    },
    {
      label: ACCUSATION_APPEAL_LIST_APPEALS_COMMITTEE,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_APPEALS_COMMITTEE_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_APPEALS_COMMITTEE,
    },
    {
      label: ACCUSATION_APPEAL_LIST_CENTRAL_COMMITTEE,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_CENTRAL_COMMITTEE_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_CENTRAL_COMMITTEE,
    },
    {
      label: ACCUSATION_APPEAL_LIST_DEFINITIVE_VOTES,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_DEFINITIVE_VOTES_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_DEFINITIVE_VOTES,
    },
    {
      label: ACCUSATION_APPEAL_LIST_PERFORMED,
      children: (
        <AccusationsAppealListTable
          accusationType={ACCUSATION_APPEAL_LIST_PERFORMED_CODE}
        />
      ),
      key: ACCUSATION_APPEAL_LIST_PERFORMED,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="accusation-list-tabs-container">
      <Tabs
        items={items}
        dir="rtl"
        // onChange={(e) => onTabsChange(e as BusinessBaseTableTypes)}
        // destroyInactiveTabPane={true}
        onChange={() => setSearchParams({})}
      />
    </div>
  );
};

export default AccusationAppealList;
