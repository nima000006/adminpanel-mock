import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import FinalCheckSessionGuestsStep from "../../../../../components/Committee/Committee/Meetings/FinalCheckSessionGuests/FinalCheckSessionGuestsStep";
import FinalCheckSessionInfoStep from "../../../../../components/Committee/Committee/Meetings/FinalCheckSessionInfo/FinalCheckSessionInfoStep";
import FinalCheckSessionMembersStep from "../../../../../components/Committee/Committee/Meetings/FinalCheckSessionMembers/FinalCheckSessionMembersStep";
import FinalCheckSessionRulesStep from "../../../../../components/Committee/Committee/Meetings/FinalCheckSessionRules/FinalCheckSessionRulesStep";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  COMMITTEE_SESSION_CREATION_PAGE_ROUTE,
  COMMITTEE_SESSION_LIST_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import "./_committeeSessionCreationFinalCheck.scss";

const CommitteeSessionCreationFinalCheck = () => {
  useTitle({ text: "بررسی نهایی اطلاعات" });

  const [searchParams, setSearchParams] = useSearchParams();
  const { id, step } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();

  const finalSubmiTHandler = () => {
    navigate(COMMITTEE_SESSION_LIST_PAGE_ROUTE);
  };
  const editInformationHandler = () =>
    navigate(`${COMMITTEE_SESSION_CREATION_PAGE_ROUTE}?id=${id}&step=${step}`);

  const TabsItem = [
    {
      key: "1",
      label: "اطلاعات جلسه",
      children: <FinalCheckSessionInfoStep />,
    },
    {
      key: "2",
      label: "اعضا",
      children: <FinalCheckSessionMembersStep />,
    },
    {
      key: "3",
      label: "دستور جلسه",
      children: <FinalCheckSessionRulesStep />,
    },
    {
      key: "4",
      label: "مدعوین",
      children: <FinalCheckSessionGuestsStep />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-creation-final-check-page-container">
      <div className="session-creation-final-check-tab-container">
        <Tabs
          type="card"
          items={TabsItem}
          dir="rtl"
          className="tab-container"
          onChange={(step) =>
            setSearchParams({
              id: id,
              step: step,
            })
          }
        />
      </div>
      <div className="buttons-container">
        <Button type="primary" ghost onClick={editInformationHandler}>
          تغییر اطلاعات
        </Button>
        <Button type="primary" onClick={finalSubmiTHandler}>
          ثبت نهایی
        </Button>
      </div>
    </div>
  );
};

export default CommitteeSessionCreationFinalCheck;
