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
  RequestContractStatus,
  REQUEST_CONTRACT_STATUS_FILTER,
} from "@pages/Catering/contracts/_shared/@requestContractStatus";
import {
  getRequestContractStatusesByRequestTypes,
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { RequestsContractsListWaitedCreatedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/@types/@requestsContractsListWaitedCreatedDrawerContent";
import EditFoodPriceDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/helper/components/EditFoodPriceDrawerContent/EditFoodPriceDrawerContent";
import RequestsContractsListWaitedCreatedDrawerContent from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/RequestsContractsListWaitedCreatedDrawerContent";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsRequest,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

import { RequestsContractsListWaitedAdvanceFilterFormType } from "./@types/@requestsContractsListWaited";
import useRequestsContractsListWaitedAdvanceFilter from "./helper/hooks/useRequestsContractsListWaitedAdvanceFilter";
import RequestsContractsListWaitedTableModel from "./helper/models/RequestsContractsListWaitedTableModel/RequestsContractsListWaitedTableModel";

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

const getWaitedDrawerTitle = (status?: number) => {
  if (status == null) return "مشاهده درخواست";

  const requestType = getRequestContractTypeByStatus(status);

  return requestType
    ? `مشاهده درخواست ${REQUEST_CONTRACT_TYPE_TEXT[requestType]}`
    : "مشاهده درخواست";
};

const RequestsContractsListWaited = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsContractsResponse | null>(
    null
  );
  const [form] = Form.useForm<RequestsContractsListWaitedAdvanceFilterFormType>();

  const [formWaitedCreatedContract] =
    Form.useForm<RequestsContractsListWaitedCreatedDrawerContentFormTypes>();

  const { filterItemsList } = useRequestsContractsListWaitedAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getAllRequestContractsList, { isLoading: isGetAllRequestContractsListLoading }] =
    useGetDetailAllSelfsContractsMutation();

  const [openDrawerWaitedContract, setOpenDrawerWaitedContract] = useState<{
    isOpen: boolean;
    record: GetDetailAllSelfsContractsContent | null;
  }>({
    isOpen: false,
    record: null,
  });

  const [openDrawerEditFoodPrice, setOpenDrawerEditFoodPrice] = useState<{
    isOpen: boolean;
    product: GetDetailAllSelfsProductsContent | null;
    parentContractRecord: GetDetailAllSelfsContractsContent | null;
  }>({
    isOpen: false,
    product: null,
    parentContractRecord: null,
  });

  const viewContractId = openDrawerWaitedContract.isOpen
    ? openDrawerWaitedContract.record?.id
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
    const contractStatus = (
      url?.requestTypeId
        ? getRequestContractStatusesByRequestTypes(
            url?.requestTypeId?.split(",").map(Number),
            REQUEST_CONTRACT_STATUS_FILTER.waited
          )
        : [...REQUEST_CONTRACT_STATUS_FILTER.waited]
    ).filter(
      (status) =>
        status !== RequestContractStatus.REQUESTED_NEW &&
        status !== RequestContractStatus.REQUESTED_EXTEND &&
        status !== RequestContractStatus.REQUESTED_COPY
    );

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
    setOpenDrawerWaitedContract({ isOpen: true, record });
  };

  const onCloseDrawerWaitedContractHandler = () => {
    formWaitedCreatedContract.resetFields();
    setOpenDrawerWaitedContract({ isOpen: false, record: null });
  };

  const openEditFoodPriceDrawerHandler = (product: GetDetailAllSelfsProductsContent) => {
    setOpenDrawerEditFoodPrice({
      isOpen: true,
      product,
      parentContractRecord: openDrawerWaitedContract.record,
    });
    setOpenDrawerWaitedContract((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const reopenWaitedContractDrawerHandler = () => {
    const parentContractRecord = openDrawerEditFoodPrice.parentContractRecord;
    setOpenDrawerEditFoodPrice({
      isOpen: false,
      product: null,
      parentContractRecord: null,
    });
    if (parentContractRecord) {
      setOpenDrawerWaitedContract({ isOpen: true, record: parentContractRecord });
    }
  };

  const onCloseEditFoodPriceDrawerHandler = () => {
    reopenWaitedContractDrawerHandler();
  };

  const onEditFoodPriceSuccessHandler = () => {
    reopenWaitedContractDrawerHandler();
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
              onEditPriceClick={openEditFoodPriceDrawerHandler}
            />
          }
        />
      )}

      {openDrawerEditFoodPrice.isOpen && openDrawerEditFoodPrice.product && (
        <CustomDrawer
          title="ویرایش غذا"
          open={openDrawerEditFoodPrice.isOpen}
          onClose={onCloseEditFoodPriceDrawerHandler}
          content={
            <EditFoodPriceDrawerContent
              product={openDrawerEditFoodPrice.product}
              onClose={onCloseEditFoodPriceDrawerHandler}
              onSuccess={onEditFoodPriceSuccessHandler}
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
          columns={RequestsContractsListWaitedTableModel(handleViewContract)}
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
          draggableId={ExcelCodes.CATERING_REQUESTS_CONTRACTS_WAITED_LIST}
        />
      </div>
    </>
  );
};

export default RequestsContractsListWaited;
