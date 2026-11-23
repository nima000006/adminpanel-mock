import { useEffect, useMemo, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_MODIFY_RESIDENCE_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetAllDormsCountQuery,
  useLazyGetAllDormsQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import {
  ResidenceListFilterParamsType,
  UseResidenceAdvanceFilterFormType,
} from "./@types/residenceDormListTypes";
import ResidenceDormListTableModel from "../../models/ResidenceDormListTableModel/ResidenceDormListTableModel";
import useResidenceAdvanceFilter from "./helper/modals/advanceFilterModal/useResidenceAdvanceFilter";
import {
  GetAllDormsParams,
  getAllDormsResponse,
  getDormType,
} from "../../../@types/@dormsMainList";
import "./_residenceDormList.scss";

const STATUS_ID = "2"; // اقامتگاه های تایید شده

const RESIDENCE_LIST_FILTER_DEPENDENCIES = [
  "residenceProvinceId",
  "residenceCityId",
  "residenceBranchId",
  "residenceResidenceTypeId",
  "residenceGenderId",
  "residenceQualityId",
  "residenceRecordStatusId",
];

const TABLE_DEPENDENCIES = ["dormitory", "sortings"];

const ResidenceDormList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] = useState<getDormType[]>([]);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const navigate = useNavigate();

  const [advanceFilterForm] = Form.useForm<UseResidenceAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useResidenceAdvanceFilter(advanceFilterForm);

  //? ================================  Api Calls ================================
  const [getAllDorms, { isFetching: isGettingDormsLoading }] = useLazyGetAllDormsQuery();

  const [
    getAllDormsCount,
    { data: dormsDataCount, isFetching: isGettingDormsCountLoading },
  ] = useLazyGetAllDormsCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    url?.page,
    url?.pageSize,
    ...RESIDENCE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const params = {
      statusId_EQ: STATUS_ID, //تایید شده
      AssociationRegion_parentId_IN: url?.residenceProvinceId,
      regionId_IN: url?.residenceCityId,
      branchId_IN: url?.residenceBranchId,
      accommodationTypeId_IN: url?.residenceResidenceTypeId,
      genderId_IN: url?.residenceGenderId,
      qualityId_IN: url?.residenceQualityId,
      recordStatus_IN: url?.residenceRecordStatusId, // وضعیت نمایش
      dormitory: url?.dormitory,
      sortings: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...RESIDENCE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: ResidenceListFilterParamsType = useMemo(
    () => ({
      AssociationRegion_parentId_IN: url?.residenceProvinceId,
      regionId_IN: url?.residenceCityId,
      branchId_IN: url?.residenceBranchId,
      accommodationTypeId_IN: url?.residenceResidenceTypeId,
      genderId_IN: url?.residenceGenderId,
      qualityId_IN: url?.residenceQualityId,
      statusId_EQ: url?.residenceRecordStatusId, // وضعیت نمایش
    }),
    [RESIDENCE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const createDormBtn = () => {
    navigate(DORM_MODIFY_RESIDENCE_PAGE_ROUTE);
  };

  const onGetAllDormsSuccess = async (info: getAllDormsResponse) => {
    if (info.status === 200) {
      setDataSource(info?.data);
    }
  };

  const getListData = () => {
    const dormsRequestParams: GetAllDormsParams = {
      ...filterParams,

      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      statusId_EQ: STATUS_ID,
      title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    };

    getAllDorms(dormsRequestParams).unwrap().then(onGetAllDormsSuccess);
  };

  const getListCount = () => {
    getAllDormsCount({
      ...filterParams,

      statusId_EQ: STATUS_ID,
      title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    });
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    advanceFilterForm.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={advanceFilterForm}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}
      <div className="residence-dorm-list-container">
        <ToolBox
          leftSide={
            <div className="actions-button-container">
              <CustomExcelDownloadButton
                excelTitle="اقامتگاه ها"
                restOfUrl={excelFilesQueryRef.current}
                formId="ListOfHostels"
                type="primary"
                ghost
                className="btn-text"
              />

              <CustomButton type="primary" onClick={createDormBtn}>
                ایجاد اقامتگاه
              </CustomButton>
            </div>
          }
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="primary"
                icon={<AiOutlineFilter />}
                size="middle"
                onClick={openAdvanceFilter}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={ResidenceDormListTableModel()}
          pagination={manualPaginationConfig({
            total: dormsDataCount?.data,
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
          loading={isGettingDormsLoading || isGettingDormsCountLoading}
          className="residence-list-table-container"
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ResidenceDormList;
