import { useEffect } from "react";

import { PiCheck, PiClock } from "react-icons/pi";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";

import { TabMode } from "./@types/@SuperAgentAssignedToMeListTypes";
import SuperAgentAssignedToMeAnsweredList from "./helper/components/SuperAgentAssignedToMeAnsweredList/SuperAgentAssignedToMeAnsweredList";
import SuperAgentAssignedToMeWaitingList from "./helper/components/SuperAgentAssignedToMeWaitingList/SuperAgentAssignedToMeWaitingList";

const SuperAgentAssignedToMeList = () => {
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
        status: "3",
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
      status: "3",
      page: "1",
      pageSize: "8",
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="agent-ticket-super-agent-list-container">
      <CustomSegmented
        className="mt-10!"
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

      {activeTab === "waiting" ? (
        <SuperAgentAssignedToMeWaitingList />
      ) : (
        <SuperAgentAssignedToMeAnsweredList />
      )}
    </div>
  );
};

export default SuperAgentAssignedToMeList;
