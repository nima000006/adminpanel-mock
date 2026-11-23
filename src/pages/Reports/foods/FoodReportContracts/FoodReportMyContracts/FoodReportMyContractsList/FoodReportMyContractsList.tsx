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
import { REPORT_FOOD_MY_CONTRACTS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetMyContactListWithFilterQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import {
  GetMyContractsListWithFilterRequestType,
  UseContactListAdvanceFilterFormType,
} from "@pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import useContactAdvanceFilter from "@pages/Food/Contracts/MyContracts/MyContractsList/helpers/utils/useContactAdvanceFilter";

import {
  GetMyContractsListResponse,
  MyContractsListItem,
  ViewClickType,
} from "./@types/@myContractsList";
import MyContractListTableModel from "./helpers/models/MyContractListTableModel/MyContractListTableModel";

import "./_FoodReportMyContractsList.scss";

const FILTER_DEPENDENCIES = [
  "statusId",
  "contractTitle",
  "contractUUID",
  "selfId",
  "vendorId",
];

const MyContractsList = () => {
  const [dataSource, setDataSource] = useState<MyContractsListItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const { params: url, setSearchParams } = useQueryParams();
  const [form] = Form.useForm<UseContactListAdvanceFilterFormType>();

  const { filterItemsList, fetchInitialData } = useContactAdvanceFilter(form);
  const navigate = useNavigate();
  useTitle({ text: "قراردادها" });

  //? ================================  Api Calls ================================
  const [getContactFilterList, { isFetching }] = useLazyGetMyContactListWithFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [url?.page, url?.pageSize, ...FILTER_DEPENDENCIES.map((key) => url?.[key])]);

  useEffect(
    () => {
      const activeFilters = FILTER_DEPENDENCIES.filter((key) => url?.[key]).length;
      setBadgeCount(activeFilters);
    },
    FILTER_DEPENDENCIES.map((key) => url?.[key])
  );

  //* ================================ Util Functions ================================
  const onGetListDataSuccess = async (response: GetMyContractsListResponse) => {
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
      pageNo: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      active:
        url?.statusId === "1" ? "true" : url?.statusId === "2" ? "false" : undefined,
      contractTitle: url?.contractTitle,
      contractUUID: url?.contractUUID,
      restaurantId: url?.selfId ? +url?.selfId : undefined,
      vendorId: url?.vendorId ? +url?.vendorId : undefined,
    };

    getContactFilterList(requestParams).unwrap().then(onGetListDataSuccess);
    // getMyContractsList({
    //   pageNo: url?.page ? Number(url?.page) - 1 : 0,
    //   pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
    // })
    //   .unwrap()
    //   .then(onGetListDataSuccess);
  }, [url?.page, url?.pageSize, ...FILTER_DEPENDENCIES.map((key) => url?.[key])]);

  // Opening details
  const viewClickHandler = useCallback(
    ({ contractId, selfId, vendorId, title }: ViewClickType) => {
      navigate({
        pathname: REPORT_FOOD_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
        search: makeSearchParams({ contractId, selfId, vendorId, title }),
      });
    },
    []
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="my-contracts-list-page-container">
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
          loading={isFetching}
          columns={MyContractListTableModel({
            viewClickHandler,
          })}
          pagination={manualPaginationConfig({
            total: totalItems,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          {...TABLE_PROPS(dataSource?.length)}
          className="my-contracts-list-table"
          key={`table-${url?.pageSize || "8"}`}
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
          defaultParams={url}
        />
      )}
    </>
  );
};

export default MyContractsList;
