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
  useLazyGetPersonalWalletsListByAdvanceFilterQuery,
  useLazyGetPersonalWalletsListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";
import { hasActiveKey } from "@pages/management/_shared/hasActiveKey";

import {
  GetPersonalWalletsListResponse,
  PersonalWalletsRecordDataType,
  WalletsListUsersByAdvanceFilterRequest,
} from "./@types/@allWalletsListUsersTab";
import useAllUsersAdvanceFilter from "./helper/modals/advanceFilter/AllWalletsListUsersAdvanceFilter";
import AllWalletsListUsersTableListModel from "./helper/models/AllWalletsListUsers/AllWalletsListUsersTableListModel";

const advanceFilterItems = [
  "firstName",
  "lastName",
  "username",
  "serviceNameId",
  "branchId",
];

const AllWalletsListUsersTab = () => {
  const [dataSource, setDataSource] = useState<
    GetPersonalWalletsListResponse | undefined
  >(undefined);

  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm();

  const { filterItemsList, advanceFilterGetInitialDataHandler } =
    useAllUsersAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isGetListDataLoading }] =
    useLazyGetPersonalWalletsListQuery();

  const [advanceFilter, { isLoading: isAdvanceFilterLoading }] =
    useLazyGetPersonalWalletsListByAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.tab === "1") {
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
        const filters: WalletsListUsersByAdvanceFilterRequest = {
          ...(url?.firstName && { firstName: url?.firstName }),
          ...(url?.lastName && { lastName: url?.lastName }),
          ...(url?.username && { username: url?.username }),
          ...(url?.serviceNameId && { samimServices: tempServiceId }),
          ...(url?.branchId && { branchId: url?.branchId }),
        };
        advanceFilter({
          pageNumber: url?.page ? Number(url?.page) - 1 : 0,
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

  useEffect(() => {
    if (isAdvanceModalOpen) {
      advanceFilterGetInitialDataHandler();
    }
  }, [isAdvanceModalOpen]);

  // ================================ Utils function ================================
  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
          form={form}
        />
      )}
      <div className="all-wallets-list-users-tab-container">
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
        <CustomTable<PersonalWalletsRecordDataType>
          dataSource={dataSource?.content}
          rowKey="uuid"
          columns={AllWalletsListUsersTableListModel()}
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
          draggableId={ExcelCodes.WALLET_ALL_WALLETS_LIST_USERS_TAB_TABLE}
        />
      </div>
    </>
  );
};

export default AllWalletsListUsersTab;
