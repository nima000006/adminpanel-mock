import { useCallback, useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { REPORT_FOOD_ALL_CONTRACTS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetAllContactListWithFilterQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import useAllContactAdvanceFilter from "@pages/Food/Contracts/AllContracts/AllContractList/helpers/utils/useAllContactAdvanceFilter";
import {
  GetMyContractsListWithFilterRequestType,
  UseContactListAdvanceFilterFormType,
} from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";

import {
  AllContractsListItem,
  GetAllContractsListResponse,
  ViewClickType,
} from "./@types/@allContractList";
import AllContractListTableModel from "./helpers/models/AllContractListTableModel/AllContractListTableModel";

import "./_foodReportAllContractList.scss";

const FILTER_DEPENDENCIES = [
  "statusId",
  "contractTitle",
  "contractUUID",
  "selfId",
  "vendorId",
  "branchCodeId",
];

const AllContractList = () => {
  const [dataSource, setDataSource] = useState<AllContractsListItem[]>([]);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const { params, setSearchParams } = useQueryParams();
  const [form] = Form.useForm<UseContactListAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useAllContactAdvanceFilter(form);

  const navigate = useNavigate();
  useTitle({ text: "قراردادها" });
  //? ================================  Api Calls ================================
  const [getAllContractsList, { isFetching: isAllContractsListLoading }] =
    useLazyGetAllContactListWithFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    params?.page,
    params?.pageSize,
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
  ]);

  useEffect(
    () => {
      const activeFilters = FILTER_DEPENDENCIES.filter((key) => params?.[key]).length;
      setBadgeCount(activeFilters);
    },
    FILTER_DEPENDENCIES.map((key) => params?.[key])
  );

  //* ================================ Util Functions ================================
  const onGetListDataSuccess = async (response: GetAllContractsListResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.contractDtoList);
      setTotalItems(response?.data?.totalElements);
    } else {
      return toast.error((response?.data || response?.msg) as any, {
        toastId: (response?.data || response?.msg) as any,
      });
    }
  };

  const getListData = useCallback(() => {
    const requestParams: GetMyContractsListWithFilterRequestType = {
      pageNo: params?.page ? Number(params?.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      active:
        params?.statusId === "1"
          ? "true"
          : params?.statusId === "2"
            ? "false"
            : undefined,
      contractTitle: params?.contractTitle,
      contractUUID: params?.contractUUID,
      restaurantId: params?.selfId ? +params?.selfId : undefined,
      vendorId: params?.vendorId ? +params?.vendorId : undefined,
      branchCode: params?.branchCodeId ? +params?.branchCodeId : undefined,
    };

    getAllContractsList(requestParams).unwrap().then(onGetListDataSuccess);
    // getMyContractsList({
    //   pageNo: params?.page ? Number(params?.page) - 1 : 0,
    //   pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
    // })
    //   .unwrap()
    //   .then(onGetListDataSuccess);
  }, [
    params?.page,
    params?.pageSize,
    ...FILTER_DEPENDENCIES.map((key) => params?.[key]),
  ]);

  const viewClickHandler = useCallback(
    ({ contractId, selfId, vendorId, title }: ViewClickType) => {
      navigate({
        pathname: REPORT_FOOD_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
        search: makeSearchParams({ contractId, selfId, vendorId, title }),
      });
    },
    []
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="all-contracts-list-page-container">
        <div className="btn-wrapper">
          <CustomBadge count={badgeCount}>
            <CustomButton
              type="primary"
              icon={<AiOutlineFilter />}
              onClick={() => {
                setAdvanceModalOpen(true);
                fetchInitialData();
              }}
            >
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        </div>
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={isAllContractsListLoading}
          columns={AllContractListTableModel({
            viewClickHandler,
          })}
          pagination={manualPaginationConfig({
            total: totalItems,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...params,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: params?.page ? Number(params?.page) : 1,
            defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          })}
          {...TABLE_PROPS(dataSource?.length)}
          className="all-contracts-list-table"
          key={`table-${params?.pageSize || "8"}`}
        />
        <CustomTotalTableItems totalCount={totalItems ?? 0} label="تعداد کل قراردادها" />
      </div>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          // badgeCounter={(amount) => setBadgeCount(amount)}
          defaultParams={params}
        />
      )}
    </>
  );
};

export default AllContractList;
