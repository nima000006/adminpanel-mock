import { useEffect, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeQueryParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_TARIFF_MODIFY_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyGetTariffListCountQuery,
  useLazyGetTariffListQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import CustomExcelDownloadButton from "@pages/Dorm/_shared/helper/CustomExcelDownloadButton/CustomExcelDownloadButton";

import {
  GetTariffListData,
  GetTariffListResponse,
  TariffListTabProps,
} from "./@types/@activeTab";
import DormTariffActiveTabTableModel from "../../models/DormTariffActiveTabTableModel";
import { UseTariffActiveAdvanceFilterFormType } from "./helper/advanceFilterModal/TariffActiveAdvanceFilter/@types/@useTariffActiveAdvanceFilter";
import useTariffActiveAdvanceFilter from "./helper/advanceFilterModal/TariffActiveAdvanceFilter/TariffActiveAdvanceFilter";
import "./_activeTab.scss";

const FILTER_DEPENDENCIES = [
  "activeUniId",
  "activeDormitoryId",
  "activeProvinceId",
  "activeCityId",
];

const TABLE_DEPENDENCIES = ["title", "dormitory", "sortings"];

const ActiveTab = ({ type }: TariffListTabProps) => {
  const [dataSource, setDataSource] = useState<GetTariffListData[]>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const navigate = useNavigate();

  const [form] = Form.useForm<UseTariffActiveAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useTariffActiveAdvanceFilter(form);

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
    url?.activePageSize,
    url?.activePage,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCountData();

    // for excel file
    const params = {
      recordStatus_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.activeProvinceId,
      AssociationBranchid_regionId_IN: url?.activeCityId,
      branchId_IN: url?.activeUniId,
      dormitoryId_IN: url?.activeDormitoryId,
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
      firstResult: url?.activePage
        ? Number((+url.activePage - 1) * +url.activePageSize)
        : 0,
      maxResults: url?.activePageSize ? Number(url?.activePageSize) : 8,
      recordStatus_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.activeProvinceId,
      AssociationBranchid_regionId_IN: url?.activeCityId,
      branchId_IN: url?.activeUniId,
      dormitoryId_IN: url?.activeDormitoryId,
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
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.activeProvinceId,
      AssociationBranchid_regionId_IN: url?.activeCityId,
      branchId_IN: url?.activeUniId,
      dormitoryId_IN: url?.activeDormitoryId,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
      sortings: url?.sortings,
    });
  };

  // create tariff
  const createTariffHandler = () => {
    navigate(DORM_TARIFF_MODIFY_PAGE_ROUTE);
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
      <div className="dorm-active-tab-container">
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
            <div className="btn-wrapper">
              <CustomExcelDownloadButton
                excelTitle="تعرفه های فعال"
                restOfUrl={excelFilesQueryRef.current}
                formId="PriceList"
                type="primary"
                ghost
                className="btn-text"
              />
              <CustomButton
                type="primary"
                className="btn-text"
                onClick={createTariffHandler}
              >
                ایجاد تعرفه
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={getTariffListLoading || getTariffListCountLoading}
          columns={DormTariffActiveTabTableModel()}
          pagination={manualPaginationConfig({
            total: getTariffListCountData?.data,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                activePage: page?.toString(),
                activePageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.activePage ? Number(url?.activePage) : 1,
            defaultPageSize: url?.activePageSize ? Number(url?.activePageSize) : 8,
          })}
          key={`table-${url?.activePageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length || 0)}
        />
      </div>
    </>
  );
};
export default ActiveTab;
