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

import { AdmissionPendingReviewListFilterParamsType } from "./@types/@admissionAwaitingReviewListTab";
import { UseAdmissionAwaitingReviewAdvanceFilterFormType } from "./helper/advanceFilterModal/@types/@useAdmissionAwaitingReviewAdvanceFilter";
import useAdmissionAwaitingReviewAdvanceFilter from "./helper/advanceFilterModal/AdmissionAwaitingReviewAdvanceFilter";
import { ADMISSION_AWAITING_REVIEW_LIST_FILTER_DEPENDENCIES } from "./helper/utils/admissionAwaitingReviewListUtil";
import { DORM_ADMISSION_LIST_AWAITING_REVIEW } from "../../../../utils/AdmissionUtils";
import DormAdmissionAwaitingRejectReturnTableModel from "../../../_shared/Model/DormAdmissionAwaitingRejectReturnTableModel";
import "./_admissionAwaitingReviewListTab.scss";

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const AdmissionAwaitingReviewListTab = () => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const [form] = Form.useForm<UseAdmissionAwaitingReviewAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useAdmissionAwaitingReviewAdvanceFilter(form);

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
    url?.awaitingPageSize,
    url?.awaitingPage,
    ...ADMISSION_AWAITING_REVIEW_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.awaitingWaitingTimeId);

    const params = {
      statusId_EQ: DORM_ADMISSION_LIST_AWAITING_REVIEW,
      branchId_IN: url?.awaitingUniId,
      dormitoryId_IN: url?.awaitingDormitoryId,
      requestTypeId_IN: url?.awaitingRequestTypeId,
      reservationTypeId_IN: url?.awaitingReservationTypeId,
      schedulingId_IN: url?.awaitingSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.awaitingProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.awaitingCityId,
      ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...ADMISSION_AWAITING_REVIEW_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: AdmissionPendingReviewListFilterParamsType = useMemo(
    () => ({
      statusId_EQ: DORM_ADMISSION_LIST_AWAITING_REVIEW,
      branchId_IN: url?.awaitingUniId,
      dormitoryId_IN: url?.awaitingDormitoryId,
      requestTypeId_IN: url?.awaitingRequestTypeId,
      reservationTypeId_IN: url?.awaitingReservationTypeId,
      schedulingId_IN: url?.awaitingSchedulingId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.awaitingProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.awaitingCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.awaitingWaitingTimeId),
    }),
    [ADMISSION_AWAITING_REVIEW_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList(
      {
        ...filterParams,

        firstResult: url?.awaitingPage
          ? Number((+url.awaitingPage - 1) * +url.awaitingPageSize)
          : 0,
        maxResults: url?.awaitingPageSize ? Number(url?.awaitingPageSize) : 8,
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
        dormitoryId_IN: url?.dormitory,
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
      <div className="dorm-admission-awaiting-review-list-tab-container">
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
              excelTitle="برنامه پذیرش های در انتظار بررسی"
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
            type: DORM_ADMISSION_LIST_AWAITING_REVIEW,
            status: "AWAIT",
          })}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                awaitingPage: page?.toString(),
                awaitingPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.awaitingPage ? Number(url?.awaitingPage) : 1,
            defaultPageSize: url?.awaitingPageSize ? Number(url?.awaitingPageSize) : 8,
          })}
          key={`table-${url?.awaitingPageSize || "8"}  `}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionAwaitingReviewListTab;
