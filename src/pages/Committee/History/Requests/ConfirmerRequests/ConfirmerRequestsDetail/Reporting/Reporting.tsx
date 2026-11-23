import { useState } from "react";

import { Steps } from "antd";

import PacketInformationTab from "./helper/components/PacketInformationTab/PacketInformationTab";
import ReviewTab from "./helper/components/ReviewTab/ReviewTab";
import SelectAccusationTab from "./helper/components/SelectAccusationTab/SelectAccusationTab";
import { stepStatusCreator } from "../../../../../../../infrastructure/helpers/utils";
import "./_reporting.scss";

const Reporting = () => {
  const [current, setCurrent] = useState(0);
  const stepsItem = [
    {
      label: "انتخاب اتهام",
      children: <SelectAccusationTab setCurrent={setCurrent} />,
    },
    {
      label: "اطلاعات نامه",
      children: <PacketInformationTab setCurrent={setCurrent} />,
    },
    {
      label: "بازبینی",
      children: <ReviewTab setCurrent={setCurrent} />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-request-detail-reporting">
      <Steps
        type="navigation"
        current={current}
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

export default Reporting;
