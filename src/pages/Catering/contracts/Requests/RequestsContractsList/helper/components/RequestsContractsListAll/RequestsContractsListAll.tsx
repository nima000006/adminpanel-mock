import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { downloadCateringAllContractListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailAllSelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { formatDateRangeHoursForApi } from "@pages/_shared/utils/formatDateRangeHoursForApi";
import {
  getRequestContractRowStatusByStatus,
  getRequestContractStatusesByFilterOptionIds,
  getRequestContractStatusesByRequestTypes,
  getRequestContractTypeByStatus,
  RequestContractStatus,
  REQUEST_CONTRACT_STATUS,
  REQUEST_CONTRACT_STATUS_FILTER,
  REQUEST_CONTRACT_TYPE,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import RequestsContractsListAcceptedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAccepted/helper/components/RequestsContractsListAcceptedCreatedDrawerContent/RequestsContractsListAcceptedCreatedDrawerContent";
import RequestsContractsListAcceptedRenewedAndCopiedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAccepted/helper/components/RequestsContractsListAcceptedRenewedAndCopiedDrawerContent/RequestsContractsListAcceptedRenewedAndCopiedDrawerContent";
import RequestsContractsListRejectedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListRejected/helper/components/RequestsContractsListRejectedCreatedDrawerContent/RequestsContractsListRejectedCreatedDrawerContent";
import RequestsContractsListRejectedRenewedAndCopiedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListRejected/helper/components/RequestsContractsListRejectedRenewedAndCopiedDrawerContent/RequestsContractsListRejectedRenewedAndCopiedDrawerContent";
import { RequestsContractsListWaitedCreatedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/@types/@requestsContractsListWaitedCreatedDrawerContent";
import RequestsContractsListWaitedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/RequestsContractsListWaitedCreatedDrawerContent";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsRequest,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

import { RequestsContractsListAllAdvanceFilterFormType } from "./@types/@requestsContractsListAll";
import useRequestsContractsListAllAdvanceFilter from "./helper/hooks/useRequestsContractsListAllAdvanceFilter";
import RequestsContractsListAllTableModel from "./helper/models/RequestsContractsListAllTableModel/RequestsContractsListAllTableModel";

const advanceFilterItems = [
  //advance filter items
  "vendorProvinceId",
  "vendorCityId",
  "restaurantProvinceId",
  "restaurantCityId",
  "branchId",
  "selfId",
  "supplierId",
  "requestTypeId",
  "requestStatusId",
  "dateDateStart",
  "dateDateEnd",
  "badger",
  //columns
  "title",
  "contractUUID",
];

function RequestsContractsListAll() {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<RequestsContractsListAllAdvanceFilterFormType>();
  const { filterItemsList } = useRequestsContractsListAllAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getAllRequestContractsList, { isLoading: isGetAllRequestContractsListLoading }] =
    useGetDetailAllSelfsContractsMutation();

  const [formWaitedCreatedContract] =
    Form.useForm<RequestsContractsListWaitedCreatedDrawerContentFormTypes>();

  const [openDrawerWaitedContract, setOpenDrawerWaitedContract] = useState<{
    isOpen: boolean;
    record: GetDetailAllSelfsContractsContent | null;
  }>({
    isOpen: false,
    record: null,
  });

  const [openDrawerAcceptedCreatedContract, setOpenDrawerAcceptedCreatedContract] =
    useState<{
      isOpen: boolean;
      record: GetDetailAllSelfsContractsContent | null;
    }>({
      isOpen: false,
      record: null,
    });
  const [
    openDrawerAcceptedRenewedAndCopiedContract,
    setOpenDrawerAcceptedRenewedAndCopiedContract,
  ] = useState<{
    isOpen: boolean;
    record: GetDetailAllSelfsContractsContent | null;
  }>({
    isOpen: false,
    record: null,
  });

  const [openDrawerRejectedCreatedContract, setOpenDrawerRejectedCreatedContract] =
    useState<{
      isOpen: boolean;
      record: GetDetailAllSelfsContractsContent | null;
    }>({
      isOpen: false,
      record: null,
    });
  const [
    openDrawerRejectedRenewedAndCopiedContract,
    setOpenDrawerRejectedRenewedAndCopiedContract,
  ] = useState<{
    isOpen: boolean;
    record: GetDetailAllSelfsContractsContent | null;
  }>({
    isOpen: false,
    record: null,
  });

  const viewContractId = openDrawerWaitedContract.isOpen
    ? openDrawerWaitedContract.record?.id
    : openDrawerAcceptedCreatedContract.isOpen
      ? openDrawerAcceptedCreatedContract.record?.id
      : openDrawerAcceptedRenewedAndCopiedContract.isOpen
        ? openDrawerAcceptedRenewedAndCopiedContract.record?.id
        : openDrawerRejectedCreatedContract.isOpen
          ? openDrawerRejectedCreatedContract.record?.id
          : openDrawerRejectedRenewedAndCopiedContract.isOpen
            ? openDrawerRejectedRenewedAndCopiedContract.record?.id
            : undefined;

  const {
    data: getAllRequestContractsViewData,
    isFetching: isGetAllRequestContractsViewLoading,
  } = useGetAllRequestContractsViewQuery(
    { id: Number(viewContractId) },
    {
      skip: !viewContractId,
      refetchOnMountOrArgChange: true,
    }
  );

  //* ================================ Util Functions ================================
  const excludeIncompleteRequestedStatuses = (statuses: number[]) =>
    statuses.filter(
      (status) =>
        status !== RequestContractStatus.REQUESTED_NEW &&
        status !== RequestContractStatus.REQUESTED_EXTEND &&
        status !== RequestContractStatus.REQUESTED_COPY
    );

  const getContractStatusFromFilters = (): number[] => {
    const requestTypeIds = url?.requestTypeId
      ? url.requestTypeId.split(",").map(Number)
      : [];
    const requestStatusIds = url?.requestStatusId
      ? url.requestStatusId.split(",").map(Number)
      : [];

    if (!requestTypeIds.length && !requestStatusIds.length) {
      return excludeIncompleteRequestedStatuses([...REQUEST_CONTRACT_STATUS_FILTER.all]);
    }

    const statusPool = requestStatusIds.length
      ? getRequestContractStatusesByFilterOptionIds(requestStatusIds)
      : undefined;

    if (requestTypeIds.length) {
      return excludeIncompleteRequestedStatuses(
        getRequestContractStatusesByRequestTypes(
          requestTypeIds,
          statusPool ?? REQUEST_CONTRACT_STATUS_FILTER.all
        )
      );
    }

    return excludeIncompleteRequestedStatuses(
      statusPool ?? [...REQUEST_CONTRACT_STATUS_FILTER.all]
    );
  };

  const buildAllRequestContractsListRequest = (): GetDetailAllSelfsContractsRequest => {
    const contractStatus = getContractStatusFromFilters();

    const { from: startCreatedDate, to: endCreatedDate } = formatDateRangeHoursForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
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
        contractStatus,

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
        ...(startCreatedDate && { startCreatedDate }),
        ...(endCreatedDate && { endCreatedDate }),
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

    return request;
  };

  const fetchAllRequestContractsList = () => {
    getAllRequestContractsList(buildAllRequestContractsListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const request = buildAllRequestContractsListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringAllContractListExcel(
      {
        params: request.params,
        body: request.body,
      },
      "لیست درخواست ها"
    )
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

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const handleViewContract = (record: GetDetailAllSelfsContractsContent) => {
    const requestType = getRequestContractTypeByStatus(record.status);
    const rowStatus = getRequestContractRowStatusByStatus(record.status);
    const isCreate = requestType === REQUEST_CONTRACT_TYPE.create;

    if (rowStatus === REQUEST_CONTRACT_STATUS.waited) {
      setOpenDrawerWaitedContract({ isOpen: true, record });
      return;
    }

    if (rowStatus === REQUEST_CONTRACT_STATUS.accepted) {
      if (isCreate) {
        setOpenDrawerAcceptedCreatedContract({ isOpen: true, record });
      } else {
        setOpenDrawerAcceptedRenewedAndCopiedContract({ isOpen: true, record });
      }
      return;
    }

    if (rowStatus === REQUEST_CONTRACT_STATUS.rejected) {
      // REJECTED_NEW → created drawer; REJECTED_COPY / REJECTED_EXTEND → renewed/copied drawer
      if (isCreate || requestType === null) {
        setOpenDrawerRejectedCreatedContract({ isOpen: true, record });
      } else {
        setOpenDrawerRejectedRenewedAndCopiedContract({ isOpen: true, record });
      }
    }
  };

  const onCloseDrawerWaitedContractHandler = () => {
    formWaitedCreatedContract.resetFields();
    setOpenDrawerWaitedContract({ isOpen: false, record: null });
  };

  const getWaitedDrawerTitle = (status?: number) => {
    if (status == null) return "مشاهده درخواست";

    const type = getRequestContractTypeByStatus(status);

    return type ? `مشاهده درخواست ${REQUEST_CONTRACT_TYPE_TEXT[type]}` : "مشاهده درخواست";
  };

  const onCloseDrawerAcceptedCreatedContractHandler = () => {
    setOpenDrawerAcceptedCreatedContract({ isOpen: false, record: null });
  };

  const onCloseDrawerAcceptedRenewedAndCopiedContractHandler = () => {
    setOpenDrawerAcceptedRenewedAndCopiedContract({ isOpen: false, record: null });
  };

  const onCloseDrawerRejectedCreatedContractHandler = () => {
    setOpenDrawerRejectedCreatedContract({ isOpen: false, record: null });
  };

  const onCloseDrawerRejectedRenewedAndCopiedContractHandler = () => {
    setOpenDrawerRejectedRenewedAndCopiedContract({ isOpen: false, record: null });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllRequestContractsList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* در انتظار */}
      {openDrawerWaitedContract?.isOpen && (
        <CustomDrawer
          title={getWaitedDrawerTitle(openDrawerWaitedContract.record?.status)}
          open={openDrawerWaitedContract?.isOpen}
          onClose={onCloseDrawerWaitedContractHandler}
          content={
            <RequestsContractsListWaitedCreatedDrawerContent
              onClose={onCloseDrawerWaitedContractHandler}
              form={formWaitedCreatedContract}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
              onAcceptSuccess={fetchAllRequestContractsList}
              onRejectSuccess={fetchAllRequestContractsList}
            />
          }
        />
      )}
      {/* تایید شده — ایجاد قرارداد */}
      {openDrawerAcceptedCreatedContract?.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openDrawerAcceptedCreatedContract?.isOpen}
          onClose={onCloseDrawerAcceptedCreatedContractHandler}
          content={
            <RequestsContractsListAcceptedCreatedDrawerContent
              onClose={onCloseDrawerAcceptedCreatedContractHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}
      {/* تایید شده — تمدید و کپی قرارداد */}
      {openDrawerAcceptedRenewedAndCopiedContract?.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openDrawerAcceptedRenewedAndCopiedContract?.isOpen}
          onClose={onCloseDrawerAcceptedRenewedAndCopiedContractHandler}
          content={
            <RequestsContractsListAcceptedRenewedAndCopiedDrawerContent
              onClose={onCloseDrawerAcceptedRenewedAndCopiedContractHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}
      {/* رد شده — ایجاد قرارداد */}
      {openDrawerRejectedCreatedContract?.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openDrawerRejectedCreatedContract?.isOpen}
          onClose={onCloseDrawerRejectedCreatedContractHandler}
          content={
            <RequestsContractsListRejectedCreatedDrawerContent
              onClose={onCloseDrawerRejectedCreatedContractHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}
      {/* رد شده — تمدید و کپی قرارداد */}
      {openDrawerRejectedRenewedAndCopiedContract?.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openDrawerRejectedRenewedAndCopiedContract?.isOpen}
          onClose={onCloseDrawerRejectedRenewedAndCopiedContractHandler}
          content={
            <RequestsContractsListRejectedRenewedAndCopiedDrawerContent
              onClose={onCloseDrawerRejectedRenewedAndCopiedContractHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}
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
            <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
              خروجی
            </CustomButton>
          }
        />

        <CustomTable<GetDetailAllSelfsContractsContent>
          dataSource={dataSource?.content ?? []}
          loading={isGetAllRequestContractsListLoading}
          columns={RequestsContractsListAllTableModel(handleViewContract)}
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
          draggableId={ExcelCodes.CATERING_REQUESTS_CONTRACTS_ALL_LIST}
        />
      </div>
    </>
  );
}

export default RequestsContractsListAll;
