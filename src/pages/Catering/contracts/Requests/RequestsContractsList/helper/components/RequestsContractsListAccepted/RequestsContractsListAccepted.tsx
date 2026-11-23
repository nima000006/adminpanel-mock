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
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  getRequestContractStatusesByRequestTypes,
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE,
} from "@pages/Catering/contracts/_shared/utils";
import RequestsContractsListAcceptedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAccepted/helper/components/RequestsContractsListAcceptedCreatedDrawerContent/RequestsContractsListAcceptedCreatedDrawerContent";
import RequestsContractsListAcceptedRenewedAndCopiedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAccepted/helper/components/RequestsContractsListAcceptedRenewedAndCopiedDrawerContent/RequestsContractsListAcceptedRenewedAndCopiedDrawerContent";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsRequest,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

import { RequestsContractsListAcceptedAdvanceFilterFormType } from "./@types/@requestsContractsListAccepted";
import useRequestsContractsListAcceptedAdvanceFilter from "./helper/hooks/useRequestsContractsListAcceptedAdvanceFilter";
import RequestsContractsListAcceptedTableModel from "./helper/models/RequestsContractsListAcceptedTableModel/RequestsContractsListAcceptedTableModel";

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
  "dateDateStart",
  "dateDateEnd",
  "badger",
  //columns
  "title",
  "contractUUID",
];

const RequestsContractsListAccepted = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<RequestsContractsListAcceptedAdvanceFilterFormType>();
  const { filterItemsList } = useRequestsContractsListAcceptedAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getAllRequestContractsList, { isLoading: isGetAllRequestContractsListLoading }] =
    useGetDetailAllSelfsContractsMutation();

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

  const viewContractId = openDrawerAcceptedCreatedContract.isOpen
    ? openDrawerAcceptedCreatedContract.record?.id
    : openDrawerAcceptedRenewedAndCopiedContract.isOpen
      ? openDrawerAcceptedRenewedAndCopiedContract.record?.id
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
  const buildAllRequestContractsListRequest = (): GetDetailAllSelfsContractsRequest => {
    const contractStatus = url?.requestTypeId
      ? getRequestContractStatusesByRequestTypes(
          url?.requestTypeId?.split(",").map(Number),
          REQUEST_CONTRACT_STATUS_FILTER.accepted
        )
      : [...REQUEST_CONTRACT_STATUS_FILTER.accepted];

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

    if (requestType === REQUEST_CONTRACT_TYPE.create) {
      setOpenDrawerAcceptedCreatedContract({ isOpen: true, record });
    } else {
      setOpenDrawerAcceptedRenewedAndCopiedContract({ isOpen: true, record });
    }
  };

  const onCloseDrawerAcceptedCreatedContractHandler = () => {
    setOpenDrawerAcceptedCreatedContract({ isOpen: false, record: null });
  };
  const onCloseDrawerAcceptedRenewedAndCopiedContractHandler = () => {
    setOpenDrawerAcceptedRenewedAndCopiedContract({ isOpen: false, record: null });
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
      {/* مشاهده درخواست تایید شده ایجاد شده */}
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
      {/* مشاهده درخواست تایید شده تمدید و کپی قرارداد */}
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
          columns={RequestsContractsListAcceptedTableModel(handleViewContract)}
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
          draggableId={ExcelCodes.CATERING_REQUESTS_CONTRACTS_ACCEPTED_LIST}
        />
      </div>
    </>
  );
};

export default RequestsContractsListAccepted;
