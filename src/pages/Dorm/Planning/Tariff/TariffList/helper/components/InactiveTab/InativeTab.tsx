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
  useLazyGetTariffListCountQuery,
  useLazyGetTariffListQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import DormTariffInActiveTabTableModel from "../../models/DormTariffInActiveTabTableModel";
import {
  GetTariffListData,
  GetTariffListResponse,
  TariffListTabProps,
} from "../ActiveTab/@types/@activeTab";
import { UseTariffInActiveAdvanceFilterFormType } from "./helper/advanceModal/TariffInActiveAdvanceFilter/@types/@useTariffInActiveAdvanceFilter";
import useTariffInActiveAdvanceFilter from "./helper/advanceModal/TariffInActiveAdvanceFilter/TariffInActiveAdvanceFilter";

import "./_inactiveTab.scss";

const FILTER_DEPENDENCIES = [
  "inactiveUniId",
  "inactiveDormitoryId",
  "inactiveProvinceId",
  "inactiveCityId",
];

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const InactiveTab = ({ type }: TariffListTabProps) => {
  const [dataSource, setDataSource] = useState<GetTariffListData[]>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseTariffInActiveAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useTariffInActiveAdvanceFilter(form);

  const excelFilesQueryRef = useRef("");

  //? ================================  Api Calls ================================
  // get list
  const [getTariffList, { isFetching: getTariffListLoading }] =
    useLazyGetTariffListQuery();

  const [
    getTariffListCount,
    { data: getTariffListCountData, isFetching: getTariffListCountLoading },
  ] = useLazyGetTariffListCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    type,
    url?.inactivePageSize,
    url?.inactivePage,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCountData();

    // for excel file
    const params = {
      recordStatus_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.inactiveProvinceId,
      AssociationBranchid_regionId_IN: url?.inactiveCityId,
      branchId_IN: url?.inactiveUniId,
      dormitoryId_IN: url?.inactiveDormitoryId,
      AssociationDormitory_title_LIKE: url?.dormitory,
      title_LIKE: url?.title,
      sortings: url?.sortings,
    };

    excelFilesQueryRef.current = makeQueryParams(params);
  }, [
    type,
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
      firstResult: url?.inactivePage
        ? Number((+url.inactivePage - 1) * +url.inactivePageSize)
        : 0,
      maxResults: url?.inactivePageSize ? Number(url?.inactivePageSize) : 8,
      recordStatus_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.inactiveProvinceId,
      AssociationBranchid_regionId_IN: url?.inactiveCityId,
      branchId_IN: url?.inactiveUniId,
      dormitoryId_IN: url?.inactiveDormitoryId,
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

  const getListCountData = () => {
    getTariffListCount({
      recordStatus_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.inactiveProvinceId,
      AssociationBranchid_regionId_IN: url?.inactiveCityId,
      branchId_IN: url?.inactiveUniId,
      dormitoryId_IN: url?.inactiveDormitoryId,
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
      <div className="dorm-inactive-tab-container">
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
              excelTitle="تعرفه های غیرفعال"
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
          columns={DormTariffInActiveTabTableModel()}
          pagination={manualPaginationConfig({
            total: getTariffListCountData?.data,
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
          {...TABLE_PROPS(dataSource?.length || 0)}
          className="my-contracts-list-table"
        />
      </div>
    </>
  );
};
export default InactiveTab;
