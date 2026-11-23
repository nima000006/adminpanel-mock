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
  downloadCateringMyContractListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_MY_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useUpdateMyContractStatusMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailMySelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
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
  MyContractsListContractsAdvanceFilterFormType,
  MyContractsListContractsRecordType,
  MyContractsListContractsResponse,
  UpdateMyContractStatusRequest,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/@types/@myContractsListContracts";
import { MyContractsListContractsDeactivateModalFormType } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/components/MyContractsListContractsDeactivateModal/@types/@myContractsListContractsDeactivateModal";
import MyContractsListContractsDeactivateModal from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/components/MyContractsListContractsDeactivateModal/MyContractsListContractsDeactivateModal";
import MyContractsListContractsCopyDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCopyDrawer/MyContractsListContractsCopyDrawer";
import MyContractsListContractsCreateDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/MyContractsListContractsCreateDrawer";
import MyContractsListContractsRenewDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsRenewDrawer/MyContractsListContractsRenewDrawer";
import useMyContractsListContractsAdvanceFilter from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/modals/advanceFilterModals/myContractsListContractsAdvanceFilter";
import MyContractsListContractsTableModel from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/models/MyContractsListContracts/MyContractsListContractsTableModel";
import { GetDetailMySelfsContractsRequest } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

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

const MyContractsListContracts = () => {
  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [renewDrawerState, setRenewDrawerState] = useState<{
    isOpen: boolean;
    record: MyContractsListContractsRecordType | null;
  }>({ isOpen: false, record: null });
  const [copyDrawerState, setCopyDrawerState] = useState<{
    isOpen: boolean;
    record: MyContractsListContractsRecordType | null;
  }>({ isOpen: false, record: null });
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<MyContractsListContractsRecordType | null>(null);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [dataSource, setDataSource] = useState<MyContractsListContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<MyContractsListContractsAdvanceFilterFormType>();
  const { filterItemsList } = useMyContractsListContractsAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getDetailMySelfsContracts, { isLoading: isGetDetailMySelfsContractsLoading }] =
    useGetDetailMySelfsContractsMutation();
  const [updateMyContractStatus, { isLoading: isUpdateMyContractStatusLoading }] =
    useUpdateMyContractStatusMutation();

  //* ================================ Util Functions ================================
  const fetchMyContractsList = () => {
    const { from: startDate, to: endDate } = formatDateRangeHoursForApi({
      from: url?.startedDateTitle,
      to: url?.endDateTitle,
      isPost: true,
      isUTC: false,
    });

    const request: GetDetailMySelfsContractsRequest = {
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

    getDetailMySelfsContracts(request)
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const onViewHandler = (record: MyContractsListContractsRecordType) => {
    navigate({
      pathname: CATERING_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: record.id.toString() }),
    });
  };

  const onRenewHandler = (record: MyContractsListContractsRecordType) => {
    setRenewDrawerState({ isOpen: true, record });
  };

  const onCopyHandler = (record: MyContractsListContractsRecordType) => {
    setCopyDrawerState({ isOpen: true, record });
  };

  const onDeActiveHandler = (record: MyContractsListContractsRecordType) => {
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
    fetchMyContractsList();
  };

  const onConfirmDeactivateHandler = (
    values: MyContractsListContractsDeactivateModalFormType
  ) => {
    if (!selectedRecord) return;

    const request: UpdateMyContractStatusRequest = {
      id: selectedRecord.id,
      statusType: CATERING_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
      deActiveReason: values.deActiveReason?.item?.id,
    };

    updateMyContractStatus(request).unwrap().then(onDeactivateSuccess);
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
    fetchMyContractsList();
  };

  const onRenewSuccessHandler = () => {
    fetchMyContractsList();
  };

  const onCopySuccessHandler = () => {
    fetchMyContractsList();
  };

  const onGetExcelFileBtn = () => {
    const { from: startDate, to: endDate } = formatDateRangeHoursForApi({
      from: url?.startedDateTitle,
      to: url?.endDateTitle,
      isPost: true,
      isUTC: false,
    });

    const params: GetDetailMySelfsContractsRequest["params"] = {
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
    downloadCateringMyContractListExcel({
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
    fetchMyContractsList();
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
      <MyContractsListContractsCreateDrawer
        open={isCreateDrawerOpen}
        onClose={closeCreateDrawerHandler}
        onSuccess={onCreateSuccessHandler}
      />
      <MyContractsListContractsRenewDrawer
        open={renewDrawerState.isOpen}
        record={renewDrawerState.record}
        onClose={closeRenewDrawerHandler}
        onSuccess={onRenewSuccessHandler}
      />
      <MyContractsListContractsCopyDrawer
        open={copyDrawerState.isOpen}
        record={copyDrawerState.record}
        onClose={closeCopyDrawerHandler}
        onSuccess={onCopySuccessHandler}
      />
      {isDeactivateModalOpen && (
        <MyContractsListContractsDeactivateModal
          open={isDeactivateModalOpen}
          record={selectedRecord}
          confirmLoading={isUpdateMyContractStatusLoading}
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
              <Link to={CATERING_MY_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE}>
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

        <CustomTable<MyContractsListContractsRecordType>
          dataSource={dataSource?.content ?? []}
          loading={isGetDetailMySelfsContractsLoading}
          columns={MyContractsListContractsTableModel({
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
          draggableId={ExcelCodes.CATERING_MY_CONTRACTS_LIST_TABLE}
        />
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل قراردادها:"
        />
      </div>
    </>
  );
};

export default MyContractsListContracts;
