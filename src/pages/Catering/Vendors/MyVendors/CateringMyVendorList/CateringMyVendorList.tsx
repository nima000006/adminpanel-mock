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
  downloadCateringMyVendorListExcel,
  makeSearchParams,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_MY_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import {
  useDeactiveMyVendorMutation,
  useGetMyVendorListMutation,
} from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  DOWNLOAD_LINK_ERROR,
  DOWNLOAD_LINK_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CATERING_VENDOR_STATUS_TYPES } from "@pages/Catering/Vendors/_shared/utils";
import {
  CateringMyVendorListAdvanceFilterFormType,
  CateringMyVendorListRecordType,
  DeactiveMyVendorRequest,
  GetMyVendorListRequest,
  GetMyVendorListResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";
import { CateringMyVendorListDeactivateModalFormType } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/helper/components/CateringMyVendorListDeactivateModal/@types/@cateringMyVendorListDeactivateModal";
import CateringMyVendorListDeactivateModal from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/helper/components/CateringMyVendorListDeactivateModal/CateringMyVendorListDeactivateModal";
import CateringMyVendorListCreateAndEditDrawerContent from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/helper/drawer/CateringMyVendorListCreateAndEditDrawerContent/CateringMyVendorListCreateAndEditDrawerContent";
import CateringMyVendorListTableModel from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/helper/models/CateringMyVendorList/CateringMyVendorListTableModel";

import useCateringMyVendorListAdvanceFilter from "./helper/hooks/useCateringMyVendorListAdvanceFilter/useCateringMyVendorListAdvanceFilter";

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

const CateringMyVendorList = () => {
  useTitle({ text: "تأمین کنندگان من" });

  const [dataSource, setDataSource] = useState<GetMyVendorListResponse | null>(null);
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CateringMyVendorListRecordType | null>(null);
  const [drawerState, setDrawerState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    vendorId?: number | null;
  }>({ open: false, mode: "create", vendorId: null });
  const [isDownloadLinkLoading, setIsDownloadLinkLoading] = useState(false);
  const [form] = Form.useForm<CateringMyVendorListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringMyVendorListAdvanceFilter({
    advanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getMyVendorList, { isLoading: isGetMyVendorListLoading }] =
    useGetMyVendorListMutation();
  const [deactiveMyVendor, { isLoading: isDeactiveMyVendorLoading }] =
    useDeactiveMyVendorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchMyVendorList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const openCreateDrawerHandler = () => {
    setDrawerState({ open: true, mode: "create", vendorId: null });
  };

  const openEditDrawerHandler = (record: CateringMyVendorListRecordType) => {
    setDrawerState({ open: true, mode: "edit", vendorId: record.id });
  };

  const closeDrawerHandler = () => {
    setDrawerState({ open: false, mode: "create", vendorId: null });
  };

  const onDeActiveHandler = (record: CateringMyVendorListRecordType) => {
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
    fetchMyVendorList();
  };

  const onConfirmDeactivateHandler = (
    values: CateringMyVendorListDeactivateModalFormType
  ) => {
    if (!selectedRecord) return;

    const request: DeactiveMyVendorRequest = {
      id: selectedRecord.id,
      statusType: CATERING_VENDOR_STATUS_TYPES.DE_ACTIVE_NOT_SHOW,
      deActiveReason: values.deActiveReason?.item?.id,
    };

    deactiveMyVendor(request).unwrap().then(onDeactivateSuccess);
  };

  const buildMyVendorListRequest = (): GetMyVendorListRequest => {
    const request: GetMyVendorListRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate", // default
        sortDirection: "DESC", // default
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

  const fetchMyVendorList = () => {
    getMyVendorList(buildMyVendorListRequest())
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  const onGetExcelFileBtn = () => {
    const { params, body } = buildMyVendorListRequest();

    setIsDownloadLinkLoading(true);
    downloadCateringMyVendorListExcel({ params, body })
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
            <CateringMyVendorListCreateAndEditDrawerContent
              onCloseDrawer={closeDrawerHandler}
              onSuccess={fetchMyVendorList}
              mode={drawerState.mode}
              vendorId={drawerState.vendorId}
            />
          }
        />
      )}
      {deactivateModalOpen && (
        <CateringMyVendorListDeactivateModal
          open={deactivateModalOpen}
          record={selectedRecord}
          confirmLoading={isDeactiveMyVendorLoading}
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
              <Link to={CATERING_MY_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE}>
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
          <CustomTable<CateringMyVendorListRecordType>
            dataSource={dataSource?.content}
            loading={isGetMyVendorListLoading}
            rowKey="id"
            columns={CateringMyVendorListTableModel({
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
            draggableId={ExcelCodes.CATERING_MY_VENDOR_LIST_TABLE}
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

export default CateringMyVendorList;
