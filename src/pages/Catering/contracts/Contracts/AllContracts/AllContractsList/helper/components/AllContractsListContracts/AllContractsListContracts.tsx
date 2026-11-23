import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import {
  downloadCateringAllContractListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useUpdateAllContractStatusMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailAllSelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { formatDateRangeHoursForApi } from "@pages/_shared/utils/formatDateRangeHoursForApi";
import {
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS } from "@pages/Catering/contracts/_shared/utils";
import {
  AllContractsListContractsAdvanceFilterFormType,
  AllContractsListContractsRecordType,
  AllContractsListContractsResponse,
  UpdateAllContractStatusRequest,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import { AllContractsListContractsDeactivateModalFormType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/components/AllContractsListContractsDeactivateModal/@types/@allContractsListContractsDeactivateModal";
import AllContractsListContractsDeactivateModal from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/components/AllContractsListContractsDeactivateModal/AllContractsListContractsDeactivateModal";
import AllContractsListContractsCopyDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCopyDrawer/AllContractsListContractsCopyDrawer";
import AllContractsListContractsCreateDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCreateDrawer/AllContractsListContractsCreateDrawer";
import AllContractsListContractsRenewDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/AllContractsListContractsRenewDrawer";
import useAllContractsListContractsAdvanceFilter from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/modals/advanceFilterModals/allContractsListContractsAdvanceFilter";
import AllContractsListContractsTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/models/AllContractsListContracts/AllContractsListContractsTableModel";
import { GetDetailAllSelfsContractsRequest } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

const DEACTIVATE_CONTRACT_SUCCESS_MSG = "قرارداد با موفقیت غیرفعال شد.";

const advanceFilterItems = [
  "branchId",
  "selfId",
  "supplierId",
  "startedDateTitle",
  "endDateTitle",
  "restaurantProvinceId",
  "restaurantCityId",
  "vendorProvinceId",
  "vendorCityId",
  "badger",
  // columns
  "title",
  "contractUUID",
  "modifiedBy",
];

const AllContractsListContracts = () => {
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [renewDrawerState, setRenewDrawerState] = useState<{
    isOpen: boolean;
    record: AllContractsListContractsRecordType | null;
  }>({ isOpen: false, record: null });
  const [copyDrawerState, setCopyDrawerState] = useState<{
    isOpen: boolean;
    record: AllContractsListContractsRecordType | null;
  }>({ isOpen: false, record: null });
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<AllContractsListContractsRecordType | null>(null);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [dataSource, setDataSource] = useState<AllContractsListContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<AllContractsListContractsAdvanceFilterFormType>();
  const { filterItemsList } = useAllContractsListContractsAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsContracts, { isLoading: isGetDetailAllSelfsContractsLoading }] =
    useGetDetailAllSelfsContractsMutation();
  const [updateAllContractStatus, { isLoading: isUpdateAllContractStatusLoading }] =
    useUpdateAllContractStatusMutation();

  //* ================================ Util Functions ================================
  const fetchAllContractsList = () => {
    const { from: startDate, to: endDate } = formatDateRangeHoursForApi({
      from: url?.startedDateTitle,
      to: url?.endDateTitle,
      isPost: true,
      isUTC: false,
    });

    const request: GetDetailAllSelfsContractsRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
        ...(url?.vendorProvinceId && {
          vendorProvinceIds: url.vendorProvinceId.split(",").map(Number),
        }),
        ...(url?.vendorCityId && {
          vendorCityIds: url.vendorCityId.split(",").map(Number),
        }),
        ...(url?.restaurantProvinceId && {
          restaurantProvinceIds: url.restaurantProvinceId.split(",").map(Number),
        }),
        ...(url?.restaurantCityId && {
          restaurantCityIds: url.restaurantCityId.split(",").map(Number),
        }),
        ...(url?.branchId && {
          branchIds: url.branchId.split(",").map(Number),
        }),
        ...(url?.selfId && {
          restaurantIds: url.selfId.split(",").map(Number),
        }),
        ...(url?.supplierId && {
          vendorIds: url.supplierId.split(",").map(Number),
        }),
        ...(url?.title && {
          title: url.title,
        }),
        ...(url?.contractUUID && {
          contractUid: url.contractUUID,
        }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting?.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting?.sortOrder?.toUpperCase();
      }
    }

    getDetailAllSelfsContracts(request)
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const onViewHandler = (record: AllContractsListContractsRecordType) => {
    navigate({
      pathname: CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: record.id.toString() }),
    });
  };

  const onRenewHandler = (record: AllContractsListContractsRecordType) => {
    setRenewDrawerState({ isOpen: true, record });
  };

  const onCopyHandler = (record: AllContractsListContractsRecordType) => {
    setCopyDrawerState({ isOpen: true, record });
  };

  const onDeActiveHandler = (record: AllContractsListContractsRecordType) => {
    setSelectedRecord(record);
    setIsDeactivateModalOpen(true);
  };

  const onCloseDeactivateModalHandler = () => {
    setIsDeactivateModalOpen(false);
    setSelectedRecord(null);
  };

  const onDeactivateSuccess = () => {
    toast.success(DEACTIVATE_CONTRACT_SUCCESS_MSG, {
      toastId: DEACTIVATE_CONTRACT_SUCCESS_MSG,
    });
    onCloseDeactivateModalHandler();
    fetchAllContractsList();
  };

  const onConfirmDeactivateHandler = (
    values: AllContractsListContractsDeactivateModalFormType
  ) => {
    if (!selectedRecord) return;

    const request: UpdateAllContractStatusRequest = {
      id: selectedRecord.id,
      statusType: CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
      deActiveReason: values.deActiveReason?.item?.id,
    };

    updateAllContractStatus(request).unwrap().then(onDeactivateSuccess);
  };

  const onCreateHandler = () => {
    setIsCreateDrawerOpen(true);
  };

  const closeCreateDrawerHandler = () => {
    setIsCreateDrawerOpen(false);
  };

  const closeRenewDrawerHandler = () => {
    setRenewDrawerState({ isOpen: false, record: null });
  };

  const closeCopyDrawerHandler = () => {
    setCopyDrawerState({ isOpen: false, record: null });
  };

  const onCreateSuccessHandler = () => {
    fetchAllContractsList();
  };

  const onRenewSuccessHandler = () => {
    fetchAllContractsList();
  };

  const onCopySuccessHandler = () => {
    fetchAllContractsList();
  };

  const onGetExcelFileBtn = () => {
    const { from: startDate, to: endDate } = formatDateRangeHoursForApi({
      from: url?.startedDateTitle,
      to: url?.endDateTitle,
      isPost: true,
      isUTC: false,
    });

    const params: GetDetailAllSelfsContractsRequest["params"] = {
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      sortBy: "createdDate",
      sortDirection: "DESC",
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        params.sortBy = sorting?.sortBy;
      }

      if (sorting?.sortOrder) {
        params.sortDirection = sorting?.sortOrder?.toUpperCase();
      }
    }

    setIsDownloadLinkLoading(true);
    downloadCateringAllContractListExcel({
      params,
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        contractStatus: CATERING_CONTRACT_ACCEPTED_CONTRACT_STATUS,
        ...(url?.vendorProvinceId && {
          vendorProvinceIds: url.vendorProvinceId.split(",").map(Number),
        }),
        ...(url?.vendorCityId && {
          vendorCityIds: url.vendorCityId.split(",").map(Number),
        }),
        ...(url?.restaurantProvinceId && {
          restaurantProvinceIds: url.restaurantProvinceId.split(",").map(Number),
        }),
        ...(url?.restaurantCityId && {
          restaurantCityIds: url.restaurantCityId.split(",").map(Number),
        }),
        ...(url?.branchId && {
          branchIds: url.branchId.split(",").map(Number),
        }),
        ...(url?.selfId && {
          restaurantIds: url.selfId.split(",").map(Number),
        }),
        ...(url?.supplierId && {
          vendorIds: url.supplierId.split(",").map(Number),
        }),
        ...(url?.title && {
          title: url.title,
        }),
        ...(url?.contractUUID && {
          contractUid: url.contractUUID,
        }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    })
      .then((downloadLink) => {
        if (downloadLink?.length) {
          toast.success(DOWNLOAD_LINK_SUCCESS, { toastId: DOWNLOAD_LINK_SUCCESS });
        } else {
          toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
        }
      })
      .catch(() => {
        toast.error(DOWNLOAD_LINK_ERROR, { toastId: DOWNLOAD_LINK_ERROR });
      })
      .finally(() => {
        setIsDownloadLinkLoading(false);
      });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllContractsList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}
      <AllContractsListContractsCreateDrawer
        open={isCreateDrawerOpen}
        onClose={closeCreateDrawerHandler}
        onSuccess={onCreateSuccessHandler}
      />
      <AllContractsListContractsRenewDrawer
        open={renewDrawerState.isOpen}
        record={renewDrawerState.record}
        onClose={closeRenewDrawerHandler}
        onSuccess={onRenewSuccessHandler}
      />
      <AllContractsListContractsCopyDrawer
        open={copyDrawerState.isOpen}
        record={copyDrawerState.record}
        onClose={closeCopyDrawerHandler}
        onSuccess={onCopySuccessHandler}
      />
      {isDeactivateModalOpen && (
        <AllContractsListContractsDeactivateModal
          open={isDeactivateModalOpen}
          record={selectedRecord}
          confirmLoading={isUpdateAllContractStatusLoading}
          onCancel={onCloseDeactivateModalHandler}
          onConfirm={onConfirmDeactivateHandler}
        />
      )}
      <div className="mt-4 flex flex-col gap-4">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <Link to={CATERING_ALL_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE}>
                <CustomButton type="default" icon={<FiArchive />}>
                  آرشیو
                </CustomButton>
              </Link>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={onCreateHandler}
              >
                ایجاد قرارداد
              </CustomButton>
              <CustomButton onClick={onGetExcelFileBtn} loading={isDownloadLinkLoading}>
                خروجی
              </CustomButton>
            </div>
          }
        />

        <CustomTable<AllContractsListContractsRecordType>
          dataSource={dataSource?.content ?? []}
          loading={isGetDetailAllSelfsContractsLoading}
          columns={AllContractsListContractsTableModel({
            onView: onViewHandler,
            onRenew: onRenewHandler,
            onCopy: onCopyHandler,
            onDeActive: onDeActiveHandler,
          })}
          rowKey="id"
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements || 0,
            onChange: (page: number, pageSize: number) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          draggableColumns
          draggableId={ExcelCodes.CATERING_ALL_CONTRACTS_LIST_TABLE}
        />
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل قراردادها:"
        />
      </div>
    </>
  );
};

export default AllContractsListContracts;
