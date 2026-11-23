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
  useLazyGetWorkSpaceDormReceivedListCountQuery,
  useLazyGetWorkSpaceDormReceivedListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  GetWorkSpaceDormListResponse,
  WorkSpaceDormListType,
} from "./helper/@types/@workSpaceDormListType";
import { UseWorkSpaceDormAdvanceFilterFormType } from "./helper/modals/AdvanceFilterModal/workSpaceDormAdvanceFilter/@types/@useWorkSpaceDormAdvanceFilter";
import useWorkSpaceDormAdvanceFilter from "./helper/modals/AdvanceFilterModal/workSpaceDormAdvanceFilter/WorkSpaceDormAdvanceFilter";
import WorkSpaceDormTableModel from "./helper/model/WorkSpaceDormTableModel";

const FILTER_DEPENDENCIES = [
  "dormPositionId",
  "dormOrganId",
  "dormUniId",
  "dormRequestTypeId",
  "dormStatusId",
  "dormWaitingTimeId",
  "dormProvinceId",
  "dormCityId",
];
const TABLE_DEPENDENCIES = ["name", "lastName", "dormitory", "sortings"];

const WorkSpacesDormList = ({ activeTab }: { activeTab: string }) => {
  const [dataSource, setDataSource] = useState<WorkSpaceDormListType[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseWorkSpaceDormAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useWorkSpaceDormAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  const [getDormList, { isFetching: isDormListLoading }] =
    useLazyGetWorkSpaceDormReceivedListQuery();

  const [
    getRequestsListCount,
    { data: dormListCountData, isFetching: isDormListCountLoading },
  ] = useLazyGetWorkSpaceDormReceivedListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (activeTab === url?.tab) {
      dormList();
    }
  }, [
    url?.tab,
    url?.dormPage,
    url?.dormPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (activeTab === url?.tab) {
      dormListCount();

      // for excel file
      const waitingTime = dormWaitingTimeQueryCreator(+url?.dormWaitingTimeId);

      const params = {
        AssociationUser_AssociationStudent_branchId_IN: url?.dormUniId,
        requestTypeId_IN: url?.dormRequestTypeId,
        statusId_IN: url?.dormStatusId,
        AssociationBranch_AssociationCategoryRegion_parentId_IN: url?.dormProvinceId,
        AssociationBranch_regionId_IN: url?.dormCityId,
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
  const dormList = () => {
    getDormList({
      firstResult: url?.dormPage ? Number((+url.dormPage - 1) * +url.dormPageSize) : 0,
      maxResults: url?.dormPageSize ? Number(url?.dormPageSize) : 8,
      branchId: url?.dormUniId,
      requestTypeId: url?.dormRequestTypeId,
      statusId: url?.dormStatusId,
      provinceId: url?.dormProvinceId,
      cityId: url?.dormCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.dormWaitingTimeId),
      dormitory: url?.dormitory,
      lastName: url?.lastName,
      name: url?.name,
      sortings: url?.sortings,
    })
      .unwrap()
      .then(getDormListSuccess);
  };
  const getDormListSuccess = async (values: GetWorkSpaceDormListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const dormListCount = () => {
    getRequestsListCount({
      branchId: url?.dormUniId,
      requestTypeId: url?.dormRequestTypeId,
      statusId: url?.dormStatusId,
      provinceId: url?.dormProvinceId,
      cityId: url?.dormCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.dormWaitingTimeId),
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
              excelTitle="لیست خوابگاه"
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
          columns={WorkSpaceDormTableModel(url)}
          loading={isDormListLoading || isDormListCountLoading}
          pagination={manualPaginationConfig({
            total: dormListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                dormPage: page?.toString(),
                dormPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.dormPage ? Number(url?.dormPage) : 1,
            defaultPageSize: url?.dormPageSize ? Number(url?.dormPageSize) : 8,
          })}
          key={`table-${url?.dormPageSize || "8"}`}
          rowKey="id"
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};
export default WorkSpacesDormList;
