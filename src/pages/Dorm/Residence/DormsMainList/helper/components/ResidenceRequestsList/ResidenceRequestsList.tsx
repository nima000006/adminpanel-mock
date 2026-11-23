import { useEffect, useMemo, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllDormsCountQuery,
  useLazyGetAllDormsQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import {
  ResidenceRequestListFilterParamsType,
  UseResidenceRequestAdvanceFilterFormType,
} from "./@types/@residenceRequestsList";
import { getAllDormsResponse, getDormType } from "../../../@types/@dormsMainList";
import ResidenceRequestListTableModel from "../../models/ResidenceRequestListTableModel/ResidenceRequestListTableModel";
import useResidenceRequestAdvanceFilter from "./helper/modals/advanceModal/useResidenceRequestAdvanceFilter";
import "./_residenceRequestsList.scss";

const RESIDENCE_REQUEST_LIST_FILTER_DEPENDENCIES = [
  "requestProvinceId",
  "requestCityId",
  "requestBranchId",
  "requestResidenceTypeId",
  "requestGenderId",
  "requestTypeId",
  "requestStatusId",
  "requestRequestTypeId", // نوع درخواست
  "requestRequestStatusId", // وضعیت درخواست
];
const TABLE_DEPENDENCIES = ["dormitory", "sortings"];

const ResidenceRequestsList = () => {
  const { params: url, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] = useState<getDormType[]>([]);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const [advanceFilterForm] = Form.useForm<UseResidenceRequestAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useResidenceRequestAdvanceFilter(advanceFilterForm);

  //? ================================  Api Calls ================================
  const [getAllDorms, { isFetching: isGettingDormsLoading }] = useLazyGetAllDormsQuery();

  const [
    getAllDormsCount,
    { data: dormsDataCount, isFetching: isGettingDormsCountLoading },
  ] = useLazyGetAllDormsCountQuery();

  useEffect(() => {
    getListData();
  }, [
    url?.requestPage,
    url?.requestPageSize,
    ...RESIDENCE_REQUEST_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const params = {
      AssociationRegion_parentId_IN: url?.requestProvinceId, // استان
      regionId_IN: url?.requestCityId, // شهر
      branchId_IN: url?.requestBranchId, // شعبه
      accommodationTypeId_IN: url?.requestResidenceTypeId, // نوع اقامتگاه
      genderId_IN: url?.requestGenderId, // جنسیت
      statusId_IN: url?.requestRequestStatusId, // وضعیت درخواست
      requestTypeId_IN: url?.requestRequestTypeId, // نوع درخواست
      dormitory: url?.dormitory,
      sortings: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...RESIDENCE_REQUEST_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: ResidenceRequestListFilterParamsType = useMemo(
    () => ({
      AssociationRegion_parentId_IN: url?.requestProvinceId, // استان
      regionId_IN: url?.requestCityId, // شهر
      branchId_IN: url?.requestBranchId, // شعبه
      accommodationTypeId_IN: url?.requestResidenceTypeId, // نوع اقامتگاه
      genderId_IN: url?.requestGenderId, // جنسیت
      statusId_EQ: url?.requestRequestStatusId, // وضعیت درخواست
      requestTypeId_IN: url?.requestRequestTypeId, // نوع درخواست
    }),
    [RESIDENCE_REQUEST_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const onGetAllDormsSuccess = async (info: getAllDormsResponse) => {
    if (info.status === 200) {
      setDataSource(info?.data);
    }
  };

  const getListData = () => {
    const dormsRequestParams = {
      ...filterParams,

      firstResult: url?.requestPage
        ? Number((+url.requestPage - 1) * +url.requestPageSize)
        : 0,
      maxResults: url?.requestPageSize ? Number(url?.requestPageSize) : 8,
      title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    };

    getAllDorms(dormsRequestParams).unwrap().then(onGetAllDormsSuccess);
  };

  const getListCount = () => {
    getAllDormsCount({
      ...filterParams,
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
      <div className="residence-request-list-container">
        <ToolBox
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="درخواست‌ها"
              restOfUrl={excelFilesQueryRef.current}
              formId="ListOfHostels"
              type="primary"
              ghost
              className="btn-text"
            />
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
          columns={ResidenceRequestListTableModel()}
          pagination={manualPaginationConfig({
            total: dormsDataCount?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                requestPage: page?.toString(),
                requestPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.requestPage ? Number(url?.requestPage) : 1,
            defaultPageSize: url?.requestPageSize ? Number(url?.requestPageSize) : 8,
          })}
          loading={isGettingDormsLoading || isGettingDormsCountLoading}
          className="residence-list-table-container"
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ResidenceRequestsList;
