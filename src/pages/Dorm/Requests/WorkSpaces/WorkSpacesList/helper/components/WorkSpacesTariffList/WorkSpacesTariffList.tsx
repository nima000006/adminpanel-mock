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
  useLazyGetWorkSpaceTariffReceivedListCountQuery,
  useLazyGetWorkSpaceTariffReceivedListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import {
  GetWorkSpaceTariffResponse,
  WorkSpaceTariffListType,
} from "./helper/@types/@workSpaceTariffListType";
import { UseWorkSpaceTariffAdvanceFilterFormType } from "./helper/modals/AdvanceFilterModal/workSpaceTariffAdvanceFilter/@types/@useWorkSpaceTariffAdvanceFilter";
import useWorkSpaceTariffAdvanceFilter from "./helper/modals/AdvanceFilterModal/workSpaceTariffAdvanceFilter/WorkSpaceTariffAdvanceFilter";
import WorkSpaceTariffTableModel from "./helper/model/WorkSpaceTariffTableModel";

const FILTER_DEPENDENCIES = [
  "tariffPositionId",
  "tariffOrganId",
  "tariffUniId",
  "tariffRequestTypeId",
  "tariffStatusId",
  "tariffWaitingTimeId",
  "tariffProvinceId",
  "tariffCityId",
];
const TABLE_DEPENDENCIES = ["name", "lastName", "dormitory", "sortings"];

const WorkSpacesTariffList = ({ activeTab }: { activeTab: string }) => {
  const [dataSource, setDataSource] = useState<WorkSpaceTariffListType[]>([]);

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseWorkSpaceTariffAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useWorkSpaceTariffAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  const [getTariffList, { isFetching: isTariffListLoading }] =
    useLazyGetWorkSpaceTariffReceivedListQuery();

  const [
    getTariffListCount,
    { data: tariffListCountData, isFetching: isTariffListCountLoading },
  ] = useLazyGetWorkSpaceTariffReceivedListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (activeTab === url?.tab) {
      tariffList();
    }
  }, [
    url?.tab,
    url?.tariffPage,
    url?.tariffPageSize,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (activeTab === url?.tab) {
      tariffListCount();

      // for excel file
      const waitingTime = dormWaitingTimeQueryCreator(+url?.tariffWaitingTimeId);

      const params = {
        AssociationUser_AssociationStudent_branchId_IN: url?.tariffUniId,
        requestTypeId_IN: url?.tariffRequestTypeId,
        statusId_IN: url?.tariffStatusId,
        AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.tariffProvinceId,
        AssociationBranchid_regionId_IN: url?.tariffCityId,
        dormitory: url?.dormitory,
        sortings: url?.sortings,
        name: url?.name,
        lastName: url?.lastName,

        ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
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
  const tariffList = () => {
    getTariffList({
      firstResult: url?.tariffPage
        ? Number((+url.tariffPage - 1) * +url.tariffPageSize)
        : 0,
      maxResults: url?.tariffPageSize ? Number(url?.tariffPageSize) : 8,
      branchId: url?.tariffUniId,
      requestTypeId: url?.tariffRequestTypeId,
      statusId: url?.tariffStatusId,
      provinceId: url?.tariffProvinceId,
      cityId: url?.tariffCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.tariffWaitingTimeId),
      dormitory: url?.dormitory,
      sortings: url?.sortings,
      name: url?.name,
      lastName: url?.lastName,
    })
      .unwrap()
      .then(getTariffListSuccess);
  };

  const getTariffListSuccess = async (values: GetWorkSpaceTariffResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const tariffListCount = () => {
    getTariffListCount({
      branchId: url?.tariffUniId,
      requestTypeId: url?.tariffRequestTypeId,
      statusId: url?.tariffStatusId,
      provinceId: url?.tariffProvinceId,
      cityId: url?.tariffCityId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.tariffWaitingTimeId),
      dormitory: url?.dormitory,
      sortings: url?.sortings,
      name: url?.name,
      lastName: url?.lastName,
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
              excelTitle="لیست تعرفه"
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
          columns={WorkSpaceTariffTableModel()}
          loading={isTariffListLoading || isTariffListCountLoading}
          pagination={manualPaginationConfig({
            total: tariffListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                tariffPage: page?.toString(),
                tariffPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.tariffPage ? Number(url?.tariffPage) : 1,
            defaultPageSize: url?.tariffPageSize ? Number(url?.tariffPageSize) : 8,
          })}
          rowKey="id"
          key={`table-${url?.tariffPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};
export default WorkSpacesTariffList;
