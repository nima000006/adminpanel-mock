import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { AccusationAndViolationsDetailsModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/AccusationAndViolationsDetails/AccusationAndViolationsDetailsModel";
import {
  COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE,
  COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetAccusationAndViolationsDetailsListCountQuery,
  useLazyGetAccusationAndViolationsDetailsListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_accusationAndViolationsDetails.scss";

const AccusationAndViolationsDetails = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  useTitle({ text: "لیست جزئیات اتهام / تخلف" });
  const title = "ایجاد جزئیات اتهام / تخلف";

  //? ================================  Api Calls ================================
  const [
    getAccusationAndViolationsDetails,
    { data: listData, isFetching: isListDataLoading },
  ] = useLazyGetAccusationAndViolationsDetailsListQuery();

  const { data: listDataCount, isFetching: isListDataLoadingCount } =
    useGetAccusationAndViolationsDetailsListCountQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    getAccusationAndViolationsDetails({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number) => {
    navigate(`${COMMITTEE_ACCUSATION_AND_VIOLATIONS_DETAILS_INFO_PAGE_ROUTE}?id=${id}`);
  };
  const makeNewAccusationHandler = () => {
    navigate(
      `${COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE}?title=${title}`
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-accusation-violations-details-container">
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
        <Button type="primary" ghost className="btn" onClick={makeNewAccusationHandler}>
          ایجاد جزئیات اتهام / تخلف جدید
        </Button>
      </div>
      <CustomTable
        dataSource={listData?.data}
        loading={isListDataLoading || isListDataLoadingCount}
        columns={AccusationAndViolationsDetailsModel({
          viewClickHandler: viewClickHandler,
        })}
        pagination={manualPaginationConfig({
          total: listDataCount?.data,
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
        rowKey="id"
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(listData?.data?.length || 0)}
        className="accusation-violations-details-table-container"
      />
    </div>
  );
};
export default AccusationAndViolationsDetails;
