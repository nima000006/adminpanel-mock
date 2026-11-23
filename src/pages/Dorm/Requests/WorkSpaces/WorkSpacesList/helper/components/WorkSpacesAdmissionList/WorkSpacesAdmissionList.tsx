import { useEffect, useRef, useState } from "react";

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
  useLazyGetWorkSpaceAdmissionReceivedListCountQuery,
  useLazyGetWorkSpaceAdmissionReceivedListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  GetWorkSpaceAdmissionResponse,
  WorkSpaceAdmissionListType,
} from "./helper/@types/@workSpacesAdmissionListType";
import { UseWorkSpaceAdmissionAdvanceFilterFormType } from "./helper/modals/AdvanceFilterModal/workSpaceAdmissionAdvanceFilter/@types/@useWorkSpaceAdmissionAdvanceFilter";
import useWorkSpaceAdmissionAdvanceFilter from "./helper/modals/AdvanceFilterModal/workSpaceAdmissionAdvanceFilter/WorkSpaceAdmissionAdvanceFilter";
import WorkSpaceAdmissionTableModel from "./helper/model/WorkSpaceAdmissionTableModel";

const FILTER_DEPENDENCIES = [
  "admissionPositionId",
  "admissionOrganId",
  "admissionUniId",
  "admissionRequestTypeId",
  "admissionStatusId",
  "admissionWaitingTimeId",
  "admissionProvinceId",
  "admissionCityId",
];
const TABLE_DEPENDENCIES = ["name", "lastName", "dormitory", "sortings"];

const WorkSpacesAdmissionList = ({ activeTab }: { activeTab: string }) => {
  const [dataSource, setDataSource] = useState<WorkSpaceAdmissionListType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseWorkSpaceAdmissionAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useWorkSpaceAdmissionAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  const [getAdmissionList, { isFetching: isAdmissionListLoading }] =
    useLazyGetWorkSpaceAdmissionReceivedListQuery();
  const [
    getRequestsListCount,
    { data: admissionListCountData, isFetching: isAdmissionListCountLoading },
  ] = useLazyGetWorkSpaceAdmissionReceivedListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (activeTab === url?.tab) {
      admissionList();
    }
  }, [
    url?.tab,
    url?.admissionPage,
    url?.admissionPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (activeTab === url?.tab) {
      admissionListCount();
      // for excel file
      const waitingTime = dormWaitingTimeQueryCreator(+url?.admissionWaitingTimeId);
      const params = {
        AssociationUser_AssociationStudent_branchId_IN: url?.admissionUniId,
        requestTypeId_IN: url?.admissionRequestTypeId,
        statusId_IN: url?.admissionStatusId,
        AssociationCategoryBranch_AssociationCategoryRegion_parentId_IN:
          url?.admissionProvinceId,
        AssociationCategoryBranch_regionId_IN: url?.admissionCityId,
        ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
        dormitory: url?.dormitory,
        lastName: url?.lastName,
        name: url?.name,
        sortings: url?.sortings,
      };

      excelFilesQueryRef.current = makeQueryParams(params);
    }
  }, [
    url?.tab,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const admissionList = () => {
    getAdmissionList({
      firstResult: url?.admissionPage
        ? Number((+url.admissionPage - 1) * +url.admissionPageSize)
        : 0,
      maxResults: url?.admissionPageSize ? Number(url?.admissionPageSize) : 8,
      branchId: url?.admissionUniId,
      requestTypeId: url?.admissionRequestTypeId,
      statusId: url?.admissionStatusId,
      provinceId: url?.admissionProvinceId,
      cityId: url?.admissionCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.admissionWaitingTimeId),
      dormitory: url?.dormitory,
      lastName: url?.lastName,
      name: url?.name,
      sortings: url?.sortings,
    })
      .unwrap()
      .then(getAdmissionListSuccess);
  };

  const getAdmissionListSuccess = async (values: GetWorkSpaceAdmissionResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const admissionListCount = () => {
    getRequestsListCount({
      branchId: url?.admissionUniId,
      requestTypeId: url?.admissionRequestTypeId,
      statusId: url?.admissionStatusId,
      provinceId: url?.admissionProvinceId,
      cityId: url?.admissionCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.admissionWaitingTimeId),
      dormitory: url?.dormitory,
      lastName: url?.lastName,
      name: url?.name,
      sortings: url?.sortings,
    });
  };

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}
      <div className="work-space-tab-container">
        <ToolBox
          className="work-spaces-list-toolbox"
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="لیست برنامه پذیرش"
              restOfUrl={excelFilesQueryRef.current}
              formId="DormitoryRequestsReceived"
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
                onClick={openAdvanceFilterHandler}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
        />
        <CustomTable
          dataSource={dataSource}
          columns={WorkSpaceAdmissionTableModel()}
          loading={isAdmissionListLoading || isAdmissionListCountLoading}
          pagination={manualPaginationConfig({
            total: admissionListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                admissionPage: page?.toString(),
                admissionPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.admissionPage ? Number(url?.admissionPage) : 1,
            defaultPageSize: url?.admissionPageSize ? Number(url?.admissionPageSize) : 8,
          })}
          rowKey="id"
          key={`table-${url?.admissionPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};
export default WorkSpacesAdmissionList;
