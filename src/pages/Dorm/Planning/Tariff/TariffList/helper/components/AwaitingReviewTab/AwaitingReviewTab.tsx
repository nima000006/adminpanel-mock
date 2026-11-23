import { useEffect, useRef, useState } from "react";

import { Form } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
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
import { UseTariffAwaitingReviewAdvanceFilterFormType } from "./helper/advanceFilterModal/TariffAwaitingReviewAdvanceFilter/@types/@useTariffAwaitingReviewAdvanceFilter";
import useTariffAwaitingReviewAdvanceFilter from "./helper/advanceFilterModal/TariffAwaitingReviewAdvanceFilter/TariffAwaitingReviewAdvanceFilter";
import "./_awaitingReviewTab.scss";

const FILTER_DEPENDENCIES = [
  "awaitingUniId",
  "awaitingDormitoryId",
  "awaitingRequestTypeId",
  "awaitingWaitingTimeId",
  "awaitingProvinceId",
  "awaitingCityId",
];
const TABLE_DEPENDENCIES = ["sortings", "title", "dormitory"];

const AwaitingReviewTab = ({ type }: TariffListTabProps) => {
  const [dataSource, setDataSource] = useState<GetTariffListData[]>();
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseTariffAwaitingReviewAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } =
    useTariffAwaitingReviewAdvanceFilter(form);

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
    url?.awaitingPageSize,
    url?.awaitingPage,
    ...FILTER_DEPENDENCIES.map((key) => url?.[key]),
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  useEffect(() => {
    getListCount();

    // for excel file
    const waitingTime = dormWaitingTimeQueryCreator(+url?.awaitingWaitingTimeId);

    const params = {
      statusId_EQ: type,
      branchId_IN: url?.awaitingUniId,
      dormitoryId_IN: url?.awaitingDormitoryId,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.awaitingProvinceId,
      AssociationBranchid_regionId_IN: url?.awaitingCityId,
      requestTypeId_IN: url?.awaitingRequestTypeId,
      sortings: url?.sortings,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
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
      firstResult: url?.awaitingPage
        ? Number((+url.awaitingPage - 1) * +url.awaitingPageSize)
        : 0,
      maxResults: url?.awaitingPageSize ? Number(url?.awaitingPageSize) : 8,
      statusId_EQ: type,
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.awaitingProvinceId,
      AssociationBranchid_regionId_IN: url?.awaitingCityId,
      branchId_IN: url?.awaitingUniId,
      dormitoryId_IN: url?.awaitingDormitoryId,
      requestTypeId_IN: url?.awaitingRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.awaitingWaitingTimeId),
      sortings: url?.sortings,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
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
      AssociationBranchid_AssociationCategoryRegion_parentId_IN: url?.awaitingProvinceId,
      AssociationBranchid_regionId_IN: url?.awaitingCityId,
      branchId_IN: url?.awaitingUniId,
      dormitoryId_IN: url?.awaitingDormitoryId,
      requestTypeId_IN: url?.awaitingRequestTypeId,
      waitingTimeId: dormWaitingTimeQueryCreator(+url?.awaitingWaitingTimeId),
      sortings: url?.sortings,
      title_LIKE: url?.title,
      AssociationDormitory_title_LIKE: url?.dormitory,
    });
  };

  // advance filter
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
      <div className="dorm-awaiting-review-tab-container">
        <ToolBox
          rightSide={
            <>
              <CustomInput
                suffix={<AiOutlineSearch />}
                placeholder="جستجو"
                hasVerticalLabel={false}
                disabled
              />

              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="primary"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </>
          }
          leftSide={
            <CustomExcelDownloadButton
              excelTitle="تعرفه های در انتظار بررسی"
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
            status: "AWAIT",
            returnTableModel: true,
          })}
          pagination={manualPaginationConfig({
            total: getTariffListCountData?.data,
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
          key={`table-${url?.awaitingPageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length || 0)}
          className="dorm-awaiting-review-list-table"
        />
      </div>
    </>
  );
};
export default AwaitingReviewTab;
