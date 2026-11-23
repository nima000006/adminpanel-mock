import { useEffect } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import Div from "../../../../../components/Renderers/Div/Div";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { RecordsArchiveModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/Archive/RecordsArchiveModel";
import {
  COMMITTEE_RECORDS_DETAIlE_PAGE_ROUTE,
  COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useLazyGetArchiveListCountQuery,
  useLazyGetArchiveListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { GETTING_DATA_ERROR_MESSAGE } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";

import "./_committeeArchive.scss";

const CommitteeArchive = () => {
  useTitle({ text: "آرشیو" });
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getArchiveList, { data: archiveListData, isFetching: isArchiveListLoading }] =
    useLazyGetArchiveListQuery();

  const [GetTotalCount, { data: totalCount, isFetching: isTotalCountLoading }] =
    useLazyGetArchiveListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getArchiveList({ firstResult: 0, maxResults: 8 });
    GetTotalCount();
  }, []);

  //* ================================ Util Functions ================================
  const continueClickHandler = (id: string, status: string) => {
    if (id && status) {
      navigate({
        pathname: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
        search: makeSearchParams({ step: +status + 1, id }),
      });
    } else {
      toast.warn(GETTING_DATA_ERROR_MESSAGE);
    }
  };

  const viewClickHandler = (id: string) => {
    if (id) {
      navigate({
        pathname: COMMITTEE_RECORDS_DETAIlE_PAGE_ROUTE,
        search: makeSearchParams({ id }),
      });
    } else {
      toast.warn(GETTING_DATA_ERROR_MESSAGE);
    }
  };

  const backBtnHandler = () => {
    navigate({
      pathname: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
      search: makeSearchParams({ step: 1 }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="committee-archive-page-container">
      <Button type="primary" ghost className="back-btn" onClick={backBtnHandler}>
        برگشت به ایجاد
      </Button>
      <CustomTable
        dataSource={archiveListData?.data}
        loading={isArchiveListLoading || isTotalCountLoading}
        rowKey="id"
        pagination={manualPaginationConfig({
          total: totalCount?.data,
          onChange: (page, pageSize) => {
            getArchiveList({
              firstResult: (page - 1) * pageSize,
              maxResults: pageSize,
            });
          },
        })}
        columns={RecordsArchiveModel({
          continueClickHandler: continueClickHandler,
          viewClickHandler: viewClickHandler,
        })}
        {...TABLE_PROPS(archiveListData?.data?.length || 0)}
      />
    </Div>
  );
};

export default CommitteeArchive;
