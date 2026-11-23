import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { RulesAndLawsModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/RulesAndLaws/RulesAndLawsModel";
import {
  COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE,
  COMMITTEE_REGULATIONS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetRulesAndRegulationsCountQuery,
  useLazyGetRulesAndRegulationsQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_rulesAndLaws.scss";

const RulesAndLaws = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  useTitle({ text: "آیین نامه و مقررات" });
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [
    getRulesAndRegulation,
    { data: rulesAndRegulationsData, isFetching: isRulesAndRegulationsLoading },
  ] = useLazyGetRulesAndRegulationsQuery();

  const { data: reportsDataCount, isLoading: isReportDataCountLoading } =
    useGetRulesAndRegulationsCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRulesAndRegulation({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (regulationsNum: string) => {
    navigate(`${COMMITTEE_REGULATIONS_PAGE_ROUTE}?id=${regulationsNum}`);
  };

  const makeNewRulesHandler = () => {
    navigate(COMMITTEE_NEW_RULES_AND_LAWS_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-rules-laws-container">
      <div className="btn-wrapper">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          className="btn"
          // onClick={onClickHomeActionBarFilter}
        >
          فیلتر پیشرفته
        </Button>
        <Button type="primary" ghost className="btn" onClick={makeNewRulesHandler}>
          ایجاد مقررات جدید
        </Button>
      </div>
      <CustomTable
        dataSource={rulesAndRegulationsData?.data}
        columns={RulesAndLawsModel({
          viewClickHandler: viewClickHandler,
        })}
        rowKey="id"
        pagination={manualPaginationConfig({
          total: reportsDataCount?.data,
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
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(rulesAndRegulationsData?.data?.length || 0)}
        className="rules-laws-table-container"
        loading={isRulesAndRegulationsLoading || isReportDataCountLoading}
      />
    </div>
  );
};
export default RulesAndLaws;
