import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import CommitteeSubmitList from "./helper/components/CommitteeSubmitList/CommitteeSubmitList";
import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ADD_PAGE_ROUTE,
  COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_PAGE_ROUTE,
} from "../../../../../../infrastructure/router/routes/committee";
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
import "./_submitterRequestsList.scss";

const SubmitterRequestsList = () => {
  useTitle({ text: "لیست درخواست استعلام" });

  const [_, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const items = [
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_ALL,
      children: <CommitteeSubmitList tableType={COMMITTEE_SUBMITTER_REQUESTS_ALL_CODE} />,
      key: COMMITTEE_SUBMITTER_REQUESTS_ALL,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_PENDING,
      children: (
        <CommitteeSubmitList tableType={COMMITTEE_SUBMITTER_REQUESTS_PENDING_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_PENDING,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_ANSWERED,
      children: (
        <CommitteeSubmitList tableType={COMMITTEE_SUBMITTER_REQUESTS_ANSWERED_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_ANSWERED,
    },
    {
      label: COMMITTEE_SUBMITTER_REQUESTS_REJECTED,
      children: (
        <CommitteeSubmitList tableType={COMMITTEE_SUBMITTER_REQUESTS_REJECTED_CODE} />
      ),
      key: COMMITTEE_SUBMITTER_REQUESTS_REJECTED,
    },
  ];

  //* ================================ Util Functions ================================
  const archiveView = () => {
    navigate(COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ARCHIVE_PAGE_ROUTE);
  };
  const newReportHandler = () => {
    navigate(COMMITTEE_HISTORY_REQUESTS_SUBMITTER_ADD_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="submit-page-container">
      <div className="committee-submit-top-btn-wrapper">
        <Button type="primary" ghost onClick={newReportHandler}>
          ثبت درخواست جدید
        </Button>
        <Button type="primary" ghost onClick={archiveView} disabled>
          مشاهده آرشیو
        </Button>
      </div>
      <div className="committee-submit-tabs-container">
        <Tabs
          items={items}
          onChange={() => setSearchParams({})}
          dir="rtl"
          // destroyInactiveTabPane={true}
        />
      </div>
    </div>
  );
};

export default SubmitterRequestsList;
