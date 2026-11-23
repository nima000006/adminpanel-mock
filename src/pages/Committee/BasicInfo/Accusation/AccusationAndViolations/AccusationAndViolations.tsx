import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  BasicInfoAccusationsList,
  GetAccusationsListResponse,
} from "./@types/@accusationAndViolations";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { AccusationAndViolationsModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/AccusationAndViolations/AccusationAndViolationsModel";
import {
  COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
  COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/committee";
import {
  useGetAccusationsListCountQuery,
  useLazyGetAccusationsListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_accusationAndViolations.scss";

const AccusationCategories = () => {
  useTitle({ text: " اتهامات/تخلفات" });

  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<BasicInfoAccusationsList[]>([]);

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getAccusationList, { isFetching: isAccusationListLoading }] =
    useLazyGetAccusationsListQuery();

  const { data: accusationListCount, isLoading: isAccusationListCountLoading } =
    useGetAccusationsListCountQuery(0);

  //? ================================ Effects ================================
  useEffect(() => {
    getAccusationList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
    })
      .unwrap()
      .then(onGetAccusationListSuccess);
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const viewClickHandler = (id: number, title?: string) => {
    navigate(
      `${COMMITTEE_DETAILS_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE}?id=${id}&type=${title}`
    );
  };
  const makeNewAccusationHandler = () => {
    navigate(COMMITTEE_NEW_ACCUSATION_AND_VIOLATIONS_PAGE_ROUTE);
  };

  const onGetAccusationListSuccess = async (response: GetAccusationsListResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-accusation-violations-container">
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
          ایجاد اتهام / تخلف جدید
        </Button>
      </div>
      <CustomTable
        dataSource={dataSource}
        loading={isAccusationListLoading || isAccusationListCountLoading}
        columns={AccusationAndViolationsModel({
          viewClickHandler: viewClickHandler,
        })}
        rowKey="id"
        pagination={manualPaginationConfig({
          total: accusationListCount?.data,
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
        {...TABLE_PROPS(dataSource?.length)}
        className="accusation-violations-table-container"
      />
    </div>
  );
};
export default AccusationCategories;
