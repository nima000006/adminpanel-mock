import { useCallback, useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { useLazyGetContractsListQuery } from "@infra/states/redux/Apis/contracts/contractsList/contractsList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import { ContractsArchiveListFilterFormType } from "./@types/@contractsArchive";
import useContractsArchiveListFilter from "./helper/modals/AdvanceModal/useContractsArchiveListFilter";
import ContractsArchiveListModelTable from "./helper/models/ContractsArchiveList/ContractsArchiveListModelTable";
import {
  ContractListFilterItemsType,
  GetContractsListContent,
  GetContractsListResponse,
} from "../../ContractsList/@types/@contractListTypes";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
  ],
};

const advanceFilterItems = [
  "ecosystemIdsId",
  "partiesId",
  "servicesName",
  "categoryIdsId",
  "ruleBeneficiariesUsernamesId",
  "dateDateStart",
  "dateDateEnd",
];

const ContractsArchive = () => {
  const [dataSource, setDataSource] = useState<GetContractsListContent[]>([]);
  const [totalElement, setTotalElement] = useState<number>(0);

  const { params, setSearchParams } = useQueryParams();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: (
          <Link to={CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE} className="text-neutral-500!">
            لیست قرارداد ها
          </Link>
        ),
      },
      {
        title: <span>آرشیو قراردادها</span>,
      },
    ],
  });

  const [filterForm] = Form.useForm<ContractsArchiveListFilterFormType>();

  const { filterItemsList } = useContractsArchiveListFilter({
    form: filterForm,
    isModalOpen: isAdvanceModalOpen,
  });

  //? ================================ Api Calls ================================
  const [getContractsList, { isFetching: isContractsListLoading }] =
    useLazyGetContractsListQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    const requestParams: ContractListFilterItemsType = {
      ...(params?.ecosystemIdsId && { ecosystemIds: params?.ecosystemIdsId }),
      ...(params?.partiesId && { parties: params?.partiesId }),
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.categoryIdsId && { categoryIds: params?.categoryIdsId }),
      ...(params?.ruleBeneficiariesUsernamesId && {
        ruleBeneficiariesBranchIds: params?.ruleBeneficiariesUsernamesId,
      }),
      ...(params?.fromDate && { from: params?.fromDate }),
      ...(params?.toDate && { to: params?.toDate }),
    };

    getContractsList({
      page: params?.page ? Number(params.page) : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      statuses: CONTRACT_STATUS_ITEMS.deactivated,
      ...requestParams,
    })
      .unwrap()
      .then(getContractsListOnSuccess);
  }, [params?.page, params?.pageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getContractsListOnSuccess = useCallback((response: GetContractsListResponse) => {
    setDataSource(response?.content);
    setTotalElement(response?.totalElements);
  }, []);

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
          defaultParams={params}
          form={filterForm}
        />
      )}

      <CustomDivider text={`لیست قرارداد ها  (${totalElement ?? 0})`} />

      <ToolBox
        className="mb-4!"
        rightSide={
          <CustomBadge count={badgeCount}>
            <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
              فیلتر پیشرفته
            </CustomButton>
          </CustomBadge>
        }
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton disabled>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      <CustomTable<GetContractsListContent>
        rowKey="id"
        dataSource={dataSource}
        loading={isContractsListLoading}
        columns={ContractsArchiveListModelTable()}
        pagination={manualPaginationConfig({
          total: totalElement ?? 0,
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
        key={`table-${params?.pageSize || "8"}`}
        {...TABLE_PROPS(totalElement ?? 0)}
      />
    </>
  );
};

export default ContractsArchive;
