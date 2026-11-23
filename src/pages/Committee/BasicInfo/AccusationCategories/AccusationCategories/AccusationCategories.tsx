import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { AccusationCategoriesModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/AccusationCategories/AccusationCategoriesModel";
import {
  COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE,
  COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetAccusationCategoriesListCountQuery,
  useLazyGetAccusationCategoriesListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_accusationCategories.scss";

const AccusationCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();

  useTitle({ text: "دسته بندی اتهامات/تخلفات" });

  //? ================================  Api Calls ================================
  const [getDataList, { data: listData, isFetching: isListDataLoading }] =
    useLazyGetAccusationCategoriesListQuery();

  const { data: listDataCount, isFetching: isListDataCountLoading } =
    useGetAccusationCategoriesListCountQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    getDataList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (key: number, type: string) => {
    navigate(
      `${COMMITTEE_DETAILS_ACCUSATION_CATEGORIES_PAGE_ROUTE}?type=${type}&id=${key}`
    );
  };
  const makeNewCategoriesHandler = () => {
    navigate(COMMITTEE_NEW_ACCUSATION_CATEGORIES_PAGE_ROUTE);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-accusation-categories-container">
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
        <Button type="primary" ghost className="btn" onClick={makeNewCategoriesHandler}>
          ایجاد دسته بندی جدید
        </Button>
      </div>
      <CustomTable
        dataSource={listData?.data}
        loading={isListDataLoading || isListDataCountLoading}
        columns={AccusationCategoriesModel({
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
        {...TABLE_PROPS(listData?.data.length || 0)}
        className="accusation-categories-table-container"
      />
    </div>
  );
};
export default AccusationCategories;
