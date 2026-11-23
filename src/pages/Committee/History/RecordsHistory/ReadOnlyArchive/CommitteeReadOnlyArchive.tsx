import { useState } from "react";

import { Steps } from "antd";

import ReadOnlyInfringementInformationStep from "./helper/components/InfringementInformationStep/ReadOnlyInfringementInformationStep";
import ReadOnlyOtherDocumentsStep from "./helper/components/OtherDocumentsStep/ReadOnlyOtherDocumentsStep";
import ReadOnlyPartiesInformationStep from "./helper/components/PartiesInformationStep/ReadOnlyPartiesInformationStep";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../../infrastructure/helpers/utils";
import ReadOnlyIssuedVoteStep from "../../_shared/components/IssuedVoteStep/ReadOnlyIssuedVoteStep";
import "./_committeeReadOnlyArchive.scss";

const CommitteeReadOnlyArchive = () => {
  useTitle({ text: "جزئیات سوابق" });

  const [current, setCurrent] = useState(0);
  const [deleteRequestStatus, setDeleteRequestStatus] = useState<boolean | undefined>(
    false
  );

  const stepsItem = [
    {
      id: "1",
      children: (
        <ReadOnlyPartiesInformationStep
          setCurrentStep={setCurrent}
          setDeleteRequestStatus={setDeleteRequestStatus}
          deleteRequestStatus={deleteRequestStatus}
        />
      ),
    },
    {
      id: "2",
      children: (
        <ReadOnlyInfringementInformationStep
          setCurrentStep={setCurrent}
          deleteRequestStatus={deleteRequestStatus}
        />
      ),
    },
    {
      id: "3",
      children: (
        <ReadOnlyIssuedVoteStep
          setCurrentStep={setCurrent}
          deleteRequestStatus={deleteRequestStatus}
        />
      ),
    },
    {
      id: "4",
      children: (
        <ReadOnlyOtherDocumentsStep
          setCurrentStep={setCurrent}
          deleteRequestStatus={deleteRequestStatus}
        />
      ),
    },
  ];

  return (
    <div className="committee-read-only-archive-page-container">
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

export default CommitteeReadOnlyArchive;
