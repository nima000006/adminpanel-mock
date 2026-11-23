import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiFilePdf, PiFileXls } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
import { CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import {
  useDeleteContractTemplateMutation,
  useLazyGetContractTemplateListQuery,
} from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { CONTRACT_STATUS_ITEMS } from "@pages/Contract/_shared/contractUtils";

import {
  ContractTemplateFilters,
  ContractTemplateListAdvanceFilterFormTYpe,
  ContractTemplateListItem,
  GetContractTemplateListResponse,
} from "./@types/ContractsTemplateListTypes";
import useContractsTemplateListAdvanceFilter from "./helper/modal/advanceFilter/ContractsTemplateListAdvanceFilter";
import ContractsTemplateListTableModel from "./helper/model/ContractsTemplateListTableModel";

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
  "ecosystemIdsId",
  "statusesId",
  "servicesId",
  "categoryIdsId",
  "partiesId",
];

const DELETE_CONTRACT_TEMPLATE_SUCCESS_MSG = "پیش نویس با موفقیت حذف شد.";

const ContractsTemplateList = () => {
  const [dataSource, setDataSource] = useState<ContractTemplateListItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: -1 });

  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت قرارداد ها",
      },
      {
        title: "لیست قالب ها",
      },
    ],
  });

  const [advancedFilterForm] = Form.useForm<ContractTemplateListAdvanceFilterFormTYpe>();

  const { filterItemsList } = useContractsTemplateListAdvanceFilter({
    form: advancedFilterForm,
    isModalOpen: isAdvanceModalOpen,
  });

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: "لیست قالب ها",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getContractTemplateAdvanceFilterList,
    { isFetching: isGetContractTemplateAdvanceFilterListLoading },
  ] = useLazyGetContractTemplateListQuery();

  const [deleteTemplate, { isLoading: isDeleteTemplateLoading }] =
    useDeleteContractTemplateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getContractTemplateListHandler();
  }, [url?.page, url?.pageSize, ...advanceFilterItems.map((key) => url?.[key])]);

  //* ================================ Util Functions ================================
  const getContractTemplateListHandler = () => {
    const filters: ContractTemplateFilters = {
      ...(url?.ecosystemIdsId && { ecosystemIds: +url?.ecosystemIdsId }),
      ...(url?.statusesName
        ? { statuses: url?.statusesName }
        : {
            statuses: `${CONTRACT_STATUS_ITEMS.active},${CONTRACT_STATUS_ITEMS.inprogress}`,
          }),
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.categoryIdsId && { categoryIds: url?.categoryIdsId }),
      ...(url?.partiesId && { parties: url?.partiesId }),
    };

    getContractTemplateAdvanceFilterList({
      page: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      ...filters,
    })
      .unwrap()
      .then(getContractTemplateAdvanceFilterListSuccess);
  };

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

  // template archive
  const templateArchiveHandler = () => {
    navigate(CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE);
  };

  // inprogress template delete modal
  const openDeleteInprogressTemplateHandler = (id: number) => {
    setDeleteModal({ isOpen: true, id });
  };
  const closeDeleteInprogressTemplateHandler = () => {
    setDeleteModal({ isOpen: false, id: -1 });
  };
  const deleteTemplateHandler = () => {
    if (deleteModal?.id > 0) {
      deleteTemplate({
        templateId: deleteModal.id,
      })
        .unwrap()
        .then(() => {
          closeDeleteInprogressTemplateHandler();
          toast.success(DELETE_CONTRACT_TEMPLATE_SUCCESS_MSG, {
            toastId: DELETE_CONTRACT_TEMPLATE_SUCCESS_MSG,
          });
          getContractTemplateListHandler();
        });
    }
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
          defaultParams={url}
          form={advancedFilterForm}
        />
      )}
      {deleteModal.isOpen && (
        <ConfirmationModalWithContent
          title="حذف قالب پیش نویس"
          isModalOpen={deleteModal.isOpen}
          confirmBtnText="تایید و حذف"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeleteInprogressTemplateHandler}
          onConfirmClickHandler={deleteTemplateHandler}
          content={<p className="body-regular">آیا از حذف این قالب اطمینان دارید ؟</p>}
          width={600}
          isConfirmButtonLoading={isDeleteTemplateLoading}
        />
      )}
      <div>
        <CustomDivider
          text="لیست قالب قرارداد‌ها"
          extraContent={
            <CustomButton
              type="default"
              icon={<PiArrowLeft size={16} />}
              onClick={templateArchiveHandler}
              iconPlacement="end"
              className="flex"
            >
              آرشیو قالب ها
            </CustomButton>
          }
        />

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
            columns={ContractsTemplateListTableModel({
              deleteInprogressTemplateHandler: openDeleteInprogressTemplateHandler,
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

export default ContractsTemplateList;
