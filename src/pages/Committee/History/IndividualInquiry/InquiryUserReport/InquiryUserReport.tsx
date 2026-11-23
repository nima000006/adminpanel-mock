import { useState } from "react";

import { Steps } from "antd";

import EnvelopeInformationStep from "../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeInformationStep/EnvelopeInformationStep";
import EnvelopeReviewStep from "../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeReviewStep/EnvelopeReviewStep";
import { SelectAccusationStep } from "../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/SelectAccusationStep/SelectAccusationStep";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../../infrastructure/helpers/utils";
import "./_inquiryUserReport.scss";

const InquiryUserReport = () => {
  useTitle({ text: "گزارش گیری" });
  const [current, setCurrent] = useState(0);

  const stepsItem = [
    {
      id: "1",
      children: <SelectAccusationStep setCurrent={setCurrent} />,
    },
    {
      id: "2",
      children: <EnvelopeInformationStep setCurrent={setCurrent} />,
    },
    {
      id: "3",
      children: <EnvelopeReviewStep setCurrent={setCurrent} />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="inquiry-user-report-page-container">
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "انتخاب اتهام",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "اطلاعات نامه",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "بازبینی",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default InquiryUserReport;
