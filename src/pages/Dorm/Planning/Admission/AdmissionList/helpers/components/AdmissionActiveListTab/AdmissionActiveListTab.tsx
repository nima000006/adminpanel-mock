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
import { DORM_ADMISSIONS_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetAdmissionListCountQuery,
  useLazyGetAdmissionListQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import { AdmissionActiveListFilterParamsType } from "./@types/@admissionActiveListTab";
import { UseAdmissionActiveAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/@types/@useAdmissionAdvanceFilter";
import useAdmissionActiveAdvanceFilter from "./helper/modals/advanceFilterModal/AdmissionAdvanceFilter";
import { ADMISSION_ACTIVE_LIST_FILTER_DEPENDENCIES } from "./helper/utils/admissionActiveListUtil";
import { DORM_ADMISSION_LIST_ACTIVE } from "../../../../utils/AdmissionUtils";
import DormAdmissionActiveInactiveListTableModel from "../../../_shared/Model/DormAdmissionActiveInactiveListTableModel";
import "./_admissionActiveListTab.scss";

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const AdmissionActiveListTab = () => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const navigate = useNavigate();

  const [form] = Form.useForm<UseAdmissionActiveAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useAdmissionActiveAdvanceFilter(form);

  //? ================================  Api Calls ================================
  const [
    getAdmissionList,
    {
      data: admissionListData,
      isFetching: admissionListLoading,
      isSuccess: admissionListSuccess,
    },
  ] = useLazyGetAdmissionListQuery();

  const [
    getAdmissionListCount,
    { data: admissionListCountData, isFetching: admissionListCountLoading },
  ] = useLazyGetAdmissionListCountQuery();

  // Derive dataSource from RTK Query cache
  const dataSource = useMemo(() => {
    if (admissionListSuccess && admissionListData?.status === 200) {
      return admissionListData?.data || [];
    }
    return [];
  }, [admissionListData, admissionListSuccess]);

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    url?.activePageSize,
    url?.activePage,
    ...ADMISSION_ACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const params = {
      recordStatus_EQ: DORM_ADMISSION_LIST_ACTIVE,
      branchId_IN: url?.activeUniId,
      dormitoryId_IN: url?.activeDormitoryId,
      schedulingId_IN: url?.activeSchedulingId,
      reservationTypeId_IN: url?.activeReservationTypeId,
      managementTypeId_IN: url?.activeManagementTypeId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.activeProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.activeCityId,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: encodeURIComponent(url?.sortings),
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...ADMISSION_ACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: AdmissionActiveListFilterParamsType = useMemo(
    () => ({
      recordStatus_EQ: DORM_ADMISSION_LIST_ACTIVE,
      branchId_IN: url?.activeUniId,
      dormitoryId_IN: url?.activeDormitoryId,
      schedulingId_IN: url?.activeSchedulingId,
      reservationTypeId_IN: url?.activeReservationTypeId,
      managementTypeId_IN: url?.activeManagementTypeId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.activeProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.activeCityId,
    }),
    [ADMISSION_ACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList(
      {
        ...filterParams,

        firstResult: url?.activePage
          ? Number((+url.activePage - 1) * +url.activePageSize)
          : 0,
        maxResults: url?.activePageSize ? Number(url?.activePageSize) : 8,
        sortings: url?.sortings,
        title_LIKE: url?.title,
        AssociationDormitory_title_LIKE: url?.dormitory,
      },
      true // preferCacheValue: true - Use cached data if available
    );
  };

  const getListCount = () => {
    getAdmissionListCount(
      {
        ...filterParams,

        sortings: url?.sortings,
        title_LIKE: url?.title,
        AssociationDormitory_title_LIKE: url?.dormitory,
      },
      true // preferCacheValue: true - Use cached data if available
    );
  };

  const createAdmissionHandler = () => {
    navigate({
      pathname: DORM_ADMISSIONS_MODIFY_PAGE_ROUTE,
    });
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}

      <div className="dorm-admission-active-list-tab-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="primary"
                icon={<AiOutlineFilter />}
                onClick={openAdvanceFilter}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="btn-wrapper">
              <CustomExcelDownloadButton
                excelTitle="برنامه پذیرش های فعال"
                restOfUrl={excelFilesQueryRef.current}
                formId="DeliverPlanList"
                type="primary"
                ghost
                className="btn-text"
              />
              <CustomButton
                type="primary"
                className="btn-text"
                onClick={createAdmissionHandler}
              >
                ایجاد برنامه پذیرش
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={admissionListLoading || admissionListCountLoading}
          columns={DormAdmissionActiveInactiveListTableModel({
            type: DORM_ADMISSION_LIST_ACTIVE,
            status: "ACTIVE",
          })}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                activePage: page?.toString(),
                activePageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.activePage ? Number(url?.activePage) : 1,
            defaultPageSize: url?.activePageSize ? Number(url?.activePageSize) : 8,
          })}
          key={`table-${url?.activePageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionActiveListTab;
