import { useState } from "react";

import { Steps } from "antd";

import AccusationAndRequestStep from "./helper/components/AccusationAndRequestStep/AccusationAndRequestStep";
import PacketInfoStep from "./helper/components/PacketInfoStep/PacketInfoStep";
import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "../../../../../../infrastructure/helpers/utils";
import "./_submitterRequestsAdd.scss";

const SubmitterRequestsAdd = () => {
  useTitle({ text: "درخواست استعلام" });
  const [current, setCurrent] = useState(0);

  const stepsItem = [
    {
      id: "1",
      children: <AccusationAndRequestStep setCurrent={setCurrent} />,
    },
    {
      id: "2",
      children: <PacketInfoStep setCurrent={setCurrent} />,
    },
  ];

  return (
    <div className="submit-request-add-container">
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات متهم و درخواست",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "اطلاعات نامه",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default SubmitterRequestsAdd;
