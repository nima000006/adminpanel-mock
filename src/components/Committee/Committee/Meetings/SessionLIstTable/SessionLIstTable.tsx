import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { SessionListModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/SessionList/SessionListModel";
import {
  COMMITTEE_SESSION_CREATION_PAGE_ROUTE,
  COMMITTEE_SESSION_DETAIL_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetListPreliminaryMeetingsCountQuery,
  useLazyGetListPreliminaryMeetingsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import AddNewSessionRuleModal from "../../../../Modals/Committee/SessionCreation/AddNewSessionRule/AddNewSessionRuleModal";
import "./_sessionListTable.scss";

const SessionLIstTable = ({ type }: { type: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const [addNewSessionRuleModal, setAddNewSessionRuleModal] = useState({
    isOpen: false,
    id: -1,
  });
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    getListPreliminaryMeetings,
    { data: listPreliminaryMeetingsData, isFetching: isListPreliminaryMeetingsLoading },
  ] = useLazyGetListPreliminaryMeetingsQuery();

  const [GetTotalCount, { data: totalCount, isFetching: isTotalCountLoading }] =
    useLazyGetListPreliminaryMeetingsCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListPreliminaryMeetings({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      type: type,
    });
    GetTotalCount({ type: type });
  }, [type, url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const advanceFilterHandler = () => {};

  const viewClickHandler = (sessionNum: string) => {
    navigate({
      pathname: COMMITTEE_SESSION_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ session: sessionNum }),
    });
  };

  // add new session
  const handleAddSession = () => {
    navigate({
      pathname: COMMITTEE_SESSION_CREATION_PAGE_ROUTE,
      search: makeSearchParams({ step: 1 }),
    });
  };

  // add new accusation
  const addAccusationHandler = (id: string) => {
    setAddNewSessionRuleModal({
      isOpen: true,
      id: +id,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <AddNewSessionRuleModal
        isModalOpen={addNewSessionRuleModal}
        setAddNewSessionRuleModal={setAddNewSessionRuleModal}
      />
      <div className="committee-session-list-container">
        <div className="btn-wrapper">
          <Button
            type="primary"
            icon={<AiOutlineFilter />}
            onClick={advanceFilterHandler}
            className="advance-filter-btn"
          >
            فیلتر پیشرفته
          </Button>
          <Button
            type="primary"
            ghost
            onClick={handleAddSession}
            className="add-session-btn"
          >
            ایجاد جلسه جدید
          </Button>
        </div>

        <CustomTable
          dataSource={listPreliminaryMeetingsData?.data}
          loading={isListPreliminaryMeetingsLoading || isTotalCountLoading}
          rowKey="id"
          pagination={manualPaginationConfig({
            total: totalCount?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          columns={SessionListModel({
            viewClickHandler: viewClickHandler,
            addAccusationHandler: addAccusationHandler,
            type,
          })}
          className="committee-session-list-table"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(listPreliminaryMeetingsData?.data?.length || 0)}
        />
      </div>
    </>
  );
};
export default SessionLIstTable;
