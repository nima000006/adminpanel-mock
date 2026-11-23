import { useState } from "react";

import { Steps } from "antd";
import { useSearchParams } from "react-router";

import SessionGuestsStep from "./helper/components/SessionGuests/SessionGuestsStep";
import SessionInfoStep from "./helper/components/SessionInfo/SessionInfoStep";
import SessionMembersStep from "./helper/components/SessionMembers/SessionMembersStep";
import SessionRulesStep from "./helper/components/SessionRules/SessionRulesStep";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_committeeSessionCreation.scss";

const stepStatusCreator = (current: number, step: number) => {
  return current === step ? "process" : current < step ? "wait" : "finish";
};

const CommitteeSessionCreation = () => {
  useTitle({ text: "ایجاد جلسه" });

  const [searchParams] = useSearchParams();
  const { step } = Object.fromEntries([...searchParams]);
  const [current, setCurrent] = useState(+step - 1 || 0);

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
    <div className="committee-session-creation-page-container">
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

export default CommitteeSessionCreation;
