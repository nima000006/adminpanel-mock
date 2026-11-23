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
  useLazyGetTariffListAwaitingReviewCountQuery,
  useLazyGetTariffListAwaitingReviewQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";
import { dormWaitingTimeQueryCreator } from "@pages/Dorm/_shared/utils/DormUtils";

import DormTariffAwaitingReviewTabTableModel from "../../models/DormTariffAwaitingReviewTabTableModel";
import {
  GetTariffListData,
  GetTariffListResponse,
  TariffListTabProps,
} from "../ActiveTab/@types/@activeTab";
import { UseTariffReturnedAdvanceFilterFormType } from "./helper/advanceFilterModal/TariffReturnedAdvanceFilter/@types/@useTariffReturnedAdvanceFilter";
import useTariffReturnedAdvanceFilter from "./helper/advanceFilterModal/TariffReturnedAdvanceFilter/TariffReturnedAdvanceFilter";
import "./_returnedTab.scss";

const FILTER_DEPENDENCIES = [
  "returnedUniId",
  "returnedDormitoryId",
  "returnedRequestTypeId",
  "returnedWaitingTimeId",
  "returnedProvinceId",
  "returnedCityId",
];

const TABLE_DEPENDENCIES = ["dormitory", "title", "sortings"];

const ReturnedTab = ({ type }: TariffListTabProps) => {
  const [dataSource, setDataSource] = useState<GetTariffListData[]>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseTariffReturnedAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useTariffReturnedAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  // get list
  const [getTariffList, { isFetching: getTariffListLoading }] =
    useLazyGetTariffListAwaitingReviewQuery();

  const [
    getTariffListCount,
    { data: getTariffListCountData, isFetching: getTariffListCountLoading },
  ] = useLazyGetTariffListAwaitingReviewCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    type,
    url?.returnedPageSize,
    url?.returnedPage,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.returnedWaitingTimeId);

    const params = {
      statusId_EQ: type,
      branchId_IN: url?.returnedUniId,
      dormitoryId_IN: url?.returnedDormitoryId,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.returnedProvinceId,
      AssociationBranchid_regionId_IN: url?.returnedCityId,
      requestTypeId_IN: url?.returnedRequestTypeId,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
      ...(waitingTime ? { [waitingTime.queryParam]: waitingTime?.value } : {}),
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    if (advanceModalOpen) {
      fetchInitialData();
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getTariffList({
      firstResult: url?.returnedPage
        ? Number((+url.returnedPage - 1) * +url.returnedPageSize)
        : 0,
      maxResults: url?.returnedPageSize ? Number(url?.returnedPageSize) : 8,
      statusId_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.returnedProvinceId,
      AssociationBranchid_regionId_IN: url?.returnedCityId,
      branchId_IN: url?.returnedUniId,
      dormitoryId_IN: url?.returnedDormitoryId,
      requestTypeId_IN: url?.returnedRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.returnedWaitingTimeId),
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    })
      .unwrap()
      .then(getListDataIsSuccess);
  };

  // success
  const getListDataIsSuccess = async (values: GetTariffListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListCount = () => {
    getTariffListCount({
      statusId_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.returnedProvinceId,
      AssociationBranchid_regionId_IN: url?.returnedCityId,
      branchId_IN: url?.returnedUniId,
      dormitoryId_IN: url?.returnedDormitoryId,
      requestTypeId_IN: url?.returnedRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.returnedWaitingTimeId),
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
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
      <div className="dorm-returned-tab-container">
        <ToolBox
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
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="تعرفه های عودت داده شده"
              restOfUrl={excelFilesQueryRef.current}
              formId="PriceList"
              type="primary"
              ghost
              className="btn-text"
            />
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={getTariffListLoading || getTariffListCountLoading}
          columns={DormTariffAwaitingReviewTabTableModel({
            status: "RETURN",
            returnTableModel: true,
          })}
          pagination={manualPaginationConfig({
            total: getTariffListCountData?.data,
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
          {...TABLE_PROPS(dataSource?.length || 0)}
          className="dorm-returned-list-table"
        />
      </div>
    </>
  );
};
export default ReturnedTab;
