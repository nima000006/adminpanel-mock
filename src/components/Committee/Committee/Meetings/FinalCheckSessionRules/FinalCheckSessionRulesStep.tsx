import { useEffect } from "react";

import { Button } from "antd";
import { useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import { SessionRulesStepModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionCreation/SessionRulesStepModal/SessionRulesStepModel";
import { useLazyGetListOfSessionCreationAccusationsQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";

import "./_finalCheckSessionRulesStep.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const FinalCheckSessionRulesStep = () => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getListOfSessionCreationAccusations,
    {
      data: listOfSessionCreationAccusations,
      isLoading: isListOfSessionCreationAccusationsLoading,
    },
  ] = useLazyGetListOfSessionCreationAccusationsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getListOfSessionCreationAccusations({
        firstResult: 0,
        maxResults: 50,
        meetingId: +id,
      });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-creation-final-check-session-rules-step-container">
      <div className="border-round-box add-new-rule-table-wrapper">
        <div>
          <Button type="primary" ghost className="session-rule-btn" disabled>
            افزودن دستور جلسه جدید
          </Button>
        </div>
        <CustomTable
          dataSource={listOfSessionCreationAccusations?.data}
          columns={SessionRulesStepModel({
            from: "finalCheck",
          })}
          rowKey="id"
          loading={isListOfSessionCreationAccusationsLoading}
          pagination={false}
          {...TABLE_PROPS(listOfSessionCreationAccusations?.data?.length || 0)}
        />
      </div>
    </div>
  );
};

export default FinalCheckSessionRulesStep;
