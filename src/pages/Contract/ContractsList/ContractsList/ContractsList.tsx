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
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { useLazyGetContractsListQuery } from "@infra/states/redux/Apis/contracts/contractsList/contractsList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import {
  ContractListFilterItemsType,
  ContractsListFilterFormType,
  GetContractsListContent,
  GetContractsListResponse,
} from "./@types/@contractListTypes";
import useContractsListFilter from "./helper/hooks/useContractsListFilter";
import ContractsListModelTable from "./helper/models/ContractsListModelTable";
import ContractsReminderModalForm from "../_shared/components/ContractsModalForm/ContractsReminderModalForm";
import "./_contractsList.scss";

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

const ContractsList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: <span>لیست قرارداد ها</span>,
      },
    ],
  });

  const [dataSource, setDataSource] = useState<GetContractsListContent[]>([]);
  const [contractsListResponse, setContractsListResponse] =
    useState<GetContractsListResponse | null>(null);

  const { params, setSearchParams } = useQueryParams();
  const navigate = useNavigate();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [openReminderModal, setOpenReminderModal] = useState(false);
  const [_selectedContractId, setSelectedContractId] = useState<number | null>(null);

  const [filterForm] = Form.useForm<ContractsListFilterFormType>();
  const [reminderForm] = Form.useForm();

  const { filterItemsList } = useContractsListFilter({
    form: filterForm,
    isModalOpen: isAdvanceModalOpen,
  });

  //? ================================ Api Calls ================================
  const [getContractsList, { isFetching: isContractsListLoading }] =
    useLazyGetContractsListQuery();

  // ================================ Utils function ================================
  const getContractsListOnSuccess = useCallback((response: GetContractsListResponse) => {
    setDataSource(response?.content);
    setContractsListResponse(response);
  }, []);

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);
  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  const closeReminderModalHandler = () => {
    setOpenReminderModal(false);
    setSelectedContractId(null);
    reminderForm.resetFields();
  };

  const contractArchiveHandler = () => {
    navigate({
      pathname: CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE,
    });
  };

  //? ================================  Effects ================================
  useEffect(() => {
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
      statuses: CONTRACT_STATUS_ITEMS.active,
      ...requestParams,
    })
      .unwrap()
      .then(getContractsListOnSuccess);
  }, [params?.page, params?.pageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="contracts-list-container">
      {openReminderModal && (
        <ConfirmationModalWithContent
          isModalOpen={openReminderModal}
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
          onConfirmClickHandler={() => {
            reminderForm.submit();
          }}
          confirmBtnText="ارسال پیام"
          backBtnText="انصراف"
          isConfirmButtonDisable={false}
          isConfirmButtonLoading={false}
        />
      )}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...params }}
          form={filterForm}
        />
      )}
      <CustomDivider
        text={`لیست قرارداد ها  (${contractsListResponse?.totalElements ?? 0})`}
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
            {/* TODO: [nima] enable when api is ready */}
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
        columns={ContractsListModelTable()}
        pagination={manualPaginationConfig({
          total: contractsListResponse?.totalElements ?? 0,
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
        {...TABLE_PROPS(contractsListResponse?.totalElements ?? 0)}
      />
    </div>
  );
};

export default ContractsList;
