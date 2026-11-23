import { useCallback, useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  AllContractsListItem,
  GetAllContractsListResponse,
  ViewClickType,
} from "./@types/@allContractList";
import AllContractListDrawerContent from "./helpers/components/DrawerContent/AllContractListDrawerContent";
import AllContractListTableModel from "./helpers/models/AllContractListTableModel/AllContractListTableModel";
import useAllContactAdvanceFilter from "./helpers/utils/useAllContactAdvanceFilter";
import CustomButton from "../../../../../components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "../../../../../components/Renderers/CustomDrawer/CustomDrawer";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "../../../../../infrastructure/helpers/utils";
import { FOOD_ALL_DETAIL_CONTRACTS_ROUTE } from "../../../../../infrastructure/router/routes/food";
import {
  useCopyContractMutation,
  useLazyGetAllContactListWithFilterQuery,
} from "../../../../../infrastructure/states/redux/Apis/food/contract/contractApi";
import {
  GetMyContractsListWithFilterRequestType,
  UseContactListAdvanceFilterFormType,
} from "../../MyContracts/MyContractsList/@types/@myContractsList";
import "./_allContractList.scss";

const FILTER_DEPENDENCIES = [
  "statusId",
  "contractTitle",
  "contractUUID",
  "selfId",
  "vendorId",
  "branchCodeId",
];

const AllContractList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dataSource, setDataSource] = useState<AllContractsListItem[]>([]);
  const [copyingRowId, setCopyingRowId] = useState<number | null>(null);
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

  const [copyContract] = useCopyContractMutation();

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

  const openDrawerHandler = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawerHandler = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const viewClickHandler = useCallback(
    ({ contractId, selfId, vendorId, title }: ViewClickType) => {
      navigate({
        pathname: FOOD_ALL_DETAIL_CONTRACTS_ROUTE,
        search: makeSearchParams({ contractId, selfId, vendorId, title }),
      });
    },
    []
  );

  // Memoized functions
  const memoizedAllContractListDrawerContent = useMemo(
    () => (
      <AllContractListDrawerContent
        closeDrawerHandler={closeDrawerHandler}
        getListData={getListData}
      />
    ),
    []
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen}
          className="all-contracts-list-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={memoizedAllContractListDrawerContent}
        />
      )}
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
          <CustomButton type="primary" className="btn-text" onClick={openDrawerHandler}>
            تعریف قرارداد جدید
          </CustomButton>
        </div>
        <CustomTable<AllContractsListItem>
          dataSource={dataSource}
          rowKey="id"
          loading={isAllContractsListLoading}
          columns={AllContractListTableModel({
            viewClickHandler,
            copyContract,
            getListData,
            copyingRowId,
            setCopyingRowId,
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
        <CustomTotalTableItems totalCount={totalItems} label="تعداد کل قراردادها" />
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
