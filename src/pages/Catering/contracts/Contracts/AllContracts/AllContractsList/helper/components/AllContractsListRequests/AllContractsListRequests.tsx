import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
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
import {
  RequestContractStatus,
  REQUEST_CONTRACT_STATUS_FILTER,
} from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  getRequestContractStatusesByFilterOptionIds,
  getRequestContractStatusesByRequestTypes,
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE,
} from "@pages/Catering/contracts/_shared/utils";
import AllContractsListContractsCopyDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCopyDrawer/AllContractsListContractsCopyDrawer";
import AllContractsListContractsCreateDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCreateDrawer/AllContractsListContractsCreateDrawer";
import AllContractsListContractsRenewDrawer from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/AllContractsListContractsRenewDrawer";
import {
  AllContractsListRequestsAdvanceFilterFormType,
  AllContractsListRequestsOpenDrawerState,
  AllContractsListRequestsRecordType,
  AllContractsListRequestsResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/@types/@allContractsListRequests";
import AllContractsListRequestsCopiedDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/components/AllContractsListRequestsCopiedDrawerContent/AllContractsListRequestsCopiedDrawerContent";
import AllContractsListRequestsCreatedDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/components/AllContractsListRequestsCreatedDrawerContent/AllContractsListRequestsCreatedDrawerContent";
import AllContractsListRequestsRenewedDrawerContent from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/components/AllContractsListRequestsRenewedDrawerContent/AllContractsListRequestsRenewedDrawerContent";
import useAllContractsListRequestsAdvanceFilter from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/modals/advanceFilterModals/allContractsListRequestsAdvanceFilter";
import AllContractsListRequestsTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/helper/models/AllContractsListRequests/AllContractsListRequestsTableModel";
import { GetDetailAllSelfsContractsRequest } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

const CONTRACT_FOODS_STEP = 1;

const advanceFilterItems = [
  "selfId",
  "supplierId",
  "requestTypeId",
  "requestStatusId",
  "badger",
  // columns
  "id",
  "contractUUID",
];

const initialDrawerState: AllContractsListRequestsOpenDrawerState = {
  isOpen: false,
  record: null,
};

const AllContractsListRequests = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [dataSource, setDataSource] = useState<AllContractsListRequestsResponse | null>(
    null
  );
  const [form] = Form.useForm<AllContractsListRequestsAdvanceFilterFormType>();
  const { filterItemsList } = useAllContractsListRequestsAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const [openCreatedDrawer, setOpenCreatedDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [openRenewedDrawer, setOpenRenewedDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [openCopiedDrawer, setOpenCopiedDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);

  const [completeCreateDrawer, setCompleteCreateDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [completeRenewDrawer, setCompleteRenewDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [completeCopyDrawer, setCompleteCopyDrawer] =
    useState<AllContractsListRequestsOpenDrawerState>(initialDrawerState);

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsContracts, { isLoading: isGetDetailAllSelfsContractsLoading }] =
    useGetDetailAllSelfsContractsMutation();

  const viewContractId = openCreatedDrawer.isOpen
    ? openCreatedDrawer.record?.id
    : openRenewedDrawer.isOpen
      ? openRenewedDrawer.record?.id
      : openCopiedDrawer.isOpen
        ? openCopiedDrawer.record?.id
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
  // Default pool: all request statuses so the requests tab never omits contractStatus
  // (which would return active contracts mixed with requests).
  const getContractStatusFromFilters = (): number[] => {
    const requestTypeIds = url?.requestTypeId
      ? url.requestTypeId.split(",").map(Number)
      : [];
    const requestStatusIds = url?.requestStatusId
      ? url.requestStatusId.split(",").map(Number)
      : [];

    if (!requestTypeIds.length && !requestStatusIds.length) {
      return [...REQUEST_CONTRACT_STATUS_FILTER.all];
    }

    const statusPool = requestStatusIds.length
      ? getRequestContractStatusesByFilterOptionIds(requestStatusIds)
      : undefined;

    if (requestTypeIds.length) {
      return getRequestContractStatusesByRequestTypes(requestTypeIds, statusPool);
    }

    return statusPool ?? [...REQUEST_CONTRACT_STATUS_FILTER.all];
  };

  const buildAllContractsListRequestsRequest = (): GetDetailAllSelfsContractsRequest => {
    const contractStatus = getContractStatusFromFilters();

    const request: GetDetailAllSelfsContractsRequest = {
      params: {
        pageNumber: url?.page ? Number(url?.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        contractStatus,
        ...(url?.selfId && {
          restaurantIds: url.selfId.split(",").map(Number),
        }),
        ...(url?.supplierId && {
          vendorIds: url.supplierId.split(",").map(Number),
        }),
        ...(url?.contractUUID && {
          contractUid: url.contractUUID,
        }),
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

  const fetchAllContractsListRequests = () => {
    getDetailAllSelfsContracts(buildAllContractsListRequestsRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const request = buildAllContractsListRequestsRequest();

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

  const onViewHandler = (record: AllContractsListRequestsRecordType) => {
    const requestType = getRequestContractTypeByStatus(record.status);

    if (requestType === REQUEST_CONTRACT_TYPE.create) {
      setOpenCreatedDrawer({ isOpen: true, record });
      return;
    }

    if (requestType === REQUEST_CONTRACT_TYPE.renew) {
      setOpenRenewedDrawer({ isOpen: true, record });
      return;
    }

    if (requestType === REQUEST_CONTRACT_TYPE.copy) {
      setOpenCopiedDrawer({ isOpen: true, record });
    }
  };

  const onCloseCreatedDrawerHandler = () => {
    setOpenCreatedDrawer(initialDrawerState);
  };

  const onCloseRenewedDrawerHandler = () => {
    setOpenRenewedDrawer(initialDrawerState);
  };

  const onCloseCopiedDrawerHandler = () => {
    setOpenCopiedDrawer(initialDrawerState);
  };

  const onCompleteHandler = (record: AllContractsListRequestsRecordType) => {
    if (record.status === RequestContractStatus.REQUESTED_NEW) {
      setCompleteCreateDrawer({ isOpen: true, record });
      return;
    }

    if (record.status === RequestContractStatus.REQUESTED_EXTEND) {
      setCompleteRenewDrawer({ isOpen: true, record });
      return;
    }

    if (record.status === RequestContractStatus.REQUESTED_COPY) {
      setCompleteCopyDrawer({ isOpen: true, record });
    }
  };

  const onCloseCompleteCreateDrawerHandler = () => {
    setCompleteCreateDrawer(initialDrawerState);
  };

  const onCloseCompleteRenewDrawerHandler = () => {
    setCompleteRenewDrawer(initialDrawerState);
  };

  const onCloseCompleteCopyDrawerHandler = () => {
    setCompleteCopyDrawer(initialDrawerState);
  };

  const onCompleteSuccessHandler = () => {
    fetchAllContractsListRequests();
  };

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllContractsListRequests();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {openCreatedDrawer.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openCreatedDrawer.isOpen}
          onClose={onCloseCreatedDrawerHandler}
          content={
            <AllContractsListRequestsCreatedDrawerContent
              onClose={onCloseCreatedDrawerHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}

      {openRenewedDrawer.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openRenewedDrawer.isOpen}
          onClose={onCloseRenewedDrawerHandler}
          content={
            <AllContractsListRequestsRenewedDrawerContent
              onClose={onCloseRenewedDrawerHandler}
              data={getAllRequestContractsViewData}
              isLoading={isGetAllRequestContractsViewLoading}
            />
          }
        />
      )}

      {openCopiedDrawer.isOpen && (
        <CustomDrawer
          title="مشاهده درخواست"
          open={openCopiedDrawer.isOpen}
          onClose={onCloseCopiedDrawerHandler}
          content={
            <AllContractsListRequestsCopiedDrawerContent
              onClose={onCloseCopiedDrawerHandler}
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

      <AllContractsListContractsCreateDrawer
        open={completeCreateDrawer.isOpen}
        resumeContractId={completeCreateDrawer.record?.id ?? null}
        onClose={onCloseCompleteCreateDrawerHandler}
        onSuccess={onCompleteSuccessHandler}
      />
      <AllContractsListContractsRenewDrawer
        open={completeRenewDrawer.isOpen}
        record={completeRenewDrawer.record}
        initialStep={CONTRACT_FOODS_STEP}
        onClose={onCloseCompleteRenewDrawerHandler}
        onSuccess={onCompleteSuccessHandler}
      />
      <AllContractsListContractsCopyDrawer
        open={completeCopyDrawer.isOpen}
        record={completeCopyDrawer.record}
        initialStep={CONTRACT_FOODS_STEP}
        onClose={onCloseCompleteCopyDrawerHandler}
        onSuccess={onCompleteSuccessHandler}
      />

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

        <CustomTable<AllContractsListRequestsRecordType>
          dataSource={dataSource?.content ?? []}
          loading={isGetDetailAllSelfsContractsLoading}
          columns={AllContractsListRequestsTableModel({
            onView: onViewHandler,
            onComplete: onCompleteHandler,
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
          draggableId={ExcelCodes.CATERING_ALL_CONTRACTS_REQUESTS_LIST_TABLE}
        />
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل درخواست‌ها:"
        />
      </div>
    </>
  );
};

export default AllContractsListRequests;
