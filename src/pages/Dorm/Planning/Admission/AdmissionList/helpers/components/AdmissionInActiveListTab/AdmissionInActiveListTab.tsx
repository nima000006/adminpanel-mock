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
  useLazyGetAdmissionListCountQuery,
  useLazyGetAdmissionListQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import { AdmissionInActiveListFilterParamsType } from "./@types/@admissionInActiveListTab";
import { UseAdmissionInactiveAdvanceFilterFormType } from "./helper/modals/advanceFilterModal/@types/@useAdmissionAdvanceFilter";
import useAdmissionInactiveAdvanceFilter from "./helper/modals/advanceFilterModal/AdmissionAdvanceFilter";
import { ADMISSION_INACTIVE_LIST_FILTER_DEPENDENCIES } from "./helper/utils/admissionInActiveListUtil";
import { DORM_ADMISSION_LIST_INACTIVE } from "../../../../utils/AdmissionUtils";
import DormAdmissionActiveInactiveListTableModel from "../../../_shared/Model/DormAdmissionActiveInactiveListTableModel";
import "./_admissionInActiveListTab.scss";

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const AdmissionInActiveListTab = () => {
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const excelFilesQueryRef = useRef("");

  const [form] = Form.useForm<UseAdmissionInactiveAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useAdmissionInactiveAdvanceFilter(form);

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
    url?.inactivePageSize,
    url?.inactivePage,
    ...ADMISSION_INACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const params = {
      recordStatus_EQ: DORM_ADMISSION_LIST_INACTIVE,
      branchId_IN: url?.inactiveUniId,
      dormitoryId_IN: url?.inactiveDormitoryId,
      schedulingId_IN: url?.inactiveSchedulingId,
      reservationTypeId_IN: url?.inactiveReservationTypeId,
      managementTypeId_IN: url?.inactiveManagementTypeId,
      AssociationDeliverPlanPaymetMethod_paymentMethodId_IN: url?.inactivePaymentMethodId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.inactiveProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.inactiveCityId,
      title_LIKE: url?.title,
      dormitory: url?.dormitory,
      createDate: url?.sortings,
      appliedEndDate: url?.sortings,
      appliedStartDate: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...ADMISSION_INACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (isAdvanceModalOpen) {
      fetchInitialData();
    }
  }, [isAdvanceModalOpen]);

  //? ================================ Memo ================================
  const filterParams: AdmissionInActiveListFilterParamsType = useMemo(
    () => ({
      recordStatus_EQ: DORM_ADMISSION_LIST_INACTIVE,
      branchId_IN: url?.inactiveUniId,
      dormitoryId_IN: url?.inactiveDormitoryId,
      schedulingId_IN: url?.inactiveSchedulingId,
      reservationTypeId_IN: url?.inactiveReservationTypeId,
      managementTypeId_IN: url?.inactiveManagementTypeId,
      AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
        url?.inactiveProvinceId,
      AssociationCategoryBranch_regionId_IN: url?.inactiveCityId,
    }),
    [ADMISSION_INACTIVE_LIST_FILTER_DEPENDENCIES.map((key) => url?.[key])]
  );

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList(
      {
        ...filterParams,

        firstResult: url?.inactivePage
          ? Number((+url.inactivePage - 1) * +url.inactivePageSize)
          : 0,
        maxResults: url?.inactivePageSize ? Number(url?.inactivePageSize) : 8,
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

      <div className="dorm-admission-inactive-list-tab-container">
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
              excelTitle="برنامه پذیرش های غیر فعال"
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
          columns={DormAdmissionActiveInactiveListTableModel({
            type: DORM_ADMISSION_LIST_INACTIVE,
            status: "INACTIVE",
          })}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                inactivePage: page?.toString(),
                inactivePageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.inactivePage ? Number(url?.inactivePage) : 1,
            defaultPageSize: url?.inactivePageSize ? Number(url?.inactivePageSize) : 8,
          })}
          key={`table-${url?.inactivePageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionInActiveListTab;
