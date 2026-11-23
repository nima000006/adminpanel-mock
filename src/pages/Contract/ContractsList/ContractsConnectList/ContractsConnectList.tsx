import { useCallback, useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiFilePdf } from "react-icons/pi";
import { PiFileXls } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
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
  CONTRACTS_CONNECT_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
  CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/contracts";
import { useLazyGetContractsListQuery } from "@infra/states/redux/Apis/contracts/contractsList/contractsList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import useContractsConnectListFilter from "./helpers/hooks/useContractsConnectListFilter";
import ContractsConnectListModelTable from "./helpers/models/ContractsConnectListModelTable";
import ContractsReminderModalForm from "../_shared/components/ContractsModalForm/ContractsReminderModalForm";
import {
  ContractListFilterItemsType,
  GetContractsListContent,
  GetContractsListResponse,
} from "../ContractsList/@types/@contractListTypes";
import "./_contractsConnectList.scss";

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

const ContractsConnectList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500">قرارداد ها</span>,
      },
      {
        title: <span className="text-neutral-500">لیست قرارداد ها</span>,
      },
      {
        title: "قرارداد های متصل",
      },
    ],
  });

  const [dataSource, setDataSource] = useState<GetContractsListContent[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const { params, setSearchParams } = useQueryParams();
  const navigate = useNavigate();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [openReminderModal, setOpenReminderModal] = useState({ id: -1, isOpen: false });

  const [filterForm] = Form.useForm();
  const [reminderForm] = Form.useForm();

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
        statuses: CONTRACT_STATUS_ITEMS.active,
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

  const contractArchiveHandler = () => {
    navigate({
      pathname: CONTRACTS_CONNECT_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
      search: makeSearchParams({
        templateId: params?.templateId,
      }),
    });
  };

  const closeReminderModalHandler = () => {
    setOpenReminderModal({ isOpen: false, id: -1 });
    reminderForm.resetFields();
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
      {openReminderModal?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={openReminderModal?.isOpen}
          showIcon={false}
          closeModalHandler={closeReminderModalHandler}
          title="ارسال پیام یادآوری"
          customClass="reminder-modal-custom"
          content={
            <ContractsReminderModalForm
              form={reminderForm}
              closeReminderModalHandler={closeReminderModalHandler}
            />
          }
          onConfirmClickHandler={() => {}}
          confirmBtnText="ارسال پیام"
          backBtnText="انصراف"
          // isConfirmButtonLoading={false}
        />
      )}
      <CustomDivider
        text={`لیست قرارداد های متصل  (${totalElements ?? 0})`}
        extraContent={
          <CustomButton
            type="default"
            icon={<PiArrowLeft size={16} />}
            onClick={contractArchiveHandler}
            iconPlacement="end"
            className="flex"
          >
            آرشیو قرارداد ها
          </CustomButton>
        }
      />
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
        columns={ContractsConnectListModelTable()}
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

export default ContractsConnectList;
