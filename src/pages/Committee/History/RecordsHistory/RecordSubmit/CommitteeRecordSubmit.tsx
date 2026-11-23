import { useEffect, useState } from "react";

import { Steps } from "antd";
import { useSearchParams } from "react-router";

import InfringementInformationStep from "../../../../../components/Committee/Committee/RecordsHistory/InfringementInformation/InfringementInformationStep";
import IssuedVoteStep from "../../../../../components/Committee/Committee/RecordsHistory/IssuedVote/IssuedVoteStep";
import OtherDocumentsStep from "../../../../../components/Committee/Committee/RecordsHistory/OtherDocuments/OtherDocumentsStep";
import PartiesInformationStep from "../../../../../components/Committee/Committee/RecordsHistory/PartiesInformation/PartiesInformationStep";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../../infrastructure/helpers/utils";
import "./_committeeRecordSubmit.scss";

const CommitteeRecordSubmit = () => {
  useTitle({ text: "ثبت سوابق" });

  const [searchParams] = useSearchParams();
  const { step } = Object.fromEntries([...searchParams]);
  const [current, setCurrent] = useState(+step - 1 || 0);

  //? ================================ Effects ================================
  useEffect(() => {
    if (!step) {
      setCurrent(0);
    }
  }, [step]);

  const stepsItem = [
    {
      id: "1",
      children: <PartiesInformationStep setCurrentStep={setCurrent} />,
    },
    {
      id: "2",
      children: <InfringementInformationStep setCurrentStep={setCurrent} />,
    },
    {
      id: "3",
      children: <IssuedVoteStep setCurrentStep={setCurrent} />,
    },
    {
      id: "4",
      children: <OtherDocumentsStep setCurrentStep={setCurrent} />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-records-submit-page-container">
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

export default CommitteeRecordSubmit;
