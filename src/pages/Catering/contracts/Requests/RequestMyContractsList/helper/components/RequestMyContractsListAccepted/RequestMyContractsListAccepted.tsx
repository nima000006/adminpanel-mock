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
import { downloadCateringMyContractListExcel } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useGetDetailMySelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
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
import RequestMyContractsListAcceptedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/helper/components/RequestMyContractsListAcceptedCreatedDrawerContent/RequestMyContractsListAcceptedCreatedDrawerContent";
import RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/helper/components/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent/RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent";
import {
  GetDetailMySelfsContractsContent,
  GetDetailMySelfsContractsRequest,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";

import { RequestMyContractsListAcceptedAdvanceFilterFormType } from "./@types/@requestMyContractsListAccepted";
import useRequestMyContractsListAcceptedAdvanceFilter from "./helper/hooks/useRequestMyContractsListAcceptedAdvanceFilter";
import RequestMyContractsListAcceptedTableModel from "./helper/models/RequestMyContractsListAcceptedTableModel/RequestMyContractsListAcceptedTableModel";

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

const RequestMyContractsListAccepted = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [dataSource, setDataSource] = useState<GetDetailMySelfsContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<RequestMyContractsListAcceptedAdvanceFilterFormType>();
  const { filterItemsList } = useRequestMyContractsListAcceptedAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getMyRequestContractsList, { isLoading: isGetMyRequestContractsListLoading }] =
    useGetDetailMySelfsContractsMutation();

  const [openDrawerAcceptedCreatedContract, setOpenDrawerAcceptedCreatedContract] =
    useState<{
      isOpen: boolean;
      record: GetDetailMySelfsContractsContent | null;
    }>({
      isOpen: false,
      record: null,
    });
  const [
    openDrawerAcceptedRenewedAndCopiedContract,
    setOpenDrawerAcceptedRenewedAndCopiedContract,
  ] = useState<{
    isOpen: boolean;
    record: GetDetailMySelfsContractsContent | null;
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
  const buildMyRequestContractsListRequest = (): GetDetailMySelfsContractsRequest => {
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

    const request: GetDetailMySelfsContractsRequest = {
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

  const fetchMyRequestContractsList = () => {
    getMyRequestContractsList(buildMyRequestContractsListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const request = buildMyRequestContractsListRequest();

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

  const handleViewContract = (record: GetDetailMySelfsContractsContent) => {
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
    fetchMyRequestContractsList();
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
            <RequestMyContractsListAcceptedCreatedDrawerContent
              onClose={onCloseDrawerAcceptedCreatedContractHandler}
              data={getMyRequestContractsViewData}
              isLoading={isGetMyRequestContractsViewLoading}
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
            <RequestMyContractsListAcceptedRenewedAndCopiedDrawerContent
              onClose={onCloseDrawerAcceptedRenewedAndCopiedContractHandler}
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

        <CustomTable<GetDetailMySelfsContractsContent>
          dataSource={dataSource?.content ?? []}
          loading={isGetMyRequestContractsListLoading}
          columns={RequestMyContractsListAcceptedTableModel(handleViewContract)}
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
          draggableId={ExcelCodes.CATERING_MY_REQUESTS_CONTRACTS_ACCEPTED_LIST}
        />
      </div>
    </>
  );
};

export default RequestMyContractsListAccepted;
