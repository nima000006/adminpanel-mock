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
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import { AdmissionReturnedListFilterParamsType } from "./@types/@admissionReturnedListTab";
import useAdmissionReturnedAdvanceFilter from "./helper/advanceFilterModal/AdmissionReturnedAdvanceFilter";
import { UseAdmissionReturnedAdvanceFilterFormType } from "./helper/advanceFilterModal/types/@useAdmissionReturnedAdvanceFilter";
import { ADMISSION_RETURNED_LIST_FILTER_DEPENDENCIES } from "./helper/utils/admissionReturnedListUtils";
import { DORM_ADMISSION_LIST_RETURNED } from "../../../../utils/AdmissionUtils";
import DormAdmissionAwaitingRejectReturnTableModel from "../../../_shared/Model/DormAdmissionAwaitingRejectReturnTableModel";
import "./_admissionReturnedListTab.scss";

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];
const AdmissionReturnedListTab = () => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseAdmissionReturnedAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useAdmissionReturnedAdvanceFilter(form);

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

  const excelFilesQueryRef = useRef("");

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
    url?.returnedPageSize,
    url?.returnedPage,
    ...ADMISSION_RETURNED_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.returnedWaitingTimeId);

    const params = {
      statusId_EQ: DORM_ADMISSION_LIST_RETURNED,
      branchId_IN: url?.returnedUniId,
      dormitoryId_IN: url?.returnedDormitoryId,
      requestTypeId_IN: url?.returnedRequestTypeId,
      reservationTypeId_IN: url?.returnedReservationTypeId,
      schedulingId_IN: url?.returnedSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.returnedProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.returnedCityId,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
      ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...ADMISSION_RETURNED_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: AdmissionReturnedListFilterParamsType = useMemo(
    () => ({
      statusId_EQ: DORM_ADMISSION_LIST_RETURNED,
      branchId_IN: url?.returnedUniId,
      dormitoryId_IN: url?.returnedDormitoryId,
      requestTypeId_IN: url?.returnedRequestTypeId,
      reservationTypeId_IN: url?.returnedReservationTypeId,
      schedulingId_IN: url?.returnedSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.returnedProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.returnedCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.returnedWaitingTimeId),
    }),
    [ADMISSION_RETURNED_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList(
      {
        firstResult: url?.returnedPage
          ? Number((+url.returnedPage - 1) * +url.returnedPageSize)
          : 0,
        maxResults: url?.returnedPageSize ? Number(url?.returnedPageSize) : 8,
        ...filterParams,
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
      <div className="dorm-admission-returned-list-tab-container">
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
              excelTitle="برنامه پذیرش های عودت داده شده"
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
            type: DORM_ADMISSION_LIST_RETURNED,
            status: "RETURN",
          })}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                returnedPage: page?.toString(),
                returnedPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.returnedPage ? Number(url?.returnedPage) : 1,
            defaultPageSize: url?.returnedPageSize ? Number(url?.returnedPageSize) : 8,
          })}
          key={`table-${url?.returnedPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionReturnedListTab;
