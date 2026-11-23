import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBusinessAndBranchesWalletsListByAdvanceFilterQuery,
  useLazyGetBusinessAndBranchesWalletsListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import {
  BusinessAndBranchesWalletsRecordDataType,
  GetBusinessAndBranchesWalletsListResponse,
  UseAllWalletsListBusinessAndBranchesAdvanceFilterFormType,
  WalletsListBusinessAndBranchesByAdvanceFilterRequest,
} from "./@types/@allWalletsListBusinessAndBranchesTab";
import useAllWalletsListBusinessAndBranchesAdvanceFilter from "./helper/modals/advanceFilter/AllWalletsListBusinessAndBranchesAdvanceFilter";
import AllWalletsListBusinessAndBranchesTableListModel from "./helper/models/AllWalletsListBusinessAndBranches/AllWalletsListBusinessAndBranchesTableListModel";

const advanceFilterItems = ["businessIdId", "branchId", "serviceNameId"];

const AllWalletsListBusinessAndBranchesTab = () => {
  const [dataSource, setDataSource] = useState<
    GetBusinessAndBranchesWalletsListResponse | undefined
  >(undefined);

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] =
    Form.useForm<UseAllWalletsListBusinessAndBranchesAdvanceFilterFormType>();

  const { filterItemsList } = useAllWalletsListBusinessAndBranchesAdvanceFilter(form);

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isGetListDataLoading }] =
    useLazyGetBusinessAndBranchesWalletsListQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useLazyGetBusinessAndBranchesWalletsListByAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.tab === "2") {
      if (hasActiveKey(url, advanceFilterItems)) {
        let tempServiceId = "";
        if (url?.serviceNameId) {
          const serviceIdArr = url.serviceNameId.split(",");
          serviceIdArr.forEach((item, index) => {
            if (index === 0) {
              tempServiceId =
                tempServiceId + `samimServices=${serviceOptions[+item - 1]?.value}`;
            } else {
              tempServiceId =
                tempServiceId + `&samimServices=${serviceOptions[+item - 1]?.value}`;
            }
          });
        }
        const filters: WalletsListBusinessAndBranchesByAdvanceFilterRequest = {
          ...(url?.businessIdId && { businessId: url?.businessIdId }),
          ...(url?.branchId && { branchId: url?.branchId }),
          ...(url?.serviceNameId && { samimServices: tempServiceId }),
        };

        advanceFilter({
          pageNo: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          ...filters,
        })
          .unwrap()
          .then((value) => setDataSource(value));
      } else {
        getList({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
          pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })
          .unwrap()
          .then((value) => {
            if (value) {
              setDataSource(value);
            }
          });
      }
    }
  }, [
    url?.page,
    url?.pageSize,
    url?.tab,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}
      <div className="all-wallets-list-business-and-branches-tab-container">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={<CustomButton disabled={true}>خروجی اکسل</CustomButton>}
        />
        <CustomTable<BusinessAndBranchesWalletsRecordDataType>
          dataSource={dataSource?.content}
          rowKey="uuid"
          columns={AllWalletsListBusinessAndBranchesTableListModel()}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements,
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
          key={`table-${url?.pageSize || "8"} `}
          loading={isGetListDataLoading || isAdvanceFilterLoading}
          {...TABLE_PROPS(dataSource?.content?.length || 0)}
          draggableColumns
          draggableId={ExcelCodes.WALLET_ALL_WALLETS_LIST_BUSINESS_AND_BRANCHES_TAB_TABLE}
        />
      </div>
    </>
  );
};

export default AllWalletsListBusinessAndBranchesTab;
