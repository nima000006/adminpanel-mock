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
  useLazyGetAdmissionAwaitingReviewCountQuery,
  useLazyGetAdmissionAwaitingReviewQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import { AdmissionRejectListFilterParamsType } from "./@types/@admissionRejectListTab";
import { UseAdmissionRejectedAdvanceFilterFormType } from "./helper/advanceFilterModal/@types/@useAdmissionRejectedAdvanceFilter";
import useAdmissionRejectedAdvanceFilter from "./helper/advanceFilterModal/AdmissionRejectedAdvanceFilter";
import { ADMISSION_REJECT_LIST_FILTER_DEPENDENCIES } from "./helper/utils/admissionRejectListUtils";
import { DORM_ADMISSION_LIST_REJECTED } from "../../../../utils/AdmissionUtils";
import DormAdmissionAwaitingRejectReturnTableModel from "../../../_shared/Model/DormAdmissionAwaitingRejectReturnTableModel";
import "./_admissionRejectListTab.scss";

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];
const AdmissionRejectListTab = () => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const [form] = Form.useForm<UseAdmissionRejectedAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useAdmissionRejectedAdvanceFilter(form);

  //? ================================  Api Calls ================================
  const [
    getAdmissionList,
    {
      data: admissionListData,
      isFetching: admissionListLoading,
      isSuccess: admissionListSuccess,
    },
  ] = useLazyGetAdmissionAwaitingReviewQuery();

  const [
    getAdmissionListCount,
    { data: admissionListCountData, isFetching: admissionListCountLoading },
  ] = useLazyGetAdmissionAwaitingReviewCountQuery();

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
    url?.rejectPageSize,
    url?.rejectPage,
    ...ADMISSION_REJECT_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file

    const params = {
      statusId_EQ: DORM_ADMISSION_LIST_REJECTED,
      branchId_IN: url?.rejectUniId,
      dormitoryId_IN: url?.rejectDormitoryId,
      requestTypeId_IN: url?.rejectRequestTypeId,
      reservationTypeId_IN: url?.rejectReservationTypeId,
      schedulingId_IN: url?.rejectSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.rejectProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.rejectCityId,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...ADMISSION_REJECT_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: AdmissionRejectListFilterParamsType = useMemo(
    () => ({
      statusId_EQ: DORM_ADMISSION_LIST_REJECTED,
      branchId_IN: url?.rejectUniId,
      dormitoryId_IN: url?.rejectDormitoryId,
      requestTypeId_IN: url?.rejectRequestTypeId,
      reservationTypeId_IN: url?.rejectReservationTypeId,
      schedulingId: url?.rejectSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.rejectProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.rejectCityId,
    }),
    [ADMISSION_REJECT_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList(
      {
        ...filterParams,

        firstResult: url?.rejectPage
          ? Number((+url.rejectPage - 1) * +url.rejectPageSize)
          : 0,
        maxResults: url?.rejectPageSize ? Number(url?.rejectPageSize) : 8,
        title_LIKE: url?.title,
        AssociationDormitory_title_LIKE: url?.dormitory,
        sortings: url?.sortings,
      },
      true // preferCacheValue: true - Use cached data if available
    );
  };

  const getListCount = () => {
    getAdmissionListCount(
      {
        ...filterParams,
        title_LIKE: url?.title,
        AssociationDormitory_title_LIKE: url?.dormitory,
        sortings: url?.sortings,
      },
      true // preferCacheValue: true - Use cached data if available
    );
  };

  const openAdvanceFilter = () => {
    setIsAdvanceModalOpen(true);
  };
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
      <div className="dorm-admission-reject-list-tab-container">
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
            <CustomExcelDownloadButton
              excelTitle="برنامه پذیرش های رد شده"
              restOfUrl={excelFilesQueryRef.current}
              formId="DeliverPlanList"
              type="primary"
              ghost
              className="btn-text"
            />
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={admissionListLoading || admissionListCountLoading}
          columns={DormAdmissionAwaitingRejectReturnTableModel({
            type: DORM_ADMISSION_LIST_REJECTED,
            status: "REJECT",
          })}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                rejectPage: page?.toString(),
                rejectPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.rejectPage ? Number(url?.rejectPage) : 1,
            defaultPageSize: url?.rejectPageSize ? Number(url?.rejectPageSize) : 8,
          })}
          key={`table-${url?.rejectPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionRejectListTab;
