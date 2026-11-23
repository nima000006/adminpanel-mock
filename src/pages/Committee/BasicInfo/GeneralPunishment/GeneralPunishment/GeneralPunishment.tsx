import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { GeneralPunishmentModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/GeneralPunishment/GeneralPunishmentModel";
import {
  COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE,
  COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetGeneralPunishmentCountQuery,
  useLazyGetGeneralPunishmentListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_generalPunishment.scss";

const GeneralPunishment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  useTitle({ text: "لیست تنبیهات کلی" });

  const title = "ایجاد تنبیه کلی";
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getListOfData, { data: listOfData, isFetching: isListOfDataLoading }] =
    useLazyGetGeneralPunishmentListQuery();

  const { data: generalPunishmentCount, isFetching: isGeneralPunishmentCountLoading } =
    useGetGeneralPunishmentCountQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    getListOfData({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.page, url?.pageSiz]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number) => {
    navigate(`${COMMITTEE_GENERAL_PUNISHMENT_DETAILS_PAGE_ROUTE}?id=${id}`);
  };
  const makeNewAccusationHandler = () => {
    navigate(`${COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE}?title=${title}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-general-punishment-container">
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
          ایجاد تنبیه کلی جدید
        </Button>
      </div>
      <CustomTable
        dataSource={listOfData?.data}
        loading={isListOfDataLoading || isGeneralPunishmentCountLoading}
        columns={GeneralPunishmentModel({
          viewClickHandler: viewClickHandler,
        })}
        pagination={manualPaginationConfig({
          total: generalPunishmentCount?.data,
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
        {...TABLE_PROPS(listOfData?.data?.length || 0)}
        className="general-punishment-container-table-container"
      />
    </div>
  );
};
export default GeneralPunishment;
