import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import {
  downloadCateringAllContractListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
  CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useGetDetailAllSelfsContractsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { formatDateRangeHoursForApi } from "@pages/_shared/utils/formatDateRangeHoursForApi";
import { CATERING_STATUS_TYPES_ARCHIVE_LIST } from "@pages/Catering/_shared/utils";
import AllContractsArchieveListTableModel from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsArchieveList/helper/models/AllContractsArchieveList/AllContractsArchieveListTableModel";
import { AllContractsListContractsAdvanceFilterFormType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import useAllContractsListContractsAdvanceFilter from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/modals/advanceFilterModals/allContractsListContractsAdvanceFilter";
import {
  GetDetailAllSelfsContractsContent,
  GetDetailAllSelfsContractsRequest,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

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

const AllContractsArchieveList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE}>قراردادها</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });

  const navigate = useNavigate();
  const { params: url, setSearchParams } = useQueryParams();
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [dataSource, setDataSource] = useState<GetDetailAllSelfsContractsResponse | null>(
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

  //* ================================ Util Functions ================================
  const fetchAllContractsArchieveList = () => {
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
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
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

  const onViewHandler = (record: GetDetailAllSelfsContractsContent) => {
    navigate({
      pathname: CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: record.id.toString() }),
    });
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
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
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
    fetchAllContractsArchieveList();
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
      <div className="flex flex-col gap-6">
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
              <CustomButton onClick={onGetExcelFileBtn} loading={isDownloadLinkLoading}>
                خروجی
              </CustomButton>
            </div>
          }
        />

        <CustomTable<GetDetailAllSelfsContractsContent>
          dataSource={dataSource?.content ?? []}
          loading={isGetDetailAllSelfsContractsLoading}
          columns={AllContractsArchieveListTableModel({
            onView: onViewHandler,
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
          draggableId={ExcelCodes.CATERING_ALL_CONTRACTS_ARCHIEVE_LIST_TABLE}
        />
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل قراردادها:"
        />
      </div>
    </>
  );
};

export default AllContractsArchieveList;
