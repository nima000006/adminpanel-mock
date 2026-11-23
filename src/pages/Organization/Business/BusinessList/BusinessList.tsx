import { useEffect } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { PiPlusLight } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CREATE_BUSINESS_PAGE_ROUTE } from "@infra/router/routes/organization";
import { useLazyGetAllBusinessListQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { AllBusinessListDataType } from "@pages/Organization/Business/BusinessList/@types/@businessList";

import EmptyList from "./helper/components/EmptyList/EmptyList";
import BusinessListTableModel from "./helper/model/BusinessListTableModel/BusinessListTableModel";

import "./_businessList.scss";

const BusinessList = () => {
  useTitle({ text: "کسب و کار" });

  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getList, { data: dataList, isFetching: isGetListDataLoading }] =
    useLazyGetAllBusinessListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getList({
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    });
  }, [url?.page, url?.pageSize]);

  //* ================================ Util Functions ================================
  const createBusinessHandler = () => {
    navigate(CREATE_BUSINESS_PAGE_ROUTE);
  };

  const content = dataList?.content ?? [];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <div className="modify-business-list-container">
        <ToolBox
          leftSide={
            <>
              <div className="left-side">
                <CustomButton type="primary" ghost disabled>
                  خروجی اکسل
                </CustomButton>
              </div>
              {content?.length > 0 ? (
                <CustomButton
                  type="primary"
                  onClick={createBusinessHandler}
                  icon={<PiPlusLight size={16} />}
                  iconPlacement="end"
                >
                  ایجاد کسب و کار
                </CustomButton>
              ) : null}
            </>
          }
          rightSide={
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
        />
        {content?.length <= 0 ? (
          <EmptyList />
        ) : (
          <CustomTable<AllBusinessListDataType>
            dataSource={dataList?.content}
            columns={BusinessListTableModel()}
            pagination={manualPaginationConfig({
              total: dataList?.totalElements,
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
            {...TABLE_PROPS(dataList?.content.length ?? 0)}
            loading={isGetListDataLoading}
            className="modify-business-list-table"
            rowKey="id"
          />
        )}
      </div>
    </CustomCard>
  );
};
export default BusinessList;
