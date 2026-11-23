import { useState } from "react";

import { Steps } from "antd";

import ReadOnlyIssuedVoteStep from "@pages/Committee/History/_shared/components/IssuedVoteStep/ReadOnlyIssuedVoteStep";

import RemoveHistoryInfringementInformationStep from "./helper/components/RemoveHistoryInfringementInformationStep/RemoveHistoryInfringementInformationStep";
import { RemoveHistoryOtherDocumentsStep } from "./helper/components/RemoveHistoryOtherDocumentsStep/RemoveHistoryOtherDocumentsStep";
import RemoveHistoryPartiesInformationStep from "./helper/components/RemoveHistoryPartiesInformationStep/RemoveHistoryPartiesInformationStep";
import RequestDetail from "./helper/components/RequestDetail/RequestDetail";
import useTitle from "../../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../../../../infrastructure/helpers/utils";

import "./_removeHistory.scss";

const RemoveHistory = () => {
  useTitle({ text: "درخواست حذف سوابق" });

  const [current, setCurrent] = useState(0);
  const [violationId, setViolationId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<boolean | undefined>();

  const stepsItem = [
    {
      id: "1",
      children: (
        <RemoveHistoryPartiesInformationStep
          violationId={violationId}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      id: "2",
      children: (
        <RemoveHistoryInfringementInformationStep
          violationId={violationId}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      id: "3",
      children: (
        <ReadOnlyIssuedVoteStep setCurrentStep={setCurrent} deleteRequestStatus={false} />
      ),
    },
    {
      id: "4",
      children: (
        <RemoveHistoryOtherDocumentsStep
          violationId={violationId}
          setCurrent={setCurrent}
          confirm={confirm}
        />
      ),
    },
  ];

  return (
    <div className="committee-request-remove-history-container">
      <RequestDetail
        setViolationId={setViolationId}
        confirm={confirm}
        setConfirm={setConfirm}
      />
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات طرفین",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "اطلاعات اتهام / تخلف",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "آرا صادره",
          },
          {
            status: stepStatusCreator(current, 3),
            title: "سایر اسناد",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};
export default RemoveHistory;
