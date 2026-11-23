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
import { downloadCateringMyContractListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailMySelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
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
import MyContractsListContractsCopyDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCopyDrawer/MyContractsListContractsCopyDrawer";
import MyContractsListContractsCreateDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/MyContractsListContractsCreateDrawer";
import MyContractsListContractsRenewDrawer from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsRenewDrawer/MyContractsListContractsRenewDrawer";
import {
  MyContractsListRequestsAdvanceFilterFormType,
  MyContractsListRequestsOpenDrawerState,
  MyContractsListRequestsRecordType,
  MyContractsListRequestsResponse,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/@types/@myContractsListRequests";
import MyContractsListRequestsCopiedDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/components/MyContractsListRequestsCopiedDrawerContent/MyContractsListRequestsCopiedDrawerContent";
import MyContractsListRequestsCreatedDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/components/MyContractsListRequestsCreatedDrawerContent/MyContractsListRequestsCreatedDrawerContent";
import MyContractsListRequestsRenewedDrawerContent from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/components/MyContractsListRequestsRenewedDrawerContent/MyContractsListRequestsRenewedDrawerContent";
import useMyContractsListRequestsAdvanceFilter from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/modals/advanceFilterModals/myContractsListRequestsAdvanceFilter";
import MyContractsListRequestsTableModel from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/models/MyContractsListRequests/MyContractsListRequestsTableModel";
import { GetDetailMySelfsContractsRequest } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

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

const initialDrawerState: MyContractsListRequestsOpenDrawerState = {
  isOpen: false,
  record: null,
};

const MyContractsListRequests = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [dataSource, setDataSource] = useState<MyContractsListRequestsResponse | null>(
    null
  );
  const [form] = Form.useForm<MyContractsListRequestsAdvanceFilterFormType>();
  const { filterItemsList } = useMyContractsListRequestsAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const [openCreatedDrawer, setOpenCreatedDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [openRenewedDrawer, setOpenRenewedDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [openCopiedDrawer, setOpenCopiedDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);

  const [completeCreateDrawer, setCompleteCreateDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [completeRenewDrawer, setCompleteRenewDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);
  const [completeCopyDrawer, setCompleteCopyDrawer] =
    useState<MyContractsListRequestsOpenDrawerState>(initialDrawerState);

  //? ================================  Api Calls ================================
  const [getDetailMySelfsContracts, { isLoading: isGetDetailMySelfsContractsLoading }] =
    useGetDetailMySelfsContractsMutation();

  const viewContractId = openCreatedDrawer.isOpen
    ? openCreatedDrawer.record?.id
    : openRenewedDrawer.isOpen
      ? openRenewedDrawer.record?.id
      : openCopiedDrawer.isOpen
        ? openCopiedDrawer.record?.id
        : undefined;

  const {
    data: getMyRequestContractsViewData,
    isFetching: isGetMyRequestContractsViewLoading,
  } = useGetMyRequestContractsViewQuery(
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

  const buildMyContractsListRequestsRequest = (): GetDetailMySelfsContractsRequest => {
    const contractStatus = getContractStatusFromFilters();

    const request: GetDetailMySelfsContractsRequest = {
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

  const fetchMyContractsListRequests = () => {
    getDetailMySelfsContracts(buildMyContractsListRequestsRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const request = buildMyContractsListRequestsRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyContractListExcel(
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

  const onViewHandler = (record: MyContractsListRequestsRecordType) => {
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

  const onCompleteHandler = (record: MyContractsListRequestsRecordType) => {
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
    fetchMyContractsListRequests();
  };

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyContractsListRequests();
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
            <MyContractsListRequestsCreatedDrawerContent
              onClose={onCloseCreatedDrawerHandler}
              data={getMyRequestContractsViewData}
              isLoading={isGetMyRequestContractsViewLoading}
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
            <MyContractsListRequestsRenewedDrawerContent
              onClose={onCloseRenewedDrawerHandler}
              data={getMyRequestContractsViewData}
              isLoading={isGetMyRequestContractsViewLoading}
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
            <MyContractsListRequestsCopiedDrawerContent
              onClose={onCloseCopiedDrawerHandler}
              data={getMyRequestContractsViewData}
              isLoading={isGetMyRequestContractsViewLoading}
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

      <MyContractsListContractsCreateDrawer
        open={completeCreateDrawer.isOpen}
        resumeContractId={completeCreateDrawer.record?.id ?? null}
        onClose={onCloseCompleteCreateDrawerHandler}
        onSuccess={onCompleteSuccessHandler}
      />
      <MyContractsListContractsRenewDrawer
        open={completeRenewDrawer.isOpen}
        record={completeRenewDrawer.record}
        initialStep={CONTRACT_FOODS_STEP}
        onClose={onCloseCompleteRenewDrawerHandler}
        onSuccess={onCompleteSuccessHandler}
      />
      <MyContractsListContractsCopyDrawer
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

        <CustomTable<MyContractsListRequestsRecordType>
          dataSource={dataSource?.content ?? []}
          loading={isGetDetailMySelfsContractsLoading}
          columns={MyContractsListRequestsTableModel({
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
          draggableId={ExcelCodes.CATERING_MY_CONTRACTS_REQUESTS_LIST_TABLE}
        />
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل درخواست‌ها:"
        />
      </div>
    </>
  );
};

export default MyContractsListRequests;
