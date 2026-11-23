import { useState } from "react";

import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import Guests from "../../../../../components/Committee/Committee/Meetings/SessionDetailGuests/Guests";
import SessionInfo from "../../../../../components/Committee/Committee/Meetings/SessionDetailInfo/SessionInfo";
import Members from "../../../../../components/Committee/Committee/Meetings/SessionDetailMembers/Members";
import SessionOrder from "../../../../../components/Committee/Committee/Meetings/SessionDetailOrder/SessionOrder";
import ProcessFlow from "../../../../../components/Committee/Committee/Meetings/SessionDetailProcess/ProcessFlow";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import SessionCancelModal from "../../../../../components/Modals/Committee/SessionDetailModal/SessionCancel/SessionCancel";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_SESSION_Edition_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import "./_sessionDetail.scss";

const SessionDetail = () => {
  const [isSessionCancelModalOpen, setIsSessionCancelModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const { session } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();
  useTitle({ text: `جلسه شماره ${session} کمیته انضباطی` });

  //* ================================ Util Functions ================================
  // Edit Session ثبت اصلاحیه
  const openEditSessionModalHandler = () => {
    navigate({
      pathname: COMMITTEE_SESSION_Edition_PAGE_ROUTE,
      search: makeSearchParams({ id: session, step: "1" }),
    });
  };

  // Session Cancel Modal لغو جلسه
  const sessionCancelHandler = () => {
    setIsSessionCancelModalOpen(true);
  };

  const items = [
    {
      label: "اطلاعات جلسه",
      children: <SessionInfo />,
      key: "1",
    },
    {
      label: "اعضا",
      children: <Members />,
      key: "2",
    },
    {
      label: "دستورات جلسه",
      children: <SessionOrder />,
      key: "3",
    },
    {
      label: "مدعوین",
      children: <Guests />,
      key: "4",
    },
    {
      label: "مسیر فرآیند",
      children: <ProcessFlow />,
      key: "5",
      disabled: true,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isSessionCancelModalOpen && (
        <SessionCancelModal
          isSessionCancelModalOpen={isSessionCancelModalOpen}
          setIsSessionCancelModalOpen={setIsSessionCancelModalOpen}
        />
      )}

      <div className="committee-session-detail-page-container">
        <CustomCard className="committee-session-detail-first-box">
          <CustomDivider text="اقدام" />
          <div className="committee-session-detail-btn-wrapper">
            <Button
              type="primary"
              htmlType="submit"
              className="committee-session-detail-btn"
              onClick={openEditSessionModalHandler}
            >
              ثبت اصلاحیه
            </Button>
            <Button
              type="primary"
              danger
              htmlType="submit"
              onClick={sessionCancelHandler}
              className="committee-session-detail-btn"
            >
              لغو جلسه
            </Button>
          </div>
        </CustomCard>
        <CustomCard>
          <Tabs
            type="card"
            items={items}
            className="committee-session-detail-tabs-container"
          />
        </CustomCard>
      </div>
    </>
  );
};
export default SessionDetail;
