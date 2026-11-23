import { useEffect, useState } from "react";

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
import { CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { useLazyGetContractTemplateListQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import { ContractsTemplateArchiveListAdvanceFilterFormType } from "./@types/@templatesArchiveList";
import useContractsTemplateArchiveListAdvanceFilter from "./helper/modal/advanceFilter/useContractsTemplateArchiveListAdvanceFilter";
import ContractsTemplateArchiveListTableModel from "./helper/model/ContractsTemplateArchiveListTableModel";
import {
  ContractTemplateFilters,
  ContractTemplateListItem,
  GetContractTemplateListResponse,
} from "../../ContractsTemplateList/@types/ContractsTemplateListTypes";

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

const advanceFilterItems = ["ecosystemIdsId", "servicesId", "categoryIdsId", "partiesId"];

const TemplatesArchiveList = () => {
  const [dataSource, setDataSource] = useState<ContractTemplateListItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const { params: url, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<ContractsTemplateArchiveListAdvanceFilterFormType>();

  const { filterItemsList } = useContractsTemplateArchiveListAdvanceFilter({
    form: form,
    isModalOpen: isAdvanceModalOpen,
  });

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت قرارداد ها",
      },
      {
        title: <Link to={CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE}>لیست قالب ها</Link>,
      },
      {
        title: "آرشیو قالب ها",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getContractTemplateAdvanceFilterList,
    { isFetching: isGetContractTemplateAdvanceFilterListLoading },
  ] = useLazyGetContractTemplateListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const filters: ContractTemplateFilters = {
      ...(url?.ecosystemIdsId && { ecosystemIds: +url?.ecosystemIdsId }),
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.categoryIdsId && { categoryIds: url?.categoryIdsId }),
      ...(url?.partiesId && { parties: url?.partiesId }),
    };

    getContractTemplateAdvanceFilterList({
      page: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      statuses: CONTRACT_STATUS_ITEMS.deactivated,
      ...filters,
    })
      .unwrap()
      .then(getContractTemplateAdvanceFilterListSuccess);
  }, [url?.page, url?.pageSize, ...advanceFilterItems.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const getContractTemplateAdvanceFilterListSuccess = (
    value: GetContractTemplateListResponse
  ) => {
    setDataSource(value?.content);
    setTotalPages(value?.totalElements);
  };

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
          defaultParams={{ ...url }}
          form={form}
        />
      )}
      <div>
        <CustomDivider text="لیست آرشیو قالب قرارداد‌ها" />

        <div className="flex flex-col gap-4">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="default"
                  icon={<AiOutlineFilter />}
                  className="advance-filter-btn"
                  onClick={openAdvanceFilter}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <Dropdown menu={exportMenu} trigger={["click"]} disabled={true}>
                <CustomButton>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            }
          />

          <CustomTable<ContractTemplateListItem>
            dataSource={dataSource ?? []}
            columns={ContractsTemplateArchiveListTableModel()}
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
            rowKey="id"
            loading={isGetContractTemplateAdvanceFilterListLoading}
            className="self-contract-table-model-container"
            {...TABLE_PROPS(dataSource?.length ?? 0)}
          />
        </div>
      </div>
    </>
  );
};
export default TemplatesArchiveList;
