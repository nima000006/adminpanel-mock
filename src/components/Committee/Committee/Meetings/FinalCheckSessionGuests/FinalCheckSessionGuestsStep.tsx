import { useEffect } from "react";

import { Button } from "antd";
import { useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { SessionGuestsStepModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionCreation/SessionGuestsStepModel";
import { useLazyGetGuestsListQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";

import "./_finalCheckSessionGuestsStep.scss";

const FinalCheckSessionGuestsStep = () => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getGuestsList, { data: getGuestsListData, isLoading: isGetGuestsListLoading }] =
    useLazyGetGuestsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getGuestsList(+id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-session-creation-final-check-session-guests-step-container">
      <div className="border-round-box add-new-person-table-wrapper">
        <div>
          <Button type="primary" ghost className="session-guest-btn" disabled>
            افزودن مدعو جدید
          </Button>
        </div>
        <CustomTable
          dataSource={getGuestsListData?.data}
          columns={SessionGuestsStepModel({
            from: "finalCheck",
          })}
          rowKey="id"
          loading={isGetGuestsListLoading}
          pagination={false}
          {...TABLE_PROPS(getGuestsListData?.data?.length || 0)}
        />
      </div>
    </div>
  );
};

export default FinalCheckSessionGuestsStep;
