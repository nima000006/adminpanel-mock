import { useEffect } from "react";

import { PiCheck, PiClock } from "react-icons/pi";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";

import { TabMode } from "./@types/@agentTicketAssignedToTypes";
import AgentTicketAssignedToMeAnsweredList from "./helper/components/AgentTicketAssignedToMeAnsweredList/AgentTicketAssignedToMeAnsweredList";
import AgentTicketAssignedToMeWaitingList from "./helper/components/AgentTicketAssignedToMeWaitingList/AgentTicketAssignedToMeWaitingList";
import "./_agentTicketAssignedToList.scss";

const AgentTicketAssignedToList = () => {
  const { isMobile } = useResponsive();
  const { params, setSearchParams } = useQueryParams();

  // Read segment from URL, default to 'waiting' if not set
  const activeTab = (params?.segment === "answered" ? "answered" : "waiting") as TabMode;

  //* ================================ Effects ================================
  // Initialize segment in URL if not present
  useEffect(() => {
    if (!params?.segment) {
      setSearchParams({
        segment: "waiting",
        status: "1",
        page: "1",
        pageSize: "8",
      });
    }
  }, []); // Only run once on mount

  //* ================================ Util Functions ================================

  const changeSegmentHandler = (val: "waiting" | "answered") => {
    // When switching segments, reset search filters
    setSearchParams({
      segment: val,
      status: "1",
      page: "1",
      pageSize: "8",
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Div className="agent-ticket-assigned-to-list-container mt-10">
        <CustomSegmented
          vertical={isMobile}
          size="large"
          block
          value={activeTab}
          onChange={(val) => changeSegmentHandler(val as "waiting" | "answered")}
          options={[
            {
              value: "waiting",
              label: (
                <Div className="flex h-9 items-center justify-center gap-2">
                  <PiClock />
                  <span>در انتظار پاسخ</span>
                </Div>
              ),
            },
            {
              value: "answered",
              label: (
                <Div className="flex h-9 items-center justify-center gap-2">
                  <PiCheck />
                  <span>پاسخ داده شده</span>
                </Div>
              ),
            },
          ]}
        />
      </Div>
      {activeTab === "waiting" ? (
        <AgentTicketAssignedToMeWaitingList />
      ) : (
        <AgentTicketAssignedToMeAnsweredList />
      )}
    </>
  );
};

export default AgentTicketAssignedToList;
