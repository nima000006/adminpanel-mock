import { useCallback, useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf } from "react-icons/pi";
import { PiFileXls } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/contracts";
import { useLazyGetContractsListQuery } from "@infra/states/redux/Apis/contracts/contractsList/contractsList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import ContractsArchiveListModelTable from "../ContractsArchive/ContractsArchiveList/helper/models/ContractsArchiveList/ContractsArchiveListModelTable";
import useContractsConnectListFilter from "../ContractsConnectList/helpers/hooks/useContractsConnectListFilter";
import {
  ContractListFilterItemsType,
  GetContractsListContent,
  GetContractsListResponse,
} from "../ContractsList/@types/@contractListTypes";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const advanceFilterItems = [
  "ruleBeneficiariesUsernamesId",
  "categoryIdsId",
  "dateDateStart",
  "dateDateEnd",
];

const ContractsConnectArchiveList = () => {
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500">قرارداد ها</span>,
      },
      {
        title: (
          <Link to={CONTRACTS_CONTRACTS_LIST_PAGE_ROUTE} className="text-neutral-500">
            لیست قرارداد ها
          </Link>
        ),
      },
      {
        title: (
          <Link
            to={{
              pathname: CONTRACTS_CONNECT_CONTRACTS_LIST_PAGE_ROUTE,
              search: makeSearchParams({
                templateId: params?.templateId,
              }),
            }}
            className="text-neutral-500"
          >
            قرارداد های متصل
          </Link>
        ),
      },
      {
        title: " آرشیو قرارداد های متصل",
      },
    ],
  });

  const [dataSource, setDataSource] = useState<GetContractsListContent[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const navigate = useNavigate();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [filterForm] = Form.useForm();

  const { filterItemsList } = useContractsConnectListFilter();

  //? ================================ Api Calls ================================
  const [getContractsList, { isFetching: isContractsListLoading }] =
    useLazyGetContractsListQuery();

  //? ================================  Effects ================================
  useEffect(() => {
    if (params?.templateId) {
      const requestParams: ContractListFilterItemsType = {
        ...(params?.ecosystemIdsId && { ecosystemIds: params?.ecosystemIdsId }),
        ...(params?.servicesName && { services: params?.servicesName }),
        ...(params?.categoryIdsId && { categoryIds: params?.categoryIdsId }),
        ...(params?.partiesId && { parties: params?.partiesId }),
        ...(params?.ruleBeneficiariesUsernamesId && {
          ruleBeneficiariesBranchIds: params?.ruleBeneficiariesUsernamesId,
        }),
        ...(params?.fromDate && { from: params?.fromDate }),
        ...(params?.toDate && { to: params?.toDate }),
      };

      getContractsList({
        page: params?.page ? Number(params.page) : 0,
        pageSize: params?.pageSize ? Number(params.pageSize) : 8,
        templateIds: params?.templateId,
        statuses: CONTRACT_STATUS_ITEMS.deactivated,
        ...requestParams,
      })
        .unwrap()
        .then(getContractsListOnSuccess);
    }
  }, [params?.page, params?.pageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  // ================================ Utils function ================================
  const getContractsListOnSuccess = useCallback((response: GetContractsListResponse) => {
    setDataSource(response?.content);
    setTotalElements(response?.totalElements);
  }, []);

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

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
      <CustomDivider text={`لیست آرشیو قرارداد‌های متصل (${totalElements ?? 0})`} />
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
            <CustomButton>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />
      <div className="body-regular flex items-center justify-center rounded-t-md bg-neutral-100 py-2!">
        <p className="text-sm">لیست قراردادهای ساخته شده از قالب قرارداد </p>
        <CustomButton
          type="link"
          onClick={() =>
            navigate({
              pathname: CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: params?.templateId,
              }),
            })
          }
        >
          {params?.templateId}
        </CustomButton>
      </div>
      <CustomTable<GetContractsListContent>
        rowKey="id"
        dataSource={dataSource}
        loading={isContractsListLoading}
        columns={ContractsArchiveListModelTable()}
        pagination={manualPaginationConfig({
          total: totalElements ?? 0,
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
        {...TABLE_PROPS(totalElements ?? 0)}
        className="contract-connect-list-table-container"
      />
    </>
  );
};

export default ContractsConnectArchiveList;
