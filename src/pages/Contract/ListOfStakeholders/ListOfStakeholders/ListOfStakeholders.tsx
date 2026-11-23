import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetStackHoldersListQuery } from "@infra/states/redux/Apis/contracts/listOfStakeholders/listOfStakeholders";

import { StakeholdersListAdvanceFilterFormTYpe } from "./@types/@listOfStakeholders";
import {
  ContractStackHoldersListItem,
  GetStackHoldersListResponse,
  StakeholderFilters,
} from "./helper/@types/@listOfStakeholdersTypes";
import ContractStakeholdersDetailDrawerContent from "./helper/drawers/ContractStakeholdersDetail/ContractStakeholdersDetailDrawerContent";
import useListOfStakeholdersAdvanceFilter from "./helper/modals/AdvanceFilter/useListOfStakeholdersAdvanceFilter";
import ListOfStakeholdersTableModel from "./helper/models/ListOfStakeholders/ListOfStakeholdersTableModel";

const advanceFilterItems = [
  "ecosystemIdsId",
  "statusId",
  "ruleTypesId",
  "branchTypesId",
  "servicesId",
  "dateDateStart",
  "dateDateEnd",
  "categoryIdsId",
];

const ListOfStakeholders = () => {
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [openDetailDrawer, setOpenDetailDrawer] = useState({
    isOpen: false,
    id: -1,
  });

  const [dataSource, setDataSource] = useState<ContractStackHoldersListItem[]>([]);

  const [totalPages, setTotalPages] = useState(0);

  const [advancedFilterForm] = Form.useForm<StakeholdersListAdvanceFilterFormTYpe>();

  const { filterItemsList } = useListOfStakeholdersAdvanceFilter({
    form: advancedFilterForm,
    isModalOpen: advanceModalOpen,
  });

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: "ذینفعان",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getStakeholdersAdvanceFilterList,
    { isFetching: isGetStakeholdersAdvanceFilterListLoading },
  ] = useLazyGetStackHoldersListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const filters: StakeholderFilters = {
      ...(url?.ecosystemIdsId && { ecosystemIds: url?.ecosystemIdsId }),
      ...(url?.statusName && { status: url?.statusName }),
      ...(url?.ruleTypesName && { ruleTypes: url?.ruleTypesName }),
      ...(url?.branchTypesName && { branchTypes: url?.branchTypesName }),
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.dateDateStart && { from: url?.dateDateStart }),
      ...(url?.dateDateEnd && { to: url?.dateDateEnd }),
      ...(url?.categoryIdsId && { categoryIds: url?.categoryIdsId }),
    };

    getStakeholdersAdvanceFilterList({
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      ...filters,
    })
      .unwrap()
      .then(getStakeholdersAdvanceFilterListSuccess);
  }, [url?.page, url?.pageSize, ...advanceFilterItems.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const getStakeholdersAdvanceFilterListSuccess = (
    value: GetStackHoldersListResponse
  ) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };
  const openAdvanceFilter = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilter = () => {
    setAdvanceModalOpen(false);
  };

  const openDetailDrawerHandler = (id: number) => {
    setOpenDetailDrawer({ isOpen: true, id });
  };
  const closeDetailDrawerHandler = () => {
    setOpenDetailDrawer({ isOpen: false, id: -1 });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <CustomDivider text={`لیست ذینفعان (${dataSource?.length})`} />
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton onClick={openAdvanceFilter} icon={<AiOutlineFilter />}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end" disabled>
              خروجی
            </CustomButton>
          }
        />
        <CustomTable<ContractStackHoldersListItem>
          rowKey="id"
          dataSource={dataSource ?? []}
          columns={ListOfStakeholdersTableModel({
            openDetailDrawerHandler,
          })}
          pagination={manualPaginationConfig({
            total: totalPages,
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
          {...TABLE_PROPS(dataSource?.length ?? 0)}
          loading={isGetStakeholdersAdvanceFilterListLoading}
        />
      </div>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          form={advancedFilterForm}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}

      {openDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={openDetailDrawer?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ContractStakeholdersDetailDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
              id={openDetailDrawer.id}
            />
          }
        />
      )}
    </>
  );
};

export default ListOfStakeholders;
