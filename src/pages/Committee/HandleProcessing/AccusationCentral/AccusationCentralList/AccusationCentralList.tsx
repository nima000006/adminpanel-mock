import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import CentralAccusationListTable from "../../../../../components/Committee/HandleProcessing/CentralAccusation/CentralAccusationListTable/CentralAccusationListTable";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { ACCUSATION_APPEAL_LIST_PERFORMED_CODE } from "../../AccusationAppeal/AccusationAppealList/@types/@accusationAppealList";
import {
  ACCUSATION_CENTRAL_LIST_ALL,
  ACCUSATION_CENTRAL_LIST_ALL_CODE,
  ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE,
  ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE,
  ACCUSATION_CENTRAL_LIST_DEFINITIVE_VOTES,
  ACCUSATION_CENTRAL_LIST_DEFINITIVE_VOTES_CODE,
  ACCUSATION_CENTRAL_LIST_NEW,
  ACCUSATION_CENTRAL_LIST_NEW_CODE,
  ACCUSATION_CENTRAL_LIST_PERFORMED,
  ACCUSATION_CENTRAL_LIST_READY,
  ACCUSATION_CENTRAL_LIST_READY_CODE,
  ACCUSATION_CENTRAL_LIST_RECEIVED,
  ACCUSATION_CENTRAL_LIST_RECEIVED_CODE,
  ACCUSATION_CENTRAL_LIST_REFERRED,
  ACCUSATION_CENTRAL_LIST_REFERRED_CODE,
  ACCUSATION_CENTRAL_LIST_UNDERSTANDING,
  ACCUSATION_CENTRAL_LIST_UNDERSTANDING_CODE,
} from "../../utils/Utils";

const AccusationCentralList = () => {
  const [_, setSearchParams] = useSearchParams();
  useTitle({ text: "لیست اتهامات" });
  const items = [
    {
      label: ACCUSATION_CENTRAL_LIST_ALL,
      children: (
        <CentralAccusationListTable accusationType={ACCUSATION_CENTRAL_LIST_ALL_CODE} />
      ),
      key: "1",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_NEW,
      children: (
        <CentralAccusationListTable accusationType={ACCUSATION_CENTRAL_LIST_NEW_CODE} />
      ),
      key: "2",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_REFERRED,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_CENTRAL_LIST_REFERRED_CODE}
        />
      ),
      key: "3",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_UNDERSTANDING,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_CENTRAL_LIST_UNDERSTANDING_CODE}
        />
      ),
      key: "4",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_RECEIVED,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_CENTRAL_LIST_RECEIVED_CODE}
        />
      ),
      key: "5",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_READY,
      children: (
        <CentralAccusationListTable accusationType={ACCUSATION_CENTRAL_LIST_READY_CODE} />
      ),
      key: "6",
    },

    {
      label: ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE}
        />
      ),
      key: "7",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_DEFINITIVE_VOTES,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_CENTRAL_LIST_DEFINITIVE_VOTES_CODE}
        />
      ),
      key: "8",
    },
    {
      label: ACCUSATION_CENTRAL_LIST_PERFORMED,
      children: (
        <CentralAccusationListTable
          accusationType={ACCUSATION_APPEAL_LIST_PERFORMED_CODE}
        />
      ),
      key: "9",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="accusation-list-tabs-container">
      <Tabs
        items={items}
        dir="rtl"
        // destroyInactiveTabPane={true}
        onChange={() => setSearchParams({})}
      />
    </div>
  );
};

export default AccusationCentralList;
