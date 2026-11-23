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

import DormTariffRejectTabTableModel from "../../models/DormTariffRejectTabTableModel";
import {
  GetTariffListData,
  GetTariffListResponse,
  TariffListTabProps,
} from "../ActiveTab/@types/@activeTab";
import { UseTariffRejectedAdvanceFilterFormType } from "./helper/advanceFilterModal/TariffRejectedAdvanceFilter/@types/@useTariffRejectedAdvanceFilter";
import useTariffRejectedAdvanceFilter from "./helper/advanceFilterModal/TariffRejectedAdvanceFilter/TariffRejectedAdvanceFilter";
import "./_rejectedTab.scss";

const FILTER_DEPENDENCIES = [
  "rejectedUniId",
  "rejectedDormitoryId",
  "rejectedRequestTypeId",
  "rejectedProvinceId",
  "rejectedCityId",
];

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const RejectedTab = ({ type }: TariffListTabProps) => {
  const [dataSource, setDataSource] = useState<GetTariffListData[]>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseTariffRejectedAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useTariffRejectedAdvanceFilter(form);

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
    url?.rejectedPageSize,
    url?.rejectedPage,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const params = {
      statusId_EQ: type,
      branchId_IN: url?.rejectedUniId,
      dormitoryId_IN: url?.rejectedDormitoryId,
      requestTypeId_IN: url?.rejectedRequestTypeId,
      AssociationDormitory_title_LIKE: url?.dormitory,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.rejectedProvinceId,
      AssociationBranchid_regionId_IN: url?.rejectedCityId,
      title_LIKE: url?.title,
      sortings: url?.sortings,
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
      firstResult: url?.rejectedPage
        ? Number((+url.rejectedPage - 1) * +url.rejectedPageSize)
        : 0,
      maxResults: url?.rejectedPageSize ? Number(url?.rejectedPageSize) : 8,
      statusId_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.rejectedProvinceId,
      AssociationBranchid_regionId_IN: url?.rejectedCityId,
      branchId_IN: url?.rejectedUniId,
      dormitoryId_IN: url?.rejectedDormitoryId,
      requestTypeId_IN: url?.rejectedRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.rejectedWaitingTimeId),
      AssociationDormitory_title_LIKE: url?.dormitory,
      title_LIKE: url?.title,
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
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.rejectedProvinceId,
      AssociationBranchid_regionId_IN: url?.rejectedCityId,
      branchId_IN: url?.rejectedUniId,
      dormitoryId_IN: url?.rejectedDormitoryId,
      requestTypeId_IN: url?.rejectedRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.rejectedWaitingTimeId),
      AssociationDormitory_title_LIKE: url?.dormitory,
      title_LIKE: url?.title,
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
      <div className="dorm-rejected-tab-container">
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
              excelTitle="تعرفه های رد شده"
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
          columns={DormTariffRejectTabTableModel()}
          pagination={manualPaginationConfig({
            total: getTariffListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                rejectedPage: page?.toString(),
                rejectedPageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.rejectedPage ? Number(url?.rejectedPage) : 1,
            defaultPageSize: url?.rejectedPageSize ? Number(url?.rejectedPageSize) : 8,
          })}
          key={`table-${url?.rejectedPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length || 0)}
          className="dorm-rejected-list-table"
        />
      </div>
    </>
  );
};
export default RejectedTab;
