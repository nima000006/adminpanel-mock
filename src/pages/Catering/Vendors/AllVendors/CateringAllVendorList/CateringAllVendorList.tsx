import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import {
  downloadCateringAllVendorListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import {
  useDeactiveAllVendorMutation,
  useGetAllVendorListMutation,
} from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CATERING_VENDOR_STATUS_TYPES } from "@pages/Catering/Vendors/_shared/utils";
import {
  CateringAllVendorListAdvanceFilterFormType,
  CateringAllVendorListRecordType,
  DeactiveAllVendorRequest,
  GetAllVendorListRequest,
  GetAllVendorListResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import { CateringAllVendorListDeactivateModalFormType } from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/helper/components/CateringAllVendorListDeactivateModal/@types/@cateringAllVendorListDeactivateModal";
import CateringAllVendorListDeactivateModal from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/helper/components/CateringAllVendorListDeactivateModal/CateringAllVendorListDeactivateModal";
import CateringAllVendorListCreateAndEditDrawerContent from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/helper/drawer/CateringAllVendorListCreateAndEditDrawerContent/CateringAllVendorListCreateAndEditDrawerContent";
import CateringAllVendorListTableModel from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/helper/models/CateringAllVendorList/CateringAllVendorListTableModel";

import useCateringAllVendorListAdvanceFilter from "./helper/hooks/useCateringAllVendorListAdvanceFilter/useCateringAllVendorListAdvanceFilter";

const COLUMN_FILTER_ITEMS = [
  "provinceId",
  "cityId",
  // column
  "title",
  "nationalNom",
  "managerFirstName",
  "managerLastName",
];

const DEACTIVATE_VENDOR_SUCCESS_MSG = "تأمین کننده با موفقیت غیرفعال شد.";

const CateringAllVendorList = () => {
  useTitle({ text: "تأمین کنندگان" });

  const [dataSource, setDataSource] = useState<GetAllVendorListResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CateringAllVendorListRecordType | null>(null);
  const [drawerState, setDrawerState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    vendorId?: number | null;
  }>({ open: false, mode: "create", vendorId: null });
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringAllVendorListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringAllVendorListAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getAllVendorList, { isLoading: isGetAllVendorListLoading }] =
    useGetAllVendorListMutation();
  const [deactiveAllVendor, { isLoading: isDeactiveAllVendorLoading }] =
    useDeactiveAllVendorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllVendorList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const openCreateDrawerHandler = () => {
    setDrawerState({ open: true, mode: "create", vendorId: null });
  };

  const openEditDrawerHandler = (record: CateringAllVendorListRecordType) => {
    setDrawerState({ open: true, mode: "edit", vendorId: record.id });
  };

  const closeDrawerHandler = () => {
    setDrawerState({ open: false, mode: "create", vendorId: null });
  };

  const onDeActiveHandler = (record: CateringAllVendorListRecordType) => {
    setSelectedRecord(record);
    setDeactivateModalOpen(true);
  };

  const onCloseDeactivateModalHandler = () => {
    setDeactivateModalOpen(false);
    setSelectedRecord(null);
  };

  const onDeactivateSuccess = () => {
    toast.success(DEACTIVATE_VENDOR_SUCCESS_MSG, {
      toastId: DEACTIVATE_VENDOR_SUCCESS_MSG,
    });
    onCloseDeactivateModalHandler();
    fetchAllVendorList();
  };

  const onConfirmDeactivateHandler = (
    values: CateringAllVendorListDeactivateModalFormType
  ) => {
    if (!selectedRecord) return;

    const request: DeactiveAllVendorRequest = {
      id: selectedRecord.id,
      statusType: CATERING_VENDOR_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
      deActiveReason: values.deActiveReason?.item?.id,
    };

    deactiveAllVendor(request).unwrap().then(onDeactivateSuccess);
  };

  const buildAllVendorListRequest = (): GetAllVendorListRequest => {
    const request: GetAllVendorListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate", // default
        sortDirection: "DESC", //default
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        ...(url?.title && { title: url.title }),
        ...(url?.nationalNom && { nationalNom: url.nationalNom }),
        ...(url?.managerFirstName && { managerFirstName: url.managerFirstName }),
        ...(url?.managerLastName && { managerLastName: url.managerLastName }),
        ...(url?.provinceId && {
          provinceIds: url.provinceId.split(",").map(Number),
        }),
        ...(url?.cityId && {
          cityIds: url.cityId.split(",").map(Number),
        }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    return request;
  };

  const fetchAllVendorList = () => {
    getAllVendorList(buildAllVendorListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildAllVendorListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringAllVendorListExcel({ params, body })
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      {drawerState.open && (
        <CustomDrawer
          open={drawerState.open}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <CateringAllVendorListCreateAndEditDrawerContent
              onCloseDrawer={closeDrawerHandler}
              onSuccess={fetchAllVendorList}
              mode={drawerState.mode}
              vendorId={drawerState.vendorId}
            />
          }
        />
      )}
      {deactivateModalOpen && (
        <CateringAllVendorListDeactivateModal
          open={deactivateModalOpen}
          record={selectedRecord}
          confirmLoading={isDeactiveAllVendorLoading}
          onCancel={onCloseDeactivateModalHandler}
          onConfirm={onConfirmDeactivateHandler}
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <Link to={CATERING_ALL_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE}>
                <CustomButton type="default" icon={<FiArchive />}>
                  آرشیو
                </CustomButton>
              </Link>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={openCreateDrawerHandler}
              >
                ایجاد تأمین کننده
              </CustomButton>
              <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
                خروجی
              </CustomButton>
            </div>
          }
        />
        <div>
          <CustomTable<CateringAllVendorListRecordType>
            dataSource={dataSource?.content}
            loading={isGetAllVendorListLoading}
            rowKey="id"
            columns={CateringAllVendorListTableModel({
              onView: onViewHandler,
              onEdit: openEditDrawerHandler,
              onDeActive: onDeActiveHandler,
            })}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements || 0,
              onChange: (page: number, pageSize: number) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            draggableColumns
            draggableId={ExcelCodes.CATERING_ALL_VENDOR_LIST_TABLE}
          />
        </div>
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل تأمین کننده‌ها:"
        />
      </div>
    </>
  );
};

export default CateringAllVendorList;
