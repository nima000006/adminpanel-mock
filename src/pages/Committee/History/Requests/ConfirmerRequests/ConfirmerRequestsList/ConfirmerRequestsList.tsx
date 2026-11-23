import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CommitteeConfirmerList from "./helper/components/CommitteeConfirmerSubmitList/CommitteeConfirmerList";
import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER__ARCHIVE_PAGE_ROUTE } from "../../../../../../infrastructure/router/routes/committee";
import {
  COMMITTEE_SUBMITTER_REQUESTS_ALL,
  COMMITTEE_SUBMITTER_REQUESTS_ALL_CODE,
  COMMITTEE_SUBMITTER_REQUESTS_ANSWERED,
  COMMITTEE_SUBMITTER_REQUESTS_ANSWERED_CODE,
  COMMITTEE_SUBMITTER_REQUESTS_PENDING,
  COMMITTEE_SUBMITTER_REQUESTS_PENDING_CODE,
  COMMITTEE_SUBMITTER_REQUESTS_REJECTED,
  COMMITTEE_SUBMITTER_REQUESTS_REJECTED_CODE,
} from "../../_shared/helper/RequestListUtil/RequestListUtil";
import "./_confirmRequestList.scss";

const ConfirmerRequestsList = () => {
  const [_, setSearchParams] = useSearchParams();
  useTitle({ text: "درخواست ها" });
  const navigate = useNavigate();

  const items = [
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_ALL,
      children: (
        <CommitteeConfirmerList tableType={COMMITTEE_SUBMITTER_REQUESTS_ALL_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_ALL,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_PENDING,
      children: (
        <CommitteeConfirmerList tableType={COMMITTEE_SUBMITTER_REQUESTS_PENDING_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_PENDING,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_ANSWERED,
      children: (
        <CommitteeConfirmerList tableType={COMMITTEE_SUBMITTER_REQUESTS_ANSWERED_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_ANSWERED,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_REJECTED,
      children: (
        <CommitteeConfirmerList tableType={COMMITTEE_SUBMITTER_REQUESTS_REJECTED_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_REJECTED,
    },
  ];

  //* ================================ Util Functions ================================
  const archiveView = () => {
    navigate(COMMITTEE_HISTORY_REQUESTS_CONFIRMER__ARCHIVE_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="confirm-page-container">
      <div className="committee-confirm-top-btn-wrapper">
        <Button type="primary" ghost onClick={archiveView} disabled>
          مشاهده آرشیو
        </Button>
      </div>
      <div className="committee-confirm-tabs-container">
        <Tabs items={items} onChange={() => setSearchParams({})} dir="rtl" />
      </div>
    </div>
  );
};

export default ConfirmerRequestsList;
