import { useState } from "react";

import { Steps } from "antd";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import SessionGuestsStep from "../SessionCreation/helper/components/SessionGuests/SessionGuestsStep";
import SessionInfoStep from "../SessionCreation/helper/components/SessionInfo/SessionInfoStep";
import SessionMembersStep from "../SessionCreation/helper/components/SessionMembers/SessionMembersStep";
import SessionRulesStep from "../SessionCreation/helper/components/SessionRules/SessionRulesStep";
import "./_committeeSessionEdition.scss";

const stepStatusCreator = (current: number, step: number) => {
  return current === step ? "process" : current < step ? "wait" : "finish";
};

const CommitteeSessionEdition = () => {
  const sessionId = new URLSearchParams(location.search).get("id");
  const [current, setCurrent] = useState(0);

  useTitle({ text: `اصلاحیه جلسه ${sessionId}` });

  const stepsItem = [
    {
      id: "1",
      children: <SessionInfoStep setCurrent={setCurrent} />,
    },
    {
      id: "2",
      children: <SessionMembersStep setCurrent={setCurrent} />,
    },
    {
      id: "3",
      children: <SessionRulesStep setCurrent={setCurrent} />,
    },
    {
      id: "4",
      children: <SessionGuestsStep setCurrent={setCurrent} />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-edition-page-container">
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات جلسه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "اعضا",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "دستور جلسه",
          },
          {
            status: stepStatusCreator(current, 3),
            title: "مدعوین",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default CommitteeSessionEdition;
